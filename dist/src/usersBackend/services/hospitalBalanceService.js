// Hospital ONLINE-only balance ledger (low server usage by design).
//
// Rollover model — every 24h the finished day is frozen into the ledger:
// - OPENING row (kind OPENING): created once, holds ALL online served income
//   from before the ledger started (so years of served rows are scanned once,
//   never again).
// - DAILY rows (kind DAILY): one per finished calendar day (server-local
//   00:00–24:00), written lazily on the first balance request after midnight
//   (plus an explicit POST /hospital-balance/close a cron can hit at 00:05).
// - Today (unfinished day) is always computed live and IS part of the balance:
//     currentBalance = SUM(ledger.onlineTotal) + todayLiveOnline − SUM(payouts)
// - OFFLINE (desk cash) never enters this ledger — no all-time local balance
//   is kept. Cash still shows in the today/week/month served splits.
// - Payouts (super-admin → hospital) are the payment history and subtract
//   from the balance the moment they are created.
import { prisma } from '../../lib/prisma.js';
import { isAdminRole } from '../../authentication/middleware/authMiddleware.js';
const DAY_MS = 86400000;
/** Safety cap for catch-up closes in one request (normal case is 0–1 days). */
const MAX_CLOSE_PER_CALL = 370;
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
function startOfWeekMonday(now) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sinceMonday = (day.getDay() + 6) % 7;
    return new Date(day.getTime() - sinceMonday * DAY_MS);
}
function midnightOf(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function emptyRange() {
    return { total: 0, count: 0, online: { total: 0, count: 0 }, offline: { total: 0, count: 0 } };
}
/** Resolve which hospital this call scopes to (owner/staff = own, super-admin = explicit). */
async function resolveScope(caller, hospitalId) {
    if (isAdminRole(caller.role)) {
        const hid = hospitalId?.trim();
        if (!hid)
            throw new Error('HOSPITAL_REQUIRED');
        const hospital = await prisma.hospital.findUnique({
            where: { id: hid },
            select: { id: true, name: true, createdAt: true },
        });
        if (!hospital)
            throw new Error('HOSPITAL_NOT_FOUND');
        const doctorIds = await collectDoctorIds(hid);
        return { hospitalId: hospital.id, hospitalName: hospital.name, joinedAt: hospital.createdAt, doctorIds };
    }
    if (caller.role === 'HOSPITAL' || caller.role === 'HOSPITAL_STAFF') {
        const own = await prisma.user.findUnique({
            where: { id: caller.userId },
            select: { hospitalProfile: { select: { id: true, name: true, createdAt: true } }, staffHospitalId: true },
        });
        const hid = caller.role === 'HOSPITAL'
            ? own?.hospitalProfile?.id
            : own?.staffHospitalId;
        if (!hid)
            throw new Error('NO_HOSPITAL_PROFILE');
        const hospital = await prisma.hospital.findUnique({
            where: { id: hid },
            select: { id: true, name: true, createdAt: true },
        });
        if (!hospital)
            throw new Error('NO_HOSPITAL_PROFILE');
        const doctorIds = await collectDoctorIds(hid);
        return { hospitalId: hospital.id, hospitalName: hospital.name, joinedAt: hospital.createdAt, doctorIds };
    }
    throw new Error('FORBIDDEN');
}
/** Every doctor ever linked to this hospital (chambers + schedules). */
async function collectDoctorIds(hospitalId) {
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
    return [...ids];
}
/** Served-appointment scope covering new rows (hospitalId) + legacy rows (doctorIds). */
function servedWhere(scope, extra) {
    if (scope.doctorIds.length === 0)
        return { hospitalId: scope.hospitalId, ...extra };
    return {
        OR: [
            { hospitalId: scope.hospitalId, ...extra },
            { hospitalId: null, doctorId: { in: scope.doctorIds }, ...extra },
        ],
    };
}
async function onlineAggWhere(scope, gte, lt) {
    const where = servedWhere(scope, {
        bookingType: 'ONLINE',
        ...(gte || lt ? { appointmentDate: { ...(gte ? { gte } : {}), ...(lt ? { lt } : {}) } } : {}),
    });
    const [count, sum] = await Promise.all([
        prisma.servedAppointment.count({ where }),
        prisma.servedAppointment.aggregate({ where, _sum: { collectionAmount: true } }),
    ]);
    // collectionAmount holds the realized cash for offline rows; online rows
    // carry paymentAmount — fall back when collectionAmount is null.
    const [payFallback] = await Promise.all([
        prisma.servedAppointment.aggregate({
            where: { ...where, collectionAmount: null },
            _sum: { paymentAmount: true },
        }),
    ]);
    const num = (v) => Number(v ?? 0) || 0;
    return { total: num(sum._sum.collectionAmount) + num(payFallback._sum.paymentAmount), count };
}
/**
 * One SQL aggregate for a date range (today/week/month served splits,
 * ONLINE + OFFLINE). No appointment rows are ever transferred.
 */
async function rangeAgg(scope, gte, lt) {
    const bucket = emptyRange();
    const rows = await prisma.$queryRaw `
    SELECT "bookingType", COUNT(*)::int AS cnt,
           COALESCE(SUM(COALESCE("collectionAmount","paymentAmount",0)),0)::float AS total
    FROM "served_appointments"
    WHERE ("hospitalId" = ${scope.hospitalId}
        OR ("hospitalId" IS NULL AND "doctorId" = ANY(${scope.doctorIds})))
      AND "appointmentDate" >= ${gte} AND "appointmentDate" < ${lt}
    GROUP BY "bookingType"`;
    for (const r of rows) {
        const total = Number(r.total) || 0;
        const count = Number(r.cnt) || 0;
        if (r.bookingType === 'ONLINE') {
            bucket.online.total += total;
            bucket.online.count += count;
        }
        else {
            bucket.offline.total += total;
            bucket.offline.count += count;
        }
        bucket.total += total;
        bucket.count += count;
    }
    return bucket;
}
// ---------------------------------------------------------------------------
// Daily rollover: OPENING once + one DAILY row per finished day.
// ---------------------------------------------------------------------------
/** Create the OPENING row once (all online served before today). Idempotent. */
async function ensureOpening(scope, today) {
    const existing = await prisma.hospitalOnlineDay.count({ where: { hospitalId: scope.hospitalId } });
    if (existing > 0)
        return;
    const agg = await onlineAggWhere(scope, null, today);
    await prisma.hospitalOnlineDay.upsert({
        where: { hospitalId_date: { hospitalId: scope.hospitalId, date: midnightOf(scope.joinedAt) } },
        update: {},
        create: {
            hospitalId: scope.hospitalId,
            date: midnightOf(scope.joinedAt),
            kind: 'OPENING',
            onlineTotal: agg.total,
            onlineCount: agg.count,
        },
    });
}
/**
 * Freeze every finished day since the last ledger row (normally 0–1 days).
 * Returns how many DAILY rows were written. Idempotent (upsert per day).
 */
async function closeDueDays(scope, today) {
    await ensureOpening(scope, today);
    const last = await prisma.hospitalOnlineDay.findFirst({
        where: { hospitalId: scope.hospitalId },
        orderBy: { date: 'desc' },
        select: { date: true },
    });
    if (!last)
        return 0;
    // Days to close: (last.date, today) — last.date itself is already frozen.
    let cursor = new Date(last.date.getTime() + DAY_MS);
    cursor = midnightOf(cursor);
    let written = 0;
    while (cursor < today && written < MAX_CLOSE_PER_CALL) {
        const next = new Date(cursor.getTime() + DAY_MS);
        const agg = await onlineAggWhere(scope, cursor, next);
        await prisma.hospitalOnlineDay.upsert({
            where: { hospitalId_date: { hospitalId: scope.hospitalId, date: cursor } },
            update: { kind: 'DAILY', onlineTotal: agg.total, onlineCount: agg.count, closedAt: new Date() },
            create: {
                hospitalId: scope.hospitalId,
                date: cursor,
                kind: 'DAILY',
                onlineTotal: agg.total,
                onlineCount: agg.count,
            },
        });
        written += 1;
        cursor = next;
    }
    return written;
}
/** SUM over the small ledger table (never touches served_appointments). */
async function ledgerSums(hospitalId) {
    const agg = await prisma.hospitalOnlineDay.aggregate({
        where: { hospitalId },
        _sum: { onlineTotal: true, onlineCount: true },
    });
    const num = (v) => Number(v ?? 0) || 0;
    return { total: num(agg._sum.onlineTotal), count: Math.round(num(agg._sum.onlineCount)) };
}
/**
 * Single round-trip balance summary. Rolls over finished days first, then
 * serves everything from the small ledger + a few aggregates.
 */
export async function getHospitalBalanceSummary(caller, opts = {}) {
    const scope = await resolveScope(caller, opts.hospitalId);
    const today = startOfToday();
    const tomorrow = new Date(today.getTime() + DAY_MS);
    const monday = startOfWeekMonday(new Date());
    const nextMonday = new Date(monday.getTime() + 7 * DAY_MS);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    // Midnight rollover first (usually a no-op — 1 tiny lookup when idle).
    await closeDueDays(scope, today);
    const [todayB, weekB, monthB, ledger, todayLive, payoutAgg, payoutCount, recent, recentDays] = await Promise.all([
        rangeAgg(scope, today, tomorrow),
        rangeAgg(scope, monday, nextMonday),
        rangeAgg(scope, monthStart, nextMonthStart),
        ledgerSums(scope.hospitalId),
        onlineAggWhere(scope, today, tomorrow),
        prisma.hospitalPayout.aggregate({ where: { hospitalId: scope.hospitalId }, _sum: { amount: true } }),
        prisma.hospitalPayout.count({ where: { hospitalId: scope.hospitalId } }),
        prisma.hospitalPayout.findMany({
            where: { hospitalId: scope.hospitalId },
            orderBy: { paidAt: 'desc' },
            take: 5,
            select: { id: true, amount: true, method: true, note: true, paidByName: true, paidAt: true },
        }),
        prisma.hospitalOnlineDay.findMany({
            where: { hospitalId: scope.hospitalId },
            orderBy: { date: 'desc' },
            take: 7,
            select: { date: true, kind: true, onlineTotal: true, onlineCount: true },
        }),
    ]);
    const lastPaid = payoutCount > 0
        ? await prisma.hospitalPayout.findFirst({
            where: { hospitalId: scope.hospitalId },
            orderBy: { paidAt: 'desc' },
            select: { paidAt: true },
        })
        : null;
    const totalPaid = Number(payoutAgg._sum.amount ?? 0) || 0;
    const lifetimeTotal = (ledger.total || 0) + (todayLive.total || 0);
    const lifetimeCount = (ledger.count || 0) + (todayLive.count || 0);
    const monthIdx = today.getMonth();
    return {
        hospitalId: scope.hospitalId,
        hospitalName: scope.hospitalName,
        currentBalance: Math.max(0, lifetimeTotal - totalPaid),
        lifetimeOnline: {
            total: lifetimeTotal,
            count: lifetimeCount,
            joinedAt: isoDay(scope.joinedAt),
            doctorCount: scope.doctorIds.length,
        },
        today: { date: isoDay(today), ...todayB },
        week: { from: isoDay(monday), to: isoDay(new Date(nextMonday.getTime() - DAY_MS)), ...weekB },
        month: {
            year: today.getFullYear(),
            month: monthIdx + 1,
            name: `${BN_MONTH[monthIdx]} ${today.getFullYear()}`,
            from: isoDay(monthStart),
            to: isoDay(new Date(nextMonthStart.getTime() - DAY_MS)),
            ...monthB,
        },
        payout: {
            totalPaid,
            count: payoutCount,
            lastPaidAt: lastPaid ? lastPaid.paidAt.toISOString() : null,
        },
        recentDays: recentDays.map((d) => ({
            date: isoDay(d.date),
            kind: d.kind,
            onlineTotal: Number(d.onlineTotal) || 0,
            onlineCount: d.onlineCount || 0,
        })),
        recentPayouts: recent.map((p) => ({
            id: p.id,
            amount: Number(p.amount) || 0,
            method: p.method,
            note: p.note,
            paidByName: p.paidByName,
            paidAt: p.paidAt.toISOString(),
        })),
    };
}
/** Daily ledger history (frozen days, latest first) + all-time ledger total. */
export async function listOnlineDays(caller, opts = {}) {
    const scope = await resolveScope(caller, opts.hospitalId);
    await closeDueDays(scope, startOfToday());
    const page = Math.max(1, opts.page || 1);
    const limit = Math.min(62, Math.max(1, opts.limit || 14));
    const [total, rows, agg] = await Promise.all([
        prisma.hospitalOnlineDay.count({ where: { hospitalId: scope.hospitalId } }),
        prisma.hospitalOnlineDay.findMany({
            where: { hospitalId: scope.hospitalId },
            orderBy: { date: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            select: { date: true, kind: true, onlineTotal: true, onlineCount: true },
        }),
        prisma.hospitalOnlineDay.aggregate({ where: { hospitalId: scope.hospitalId }, _sum: { onlineTotal: true } }),
    ]);
    return {
        data: rows.map((d) => ({
            date: isoDay(d.date),
            kind: d.kind,
            onlineTotal: Number(d.onlineTotal) || 0,
            onlineCount: d.onlineCount || 0,
        })),
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        totalOnline: Number(agg._sum.onlineTotal ?? 0) || 0,
    };
}
/** Force-close finished days now (cron hits this at 00:05; otherwise lazy). */
export async function closeLedgerNow(caller, opts = {}) {
    const scope = await resolveScope(caller, opts.hospitalId);
    const closed = await closeDueDays(scope, startOfToday());
    return { closed };
}
/**
 * Ledger hook — called by the serve flow (completeConfirmed) AFTER the
 * served row is written. Keeps frozen DAILY rows exact when a serve lands
 * late (backdated appointmentDate): increments that date's ledger row
 * instead of rescanning served_appointments.
 * No-op for OFFLINE rows (cash never enters the online ledger).
 */
export async function recordOnlineServe(input) {
    if (input.bookingType !== 'ONLINE')
        return;
    const amount = Number(input.amount) || 0;
    const day = midnightOf(input.appointmentDate);
    // Today is always computed live and frozen later by the close-scan — only
    // already-frozen past days are incremented here (never double-counts).
    if (day >= startOfToday())
        return;
    let hospitalIds = [];
    if (input.hospitalId) {
        hospitalIds = [input.hospitalId];
    }
    else {
        // Private-chamber serve of a hospital-linked doctor — attribute to every
        // linked hospital (same scope the aggregate views use).
        const [chambers, schedules] = await Promise.all([
            prisma.chamber.findMany({ where: { doctorId: input.doctorId }, select: { hospitalId: true } }),
            prisma.doctorSchedule.findMany({ where: { doctorId: input.doctorId }, select: { hospitalId: true } }),
        ]);
        const ids = new Set();
        for (const c of chambers)
            if (c.hospitalId)
                ids.add(c.hospitalId);
        for (const s of schedules) {
            const hid = s.hospitalId;
            if (hid)
                ids.add(hid);
        }
        hospitalIds = [...ids];
    }
    if (hospitalIds.length === 0)
        return;
    await Promise.all(hospitalIds.map((hid) => prisma.hospitalOnlineDay.upsert({
        where: { hospitalId_date: { hospitalId: hid, date: day } },
        update: { onlineTotal: { increment: amount }, onlineCount: { increment: 1 }, closedAt: new Date() },
        create: { hospitalId: hid, date: day, kind: 'DAILY', onlineTotal: amount, onlineCount: 1 },
    })));
}
/** Payment history (super-admin → hospital transfers, latest first). */
export async function listHospitalPayouts(caller, opts = {}) {
    const scope = await resolveScope(caller, opts.hospitalId);
    const page = Math.max(1, opts.page || 1);
    const limit = Math.min(50, Math.max(1, opts.limit || 20));
    const [total, rows, agg] = await Promise.all([
        prisma.hospitalPayout.count({ where: { hospitalId: scope.hospitalId } }),
        prisma.hospitalPayout.findMany({
            where: { hospitalId: scope.hospitalId },
            orderBy: { paidAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            select: { id: true, amount: true, method: true, note: true, paidByName: true, paidAt: true },
        }),
        prisma.hospitalPayout.aggregate({ where: { hospitalId: scope.hospitalId }, _sum: { amount: true } }),
    ]);
    return {
        data: rows.map((p) => ({
            id: p.id,
            amount: Number(p.amount) || 0,
            method: p.method,
            note: p.note,
            paidByName: p.paidByName,
            paidAt: p.paidAt.toISOString(),
        })),
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        totalPaid: Number(agg._sum.amount ?? 0) || 0,
    };
}
/** Super-admin hospital picker: id + name only (one small query, limit 12). */
export async function searchHospitalsForPayout(caller, search) {
    if (!isAdminRole(caller.role))
        throw new Error('FORBIDDEN');
    const q = search?.trim();
    return prisma.hospital.findMany({
        where: q ? { name: { contains: q, mode: 'insensitive' } } : {},
        orderBy: { name: 'asc' },
        take: 12,
        select: { id: true, name: true, slug: true },
    });
}
/** Super-admin sends money to the hospital → currentBalance drops. */
export async function createHospitalPayout(caller, input) {
    if (!isAdminRole(caller.role))
        throw new Error('FORBIDDEN');
    const hid = input.hospitalId?.trim();
    if (!hid)
        throw new Error('HOSPITAL_REQUIRED');
    const hospital = await prisma.hospital.findUnique({ where: { id: hid }, select: { id: true } });
    if (!hospital)
        throw new Error('HOSPITAL_NOT_FOUND');
    const amount = typeof input.amount === 'string' && input.amount.trim() !== '' ? Number(input.amount) : input.amount;
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0 || amount > 100000000) {
        throw new Error('INVALID_AMOUNT');
    }
    const rounded = Math.round(amount * 100) / 100;
    const method = typeof input.method === 'string' && input.method.trim() ? input.method.trim().slice(0, 50) : null;
    const note = typeof input.note === 'string' && input.note.trim() ? input.note.trim().slice(0, 500) : null;
    const admin = await prisma.user.findUnique({
        where: { id: caller.userId },
        select: { name: true, email: true },
    });
    const paidByName = admin?.name?.trim() || admin?.email?.split('@')[0] || 'Super Admin';
    return prisma.hospitalPayout.create({
        data: {
            hospitalId: hid,
            amount: rounded,
            method,
            note,
            paidBy: caller.userId,
            paidByName,
        },
    });
}
//# sourceMappingURL=hospitalBalanceService.js.map