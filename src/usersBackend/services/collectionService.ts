// Collection (আদায়) boxes — served_appointments is the income ledger
// (realized income), confirmed_appointments is the expected ledger.
// - todayBox       = served today only (আজকের আয় / today's income)
// - todayConfirmed = confirmed today only (still pending service)
// - todayTotal     = served + confirmed today (আজ আদায় — never decreases
//   when a booking is marked served, it just moves ledgers)
// - week/month/lifetime = served ranges (dashboard income views).
//
// Per row: amount = (collectionAmount ?? paymentAmount),
// split by booking channel:
// - ONLINE  = bookingType ONLINE (gateway-paid requests)
// - OFFLINE = bookingType OFFLINE (walk-in cash bookings)
//
// Day rule (server-local midnights, identical to the booking day rule):
// - today    = [today 00:00, tomorrow 00:00)
// - week     = [Monday 00:00, next Monday 00:00) of the current week
// - month    = [1st 00:00, 1st of next month 00:00) — calendar month
// - lifetime = [doctor joining (doctors.createdAt), now)
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface CollectionCaller {
  userId: string;
  role: UserRole;
}

export interface ChannelBucket {
  total: number;
  count: number;
}

export interface CollectionBucket {
  total: number;
  count: number;
  online: ChannelBucket;
  offline: ChannelBucket;
}

const DAY_MS = 86400000;

const BN_MONTH = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
];

function isoDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Monday 00:00 starting the week that contains `now` (server-local days). */
function startOfWeekMonday(now: Date): Date {
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sinceMonday = (day.getDay() + 6) % 7;
  return new Date(day.getTime() - sinceMonday * DAY_MS);
}

/** Resolve the doctor behind this call plus their joining date. */
async function resolveDoctor(caller: CollectionCaller, doctorUsername?: string): Promise<{ id: string; joinedAt: Date }> {
  if (caller.role === 'SUPER_ADMIN') {
    if (!doctorUsername?.trim()) throw new Error('DOCTOR_REQUIRED');
    const doctor = await prisma.doctor.findFirst({
      where: { username: doctorUsername.trim() },
      select: { id: true, createdAt: true },
    });
    if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
    return { id: doctor.id, joinedAt: doctor.createdAt };
  }
  if (caller.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true } } },
    });
    const doctorId = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      select: { id: true, createdAt: true },
    });
    if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
    return { id: doctor.id, joinedAt: doctor.createdAt };
  }
  if (caller.role === 'DOCTOR_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffDoctorId: true },
    });
    const doctorId = (own as { staffDoctorId?: string | null } | null)?.staffDoctorId;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      select: { id: true, createdAt: true },
    });
    if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
    return { id: doctor.id, joinedAt: doctor.createdAt };
  }
  throw new Error('FORBIDDEN');
}

/** Merge one range: ONLINE + OFFLINE channels, from either ledger. */
async function rangeBucket(
  doctorId: string,
  source: 'served' | 'confirmed',
  gte?: Date,
  lt?: Date,
): Promise<CollectionBucket> {
  const dateFilter =
    gte || lt ? { appointmentDate: { ...(gte ? { gte } : {}), ...(lt ? { lt } : {}) } } : {};
  const model = source === 'served' ? prisma.servedAppointment : prisma.confirmedAppointment;
  const rows = await (model as typeof prisma.servedAppointment).findMany({
    where: { doctorId, ...dateFilter },
    select: { bookingType: true, collectionAmount: true, paymentAmount: true },
  });
  const bucket = (type: string): ChannelBucket => {
    let total = 0;
    let count = 0;
    for (const r of rows) {
      if (r.bookingType !== type) continue;
      total += Number(r.collectionAmount ?? r.paymentAmount ?? 0) || 0;
      count += 1;
    }
    return { total, count };
  };
  const online = bucket('ONLINE');
  const offline = bucket('OFFLINE');
  return {
    total: online.total + offline.total,
    count: online.count + offline.count,
    online,
    offline,
  };
}

export interface CollectionSummary {
  today: string;
  tomorrow: string;
  /** Served today only — আজকের আয় (today's income). */
  todayBox: CollectionBucket;
  /** Confirmed today only — still pending service. */
  todayConfirmed: CollectionBucket;
  /** Served + confirmed today — আজ আদায় (never drops on serve). */
  todayTotal: CollectionBucket;
  /** Served tomorrow only. */
  tomorrowBox: CollectionBucket;
  /** Confirmed tomorrow only — still pending service. */
  tomorrowConfirmed: CollectionBucket;
  /** Served + confirmed tomorrow — আগামীকালের কালেকশন. */
  tomorrowTotal: CollectionBucket;
  week: { from: string; to: string } & CollectionBucket;
  /** Calendar-month box. Doctor only (null for staff). */
  month: { year: number; month: number; name: string; from: string; to: string } & CollectionBucket | null;
  /** Joining-date → now box. Doctor only (null for staff). */
  lifetime: { joinedAt: string } & CollectionBucket | null;
}

function combineBuckets(a: CollectionBucket, b: CollectionBucket): CollectionBucket {
  return {
    total: a.total + b.total,
    count: a.count + b.count,
    online: { total: a.online.total + b.online.total, count: a.online.count + b.online.count },
    offline: { total: a.offline.total + b.offline.total, count: a.offline.count + b.offline.count },
  };
}

export async function getCollectionSummary(
  caller: CollectionCaller,
  opts: { doctorUsername?: string } = {},
): Promise<CollectionSummary> {
  const doctor = await resolveDoctor(caller, opts.doctorUsername);

  const today = startOfToday();
  const tomorrow = new Date(today.getTime() + DAY_MS);
  const dayAfter = new Date(today.getTime() + 2 * DAY_MS);
  const monday = startOfWeekMonday(new Date());
  const nextMonday = new Date(monday.getTime() + 7 * DAY_MS);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const [todayServed, todayConfirmed, tomorrowServed, tomorrowConfirmed, weekBox, monthBox, lifetimeBox] =
    await Promise.all([
      rangeBucket(doctor.id, 'served', today, tomorrow),
      rangeBucket(doctor.id, 'confirmed', today, tomorrow),
      rangeBucket(doctor.id, 'served', tomorrow, dayAfter),
      rangeBucket(doctor.id, 'confirmed', tomorrow, dayAfter),
      rangeBucket(doctor.id, 'served', monday, nextMonday),
      caller.role === 'DOCTOR_STAFF' ? Promise.resolve(null) : rangeBucket(doctor.id, 'served', monthStart, nextMonthStart),
      caller.role === 'DOCTOR_STAFF' ? Promise.resolve(null) : rangeBucket(doctor.id, 'served'),
    ]);

  const monthIdx = today.getMonth();
  return {
    today: isoDay(today),
    tomorrow: isoDay(tomorrow),
    todayBox: todayServed,
    todayConfirmed,
    todayTotal: combineBuckets(todayServed, todayConfirmed),
    tomorrowBox: tomorrowServed,
    tomorrowConfirmed,
    tomorrowTotal: combineBuckets(tomorrowServed, tomorrowConfirmed),
    week: { from: isoDay(monday), to: isoDay(new Date(nextMonday.getTime() - DAY_MS)), ...weekBox },
    month: monthBox
      ? {
          year: today.getFullYear(),
          month: monthIdx + 1,
          name: `${BN_MONTH[monthIdx]} ${today.getFullYear()}`,
          from: isoDay(monthStart),
          to: isoDay(new Date(nextMonthStart.getTime() - DAY_MS)),
          ...monthBox,
        }
      : null,
    lifetime: lifetimeBox ? { joinedAt: isoDay(doctor.joinedAt), ...lifetimeBox } : null,
  };
}

export interface MonthDayRow {
  date: string;
  total: number;
  count: number;
  online: ChannelBucket;
  offline: ChannelBucket;
}

export interface MonthDays {
  year: number;
  month: number;
  name: string;
  days: MonthDayRow[];
  total: number;
  count: number;
  online: ChannelBucket;
  offline: ChannelBucket;
}

export interface WeekDayRow {
  date: string;
  total: number;
  count: number;
  online: ChannelBucket;
  offline: ChannelBucket;
}

export interface WeekDays {
  from: string;
  to: string;
  offset: number;
  days: WeekDayRow[];
  total: number;
  count: number;
  online: ChannelBucket;
  offline: ChannelBucket;
}

/** Per-day আদায় for one Mon–Sun week (served ledger). offset=0 → current week, -1 → last week. */
export async function getWeekDays(
  caller: CollectionCaller,
  opts: { offset?: unknown; doctorUsername?: string } = {},
): Promise<WeekDays> {
  const doctor = await resolveDoctor(caller, opts.doctorUsername);

  let offset = Number(opts.offset);
  if (!Number.isInteger(offset) || offset < -52 || offset > 1) offset = 0;

  const monday = new Date(startOfWeekMonday(new Date()).getTime() + offset * 7 * DAY_MS);
  const nextMonday = new Date(monday.getTime() + 7 * DAY_MS);

  const rows = await prisma.servedAppointment.findMany({
    where: {
      doctorId: doctor.id,
      appointmentDate: { gte: monday, lt: nextMonday },
    },
    select: { appointmentDate: true, bookingType: true, collectionAmount: true, paymentAmount: true },
  });

  const byDay = new Map<string, WeekDayRow>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday.getTime() + i * DAY_MS);
    const date = isoDay(d);
    byDay.set(date, {
      date,
      total: 0,
      count: 0,
      online: { total: 0, count: 0 },
      offline: { total: 0, count: 0 },
    });
  }
  for (const r of rows) {
    const row = byDay.get(isoDay(r.appointmentDate));
    if (!row) continue;
    const amount = Number(r.collectionAmount ?? r.paymentAmount ?? 0) || 0;
    const channel = r.bookingType === 'ONLINE' ? row.online : row.offline;
    channel.total += amount;
    channel.count += 1;
    row.total += amount;
    row.count += 1;
  }

  const days = [...byDay.values()];
  const total = days.reduce((s, d) => s + d.total, 0);
  const count = days.reduce((s, d) => s + d.count, 0);
  const online = {
    total: days.reduce((s, d) => s + d.online.total, 0),
    count: days.reduce((s, d) => s + d.online.count, 0),
  };
  const offline = {
    total: days.reduce((s, d) => s + d.offline.total, 0),
    count: days.reduce((s, d) => s + d.offline.count, 0),
  };
  return {
    from: isoDay(monday),
    to: isoDay(new Date(nextMonday.getTime() - DAY_MS)),
    offset,
    days,
    total,
    count,
    online,
    offline,
  };
}

/** Per-day আদায় for one calendar month (that month's day 1 → last day). Doctor only. */
export async function getMonthDays(
  caller: CollectionCaller,
  opts: { year?: unknown; month?: unknown; doctorUsername?: string } = {},
): Promise<MonthDays> {
  if (caller.role === 'DOCTOR_STAFF') throw new Error('FORBIDDEN');
  const doctor = await resolveDoctor(caller, opts.doctorUsername);

  const now = new Date();
  let year = Number(opts.year);
  let month = Number(opts.month);
  if (!Number.isInteger(year) || year < 2000 || year > 2100) year = now.getFullYear();
  if (!Number.isInteger(month) || month < 1 || month > 12) month = now.getMonth() + 1;

  const gte = new Date(year, month - 1, 1);
  const lt = new Date(year, month, 1);
  const lastDay = new Date(year, month, 0).getDate();

  const rows = await prisma.servedAppointment.findMany({
    where: {
      doctorId: doctor.id,
      appointmentDate: { gte, lt },
    },
    select: { appointmentDate: true, bookingType: true, collectionAmount: true, paymentAmount: true },
  });

  const byDay = new Map<string, MonthDayRow>();
  for (let d = 1; d <= lastDay; d++) {
    const date = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    byDay.set(date, {
      date,
      total: 0,
      count: 0,
      online: { total: 0, count: 0 },
      offline: { total: 0, count: 0 },
    });
  }
  for (const r of rows) {
    const row = byDay.get(isoDay(r.appointmentDate));
    if (!row) continue;
    const amount = Number(r.collectionAmount ?? r.paymentAmount ?? 0) || 0;
    const channel = r.bookingType === 'ONLINE' ? row.online : row.offline;
    channel.total += amount;
    channel.count += 1;
    row.total += amount;
    row.count += 1;
  }

  const days = [...byDay.values()];
  const total = days.reduce((s, d) => s + d.total, 0);
  const count = days.reduce((s, d) => s + d.count, 0);
  const online = {
    total: days.reduce((s, d) => s + d.online.total, 0),
    count: days.reduce((s, d) => s + d.online.count, 0),
  };
  const offline = {
    total: days.reduce((s, d) => s + d.offline.total, 0),
    count: days.reduce((s, d) => s + d.offline.count, 0),
  };
  return { year, month, name: `${BN_MONTH[month - 1]} ${year}`, days, total, count, online, offline };
}
