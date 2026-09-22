// Credit wallet shared by OFFLINE booking paths (dashboard walk-ins).
// 1 offline appointment = 1 credit, spent at creation — cancelled ones cost
// too (no refund path exists on purpose). Online bookings (website +
// WhatsApp) are FREE and never touch credits. No due: at zero balance the
// next offline booking is blocked and the panel says to contact support.
// Admins top up.
import { prisma } from './prisma.js';
import type { UserRole } from '../authentication/middleware/authMiddleware.js';

/** One offline appointment always costs exactly this. */
export const APPOINTMENT_COST = 1;

export type CreditOwnerType = 'DOCTOR' | 'HOSPITAL';

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

/**
 * Wallet behind any user row (for OTP SMS charging):
 * doctor + own staff → the doctor, hospital + desk staff → the hospital.
 * Returns null for platform roles (admins etc.) — their OTP SMS is free.
 */
export async function ownerForUser(user: {
  id: string;
  role: string;
  staffDoctorId?: string | null;
  staffHospitalId?: string | null;
}): Promise<{ ownerType: CreditOwnerType; ownerId: string } | null> {
  if (user.role === 'DOCTOR_STAFF' && user.staffDoctorId) {
    return { ownerType: 'DOCTOR', ownerId: user.staffDoctorId };
  }
  if (user.role === 'HOSPITAL_STAFF' && user.staffHospitalId) {
    return { ownerType: 'HOSPITAL', ownerId: user.staffHospitalId };
  }
  if (user.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: user.id },
      select: { doctorProfile: { select: { id: true } } },
    });
    const id = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    return id ? { ownerType: 'DOCTOR', ownerId: id } : null;
  }
  if (user.role === 'HOSPITAL') {
    const own = await prisma.user.findUnique({
      where: { id: user.id },
      select: { hospitalProfile: { select: { id: true } } },
    });
    const id = (own as { hospitalProfile?: { id: string } | null } | null)?.hospitalProfile?.id;
    return id ? { ownerType: 'HOSPITAL', ownerId: id } : null;
  }
  return null;
}

/** Send one OTP SMS, charging 1 credit. Returns true if sent AND charged. */
export async function sendOtpSms(opts: {
  phone: string;
  text: string;
  owner: { ownerType: CreditOwnerType; ownerId: string } | null;
  refId: string;
  note: string;
  createdBy?: string | null;
}): Promise<boolean> {
  const { singleMessage } = await import('./sms.js');
  try {
    await singleMessage(opts.phone, opts.text);
  } catch (error) {
    console.error('OTP SMS failed:', error);
    return false;
  }
  // Charged only after a successful send — a failed SMS never costs credit.
  if (!opts.owner) return true;
  try {
    await spendAppointmentCredit({
      ownerType: opts.owner.ownerType,
      ownerId: opts.owner.ownerId,
      kind: 'OTP_SMS',
      refType: 'User',
      refId: opts.refId,
      note: opts.note,
      createdBy: opts.createdBy ?? null,
    });
  } catch (error) {
    console.error('OTP SMS credit failed:', error);
    return false;
  }
  return true;
}

export interface SpendInput {
  ownerType: CreditOwnerType;
  ownerId: string;
  /** Ledger kind — appointment spends (default) or OTP_SMS. */
  kind?: 'APPOINTMENT_SPEND' | 'OTP_SMS';
  /** Which table row this spend belongs to (linked right after creation). */
  refType: 'PendingAppointment' | 'ConfirmedAppointment' | 'User';
  /** Known upfront for OTP sends (the user already exists). */
  refId?: string | null;
  /** User who booked (null for patient-side website/WhatsApp bookings). */
  createdBy?: string | null;
  note?: string | null;
}

/**
 * Atomically spend 1 credit (check-and-decrement in one statement, so
 * concurrent bookings can never overspend past zero).
 * Throws INSUFFICIENT_CREDIT at zero balance — the caller maps it to
 * "contact support". Throws OWNER_NOT_FOUND for a bad owner id.
 */
export async function spendAppointmentCredit(input: SpendInput): Promise<{ ledgerId: string; balanceAfter: number }> {
  // No due: at least 1 credit must remain before the decrement.
  const minBefore = 1;
  const kind = input.kind ?? 'APPOINTMENT_SPEND';
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
          kind,
          refType: input.refType,
          refId: input.refId ?? null,
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
        kind,
        refType: input.refType,
        refId: input.refId ?? null,
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
  /** How many more offline bookings can be taken right now (0 = contact support). */
  bookableLeft: number;
  exhausted: boolean;
}

/** Wallet snapshot for panels (doctor, hospital, staff all see their owner's). */
export async function getCreditBalance(ownerType: CreditOwnerType, ownerId: string): Promise<CreditBalance> {
  if (ownerType === 'DOCTOR') {
    const doctor = await prisma.doctor.findUnique({ where: { id: ownerId }, select: { id: true, name: true, creditBalance: true } });
    if (!doctor) throw new Error('OWNER_NOT_FOUND');
    const bookableLeft = Math.max(0, doctor.creditBalance);
    return { ownerType, ownerId, ownerName: doctor.name, balance: doctor.creditBalance, bookableLeft, exhausted: bookableLeft <= 0 };
  }
  const hospital = await prisma.hospital.findUnique({ where: { id: ownerId }, select: { id: true, name: true, creditBalance: true } });
  if (!hospital) throw new Error('OWNER_NOT_FOUND');
  const bookableLeft = Math.max(0, hospital.creditBalance);
  return { ownerType, ownerId, ownerName: hospital.name, balance: hospital.creditBalance, bookableLeft, exhausted: bookableLeft <= 0 };
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
  return '❌ ক্রেডিট শেষ! নতুন অফলাইন বুকিং নিতে সাপোর্টে যোগাযোগ করুন।';
}
