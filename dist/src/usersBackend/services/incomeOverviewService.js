// SUPER_ADMIN-only income overview across ALL doctors and hospitals.
// Source of truth is served_appointments (realized income):
// amount per row = (collectionAmount ?? paymentAmount).
// - scope=doctors   → one row per doctor (served rows with that doctorId)
// - scope=hospitals → one row per hospital (served rows with that hospitalId)
// - period=daily    → single anchor day (yyyy-mm-dd, default today)
// - period=weekly   → Mon–Sun week containing the anchor + per-day series
// - period=monthly  → calendar month of the anchor + per-day series
//
// Two-step query so large databases stay fast:
// 1) page the entities (search + take), 2) fetch only served rows in the
// range for those entity ids and aggregate in JS.
import { prisma } from '../../lib/prisma.js';
const DAY_MS = 86400000;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function isoDay(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function parseAnchor(value) {
    if (typeof value === 'string' && DATE_RE.test(value.trim())) {
        const [y, m, d] = value.trim().split('-').map(Number);
        const dt = new Date(y, m - 1, d);
        if (!Number.isNaN(dt.getTime()) && dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d) {
            return dt;
        }
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
function startOfWeekMonday(day) {
    const sinceMonday = (day.getDay() + 6) % 7;
    return new Date(day.getTime() - sinceMonday * DAY_MS);
}
export async function getIncomeOverview(opts) {
    const scope = opts.scope === 'hospitals' ? 'hospitals' : 'doctors';
    const period = opts.period === 'weekly' || opts.period === 'monthly' ? opts.period : 'daily';
    const anchor = parseAnchor(opts.anchor);
    const search = typeof opts.search === 'string' ? opts.search.trim().slice(0, 80) : '';
    let take = Number(opts.take);
    if (!Number.isInteger(take) || take < 1 || take > 200)
        take = 20;
    let gte;
    let lt;
    let label;
    if (period === 'weekly') {
        gte = startOfWeekMonday(anchor);
        lt = new Date(gte.getTime() + 7 * DAY_MS);
        label = `${isoDay(gte)} → ${isoDay(new Date(lt.getTime() - DAY_MS))}`;
    }
    else if (period === 'monthly') {
        gte = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
        lt = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1);
        label = `${gte.getFullYear()}-${String(gte.getMonth() + 1).padStart(2, '0')}`;
    }
    else {
        gte = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate());
        lt = new Date(gte.getTime() + DAY_MS);
        label = isoDay(gte);
    }
    let entities;
    if (scope === 'doctors') {
        const rows = await prisma.doctor.findMany({
            where: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
            select: { id: true, name: true, speciality: true },
            orderBy: { createdAt: 'asc' },
            take,
        });
        entities = rows.map((d) => ({ id: d.id, name: d.name, sub: d.speciality ?? null }));
    }
    else {
        const rows = await prisma.hospital.findMany({
            where: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
            select: { id: true, name: true, district: true },
            orderBy: { createdAt: 'asc' },
            take,
        });
        entities = rows.map((h) => ({ id: h.id, name: h.name, sub: h.district ?? null }));
    }
    const ids = new Set(entities.map((e) => e.id));
    // 2) Served rows in range for exactly these entities.
    const where = scope === 'doctors'
        ? { doctorId: { in: [...ids] }, appointmentDate: { gte, lt } }
        : { hospitalId: { in: [...ids] }, appointmentDate: { gte, lt } };
    const served = ids.size === 0
        ? []
        : await prisma.servedAppointment.findMany({
            where,
            select: {
                doctorId: true,
                hospitalId: true,
                appointmentDate: true,
                bookingType: true,
                collectionAmount: true,
                paymentAmount: true,
            },
        });
    const byEntity = new Map();
    for (const e of entities) {
        byEntity.set(e.id, {
            id: e.id, name: e.name, sub: e.sub,
            total: 0, count: 0, onlineTotal: 0, onlineCount: 0, offlineTotal: 0, offlineCount: 0,
        });
    }
    const byDay = new Map();
    for (const r of served) {
        const key = scope === 'doctors' ? r.doctorId : r.hospitalId;
        if (!key)
            continue;
        const row = byEntity.get(key);
        if (!row)
            continue;
        const amount = Number(r.collectionAmount ?? r.paymentAmount ?? 0) || 0;
        row.total += amount;
        row.count += 1;
        if (r.bookingType === 'ONLINE') {
            row.onlineTotal += amount;
            row.onlineCount += 1;
        }
        else {
            row.offlineTotal += amount;
            row.offlineCount += 1;
        }
        if (period !== 'daily') {
            const date = isoDay(r.appointmentDate);
            let point = byDay.get(date);
            if (!point) {
                point = { date, total: 0, count: 0 };
                byDay.set(date, point);
            }
            point.total += amount;
            point.count += 1;
        }
    }
    const rows = [...byEntity.values()].sort((a, b) => b.total - a.total || b.count - a.count);
    const total = rows.reduce((s, r) => s + r.total, 0);
    const count = rows.reduce((s, r) => s + r.count, 0);
    // Fill missing days with zeros so charts never have gaps.
    let days = null;
    if (period !== 'daily') {
        days = [];
        for (let t = gte.getTime(); t < lt.getTime(); t += DAY_MS) {
            const date = isoDay(new Date(t));
            days.push(byDay.get(date) ?? { date, total: 0, count: 0 });
        }
    }
    return {
        scope, period, label,
        from: isoDay(gte),
        to: isoDay(new Date(lt.getTime() - DAY_MS)),
        total, count,
        rows, days,
    };
}
//# sourceMappingURL=incomeOverviewService.js.map