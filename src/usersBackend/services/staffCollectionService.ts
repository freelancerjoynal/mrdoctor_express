// Per-staff cash tracking for OFFLINE (walk-in/cash) bookings.
// Who took the booking (createdBy) + how much each user collected.
// Groups cover both ledgers so the card never drops on serve:
// - confirmed (still pending) + served (done) for the requested range.
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface StaffCollectionCaller {
  userId: string;
  role: UserRole;
}

export type StaffCollectionRange = 'today' | 'tomorrow' | 'last30';

export const UNKNOWN_STAFF = 'unknown';

const DAY_MS = 86400000;

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function rangeBounds(range: StaffCollectionRange): { gte: Date; lt: Date } {
  const today = startOfToday();
  if (range === 'tomorrow') {
    return { gte: new Date(today.getTime() + DAY_MS), lt: new Date(today.getTime() + 2 * DAY_MS) };
  }
  if (range === 'last30') {
    return { gte: new Date(today.getTime() - 29 * DAY_MS), lt: new Date(today.getTime() + DAY_MS) };
  }
  return { gte: today, lt: new Date(today.getTime() + DAY_MS) };
}

async function resolveDoctorId(
  caller: StaffCollectionCaller,
  doctorUsername?: string,
): Promise<string> {
  if (caller.role === 'SUPER_ADMIN') {
    if (!doctorUsername?.trim()) throw new Error('DOCTOR_REQUIRED');
    const doctor = await prisma.doctor.findFirst({
      where: { username: doctorUsername.trim() },
      select: { id: true },
    });
    if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
    return doctor.id;
  }
  if (caller.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true } } },
    });
    const doctorId = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    return doctorId;
  }
  if (caller.role === 'DOCTOR_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffDoctorId: true },
    });
    const doctorId = (own as { staffDoctorId?: string | null } | null)?.staffDoctorId;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    return doctorId;
  }
  throw new Error('FORBIDDEN');
}

function amountOf(r: { collectionAmount?: unknown; paymentAmount?: unknown }): number {
  const c = r.collectionAmount as number | null | undefined;
  const p = r.paymentAmount as number | null | undefined;
  return Number(c ?? p ?? 0) || 0;
}

export interface StaffBucket {
  userId: string;
  name: string;
  count: number;
  total: number;
  confirmedCount: number;
  confirmedTotal: number;
  servedCount: number;
  servedTotal: number;
}

/** Per-taker OFFLINE totals for the range (confirmed + served combined). */
export async function getStaffCollections(
  caller: StaffCollectionCaller,
  opts: { range: StaffCollectionRange; doctorUsername?: string },
): Promise<StaffBucket[]> {
  const doctorId = await resolveDoctorId(caller, opts.doctorUsername);
  const { gte, lt } = rangeBounds(opts.range);
  const base = { doctorId, bookingType: 'OFFLINE' as const, appointmentDate: { gte, lt } };

  const [confirmed, served] = await Promise.all([
    prisma.confirmedAppointment.findMany({
      where: base,
      select: { createdBy: true, createdByName: true, collectionAmount: true, paymentAmount: true },
    }),
    prisma.servedAppointment.findMany({
      where: base,
      select: { createdBy: true, createdByName: true, collectionAmount: true, paymentAmount: true },
    }),
  ]);

  const map = new Map<string, StaffBucket & { known: boolean }>();
  const touch = (userId: string | null, name: string | null) => {
    const key = userId?.trim() ? userId.trim() : UNKNOWN_STAFF;
    let b = map.get(key);
    if (!b) {
      b = {
        userId: key,
        name: name?.trim() || '',
        count: 0,
        total: 0,
        confirmedCount: 0,
        confirmedTotal: 0,
        servedCount: 0,
        servedTotal: 0,
        known: key !== UNKNOWN_STAFF,
      };
      map.set(key, b);
    } else if (!b.name && name?.trim()) {
      b.name = name.trim();
    }
    return b;
  };
  for (const r of confirmed) {
    const b = touch(r.createdBy, r.createdByName);
    const a = amountOf(r);
    b.count += 1;
    b.total += a;
    b.confirmedCount += 1;
    b.confirmedTotal += a;
  }
  for (const r of served) {
    const b = touch(r.createdBy, r.createdByName);
    const a = amountOf(r);
    b.count += 1;
    b.total += a;
    b.servedCount += 1;
    b.servedTotal += a;
  }

  // Backfill display names for takers whose snapshot is empty.
  const missing = [...map.values()].filter((b) => b.known && !b.name).map((b) => b.userId);
  if (missing.length > 0) {
    const users = await prisma.user.findMany({
      where: { id: { in: missing } },
      select: { id: true, name: true, email: true },
    });
    for (const u of users) {
      const b = map.get(u.id);
      if (b) b.name = u.name?.trim() || u.email.split('@')[0] || 'স্টাফ';
    }
  }

  return [...map.values()]
    .map(({ known: _known, ...b }) => ({
      ...b,
      name: b.name || (b.userId === UNKNOWN_STAFF ? 'অজানা / আগের রেকর্ড' : 'স্টাফ'),
    }))
    .sort((x, y) => y.total - x.total || y.count - x.count);
}

export interface StaffRow {
  id: string;
  serial: number;
  patientName: string;
  contactPhone: string;
  problem: string;
  appointmentDate: Date;
  served: boolean;
  servedAt?: Date | string | null;
  createdBy?: string | null;
  createdByName?: string | null;
  amount: number;
}

/** OFFLINE rows taken by one staff in the range (confirmed + served). */
export async function listStaffRows(
  caller: StaffCollectionCaller,
  opts: { range: StaffCollectionRange; userId: string; doctorUsername?: string; limit?: unknown },
): Promise<{ name: string; confirmed: StaffRow[]; served: StaffRow[] }> {
  const doctorId = await resolveDoctorId(caller, opts.doctorUsername);
  const { gte, lt } = rangeBounds(opts.range);
  const key = opts.userId?.trim() || UNKNOWN_STAFF;
  const taker = key === UNKNOWN_STAFF ? null : key;
  const base = {
    doctorId,
    bookingType: 'OFFLINE' as const,
    appointmentDate: { gte, lt },
    createdBy: taker,
  };
  const limit = Math.min(100, Math.max(1, Number(opts.limit) || 50));

  const [confirmed, served] = await Promise.all([
    prisma.confirmedAppointment.findMany({
      where: base,
      orderBy: [{ appointmentDate: 'asc' }, { serial: 'asc' }],
      take: limit,
    }),
    prisma.servedAppointment.findMany({
      where: base,
      orderBy: [{ appointmentDate: 'asc' }, { serial: 'asc' }],
      take: limit,
    }),
  ]);

  const name =
    confirmed[0]?.createdByName?.trim() ||
    served[0]?.createdByName?.trim() ||
    (key === UNKNOWN_STAFF ? 'অজানা / আগের রেকর্ড' : 'স্টাফ');

  const toRow = (
    r: {
      id: string;
      serial: number;
      patientName: string;
      contactPhone: string;
      appointmentDate: Date;
      createdBy?: string | null;
      createdByName?: string | null;
      collectionAmount?: number | null;
      paymentAmount?: number | null;
      problem?: string | null;
      servedAt?: Date | null;
    },
    isServed: boolean,
  ): StaffRow => ({
    id: r.id,
    serial: r.serial,
    patientName: r.patientName,
    contactPhone: r.contactPhone,
    problem: r.problem ?? '',
    appointmentDate: r.appointmentDate,
    served: isServed,
    servedAt: r.servedAt ?? null,
    createdBy: r.createdBy,
    createdByName: r.createdByName,
    amount: amountOf(r),
  });
  return { name, confirmed: confirmed.map((r) => toRow(r, false)), served: served.map((r) => toRow(r, true)) };
}
