// Service for CONFIRMED bookings (confirmed_appointments table).
// - Daily serial: per doctor, per appointmentDate-day, restarts at 1 every 12:00 AM.
// - List endpoint backing the dashboard/appointments tabs:
//   today | tomorrow | last30 × all | online | offline.
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface ConfirmedCaller {
  userId: string;
  role: UserRole;
}

export type ConfirmedRange = 'today' | 'tomorrow' | 'last30';
export type ConfirmedTypeFilter = 'ALL' | 'ONLINE' | 'OFFLINE';

export interface ConfirmedFilters {
  range: ConfirmedRange;
  bookingType: ConfirmedTypeFilter;
  doctorUsername?: string;
  page: number;
  limit: number;
}

const DAY_MS = 86400000;

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function rangeBounds(range: ConfirmedRange): { gte: Date; lt: Date } {
  const today = startOfToday();
  if (range === 'tomorrow') {
    return { gte: new Date(today.getTime() + DAY_MS), lt: new Date(today.getTime() + 2 * DAY_MS) };
  }
  if (range === 'last30') {
    return { gte: new Date(today.getTime() - 29 * DAY_MS), lt: new Date(today.getTime() + DAY_MS) };
  }
  return { gte: today, lt: new Date(today.getTime() + DAY_MS) };
}

async function ownershipFilter(
  caller: ConfirmedCaller,
  doctorUsername?: string,
): Promise<Record<string, unknown>> {
  if (caller.role === 'SUPER_ADMIN') {
    if (doctorUsername?.trim()) {
      const doctor = await prisma.doctor.findFirst({
        where: { username: doctorUsername.trim() },
        select: { id: true },
      });
      if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
      return { doctorId: doctor.id };
    }
    return {};
  }
  if (caller.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true } } },
    });
    const doctorId = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    return { doctorId };
  }
  if (caller.role === 'DOCTOR_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffDoctorId: true },
    });
    const doctorId = (own as { staffDoctorId?: string | null } | null)?.staffDoctorId;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    return { doctorId };
  }
  if (caller.role === 'HOSPITAL') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { hospitalProfile: { select: { id: true } } },
    });
    const hospitalId = (own as { hospitalProfile?: { id: string } | null } | null)?.hospitalProfile?.id;
    if (!hospitalId) throw new Error('NO_HOSPITAL_PROFILE');
    return { hospitalId };
  }
  throw new Error('FORBIDDEN');
}

/**
 * Create a confirmed booking with the next daily serial for this doctor+day.
 * Serial restarts at 1 every 12:00 AM (appointmentDate is day-precision).
 * Retries on unique-conflict so concurrent bookings never share a serial.
 */
export async function createConfirmedWithSerial(data: {
  doctorId: string;
  appointmentDate: Date;
  [key: string]: unknown;
}) {
  const { doctorId, appointmentDate, ...rest } = data;
  for (let attempt = 1; attempt <= 5; attempt++) {
    const last = await prisma.confirmedAppointment.findFirst({
      where: { doctorId, appointmentDate },
      orderBy: { serial: 'desc' },
      select: { serial: true },
    });
    const serial = (last?.serial ?? 0) + 1;
    try {
      const created = await prisma.confirmedAppointment.create({
        data: { ...(rest as object), doctorId, appointmentDate, serial } as never,
      });
      console.log(
        `[Confirmed] serial=${serial} doctor=${doctorId} date=${appointmentDate.toISOString().slice(0, 10)} attempt=${attempt}`,
      );
      return created;
    } catch (error: any) {
      // P2002 = lost the race on @@unique([doctorId, appointmentDate, serial]) — retry.
      if (error?.code === 'P2002' && attempt < 5) continue;
      throw error;
    }
  }
  throw new Error('SERIAL_FAILED');
}

export async function listConfirmed(caller: ConfirmedCaller, filters: ConfirmedFilters) {
  const owned = await ownershipFilter(caller, filters.doctorUsername);
  const { gte, lt } = rangeBounds(filters.range);
  const where: Record<string, any> = { ...owned, appointmentDate: { gte, lt } };
  if (filters.bookingType === 'ONLINE' || filters.bookingType === 'OFFLINE') {
    where.bookingType = filters.bookingType;
  }

  const page = Math.max(1, filters.page || 1);
  const limit = Math.min(50, Math.max(1, filters.limit || 20));
  // Tab counters ride along (bookingType ALL, same ownership scope) so the
  // panel needs no extra round trips to keep them fresh.
  const today = startOfToday();
  const day = (offset: number) => ({
    gte: new Date(today.getTime() + offset * DAY_MS),
    lt: new Date(today.getTime() + (offset + 1) * DAY_MS),
  });
  const last30 = { gte: new Date(today.getTime() - 29 * DAY_MS), lt: new Date(today.getTime() + DAY_MS) };
  const [total, rows, cToday, cTomorrow, cLast30] = await prisma.$transaction([
    prisma.confirmedAppointment.count({ where }),
    prisma.confirmedAppointment.findMany({
      where,
      orderBy: [{ appointmentDate: filters.range === 'last30' ? 'desc' : 'asc' }, { serial: 'asc' }],
      skip: (page - 1) * limit,
      take: limit,
      include: {
        doctor: { select: { username: true, name: true, speciality: true } },
        hospital: { select: { slug: true, name: true } },
      },
    }),
    prisma.confirmedAppointment.count({ where: { ...owned, appointmentDate: day(0) } }),
    prisma.confirmedAppointment.count({ where: { ...owned, appointmentDate: day(1) } }),
    prisma.confirmedAppointment.count({ where: { ...owned, appointmentDate: last30 } }),
  ]);

  // Unified realized amount: offline cash or online gateway amount.
  const data = rows.map((r: any) => ({
    ...r,
    amount: Number(r.collectionAmount ?? r.paymentAmount ?? 0) || 0,
  }));
  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    counts: { today: cToday, tomorrow: cTomorrow, last30: cLast30 },
  };
}

/** Tab counters only (today / tomorrow / last30, bookingType ALL). One round trip. */
export async function getConfirmedCounts(caller: ConfirmedCaller, doctorUsername?: string) {
  const owned = await ownershipFilter(caller, doctorUsername);
  const today = startOfToday();
  const day = (offset: number) => ({
    gte: new Date(today.getTime() + offset * DAY_MS),
    lt: new Date(today.getTime() + (offset + 1) * DAY_MS),
  });
  const last30 = { gte: new Date(today.getTime() - 29 * DAY_MS), lt: new Date(today.getTime() + DAY_MS) };
  const [cToday, cTomorrow, cLast30] = await prisma.$transaction([
    prisma.confirmedAppointment.count({ where: { ...owned, appointmentDate: day(0) } }),
    prisma.confirmedAppointment.count({ where: { ...owned, appointmentDate: day(1) } }),
    prisma.confirmedAppointment.count({ where: { ...owned, appointmentDate: last30 } }),
  ]);
  return { today: cToday, tomorrow: cTomorrow, last30: cLast30 };
}
