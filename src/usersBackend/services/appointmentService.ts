// Service layer for the doctor's appointment admin panel.
// DOCTOR sees rows for their own doctorId; their DOCTOR_STAFF sees the same
// rows via the staff link (but never month/lifetime income). HOSPITAL sees
// rows for their own hospitalId; SUPER_ADMIN sees everything and may narrow
// with doctorUsername / hospitalSlug / status / date filters.
//
// Lifecycle: PENDING (new request) -> CONFIRMED -> DONE (served, counts as
// income) | CANCELLED (dropped from collection).
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
import { notifyAppointments } from '../../realtime/notify.js';

export interface AppointmentCaller {
  userId: string;
  role: UserRole;
}

export interface AppointmentFilters {
  status?: string;
  doctorUsername?: string;
  hospitalSlug?: string;
  date?: string;
  from?: string;
  to?: string;
  page: number;
  limit: number;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function parseDay(value: string): Date | null {
  if (!DATE_RE.test(value.trim())) return null;
  const [y, m, d] = value.trim().split('-').map(Number);
  const dt = new Date(y!, m! - 1, d!);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

export const APPOINTMENT_STATUSES = ['PENDING', 'CONFIRMED', 'DONE', 'CANCELLED'] as const;

async function resolveDoctorId(caller: AppointmentCaller): Promise<string> {
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

async function ownershipFilter(caller: AppointmentCaller): Promise<Record<string, unknown>> {
  if (caller.role === 'SUPER_ADMIN') return {};
  if (caller.role === 'DOCTOR' || caller.role === 'DOCTOR_STAFF') {
    return { doctorId: await resolveDoctorId(caller) };
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
  if (caller.role === 'HOSPITAL_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffHospitalId: true },
    });
    const hospitalId = (own as { staffHospitalId?: string | null } | null)?.staffHospitalId;
    if (!hospitalId) throw new Error('NO_HOSPITAL_PROFILE');
    return { hospitalId };
  }
  throw new Error('FORBIDDEN');
}

/** Fee map of one doctor's chambers: chamberId -> { newFee, oldFee }. */
export async function chamberFeeMap(doctorId: string): Promise<Map<string, { newFee: number; oldFee: number }>> {
  const chambers = await prisma.chamber.findMany({
    where: { doctorId },
    select: { id: true, newPatientFee: true, oldPatientFee: true },
  });
  return new Map(chambers.map((c) => [c.id, { newFee: Number(c.newPatientFee) || 0, oldFee: Number(c.oldPatientFee) || 0 }]));
}

/** Visit fee of one row: RENEW pays the old-patient fee, else the new-patient fee. */
export function feeOf(
  row: { chamberId?: string | null; patientType?: string | null },
  fees: Map<string, { newFee: number; oldFee: number }>,
): number {
  if (!row.chamberId) return 0;
  const f = fees.get(row.chamberId);
  if (!f) return 0;
  return row.patientType === 'RENEW' ? f.oldFee : f.newFee;
}

function withFee<T extends { chamberId?: string | null; patientType?: string | null }>(
  rows: T[],
  fees: Map<string, { newFee: number; oldFee: number }>,
) {
  return rows.map((r) => ({ ...r, fee: feeOf(r, fees) }));
}

function dayRange(dateStr: string): { gte: Date; lt: Date } {
  const [y, m, d] = dateStr.split('-').map(Number);
  const gte = new Date(y!, m! - 1, d!);
  const lt = new Date(y!, m! - 1, d! + 1);
  return { gte, lt };
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export async function listAppointments(caller: AppointmentCaller, filters: AppointmentFilters) {
  const owned = await ownershipFilter(caller);
  const where: Record<string, any> = { ...owned };

  if ((APPOINTMENT_STATUSES as readonly string[]).includes(filters.status ?? '')) {
    where.status = filters.status;
  }
  if (filters.date && /^\d{4}-\d{2}-\d{2}$/.test(filters.date.trim())) {
    const { gte, lt } = dayRange(filters.date.trim());
    where.appointmentDate = { gte, lt };
  } else {
    // Range filter for upcoming / last-30-days views (inclusive from, exclusive to).
    const from = filters.from ? parseDay(filters.from) : null;
    const to = filters.to ? parseDay(filters.to) : null;
    if (from || to) {
      where.appointmentDate = {
        ...(from ? { gte: from } : {}),
        ...(to ? { lt: new Date(to.getTime() + 86400000) } : {}),
      };
    }
  }
  // SUPER_ADMIN may narrow further; owners are already scoped so extra
  // filters only apply when they match the owned scope.
  if (filters.doctorUsername?.trim()) {
    const doctor = await prisma.doctor.findFirst({
      where: { username: filters.doctorUsername.trim() },
      select: { id: true },
    });
    if (!doctor) return { data: [], pagination: { ...pickPaging(filters), total: 0, totalPages: 0 } };
    if (owned.doctorId && owned.doctorId !== doctor.id) {
      return { data: [], pagination: { ...pickPaging(filters), total: 0, totalPages: 0 } };
    }
    where.doctorId = doctor.id;
  }
  if (filters.hospitalSlug?.trim()) {
    const hospital = await prisma.hospital.findFirst({
      where: { slug: filters.hospitalSlug.trim() },
      select: { id: true },
    });
    if (!hospital) return { data: [], pagination: { ...pickPaging(filters), total: 0, totalPages: 0 } };
    if (owned.hospitalId && owned.hospitalId !== hospital.id) {
      return { data: [], pagination: { ...pickPaging(filters), total: 0, totalPages: 0 } };
    }
    where.hospitalId = hospital.id;
  }

  const { page, limit } = pickPaging(filters);
  const [total, data] = await prisma.$transaction([
    prisma.pendingAppointment.count({ where }),
    prisma.pendingAppointment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        doctor: { select: { username: true, name: true, speciality: true } },
        hospital: { select: { slug: true, name: true } },
      },
    }),
  ]);
  const doctorId = (where.doctorId as string | undefined) ?? (owned.doctorId as string | undefined);
  const fees = doctorId ? await chamberFeeMap(doctorId) : new Map();
  return { data: withFee(data, fees), pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

/** Today's work queue (all statuses), oldest first, each row with its fee. */
export async function listTodayAppointments(caller: AppointmentCaller) {
  const owned = await ownershipFilter(caller);
  const today = startOfToday();
  const tomorrow = new Date(today.getTime() + 86400000);
  const where: Record<string, any> = {
    ...owned,
    appointmentDate: { gte: today, lt: tomorrow },
  };
  const data = await prisma.pendingAppointment.findMany({
    where,
    orderBy: { createdAt: 'asc' },
    include: {
      doctor: { select: { username: true, name: true, speciality: true } },
      hospital: { select: { slug: true, name: true } },
    },
  });
  const doctorId = owned.doctorId as string | undefined;
  const fees = doctorId ? await chamberFeeMap(doctorId) : new Map();
  return withFee(data, fees);
}

export interface IncomeBucket {
  total: number;
  count: number;
  newCount: number;
  renewCount: number;
}

function bucket(
  rows: Array<{ patientType?: string | null; chamberId?: string | null }>,
  fees: Map<string, { newFee: number; oldFee: number }>,
): IncomeBucket {
  let total = 0;
  let newCount = 0;
  let renewCount = 0;
  for (const r of rows) {
    total += feeOf(r, fees);
    if (r.patientType === 'RENEW') renewCount += 1;
    else newCount += 1;
  }
  return { total, count: rows.length, newCount, renewCount };
}

export interface CustomBucket extends IncomeBucket {
  from: string;
  to: string;
}

/**
 * Monday-to-Sunday weekly collection (never a rolling "last 7 days").
 * - patientCount: every appointment in the range, any status.
 * - total/newCount/renewCount/doneCount: realized (DONE) only.
 * - cancelled: CANCELLED rows in the range.
 */
export interface WeeklyBucket {
  from: string;
  to: string;
  total: number;
  patientCount: number;
  doneCount: number;
  newCount: number;
  renewCount: number;
  cancelled: number;
}

export interface AppointmentSummary {
  today: string;
  /** Expected collection today (everything not cancelled — statuses can still change). */
  todayExpected: IncomeBucket;
  /** Realized today (DONE only). */
  todayDone: IncomeBucket;
  /** Realized last 7 days (DONE). Visible to staff. */
  week: IncomeBucket;
  /** This Monday 00:00 → now. Visible to doctor + staff. */
  thisWeek: WeeklyBucket;
  /** Last Monday 00:00 → Sunday 24:00 (full previous Mon–Sun week). Visible to doctor + staff. */
  lastWeek: WeeklyBucket;
  /** Realized last 30 days (DONE). Doctor only. */
  month: IncomeBucket | null;
  /** Realized lifetime (DONE). Doctor only (gross collection). */
  lifetime: IncomeBucket | null;
  /** Realized income (DONE) in the requested custom range. Staff ranges clamp to the last 7 days. */
  custom: CustomBucket | null;
}

const DAY_MS = 86400000;

function isoDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Monday 00:00 starting the week that contains `now` (server-local days). */
function startOfWeekMonday(now: Date): Date {
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sinceMonday = (day.getDay() + 6) % 7;
  return new Date(day.getTime() - sinceMonday * DAY_MS);
}

function weeklyBucket(
  rows: Array<{ status?: string | null; patientType?: string | null; chamberId?: string | null }>,
  fees: Map<string, { newFee: number; oldFee: number }>,
  from: Date,
  to: Date,
): WeeklyBucket {
  let total = 0;
  let doneCount = 0;
  let newCount = 0;
  let renewCount = 0;
  let cancelled = 0;
  for (const r of rows) {
    if (r.status === 'CANCELLED') {
      cancelled += 1;
      continue;
    }
    if (r.status === 'DONE') {
      total += feeOf(r, fees);
      doneCount += 1;
      if (r.patientType === 'RENEW') renewCount += 1;
      else newCount += 1;
    }
  }
  return {
    from: isoDay(from),
    to: isoDay(to),
    total,
    patientCount: rows.length,
    doneCount,
    newCount,
    renewCount,
    cancelled,
  };
}

export async function getAppointmentSummary(
  caller: AppointmentCaller,
  opts: { doctorUsername?: string; from?: string; to?: string } = {},
): Promise<AppointmentSummary> {
  const owned = await ownershipFilter(caller);
  let doctorId = owned.doctorId as string | undefined;
  if (opts.doctorUsername?.trim()) {
    if (caller.role !== 'SUPER_ADMIN') throw new Error('FORBIDDEN');
    const doctor = await prisma.doctor.findFirst({
      where: { username: opts.doctorUsername.trim() },
      select: { id: true },
    });
    if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
    doctorId = doctor.id;
  }
  if (!doctorId) throw new Error('DOCTOR_REQUIRED');

  const fees = await chamberFeeMap(doctorId);
  const today = startOfToday();
  const tomorrow = new Date(today.getTime() + DAY_MS);
  const weekAgo = new Date(today.getTime() - 6 * DAY_MS);
  const now = new Date();
  // Monday-to-Sunday weeks (server-local days): this Monday 00:00 → now,
  // and the full previous week Monday 00:00 → Sunday 24:00 (= this Monday 00:00).
  const monday = startOfWeekMonday(now);
  const prevMonday = new Date(monday.getTime() - 7 * DAY_MS);

  // Custom range (both ends inclusive): doctor picks any dates (max 366 days);
  // staff clamps to the last 7 days.
  const isStaff = caller.role === 'DOCTOR_STAFF';
  let customFrom = opts.from ? parseDay(opts.from) : new Date(weekAgo);
  let customToIncl = opts.to ? parseDay(opts.to) : new Date(today);
  if (!customFrom || !customToIncl || customFrom > customToIncl) {
    customFrom = new Date(weekAgo);
    customToIncl = new Date(today);
  }
  if (customToIncl.getTime() - customFrom.getTime() > 365 * DAY_MS) {
    customFrom = new Date(customToIncl.getTime() - 365 * DAY_MS);
  }
  if (isStaff) {
    if (customFrom < weekAgo) customFrom = new Date(weekAgo);
    if (customToIncl > today) customToIncl = new Date(today);
  }
  const customToLt = new Date(customToIncl.getTime() + DAY_MS);

  const [todayRows, weekRows, monthRows, lifetimeRows, customRows, thisWeekRows, lastWeekRows] = await Promise.all([    prisma.pendingAppointment.findMany({
      where: { doctorId, appointmentDate: { gte: today, lt: tomorrow }, status: { not: 'CANCELLED' } },
      select: { patientType: true, chamberId: true },
    }),
    prisma.pendingAppointment.findMany({
      where: { doctorId, status: 'DONE', appointmentDate: { gte: weekAgo, lt: tomorrow } },
      select: { patientType: true, chamberId: true },
    }),
    caller.role === 'DOCTOR_STAFF'
      ? Promise.resolve(null)
      : prisma.pendingAppointment.findMany({
          where: {
            doctorId,
            status: 'DONE',
            appointmentDate: { gte: new Date(today.getTime() - 29 * 86400000), lt: tomorrow },
          },
          select: { patientType: true, chamberId: true },
        }),
    caller.role === 'DOCTOR_STAFF'
      ? Promise.resolve(null)
      : prisma.pendingAppointment.findMany({
          where: { doctorId, status: 'DONE' },
          select: { patientType: true, chamberId: true },
        }),
    prisma.pendingAppointment.findMany({
      where: { doctorId, status: 'DONE', appointmentDate: { gte: customFrom, lt: customToLt } },
      select: { patientType: true, chamberId: true },
    }),
    // Weekly Mon–Sun buckets: every status (money/counts split in JS).
    prisma.pendingAppointment.findMany({
      where: { doctorId, appointmentDate: { gte: monday, lt: now } },
      select: { status: true, patientType: true, chamberId: true },
    }),
    prisma.pendingAppointment.findMany({
      where: { doctorId, appointmentDate: { gte: prevMonday, lt: monday } },
      select: { status: true, patientType: true, chamberId: true },
    }),
  ]);

  const todayDoneRows = await prisma.pendingAppointment.findMany({
    where: { doctorId, appointmentDate: { gte: today, lt: tomorrow }, status: 'DONE' },
    select: { patientType: true, chamberId: true },
  });

  const iso = isoDay(today);
  return {
    today: iso,
    todayExpected: bucket(todayRows, fees),
    todayDone: bucket(todayDoneRows, fees),
    week: bucket(weekRows, fees),
    thisWeek: weeklyBucket(thisWeekRows, fees, monday, today),
    lastWeek: weeklyBucket(lastWeekRows, fees, prevMonday, new Date(monday.getTime() - DAY_MS)),
    month: monthRows ? bucket(monthRows, fees) : null,
    lifetime: lifetimeRows ? bucket(lifetimeRows, fees) : null,
    custom: { from: isoDay(customFrom), to: isoDay(customToIncl), ...bucket(customRows, fees) },
  };
}

function pickPaging(filters: AppointmentFilters) {
  const page = Math.max(1, filters.page || 1);
  const limit = Math.min(50, Math.max(1, filters.limit || 20));
  return { page, limit };
}

export async function updateAppointmentStatus(caller: AppointmentCaller, id: string, status: string) {
  if (!(APPOINTMENT_STATUSES as readonly string[]).includes(status)) {
    throw new Error('INVALID_STATUS');
  }
  const owned = await ownershipFilter(caller);
  const existing = await prisma.pendingAppointment.findUnique({ where: { id } });
  if (!existing) throw new Error('APPOINTMENT_NOT_FOUND');
  const denied = Object.entries(owned).some(([key, value]) => (existing as any)[key] !== value);
  if (denied) throw new Error('FORBIDDEN');
  const updated = await prisma.pendingAppointment.update({ where: { id }, data: { status } });
  notifyAppointments({ doctorId: existing.doctorId, hospitalId: existing.hospitalId });
  return updated;
}
