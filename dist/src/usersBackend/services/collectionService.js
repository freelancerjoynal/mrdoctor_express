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
import { isAdminRole } from '../../authentication/middleware/authMiddleware.js';
const DAY_MS = 86400000;
const BN_MONTH = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
];
function isoDay(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function startOfToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
/** Monday 00:00 starting the week that contains `now` (server-local days). */
function startOfWeekMonday(now) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sinceMonday = (day.getDay() + 6) % 7;
    return new Date(day.getTime() - sinceMonday * DAY_MS);
}
/** Resolve the doctor behind this call plus their joining date. */
async function resolveDoctor(caller, doctorUsername, doctorId) {
    if (isAdminRole(caller.role)) {
        if (!doctorUsername?.trim())
            throw new Error('DOCTOR_REQUIRED');
        const doctor = await prisma.doctor.findFirst({
            where: { username: doctorUsername.trim() },
            select: { id: true, createdAt: true },
        });
        if (!doctor)
            throw new Error('DOCTOR_NOT_FOUND');
        return { id: doctor.id, joinedAt: doctor.createdAt };
    }
    if (caller.role === 'DOCTOR') {
        const own = await prisma.user.findUnique({
            where: { id: caller.userId },
            select: { doctorProfile: { select: { id: true } } },
        });
        const doctorId = own?.doctorProfile?.id;
        if (!doctorId)
            throw new Error('NO_DOCTOR_PROFILE');
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId },
            select: { id: true, createdAt: true },
        });
        if (!doctor)
            throw new Error('NO_DOCTOR_PROFILE');
        return { id: doctor.id, joinedAt: doctor.createdAt };
    }
    if (caller.role === 'DOCTOR_STAFF') {
        const own = await prisma.user.findUnique({
            where: { id: caller.userId },
            select: { staffDoctorId: true },
        });
        const doctorId = own?.staffDoctorId;
        if (!doctorId)
            throw new Error('NO_DOCTOR_PROFILE');
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId },
            select: { id: true, createdAt: true },
        });
        if (!doctor)
            throw new Error('NO_DOCTOR_PROFILE');
        return { id: doctor.id, joinedAt: doctor.createdAt };
    }
    if (caller.role === 'HOSPITAL' || caller.role === 'HOSPITAL_STAFF') {
        // Hospital desk has no single doctor — collection boxes aggregate every
        // doctor of the hospital (chambers + schedules). The hospital itself is
        // the scope, so joinedAt falls back to the hospital's creation date.
        const own = await prisma.user.findUnique({
            where: { id: caller.userId },
            select: { hospitalProfile: { select: { id: true, createdAt: true } }, staffHospitalId: true },
        });
        const hospitalId = caller.role === 'HOSPITAL'
            ? own?.hospitalProfile?.id
            : own?.staffHospitalId;
        if (!hospitalId)
            throw new Error('NO_HOSPITAL_PROFILE');
        const [hospital, chambers, schedules] = await Promise.all([
            prisma.hospital.findUnique({ where: { id: hospitalId }, select: { createdAt: true } }),
            prisma.chamber.findMany({ where: { hospitalId }, select: { doctorId: true } }),
            prisma.doctorSchedule.findMany({ where: { hospitalId }, select: { doctorId: true } }),
        ]);
        if (!hospital)
            throw new Error('NO_HOSPITAL_PROFILE');
        const ids = new Set();
        for (const c of chambers)
            if (c.doctorId)
                ids.add(c.doctorId);
        for (const s of schedules)
            if (s.doctorId) {
                ids.add(s.doctorId);
            }
        // Single-doctor view (hospital dropdown): validate membership, then narrow.
        const narrow = doctorId?.trim();
        if (narrow) {
            if (!ids.has(narrow)) {
                const doctor = await prisma.doctor.findUnique({ where: { id: narrow }, select: { id: true, createdAt: true } });
                if (!doctor)
                    throw new Error('DOCTOR_NOT_FOUND');
                throw new Error('DOCTOR_NOT_IN_HOSPITAL');
            }
            const one = await prisma.doctor.findUnique({ where: { id: narrow }, select: { id: true, createdAt: true } });
            return { id: narrow, joinedAt: one?.createdAt ?? hospital.createdAt };
        }
        // No doctors yet — return an empty scope (all boxes zero, never 404).
        const first = [...ids][0];
        if (!first)
            return { id: '__none__', joinedAt: hospital.createdAt };
        // Multi-doctor scope is encoded as a sentinel the bucket reader expands.
        // Single-doctor hospitals keep the fast path.
        if (ids.size === 1)
            return { id: first, joinedAt: hospital.createdAt };
        return { id: `hospital:${hospitalId}`, joinedAt: hospital.createdAt };
    }
    throw new Error('FORBIDDEN');
}
/** Merge one range: ONLINE + OFFLINE channels, from either ledger.
 * doctorId may be a `hospital:<id>` sentinel (multi-doctor hospital scope)
 * or `__none__` (hospital without doctors yet → zero box). */
async function rangeBucket(doctorId, source, gte, lt) {
    const dateFilter = gte || lt ? { appointmentDate: { ...(gte ? { gte } : {}), ...(lt ? { lt } : {}) } } : {};
    const model = source === 'served' ? prisma.servedAppointment : prisma.confirmedAppointment;
    let doctorFilter;
    if (doctorId === '__none__') {
        return { total: 0, count: 0, online: { total: 0, count: 0 }, offline: { total: 0, count: 0 } };
    }
    else if (doctorId.startsWith('hospital:')) {
        const hospitalId = doctorId.slice('hospital:'.length);
        const [chambers, schedules] = await Promise.all([
            prisma.chamber.findMany({ where: { hospitalId }, select: { doctorId: true } }),
            prisma.doctorSchedule.findMany({ where: { hospitalId }, select: { doctorId: true } }),
        ]);
        const ids = new Set();
        for (const c of chambers)
            if (c.doctorId)
                ids.add(c.doctorId);
        for (const s of schedules)
            if (s.doctorId) {
                ids.add(s.doctorId);
            }
        if (ids.size === 0) {
            return { total: 0, count: 0, online: { total: 0, count: 0 }, offline: { total: 0, count: 0 } };
        }
        doctorFilter = { doctorId: { in: [...ids] } };
    }
    else {
        doctorFilter = { doctorId };
    }
    const rows = await model.findMany({
        where: { ...doctorFilter, ...dateFilter },
        select: { bookingType: true, collectionAmount: true, paymentAmount: true },
    });
    const bucket = (type) => {
        let total = 0;
        let count = 0;
        for (const r of rows) {
            if (r.bookingType !== type)
                continue;
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
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
/** Parse an explicit calendar day (yyyy-mm-dd). Null when missing/invalid. */
function parseDay(value) {
    if (typeof value !== 'string' || !DATE_RE.test(value.trim()))
        return null;
    const [y, m, d] = value.trim().split('-').map(Number);
    if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d))
        return null;
    if (y < 2000 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31)
        return null;
    const dt = new Date(y, m - 1, d);
    if (Number.isNaN(dt.getTime()))
        return null;
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d)
        return null;
    return dt;
}
function combineBuckets(a, b) {
    return {
        total: a.total + b.total,
        count: a.count + b.count,
        online: { total: a.online.total + b.online.total, count: a.online.count + b.online.count },
        offline: { total: a.offline.total + b.offline.total, count: a.offline.count + b.offline.count },
    };
}
export async function getCollectionSummary(caller, opts = {}) {
    const doctor = await resolveDoctor(caller, opts.doctorUsername, opts.doctorId);
    const today = startOfToday();
    const tomorrow = new Date(today.getTime() + DAY_MS);
    const dayAfter = new Date(today.getTime() + 2 * DAY_MS);
    const monday = startOfWeekMonday(new Date());
    const nextMonday = new Date(monday.getTime() + 7 * DAY_MS);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    // Explicit calendar day (hospital dashboard date picker).
    const picked = parseDay(opts.date);
    const pickedNext = picked ? new Date(picked.getTime() + DAY_MS) : null;
    const [todayServed, todayConfirmed, tomorrowServed, tomorrowConfirmed, weekBox, monthBox, lifetimeBox, dayServed, dayConfirmed] = await Promise.all([
        rangeBucket(doctor.id, 'served', today, tomorrow),
        rangeBucket(doctor.id, 'confirmed', today, tomorrow),
        rangeBucket(doctor.id, 'served', tomorrow, dayAfter),
        rangeBucket(doctor.id, 'confirmed', tomorrow, dayAfter),
        rangeBucket(doctor.id, 'served', monday, nextMonday),
        caller.role === 'DOCTOR_STAFF' || caller.role === 'HOSPITAL_STAFF'
            ? Promise.resolve(null)
            : rangeBucket(doctor.id, 'served', monthStart, nextMonthStart),
        caller.role === 'DOCTOR_STAFF' || caller.role === 'HOSPITAL_STAFF'
            ? Promise.resolve(null)
            : rangeBucket(doctor.id, 'served'),
        picked && pickedNext ? rangeBucket(doctor.id, 'served', picked, pickedNext) : Promise.resolve(null),
        picked && pickedNext ? rangeBucket(doctor.id, 'confirmed', picked, pickedNext) : Promise.resolve(null),
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
        day: picked && dayServed && dayConfirmed ? { date: isoDay(picked), ...combineBuckets(dayServed, dayConfirmed) } : null,
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
/**
 * Expand a resolved doctor scope into a prisma doctor filter.
 * - `__none__` → null (hospital without doctors → zero boxes, never 404)
 * - `hospital:<id>` → { doctorId: { in: [...] } } via chambers + schedules
 * - single id → { doctorId }
 */
async function expandDoctorFilter(resolvedId) {
    if (resolvedId === '__none__')
        return null;
    if (!resolvedId.startsWith('hospital:'))
        return { doctorId: resolvedId };
    const hospitalId = resolvedId.slice('hospital:'.length);
    const [chambers, schedules] = await Promise.all([
        prisma.chamber.findMany({ where: { hospitalId }, select: { doctorId: true } }),
        prisma.doctorSchedule.findMany({ where: { hospitalId }, select: { doctorId: true } }),
    ]);
    const ids = new Set();
    for (const c of chambers)
        if (c.doctorId)
            ids.add(c.doctorId);
    for (const s of schedules) {
        const did = s.doctorId;
        if (did)
            ids.add(did);
    }
    if (ids.size === 0)
        return null;
    return { doctorId: { in: [...ids] } };
}
function weekEmptyDays(monday) {
    const out = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday.getTime() + i * DAY_MS);
        const date = isoDay(d);
        out.push({ date, total: 0, count: 0, online: { total: 0, count: 0 }, offline: { total: 0, count: 0 } });
    }
    return out;
}
/** Per-day আদায় for one Mon–Sun week (served ledger). offset=0 → current week, -1 → last week. */
export async function getWeekDays(caller, opts = {}) {
    const doctor = await resolveDoctor(caller, opts.doctorUsername, opts.doctorId);
    let offset = Number(opts.offset);
    if (!Number.isInteger(offset) || offset < -52 || offset > 1)
        offset = 0;
    const monday = new Date(startOfWeekMonday(new Date()).getTime() + offset * 7 * DAY_MS);
    const nextMonday = new Date(monday.getTime() + 7 * DAY_MS);
    const doctorFilter = await expandDoctorFilter(doctor.id);
    if (doctorFilter === null) {
        const emptyDays = weekEmptyDays(monday);
        return {
            from: isoDay(monday),
            to: isoDay(new Date(nextMonday.getTime() - DAY_MS)),
            offset,
            days: emptyDays,
            total: 0,
            count: 0,
            online: { total: 0, count: 0 },
            offline: { total: 0, count: 0 },
        };
    }
    const rows = await prisma.servedAppointment.findMany({
        where: {
            ...doctorFilter,
            appointmentDate: { gte: monday, lt: nextMonday },
        },
        select: { appointmentDate: true, bookingType: true, collectionAmount: true, paymentAmount: true },
    });
    const byDay = new Map();
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
        if (!row)
            continue;
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
/** Per-day আদায় for one calendar month (that month's day 1 → last day). */
export async function getMonthDays(caller, opts = {}) {
    if (caller.role === 'DOCTOR_STAFF' || caller.role === 'HOSPITAL_STAFF')
        throw new Error('FORBIDDEN');
    const doctor = await resolveDoctor(caller, opts.doctorUsername, opts.doctorId);
    const now = new Date();
    let year = Number(opts.year);
    let month = Number(opts.month);
    if (!Number.isInteger(year) || year < 2000 || year > 2100)
        year = now.getFullYear();
    if (!Number.isInteger(month) || month < 1 || month > 12)
        month = now.getMonth() + 1;
    const gte = new Date(year, month - 1, 1);
    const lt = new Date(year, month, 1);
    const lastDay = new Date(year, month, 0).getDate();
    const doctorFilter = await expandDoctorFilter(doctor.id);
    const byDay = new Map();
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
    if (doctorFilter === null) {
        return { year, month, name: `${BN_MONTH[month - 1]} ${year}`, days: [...byDay.values()], total: 0, count: 0, online: { total: 0, count: 0 }, offline: { total: 0, count: 0 } };
    }
    const rows = await prisma.servedAppointment.findMany({
        where: {
            ...doctorFilter,
            appointmentDate: { gte, lt },
        },
        select: { appointmentDate: true, bookingType: true, collectionAmount: true, paymentAmount: true },
    });
    for (const r of rows) {
        const row = byDay.get(isoDay(r.appointmentDate));
        if (!row)
            continue;
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
/**
 * Hospital owner: served + confirmed per-doctor breakdown for a range.
 * Served ledger is the income (collection), confirmed ledger is still-pending.
 * - date=yyyy-mm-dd → single day
 * - from/to=yyyy-mm-dd → explicit range (inclusive from, exclusive to+1)
 * - year+month → calendar month
 * Defaults to today when nothing is passed.
 */
export async function getDoctorBreakdown(caller, opts = {}) {
    const doctor = await resolveDoctor(caller, opts.doctorUsername, opts.doctorId);
    const doctorFilter = await expandDoctorFilter(doctor.id);
    let gte;
    let lt;
    const picked = parseDay(opts.date);
    if (picked) {
        gte = picked;
        lt = new Date(picked.getTime() + DAY_MS);
    }
    else if (opts.from || opts.to) {
        const f = parseDay(opts.from) ?? startOfToday();
        const tRaw = parseDay(opts.to);
        const t = tRaw ? new Date(tRaw.getTime() + DAY_MS) : new Date(f.getTime() + DAY_MS);
        gte = f;
        lt = t > f ? t : new Date(f.getTime() + DAY_MS);
    }
    else if (opts.year !== undefined || opts.month !== undefined) {
        const now = new Date();
        let year = Number(opts.year);
        let month = Number(opts.month);
        if (!Number.isInteger(year) || year < 2000 || year > 2100)
            year = now.getFullYear();
        if (!Number.isInteger(month) || month < 1 || month > 12)
            month = now.getMonth() + 1;
        gte = new Date(year, month - 1, 1);
        lt = new Date(year, month, 1);
    }
    else {
        gte = startOfToday();
        lt = new Date(gte.getTime() + DAY_MS);
    }
    if (doctorFilter === null) {
        return { from: isoDay(gte), to: isoDay(new Date(lt.getTime() - DAY_MS)), doctors: [], total: 0, count: 0 };
    }
    const [served, confirmed] = await Promise.all([
        prisma.servedAppointment.findMany({
            where: { ...doctorFilter, appointmentDate: { gte, lt } },
            select: { doctorId: true, doctorName: true, bookingType: true, collectionAmount: true, paymentAmount: true },
        }),
        prisma.confirmedAppointment.findMany({
            where: { ...doctorFilter, appointmentDate: { gte, lt } },
            select: { doctorId: true, doctorName: true, bookingType: true, collectionAmount: true, paymentAmount: true },
        }),
    ]);
    const map = new Map();
    const touch = (doctorId, doctorName) => {
        let b = map.get(doctorId);
        if (!b) {
            b = {
                doctorId,
                doctorName: doctorName?.trim() || 'ডাক্তার',
                doctorSpeciality: null,
                total: 0,
                count: 0,
                online: { total: 0, count: 0 },
                offline: { total: 0, count: 0 },
                servedCount: 0,
                servedTotal: 0,
                confirmedCount: 0,
                confirmedTotal: 0,
                confirmedOnline: { total: 0, count: 0 },
                confirmedOffline: { total: 0, count: 0 },
            };
            map.set(doctorId, b);
        }
        else if ((!b.doctorName || b.doctorName === 'ডাক্তার') && doctorName?.trim()) {
            b.doctorName = doctorName.trim();
        }
        return b;
    };
    for (const r of served) {
        const b = touch(r.doctorId, r.doctorName);
        const amount = Number(r.collectionAmount ?? r.paymentAmount ?? 0) || 0;
        const ch = r.bookingType === 'ONLINE' ? b.online : b.offline;
        ch.total += amount;
        ch.count += 1;
        b.total += amount;
        b.count += 1;
        b.servedCount += 1;
        b.servedTotal += amount;
    }
    for (const r of confirmed) {
        const b = touch(r.doctorId, r.doctorName);
        const amount = Number(r.collectionAmount ?? r.paymentAmount ?? 0) || 0;
        const ch = r.bookingType === 'ONLINE' ? b.confirmedOnline : b.confirmedOffline;
        ch.total += amount;
        ch.count += 1;
        b.confirmedCount += 1;
        b.confirmedTotal += amount;
    }
    // Backfill speciality + fresh names from doctors table.
    const ids = [...map.keys()];
    if (ids.length > 0) {
        const docs = await prisma.doctor.findMany({
            where: { id: { in: ids } },
            select: { id: true, name: true, speciality: true },
        });
        for (const d of docs) {
            const b = map.get(d.id);
            if (b) {
                if (d.name?.trim())
                    b.doctorName = d.name.trim();
                b.doctorSpeciality = d.speciality ?? null;
            }
        }
    }
    const doctors = [...map.values()].sort((a, b) => b.servedTotal - a.servedTotal || b.servedCount - a.servedCount);
    const total = doctors.reduce((s, d) => s + d.servedTotal, 0);
    const count = doctors.reduce((s, d) => s + d.servedCount, 0);
    return { from: isoDay(gte), to: isoDay(new Date(lt.getTime() - DAY_MS)), doctors, total, count };
}
function zeroLifetime(joinedAt) {
    return {
        joinedAt,
        doctorCount: 0,
        total: 0,
        count: 0,
        online: { total: 0, count: 0 },
        offline: { total: 0, count: 0 },
    };
}
/**
 * Hospital owner only: all-time realized balance from served_appointments.
 * Split by booking channel — ONLINE (gateway-paid) vs OFFLINE (desk cash).
 * Amount per row = (collectionAmount ?? paymentAmount).
 *
 * On-demand only (header button): uses SQL-side SUM/COUNT aggregates so no
 * appointment rows are transferred — safe for hospitals with years of data.
 * Never called on page load; the header button fetches it on first click.
 */
export async function getLifetimeBalance(caller) {
    if (caller.role !== 'HOSPITAL')
        throw new Error('FORBIDDEN');
    const own = await prisma.user.findUnique({
        where: { id: caller.userId },
        select: { hospitalProfile: { select: { id: true, createdAt: true } } },
    });
    const hospitalId = own
        ?.hospitalProfile?.id;
    if (!hospitalId)
        throw new Error('NO_HOSPITAL_PROFILE');
    const [hospital, chambers, schedules] = await Promise.all([
        prisma.hospital.findUnique({ where: { id: hospitalId }, select: { createdAt: true } }),
        prisma.chamber.findMany({ where: { hospitalId }, select: { doctorId: true } }),
        prisma.doctorSchedule.findMany({ where: { hospitalId }, select: { doctorId: true } }),
    ]);
    if (!hospital)
        throw new Error('NO_HOSPITAL_PROFILE');
    const ids = new Set();
    for (const c of chambers)
        if (c.doctorId)
            ids.add(c.doctorId);
    for (const s of schedules) {
        const did = s.doctorId;
        if (did)
            ids.add(did);
    }
    const joinedAt = isoDay(hospital.createdAt);
    if (ids.size === 0)
        return zeroLifetime(joinedAt);
    const inIds = [...ids];
    const all = { doctorId: { in: inIds } };
    const on = { ...all, bookingType: 'ONLINE' };
    const off = { ...all, bookingType: 'OFFLINE' };
    const [countAll, sumCollAll, sumPayFallbackAll, countOn, sumCollOn, sumPayFallbackOn, countOff, sumCollOff, sumPayFallbackOff,] = await Promise.all([
        prisma.servedAppointment.count({ where: all }),
        prisma.servedAppointment.aggregate({ where: all, _sum: { collectionAmount: true } }),
        prisma.servedAppointment.aggregate({
            where: { ...all, collectionAmount: null },
            _sum: { paymentAmount: true },
        }),
        prisma.servedAppointment.count({ where: on }),
        prisma.servedAppointment.aggregate({ where: on, _sum: { collectionAmount: true } }),
        prisma.servedAppointment.aggregate({
            where: { ...on, collectionAmount: null },
            _sum: { paymentAmount: true },
        }),
        prisma.servedAppointment.count({ where: off }),
        prisma.servedAppointment.aggregate({ where: off, _sum: { collectionAmount: true } }),
        prisma.servedAppointment.aggregate({
            where: { ...off, collectionAmount: null },
            _sum: { paymentAmount: true },
        }),
    ]);
    const num = (v) => Number(v ?? 0) || 0;
    const onlineTotal = num(sumCollOn._sum.collectionAmount) + num(sumPayFallbackOn._sum.paymentAmount);
    const offlineTotal = num(sumCollOff._sum.collectionAmount) + num(sumPayFallbackOff._sum.paymentAmount);
    return {
        joinedAt,
        doctorCount: ids.size,
        total: num(sumCollAll._sum.collectionAmount) + num(sumPayFallbackAll._sum.paymentAmount),
        count: countAll,
        online: { total: onlineTotal, count: countOn },
        offline: { total: offlineTotal, count: countOff },
    };
}
//# sourceMappingURL=collectionService.js.map