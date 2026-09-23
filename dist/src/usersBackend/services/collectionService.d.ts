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
    week: {
        from: string;
        to: string;
    } & CollectionBucket;
    /** Calendar-month box. Doctor only (null for staff). */
    month: {
        year: number;
        month: number;
        name: string;
        from: string;
        to: string;
    } & CollectionBucket | null;
    /** Joining-date → now box. Doctor only (null for staff). */
    lifetime: {
        joinedAt: string;
    } & CollectionBucket | null;
    /** Explicit calendar day (served + confirmed) — hospital dashboard date picker. Null unless `date` is passed. */
    day: ({
        date: string;
    } & CollectionBucket) | null;
}
export declare function getCollectionSummary(caller: CollectionCaller, opts?: {
    doctorUsername?: string;
    doctorId?: string;
    date?: string;
}): Promise<CollectionSummary>;
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
export declare function getWeekDays(caller: CollectionCaller, opts?: {
    offset?: unknown;
    doctorUsername?: string;
    doctorId?: string;
}): Promise<WeekDays>;
/** Per-day আদায় for one calendar month (that month's day 1 → last day). */
export declare function getMonthDays(caller: CollectionCaller, opts?: {
    year?: unknown;
    month?: unknown;
    doctorUsername?: string;
    doctorId?: string;
}): Promise<MonthDays>;
export interface DoctorBreakdownRow {
    doctorId: string;
    doctorName: string;
    doctorSpeciality?: string | null;
    total: number;
    count: number;
    online: ChannelBucket;
    offline: ChannelBucket;
    servedCount: number;
    servedTotal: number;
    confirmedCount: number;
    confirmedTotal: number;
    confirmedOnline: ChannelBucket;
    confirmedOffline: ChannelBucket;
}
/**
 * Hospital owner: served + confirmed per-doctor breakdown for a range.
 * Served ledger is the income (collection), confirmed ledger is still-pending.
 * - date=yyyy-mm-dd → single day
 * - from/to=yyyy-mm-dd → explicit range (inclusive from, exclusive to+1)
 * - year+month → calendar month
 * Defaults to today when nothing is passed.
 */
export declare function getDoctorBreakdown(caller: CollectionCaller, opts?: {
    date?: string;
    from?: string;
    to?: string;
    year?: unknown;
    month?: unknown;
    doctorId?: string;
    doctorUsername?: string;
}): Promise<{
    from: string;
    to: string;
    doctors: DoctorBreakdownRow[];
    total: number;
    count: number;
}>;
export interface LifetimeBalance {
    joinedAt: string;
    doctorCount: number;
    total: number;
    count: number;
    online: ChannelBucket;
    offline: ChannelBucket;
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
export declare function getLifetimeBalance(caller: CollectionCaller): Promise<LifetimeBalance>;
//# sourceMappingURL=collectionService.d.ts.map