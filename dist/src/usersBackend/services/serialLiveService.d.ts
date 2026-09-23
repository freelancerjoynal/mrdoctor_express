import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
/** Punishment clock: a skipped serial returns to the board after 20 minutes. */
export declare const RECALL_COOLDOWN_MS: number;
/**
 * Presence window: while the dashboard is open with live ON it heartbeats
 * every 2 minutes (touching liveUpdatedAt). A live with no heartbeat, no
 * serve and no board action for this long is treated as abandoned (tab
 * closed, logged out, session dead) and stops itself — this is what keeps
 * overnight TVs and dead sessions from holding server resources.
 */
export declare const LIVE_STALE_MS: number;
/** Background sweep cadence (server.ts interval) for stale/empty lives. */
export declare const LIVE_SWEEP_MS: number;
export interface SerialLiveCaller {
    userId: string;
    role: UserRole;
}
export interface LiveEntry {
    serial: number;
    patientName: string;
    chamberName: string | null;
    /** ISO skip time — set for explicitly skipped ("not present") serials. */
    skippedAt?: string | null;
}
/**
 * Parse the skip map, dropping garbage and entries from previous days
 * (serials restart at 1 every morning, so stale keys must never match).
 */
export declare function parseSkipMap(raw: unknown): Record<string, string>;
export interface LiveBreak {
    reason: string;
    endsAt: Date | null;
}
export interface LiveSnapshot {
    live: boolean;
    current: LiveEntry | null;
    next: LiveEntry | null;
    upcoming: LiveEntry[];
    /** Unserved serials below the current one — marked "not present", asked to wait. */
    missed: LiveEntry[];
    waitingCount: number;
    totalToday: number;
    liveUpdatedAt: Date | null;
    /** Doctor break ("বিরতি") — reason + return time, shown on the board. */
    break: LiveBreak | null;
}
export declare function getSerialLiveStatus(caller: SerialLiveCaller): Promise<{
    live: boolean;
    current: LiveEntry | null;
    next: LiveEntry | null;
    upcoming: LiveEntry[];
    /** Unserved serials below the current one — marked "not present", asked to wait. */
    missed: LiveEntry[];
    waitingCount: number;
    totalToday: number;
    liveUpdatedAt: Date | null;
    /** Doctor break ("বিরতি") — reason + return time, shown on the board. */
    break: LiveBreak | null;
    doctorId: string;
}>;
export declare function startSerialLive(caller: SerialLiveCaller): Promise<{
    live: boolean;
    current: LiveEntry | null;
    next: LiveEntry | null;
    upcoming: LiveEntry[];
    /** Unserved serials below the current one — marked "not present", asked to wait. */
    missed: LiveEntry[];
    waitingCount: number;
    totalToday: number;
    liveUpdatedAt: Date | null;
    /** Doctor break ("বিরতি") — reason + return time, shown on the board. */
    break: LiveBreak | null;
    doctorId: string;
}>;
export declare function stopSerialLive(caller: SerialLiveCaller): Promise<{
    live: boolean;
    current: LiveEntry | null;
    next: LiveEntry | null;
    upcoming: LiveEntry[];
    /** Unserved serials below the current one — marked "not present", asked to wait. */
    missed: LiveEntry[];
    waitingCount: number;
    totalToday: number;
    liveUpdatedAt: Date | null;
    /** Doctor break ("বিরতি") — reason + return time, shown on the board. */
    break: LiveBreak | null;
    doctorId: string;
}>;
/**
 * Presence heartbeat — the dashboard calls this every ~2 minutes while the
 * live is ON. Refreshes liveUpdatedAt so an attended board never expires;
 * a closed tab / logout / dead session simply stops heartbeating and the
 * lazy + sweep checks turn the live off shortly after.
 * Never resurrects a finished/rolled-over day (hard stops still apply).
 */
export declare function heartbeatLive(caller: SerialLiveCaller): Promise<{
    live: boolean;
    current: LiveEntry | null;
    next: LiveEntry | null;
    upcoming: LiveEntry[];
    /** Unserved serials below the current one — marked "not present", asked to wait. */
    missed: LiveEntry[];
    waitingCount: number;
    totalToday: number;
    liveUpdatedAt: Date | null;
    /** Doctor break ("বিরতি") — reason + return time, shown on the board. */
    break: LiveBreak | null;
    doctorId: string;
}>;
/**
 * Stop every live owned by a user — called on logout so a doctor's (or
 * their staffer's) board never keeps streaming after the session ends.
 * Best-effort and never throws; logout must always succeed.
 */
export declare function stopLivesForUser(userId: string): Promise<void>;
/**
 * Stop the live when today's queue just became empty through a non-serve
 * path (e.g. deleting the last walk-in). Called best-effort after deletes.
 */
export declare function autoStopIfQueueEmpty(doctorId: string): Promise<void>;
/**
 * Background sweep (server interval): turns off lives nobody is attending
 * even when no request arrives to trigger the lazy checks — stale presence
 * (closed tab / logout without hitting the endpoint / dead session),
 * midnight rollover, and queues that drained to zero. Returns stop count.
 */
export declare function sweepStaleLives(): Promise<number>;
/**
 * Start a break ("বিরতি"): the public board shows the reason + return time,
 * and the TV stops repeating the next-person call until the break ends.
 * Minutes are clamped to 1–180.
 */
export declare function startLiveBreak(caller: SerialLiveCaller, reasonRaw: unknown, minutesRaw: unknown): Promise<{
    live: boolean;
    current: LiveEntry | null;
    next: LiveEntry | null;
    upcoming: LiveEntry[];
    /** Unserved serials below the current one — marked "not present", asked to wait. */
    missed: LiveEntry[];
    waitingCount: number;
    totalToday: number;
    liveUpdatedAt: Date | null;
    /** Doctor break ("বিরতি") — reason + return time, shown on the board. */
    break: LiveBreak | null;
    doctorId: string;
}>;
/** End the break early — the board and the repeating next-call resume. */
export declare function endLiveBreak(caller: SerialLiveCaller): Promise<{
    live: boolean;
    current: LiveEntry | null;
    next: LiveEntry | null;
    upcoming: LiveEntry[];
    /** Unserved serials below the current one — marked "not present", asked to wait. */
    missed: LiveEntry[];
    waitingCount: number;
    totalToday: number;
    liveUpdatedAt: Date | null;
    /** Doctor break ("বিরতি") — reason + return time, shown on the board. */
    break: LiveBreak | null;
    doctorId: string;
}>;
/**
 * Skip the current serial ("not present"): the board advances to the next
 * pending serial, and the skipped one drops into the `missed` list with a
 * skip timestamp (punishment clock — recall allowed only after 20 minutes).
 * The skipped booking stays in the queue — serving it later works normally,
 * and when everyone else is served it resurfaces as current on its own.
 */
export declare function skipCurrentSerial(caller: SerialLiveCaller): Promise<{
    live: boolean;
    current: LiveEntry | null;
    next: LiveEntry | null;
    upcoming: LiveEntry[];
    /** Unserved serials below the current one — marked "not present", asked to wait. */
    missed: LiveEntry[];
    waitingCount: number;
    totalToday: number;
    liveUpdatedAt: Date | null;
    /** Doctor break ("বিরতি") — reason + return time, shown on the board. */
    break: LiveBreak | null;
    doctorId: string;
    skipped: {
        skippedAt: string | null;
        serial: number;
        patientName: string;
        chamberName: string | null;
    };
}>;
/**
 * Recall a missed serial to the live board ("bring them on serial").
 * Punishment clock: an explicitly skipped serial returns only 20 minutes
 * after its skip. The serial must still be in today's unserved queue and
 * currently missed (below the board or in the skip map).
 */
export declare function recallSerial(caller: SerialLiveCaller, serialRaw: unknown): Promise<{
    live: boolean;
    current: LiveEntry | null;
    next: LiveEntry | null;
    upcoming: LiveEntry[];
    /** Unserved serials below the current one — marked "not present", asked to wait. */
    missed: LiveEntry[];
    waitingCount: number;
    totalToday: number;
    liveUpdatedAt: Date | null;
    /** Doctor break ("বিরতি") — reason + return time, shown on the board. */
    break: LiveBreak | null;
    doctorId: string;
    recalled: LiveEntry;
}>;
/**
 * Called (best-effort) after a serve: when the served serial was the live
 * current one, the next pending serial takes the board ("get in") and the
 * one after is flagged ready. When NOBODY is left, the live stops itself
 * (serialLive=false) so the board flips to "সম্প্রচার বন্ধ" instead of
 * glowing LIVE on an empty list. Never throws — serving must not fail.
 */
export declare function advanceSerialLiveAfterServe(doctorId: string, servedSerial: number): Promise<void>;
//# sourceMappingURL=serialLiveService.d.ts.map