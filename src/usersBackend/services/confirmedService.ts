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
 */export async function createConfirmedWithSerial(data: {
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

// ---------------------------------------------------------------------------
// Row actions (doctor + staff portal): service-done, update, delete,
// online cancel-request. Ownership mirrors the list scope.
// ---------------------------------------------------------------------------

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function cleanRowName(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_NAME');
  const name = raw.trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 80) throw new Error('INVALID_NAME');
  return name;
}

function cleanRowPhone(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_PHONE');
  let digits = raw.replace(/[^\d]/g, '');
  if (digits.startsWith('880')) digits = '0' + digits.slice(3);
  if (digits.startsWith('00880')) digits = '0' + digits.slice(5);
  if (!/^01\d{9}$/.test(digits)) throw new Error('INVALID_PHONE');
  return digits;
}

function cleanRowDay(raw: unknown): Date {
  if (typeof raw !== 'string' || !DATE_RE.test(raw.trim())) throw new Error('INVALID_DATE');
  const [y, m, d] = raw.trim().split('-').map(Number);
  const dt = new Date(y!, m! - 1, d!);
  if (Number.isNaN(dt.getTime())) throw new Error('INVALID_DATE');
  return dt;
}

function jsDayToEnum(d: Date): string {
  return ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][d.getDay()]!;
}

/** Load one row and enforce the caller's ownership scope. */
async function ownedRow(caller: ConfirmedCaller, id: string) {
  const owned = await ownershipFilter(caller);
  const row = await prisma.confirmedAppointment.findUnique({ where: { id } });
  if (!row) throw new Error('APPOINTMENT_NOT_FOUND');
  const denied = Object.entries(owned).some(([key, value]) => (row as any)[key] !== value);
  if (denied) throw new Error('FORBIDDEN');
  return row;
}

function snapshotOf(row: {
  id: string;
  doctorId: string;
  doctorName: string | null;
  patientName: string;
  contactPhone: string;
  patientType: string;
  appointmentDate: Date;
  serial: number;
  collectionAmount: number | null;
  paymentAmount: number | null;
}) {
  return {
    appointmentId: row.id,
    doctorId: row.doctorId,
    doctorName: row.doctorName,
    patientName: row.patientName,
    contactPhone: row.contactPhone,
    patientType: row.patientType,
    appointmentDate: row.appointmentDate,
    serial: row.serial,
    amount: Number(row.collectionAmount ?? row.paymentAmount ?? 0) || 0,
  };
}

/** Service done: move the row to served_appointments (snapshot + remove). */
export async function completeConfirmed(caller: ConfirmedCaller, id: string) {
  const row = await ownedRow(caller, id);
  if (row.status === 'CANCELLED') throw new Error('ALREADY_CANCELLED');
  const [served] = await prisma.$transaction([
    prisma.servedAppointment.create({
      data: {
        appointmentId: row.id,
        doctorId: row.doctorId,
        doctorName: row.doctorName,
        patientName: row.patientName,
        patientType: row.patientType,
        contactPhone: row.contactPhone,
        appointmentDate: row.appointmentDate,
        serial: row.serial,
        chamberId: row.chamberId,
        chamberName: row.chamberName,
        bookingType: row.bookingType,
        collectionAmount: row.collectionAmount,
        paymentAmount: row.paymentAmount,
        servedBy: caller.userId,
      },
    }),
    prisma.confirmedAppointment.delete({ where: { id } }),
  ]);
  return served;
}

/** Served (সেবা সম্পন্ন) tab list. Hospital callers scope via their chambers' doctors. */
export async function listServed(
  caller: ConfirmedCaller,
  filters: ConfirmedFilters,
) {
  const owned = await ownershipFilter(caller, filters.doctorUsername);
  const { gte, lt } = rangeBounds(filters.range);
  let where: Record<string, any> = { ...owned, appointmentDate: { gte, lt } };
  if (filters.bookingType === 'ONLINE' || filters.bookingType === 'OFFLINE') {
    where.bookingType = filters.bookingType;
  }
  if ((owned as { hospitalId?: string }).hospitalId) {
    const chambers = await prisma.chamber.findMany({
      where: { hospitalId: (owned as { hospitalId: string }).hospitalId },
      select: { doctorId: true },
    });
    const doctorIds = [...new Set((chambers.map((c) => c.doctorId).filter(Boolean) as string[]))];
    const { hospitalId: _drop, ...rest } = where;
    void _drop;
    where = { ...rest, doctorId: { in: doctorIds.length ? doctorIds : ['__none__'] } };
  }

  const page = Math.max(1, filters.page || 1);
  const limit = Math.min(50, Math.max(1, filters.limit || 20));
  const [total, rows] = await prisma.$transaction([
    prisma.servedAppointment.count({ where }),
    prisma.servedAppointment.findMany({
      where,
      orderBy: [{ appointmentDate: filters.range === 'last30' ? 'desc' : 'asc' }, { serial: 'asc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);
  const data = rows.map((r: any) => ({
    ...r,
    amount: Number(r.collectionAmount ?? r.paymentAmount ?? 0) || 0,
  }));
  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export interface UpdateConfirmedInput {
  patientName?: unknown;
  contactPhone?: unknown;
  appointmentDate?: unknown;
  collectionAmount?: unknown;
}

/** Update name / phone / date / offline amount. Date moves get a fresh daily serial. */
export async function updateConfirmed(caller: ConfirmedCaller, id: string, input: UpdateConfirmedInput) {
  const row = await ownedRow(caller, id);
  if (row.status === 'CANCELLED') throw new Error('ALREADY_CANCELLED');

  const data: Record<string, unknown> = {};
  if (input.patientName !== undefined) data.patientName = cleanRowName(input.patientName);
  if (input.contactPhone !== undefined) {
    const phone = cleanRowPhone(input.contactPhone);
    data.contactPhone = phone;
    data.phoneNumber = phone;
  }
  if (input.collectionAmount !== undefined) {
    if (row.bookingType !== 'OFFLINE') throw new Error('AMOUNT_NOT_EDITABLE');
    const n =
      typeof input.collectionAmount === 'string' && input.collectionAmount.trim() !== ''
        ? Number(input.collectionAmount)
        : input.collectionAmount;
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 10000000) {
      throw new Error('INVALID_AMOUNT');
    }
    data.collectionAmount = Math.round(n * 100) / 100;
  }

  let newDate: Date | null = null;
  if (input.appointmentDate !== undefined) {
    newDate = cleanRowDay(input.appointmentDate);
    // Today + tomorrow only, and only a running day of this chamber.
    const startOf = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
    const diffDays = Math.round((startOf(newDate) - startOf(new Date())) / DAY_MS);
    if (diffDays < 0 || diffDays > 1) throw new Error('INVALID_DATE');
    const schedules = await prisma.doctorSchedule.findMany({
      where: { doctorId: row.doctorId },
      select: { dayOfWeek: true, chamberId: true },
    });
    if (schedules.length > 0) {
      const own = row.chamberId
        ? schedules.filter((s) => (s.chamberId || '').toLowerCase() === row.chamberId!.toLowerCase())
        : [];
      const relevant = own.length > 0 ? own : schedules;
      if (!relevant.some((s) => String(s.dayOfWeek).toUpperCase() === jsDayToEnum(newDate!))) {
        throw new Error('CLOSED_DAY');
      }
    }
  }

  if (newDate && isoDayOf(newDate) !== isoDayOf(row.appointmentDate)) {
    // New day → next serial of that day (retry on unique-conflict).
    for (let attempt = 1; attempt <= 5; attempt++) {
      const last = await prisma.confirmedAppointment.findFirst({
        where: { doctorId: row.doctorId, appointmentDate: newDate },
        orderBy: { serial: 'desc' },
        select: { serial: true },
      });
      try {
        return await prisma.confirmedAppointment.update({
          where: { id },
          data: { ...data, appointmentDate: newDate, serial: (last?.serial ?? 0) + 1 },
        });
      } catch (error: any) {
        if (error?.code === 'P2002' && attempt < 5) continue;
        throw error;
      }
    }
    throw new Error('SERIAL_FAILED');
  }
  if (newDate) data.appointmentDate = newDate;
  if (Object.keys(data).length === 0) throw new Error('NOTHING_TO_UPDATE');
  return prisma.confirmedAppointment.update({ where: { id }, data });
}

function isoDayOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Delete a walk-in (OFFLINE) booking: snapshot to cancelled_appointments_local,
 * then remove the row. ONLINE rows can never be deleted — use a cancel request.
 */
export async function deleteOfflineBooking(caller: ConfirmedCaller, id: string, reason?: unknown) {
  const row = await ownedRow(caller, id);
  if (row.bookingType !== 'OFFLINE') throw new Error('ONLINE_DELETE_FORBIDDEN');
  const cleanReason =
    typeof reason === 'string' && reason.trim() ? reason.trim().slice(0, 500) : null;
  await prisma.cancelledAppointmentLocal.create({
    data: { ...snapshotOf(row), reason: cleanReason, requestedBy: caller.userId },
  });
  await prisma.confirmedAppointment.delete({ where: { id } });
  return { deleted: true };
}

/**
 * Online cancel request: snapshot to cancelled_appointments_online.
 * The booking stays untouched (approved later). One request per booking.
 */
export async function requestOnlineCancel(caller: ConfirmedCaller, id: string, reason?: unknown) {
  const row = await ownedRow(caller, id);
  if (row.bookingType !== 'ONLINE') throw new Error('NOT_ONLINE');
  if (row.status === 'CANCELLED') throw new Error('ALREADY_CANCELLED');
  const existing = await prisma.cancelledAppointmentOnline.findUnique({
    where: { appointmentId: id },
    select: { id: true },
  });
  if (existing) throw new Error('ALREADY_REQUESTED');
  const cleanReason =
    typeof reason === 'string' && reason.trim() ? reason.trim().slice(0, 500) : null;
  await prisma.cancelledAppointmentOnline.create({
    data: { ...snapshotOf(row), reason: cleanReason, requestedBy: caller.userId },
  });
  return { requested: true };
}
