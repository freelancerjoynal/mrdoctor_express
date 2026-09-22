// Credit wallet shared by every booking path (website, WhatsApp, dashboard).
// 1 appointment = 1 credit, spent at creation — cancelled ones cost too
// (no refund path exists on purpose). Balances may go negative up to the
// due limit (doctor 200, hospital 500); past that, booking is blocked and
// the panel tells the owner to contact support. Admins top up.
import { prisma } from './prisma.js';
import type { UserRole } from '../authentication/middleware/authMiddleware.js';

/** One appointment always costs exactly this. */
export const APPOINTMENT_COST = 1;
/** How far below zero each owner type may go (due). */
export const DOCTOR_DUE_LIMIT = 200;
export const HOSPITAL_DUE_LIMIT = 500;

export type CreditOwnerType = 'DOCTOR' | 'HOSPITAL';

export function dueLimitFor(ownerType: CreditOwnerType): number {
  return ownerType === 'HOSPITAL' ? HOSPITAL_DUE_LIMIT : DOCTOR_DUE_LIMIT;
}

export interface CreditCaller {
  userId: string;
  role: UserRole;
}

/**
 * Whose wallet pays for a booking made by this caller:
 * doctor-side roles (doctor + own staff) → the doctor,
 * hospital-side roles (hospital + desk staff) → the hospital.
 */
export async function resolveCreditOwner(caller: CreditCaller): Promise<{ ownerType: CreditOwnerType; ownerId: string }> {
  if (caller.role === 'DOCTOR' || caller.role === 'DOCTOR_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: {
        doctorProfile: { select: { id: true } },
        staffDoctor: { select: { id: true } },
      },
    });
    const id =
      caller.role === 'DOCTOR'
        ? (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id
        : (own as { staffDoctor?: { id: string } | null } | null)?.staffDoctor?.id;
    if (!id) throw new Error('NO_DOCTOR_PROFILE');
    return { ownerType: 'DOCTOR', ownerId: id };
  }
  if (caller.role === 'HOSPITAL' || caller.role === 'HOSPITAL_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffHospitalId: true, hospitalProfile: { select: { id: true } } },
    });
    const id =
      caller.role === 'HOSPITAL'
        ? (own as { hospitalProfile?: { id: string } | null } | null)?.hospitalProfile?.id
        : own?.staffHospitalId;
    if (!id) throw new Error('NO_HOSPITAL_PROFILE');
    return { ownerType: 'HOSPITAL', ownerId: id };
  }
  throw new Error('FORBIDDEN');
}

export interface SpendInput {
  ownerType: CreditOwnerType;
  ownerId: string;
  /** Which table row this spend belongs to (linked right after creation). */
  refType: 'PendingAppointment' | 'ConfirmedAppointment';
  /** User who booked (null for patient-side website/WhatsApp bookings). */
  createdBy?: string | null;
  note?: string | null;
}

/**
 * Atomically spend 1 credit (check-and-decrement in one statement, so
 * concurrent bookings can never overspend past the due limit).
 * Throws INSUFFICIENT_CREDIT when the due is exhausted — the caller maps
 * it to "contact support". Throws OWNER_NOT_FOUND for a bad owner id.
 */
export async function spendAppointmentCredit(input: SpendInput): Promise<{ ledgerId: string; balanceAfter: number }> {
  const due = dueLimitFor(input.ownerType);
  // Balance must still cover one more credit: balance - 1 >= -due.
  const minBefore = 1 - due;
  return prisma.$transaction(async (tx) => {
    let balanceAfter: number;
    if (input.ownerType === 'DOCTOR') {
      const upd = await tx.doctor.updateMany({
        where: { id: input.ownerId, creditBalance: { gte: minBefore } },
        data: { creditBalance: { decrement: APPOINTMENT_COST } },
      });
      if (upd.count === 0) {
        const exists = await tx.doctor.findUnique({ where: { id: input.ownerId }, select: { id: true } });
        if (!exists) throw new Error('OWNER_NOT_FOUND');
        throw new Error('INSUFFICIENT_CREDIT');
      }
      const row = await tx.doctor.findUnique({ where: { id: input.ownerId }, select: { creditBalance: true } });
      balanceAfter = row?.creditBalance ?? 0;
      const ledger = await tx.creditLedger.create({
        data: {
          ownerType: 'DOCTOR',
          doctorId: input.ownerId,
          amount: -APPOINTMENT_COST,
          balanceAfter,
          kind: 'APPOINTMENT_SPEND',
          refType: input.refType,
          note: input.note ?? null,
          createdBy: input.createdBy ?? null,
        },
        select: { id: true },
      });
      return { ledgerId: ledger.id, balanceAfter };
    }
    const upd = await tx.hospital.updateMany({
      where: { id: input.ownerId, creditBalance: { gte: minBefore } },
      data: { creditBalance: { decrement: APPOINTMENT_COST } },
    });
    if (upd.count === 0) {
      const exists = await tx.hospital.findUnique({ where: { id: input.ownerId }, select: { id: true } });
      if (!exists) throw new Error('OWNER_NOT_FOUND');
      throw new Error('INSUFFICIENT_CREDIT');
    }
    const row = await tx.hospital.findUnique({ where: { id: input.ownerId }, select: { creditBalance: true } });
    balanceAfter = row?.creditBalance ?? 0;
    const ledger = await tx.creditLedger.create({
      data: {
        ownerType: 'HOSPITAL',
        hospitalId: input.ownerId,
        amount: -APPOINTMENT_COST,
        balanceAfter,
        kind: 'APPOINTMENT_SPEND',
        refType: input.refType,
        note: input.note ?? null,
        createdBy: input.createdBy ?? null,
      },
      select: { id: true },
    });
    return { ledgerId: ledger.id, balanceAfter };
  });
}

/** Attach the created appointment id to a spend row (best-effort, never throws). */
export async function linkCreditRef(ledgerId: string, refId: string): Promise<void> {
  try {
    await prisma.creditLedger.update({ where: { id: ledgerId }, data: { refId } });
  } catch {
    /* ledger stays without ref — booking itself succeeded */
  }
}

/**
 * Void a spend (booking creation failed AFTER the charge): deletes the
 * spend row and gives the credit back. Best-effort — never throws, so the
 * original booking error always propagates.
 */
export async function voidSpend(ledgerId: string): Promise<void> {
  try {
    await prisma.$transaction(async (tx) => {
      const row = await tx.creditLedger.findUnique({ where: { id: ledgerId } });
      if (!row || row.kind !== 'APPOINTMENT_SPEND' || row.refId) return;
      await tx.creditLedger.delete({ where: { id: ledgerId } });
      if (row.ownerType === 'HOSPITAL' && row.hospitalId) {
        await tx.hospital.update({ where: { id: row.hospitalId }, data: { creditBalance: { increment: -row.amount } } });
      } else if (row.doctorId) {
        await tx.doctor.update({ where: { id: row.doctorId }, data: { creditBalance: { increment: -row.amount } } });
      }
    });
  } catch {
    /* give up quietly — support can adjust manually */
  }
}

export interface TopupInput {
  ownerType: CreditOwnerType;
  ownerId: string;
  amount: number;
  note?: string | null;
  createdBy?: string | null;
}

/** Admin top-up: add credits (1–100000) + TOPUP ledger row. */
export async function topupCredit(input: TopupInput): Promise<{ balanceAfter: number }> {
  const amount = typeof input.amount === 'string' ? Number(input.amount) : input.amount;
  if (!Number.isInteger(amount) || amount < 1 || amount > 100000) throw new Error('INVALID_AMOUNT');
  if (input.ownerType !== 'DOCTOR' && input.ownerType !== 'HOSPITAL') throw new Error('INVALID_OWNER');
  const note = typeof input.note === 'string' ? input.note.trim().slice(0, 200) : null;
  return prisma.$transaction(async (tx) => {
    let balanceAfter: number;
    if (input.ownerType === 'DOCTOR') {
      const updated = await tx.doctor.update({
        where: { id: input.ownerId },
        data: { creditBalance: { increment: amount } },
        select: { creditBalance: true },
      });
      balanceAfter = updated.creditBalance;
      await tx.creditLedger.create({
        data: { ownerType: 'DOCTOR', doctorId: input.ownerId, amount, balanceAfter, kind: 'TOPUP', note, createdBy: input.createdBy ?? null },
      });
    } else {
      const updated = await tx.hospital.update({
        where: { id: input.ownerId },
        data: { creditBalance: { increment: amount } },
        select: { creditBalance: true },
      });
      balanceAfter = updated.creditBalance;
      await tx.creditLedger.create({
        data: { ownerType: 'HOSPITAL', hospitalId: input.ownerId, amount, balanceAfter, kind: 'TOPUP', note, createdBy: input.createdBy ?? null },
      });
    }
    return { balanceAfter };
  });
}

export interface CreditBalance {
  ownerType: CreditOwnerType;
  ownerId: string;
  ownerName: string;
  balance: number;
  dueLimit: number;
  /** How many more appointments can be taken right now (0 = contact support). */
  bookableLeft: number;
  exhausted: boolean;
}

/** Wallet snapshot for panels (doctor, hospital, staff all see their owner's). */
export async function getCreditBalance(ownerType: CreditOwnerType, ownerId: string): Promise<CreditBalance> {
  const dueLimit = dueLimitFor(ownerType);
  if (ownerType === 'DOCTOR') {
    const doctor = await prisma.doctor.findUnique({ where: { id: ownerId }, select: { id: true, name: true, creditBalance: true } });
    if (!doctor) throw new Error('OWNER_NOT_FOUND');
    const bookableLeft = Math.max(0, doctor.creditBalance + dueLimit);
    return { ownerType, ownerId, ownerName: doctor.name, balance: doctor.creditBalance, dueLimit, bookableLeft, exhausted: bookableLeft <= 0 };
  }
  const hospital = await prisma.hospital.findUnique({ where: { id: ownerId }, select: { id: true, name: true, creditBalance: true } });
  if (!hospital) throw new Error('OWNER_NOT_FOUND');
  const bookableLeft = Math.max(0, hospital.creditBalance + dueLimit);
  return { ownerType, ownerId, ownerName: hospital.name, balance: hospital.creditBalance, dueLimit, bookableLeft, exhausted: bookableLeft <= 0 };
}

export interface LedgerRow {
  id: string;
  amount: number;
  balanceAfter: number;
  kind: string;
  refType: string | null;
  refId: string | null;
  note: string | null;
  createdAt: Date;
}

/** Newest-first ledger for an owner (admin history, panel dropdowns). */
export async function listCreditLedger(ownerType: CreditOwnerType, ownerId: string, take = 50): Promise<LedgerRow[]> {
  const rows = await prisma.creditLedger.findMany({
    where: ownerType === 'DOCTOR' ? { ownerType, doctorId: ownerId } : { ownerType, hospitalId: ownerId },
    orderBy: { createdAt: 'desc' },
    take: Math.min(200, Math.max(1, take)),
    select: { id: true, amount: true, balanceAfter: true, kind: true, refType: true, refId: true, note: true, createdAt: true },
  });
  return rows;
}

/** Bengali "contact support" message shared by every blocked-booking response. */
export function insufficientCreditMessage(): string {
  return '❌ ক্রেডিট শেষ! বাকি বা বকেয়া সীমাও শেষ — নতুন অ্যাপয়েন্টমেন্ট নিতে সাপোর্টে যোগাযোগ করুন।';
}
