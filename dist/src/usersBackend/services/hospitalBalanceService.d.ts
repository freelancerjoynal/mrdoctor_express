import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface BalanceCaller {
    userId: string;
    role: UserRole;
}
export interface ChannelBucket {
    total: number;
    count: number;
}
export interface RangeBucket extends ChannelBucket {
    online: ChannelBucket;
    offline: ChannelBucket;
}
export interface PayoutRow {
    id: string;
    amount: number;
    method: string | null;
    note: string | null;
    paidByName: string | null;
    paidAt: string;
}
export interface LedgerDayRow {
    date: string;
    kind: string;
    onlineTotal: number;
    onlineCount: number;
}
export interface HospitalBalanceSummary {
    hospitalId: string;
    hospitalName: string;
    /** Withdrawable online balance = ledger + today live − payouts. */
    currentBalance: number;
    /** All-time ONLINE served (ledger + today live). No offline lifetime. */
    lifetimeOnline: {
        total: number;
        count: number;
        joinedAt: string;
        doctorCount: number;
    };
    /** Today's served split — today's ONLINE is already counted in the balance. */
    today: {
        date: string;
    } & RangeBucket;
    week: {
        from: string;
        to: string;
    } & RangeBucket;
    month: {
        year: number;
        month: number;
        name: string;
        from: string;
        to: string;
    } & RangeBucket;
    payout: {
        totalPaid: number;
        count: number;
        lastPaidAt: string | null;
    };
    /** Latest frozen days (ledger preview). */
    recentDays: LedgerDayRow[];
    recentPayouts: PayoutRow[];
}
/**
 * Single round-trip balance summary. Rolls over finished days first, then
 * serves everything from the small ledger + a few aggregates.
 */
export declare function getHospitalBalanceSummary(caller: BalanceCaller, opts?: {
    hospitalId?: string;
}): Promise<HospitalBalanceSummary>;
export interface DayList {
    data: LedgerDayRow[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    totalOnline: number;
}
/** Daily ledger history (frozen days, latest first) + all-time ledger total. */
export declare function listOnlineDays(caller: BalanceCaller, opts?: {
    hospitalId?: string;
    page?: number;
    limit?: number;
}): Promise<DayList>;
/** Force-close finished days now (cron hits this at 00:05; otherwise lazy). */
export declare function closeLedgerNow(caller: BalanceCaller, opts?: {
    hospitalId?: string;
}): Promise<{
    closed: number;
}>;
/**
 * Ledger hook — called by the serve flow (completeConfirmed) AFTER the
 * served row is written. Keeps frozen DAILY rows exact when a serve lands
 * late (backdated appointmentDate): increments that date's ledger row
 * instead of rescanning served_appointments.
 * No-op for OFFLINE rows (cash never enters the online ledger).
 */
export declare function recordOnlineServe(input: {
    hospitalId: string | null;
    doctorId: string;
    appointmentDate: Date;
    bookingType: string;
    amount: number;
}): Promise<void>;
export interface PayoutList {
    data: PayoutRow[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    totalPaid: number;
}
/** Payment history (super-admin → hospital transfers, latest first). */
export declare function listHospitalPayouts(caller: BalanceCaller, opts?: {
    hospitalId?: string;
    page?: number;
    limit?: number;
}): Promise<PayoutList>;
/** Super-admin hospital picker: id + name only (one small query, limit 12). */
export declare function searchHospitalsForPayout(caller: BalanceCaller, search?: string): Promise<{
    name: string;
    id: string;
    slug: string;
}[]>;
/** Super-admin sends money to the hospital → currentBalance drops. */
export declare function createHospitalPayout(caller: BalanceCaller, input: {
    hospitalId?: string;
    amount?: unknown;
    method?: unknown;
    note?: unknown;
}): Promise<{
    id: string;
    createdAt: Date;
    amount: number;
    note: string | null;
    hospitalId: string;
    paidAt: Date;
    method: string | null;
    paidBy: string;
    paidByName: string | null;
}>;
//# sourceMappingURL=hospitalBalanceService.d.ts.map