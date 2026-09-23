// Live serial scoreboard ("doctor-serial-live").
// Doctor + staff start/stop it from the dashboard; the public board shows the
// current serial (get in), the next one (be ready) and the waiting count —
// like a live score telecast. Advancing piggybacks on serve (সেবা সম্পন্ন).
// Skipping ("not present") drops a serial into the missed list with a skip
// timestamp; recalling it to the board is allowed only 20 minutes later
// (punishment clock, stored in doctors.liveSkippedAt as { "<serial>": "<ISO>" }).
import { prisma } from '../../lib/prisma.js';
import { Prisma } from '../../../generated/prisma/client.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
import { notifyLive } from '../../realtime/notify.js';

/** Punishment clock: a skipped serial returns to the board after 20 minutes. */
export const RECALL_COOLDOWN_MS = 20 * 60 * 1000;

/**
 * Presence window: while the dashboard is open with live ON it heartbeats
 * every 2 minutes (touching liveUpdatedAt). A live with no heartbeat, no
 * serve and no board action for this long is treated as abandoned (tab
 * closed, logged out, session dead) and stops itself — this is what keeps
 * overnight TVs and dead sessions from holding server resources.
 */
export const LIVE_STALE_MS = 15 * 60 * 1000;
/** Background sweep cadence (server.ts interval) for stale/empty lives. */
export const LIVE_SWEEP_MS = 5 * 60 * 1000;

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
export function parseSkipMap(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const now = new Date();
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!/^\d+$/.test(k) || typeof v !== 'string') continue;
    const t = new Date(v);
    if (Number.isNaN(t.getTime())) continue;
    if (t.getFullYear() !== now.getFullYear() || t.getMonth() !== now.getMonth() || t.getDate() !== now.getDate())
      continue;
    out[k] = v;
  }
  return out;
}

function todayBounds(): { gte: Date; lt: Date } {
  const now = new Date();
  const gte = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return { gte, lt: new Date(gte.getTime() + 86400000) };
}

function isSameLocalDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function asDate(v: Date | string | null | undefined): Date | null {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** True when the live has seen no presence (heartbeat/serve/action) within the window. */
function isLiveStale(liveUpdatedAt: Date | string | null | undefined): boolean {
  const d = asDate(liveUpdatedAt);
  if (!d) return true;
  return Date.now() - d.getTime() > LIVE_STALE_MS;
}

/**
 * Hard stop reasons — apply even when the dashboard is actively
 * heartbeating (a finished day must end even with the tab open).
 * Returns the reason or null when the live may continue.
 */
function hardStopReason(queueLength: number, liveUpdatedAt: Date | null): string | null {
  if (queueLength === 0) return 'queue-empty';
  if (liveUpdatedAt && !isSameLocalDay(liveUpdatedAt, new Date())) return 'date-rollover';
  return null;
}

/** Force a doctor's live OFF (best-effort notify so TVs/dashboards flip). */
async function autoStopLive(doctorId: string, reason: string): Promise<void> {
  await prisma.doctor.update({
    where: { id: doctorId },
    data: {
      serialLive: false,
      liveCurrentSerial: null,
      liveUpdatedAt: new Date(),
      liveSkippedAt: Prisma.DbNull,
      liveBreakReason: null,
      liveBreakUntil: null,
    },
  });
  notifyLive(doctorId);
  console.log(`[SerialLive] auto-stop doctor=${doctorId} reason=${reason}`);
}

async function resolveOwnDoctorId(caller: SerialLiveCaller): Promise<string> {
  if (caller.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true } } },
    });
    const id = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    if (!id) throw new Error('NO_DOCTOR_PROFILE');
    return id;
  }
  if (caller.role === 'DOCTOR_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffDoctor: { select: { id: true } } },
    });
    const id = (own as { staffDoctor?: { id: string } | null } | null)?.staffDoctor?.id;
    if (!id) throw new Error('NO_DOCTOR_PROFILE');
    return id;
  }
  throw new Error('FORBIDDEN');
}

async function todayQueue(doctorId: string): Promise<LiveEntry[]> {
  const { gte, lt } = todayBounds();
  const rows = await prisma.confirmedAppointment.findMany({
    where: { doctorId, appointmentDate: { gte, lt }, status: { not: 'CANCELLED' } },
    select: { serial: true, patientName: true, chamberName: true },
    orderBy: { serial: 'asc' },
  });
  return rows.map((r) => ({
    serial: r.serial,
    patientName: r.patientName,
    chamberName: r.chamberName,
  }));
}

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

/**
 * Active break or null (missing fields, live off, or return time passed).
 * Expired breaks read as "no break" — the doctor ends it or starts a new one.
 */
function toLiveBreak(live: boolean, reason: string | null, until: Date | null): LiveBreak | null {
  if (!live || !reason) return null;
  if (until && !(until instanceof Date)) until = new Date(until);
  if (until && Number.isNaN(until.getTime())) return null;
  if (until && until.getTime() <= Date.now()) return null;
  return { reason, endsAt: until };
}

function snapshot(
  live: boolean,
  liveCurrentSerial: number | null,
  liveUpdatedAt: Date | null,
  queue: LiveEntry[],
  skipMap: Record<string, string> = {},
  liveBreak: LiveBreak | null = null,
): LiveSnapshot {
  const pinned = liveCurrentSerial != null ? (queue.find((q) => q.serial === liveCurrentSerial) ?? null) : null;
  const current = pinned ?? queue[0] ?? null;
  const next = current ? (queue.find((q) => q.serial > current.serial) ?? null) : null;
  // Missed ("not present") serials: unserved rows below the current one, plus
  // explicitly skipped rows still in the queue. They wait until recalled/served.
  const seen = new Set<number>();
  const missed = [...queue.filter((q) => !!current && q.serial < current.serial), ...queue.filter((q) => skipMap[String(q.serial)] != null)]
    .filter((q) => (seen.has(q.serial) ? false : (seen.add(q.serial), true)))
    .sort((a, b) => a.serial - b.serial)
    .map((q) => ({ ...q, skippedAt: skipMap[String(q.serial)] ?? null }));
  // Board reached the tail (≤2 serials ahead) but missed patients are still
  // waiting: bring them onto the waiting (upcoming) list automatically so the
  // flow continues instead of stalling at the end.
  const ahead = current ? queue.filter((q) => q.serial > current.serial) : [];
  const upcoming = [
    ...ahead.slice(0, 8),
    ...(current && ahead.length <= 2
      ? missed.filter((q) => q.serial !== current.serial).slice(0, Math.max(0, 8 - ahead.length))
      : []),
  ];
  return {
    live,
    current,
    next,
    upcoming,
    missed,
    // Whoever is inside is NOT counted as waiting — everyone else (ahead + missed) is.
    waitingCount: current ? queue.length - 1 : queue.length,
    totalToday: queue.length,
    liveUpdatedAt,
    break: liveBreak,
  };
}

export async function getSerialLiveStatus(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true, liveSkippedAt: true, liveBreakReason: true, liveBreakUntil: true },
  });
  if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
  const queue = await todayQueue(doctorId);
  // Lazy auto-stop: finished day, midnight rollover, or abandoned session
  // (no heartbeat/serve/action within the presence window and no active
  // break) — so dead lives never glow LIVE overnight.
  if (doctor.serialLive) {
    const hard = hardStopReason(queue.length, doctor.liveUpdatedAt);
    const liveBreakNow = toLiveBreak(doctor.serialLive, doctor.liveBreakReason, doctor.liveBreakUntil);
    if (hard || (!liveBreakNow && isLiveStale(doctor.liveUpdatedAt))) {
      await autoStopLive(doctor.id, hard ?? 'stale');
      return { doctorId: doctor.id, ...snapshot(false, null, new Date(), queue, {}, null) };
    }
  }
  let skipMap = parseSkipMap(doctor.liveSkippedAt);
  const liveBreak = toLiveBreak(doctor.serialLive, doctor.liveBreakReason, doctor.liveBreakUntil);
  let snap = snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue, skipMap, liveBreak);
  const released = await autoReleaseIfFewLeft(doctor.id, doctor.serialLive, queue, skipMap, snap.missed.length);
  if (released !== skipMap) {
    skipMap = released;
    snap = snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue, skipMap, liveBreak);
  }
  return { doctorId: doctor.id, ...snap };
}

export async function startSerialLive(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const queue = await todayQueue(doctorId);
  // No point glowing LIVE on an empty list (and no server load for nothing).
  if (queue.length === 0) throw new Error('NO_APPOINTMENTS');
  const doctor = await prisma.doctor.update({
    where: { id: doctorId },
    data: {
      serialLive: true,
      liveCurrentSerial: queue[0]?.serial ?? null,
      liveUpdatedAt: new Date(),
      // Fresh board — yesterday's skip clocks and breaks never carry over.
      liveSkippedAt: Prisma.DbNull,
      liveBreakReason: null,
      liveBreakUntil: null,
    },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  notifyLive(doctor.id);
  return { doctorId: doctor.id, ...snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue) };
}

export async function stopSerialLive(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.update({
    where: { id: doctorId },
    data: { serialLive: false, liveCurrentSerial: null, liveUpdatedAt: new Date(), liveSkippedAt: Prisma.DbNull, liveBreakReason: null, liveBreakUntil: null },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  const queue = await todayQueue(doctorId);
  notifyLive(doctor.id);
  return { doctorId: doctor.id, ...snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue) };
}

/**
 * Presence heartbeat — the dashboard calls this every ~2 minutes while the
 * live is ON. Refreshes liveUpdatedAt so an attended board never expires;
 * a closed tab / logout / dead session simply stops heartbeating and the
 * lazy + sweep checks turn the live off shortly after.
 * Never resurrects a finished/rolled-over day (hard stops still apply).
 */
export async function heartbeatLive(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, serialLive: true, liveUpdatedAt: true },
  });
  if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
  if (!doctor.serialLive) return getSerialLiveStatus(caller);
  const queue = await todayQueue(doctorId);
  const hard = hardStopReason(queue.length, doctor.liveUpdatedAt);
  if (hard) {
    await autoStopLive(doctor.id, hard);
    return { doctorId: doctor.id, ...snapshot(false, null, new Date(), queue, {}, null) };
  }
  await prisma.doctor.update({ where: { id: doctorId }, data: { liveUpdatedAt: new Date() } });
  return getSerialLiveStatus(caller);
}

/**
 * Stop every live owned by a user — called on logout so a doctor's (or
 * their staffer's) board never keeps streaming after the session ends.
 * Best-effort and never throws; logout must always succeed.
 */
export async function stopLivesForUser(userId: string): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { doctorProfile: { select: { id: true } }, staffDoctor: { select: { id: true } } },
    });
    const ids = new Set<string>();
    const own = (user as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    const staff = (user as { staffDoctor?: { id: string } | null } | null)?.staffDoctor?.id;
    if (own) ids.add(own);
    if (staff) ids.add(staff);
    for (const id of ids) {
      const d = await prisma.doctor.findUnique({ where: { id }, select: { serialLive: true } });
      if (d?.serialLive) await autoStopLive(id, 'logout');
    }
  } catch (error) {
    console.error('[SerialLive] stop-on-logout failed:', error);
  }
}

/**
 * Stop the live when today's queue just became empty through a non-serve
 * path (e.g. deleting the last walk-in). Called best-effort after deletes.
 */
export async function autoStopIfQueueEmpty(doctorId: string): Promise<void> {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId }, select: { serialLive: true } });
    if (!doctor?.serialLive) return;
    const { gte, lt } = todayBounds();
    const n = await prisma.confirmedAppointment.count({
      where: { doctorId, appointmentDate: { gte, lt }, status: { not: 'CANCELLED' } },
    });
    if (n === 0) await autoStopLive(doctorId, 'queue-empty');
  } catch (error) {
    console.error('[SerialLive] auto-stop-if-empty failed:', error);
  }
}

/**
 * Background sweep (server interval): turns off lives nobody is attending
 * even when no request arrives to trigger the lazy checks — stale presence
 * (closed tab / logout without hitting the endpoint / dead session),
 * midnight rollover, and queues that drained to zero. Returns stop count.
 */
export async function sweepStaleLives(): Promise<number> {
  const lives = await prisma.doctor.findMany({
    where: { serialLive: true },
    select: { id: true, liveUpdatedAt: true, liveBreakReason: true, liveBreakUntil: true },
  });
  let stopped = 0;
  for (const d of lives) {
    try {
      const liveBreak = toLiveBreak(true, d.liveBreakReason, d.liveBreakUntil);
      if ((d.liveUpdatedAt && !isSameLocalDay(d.liveUpdatedAt, new Date())) || (!liveBreak && isLiveStale(d.liveUpdatedAt))) {
        await autoStopLive(d.id, d.liveUpdatedAt && !isSameLocalDay(d.liveUpdatedAt, new Date()) ? 'date-rollover' : 'stale');
        stopped++;
        continue;
      }
      const { gte, lt } = todayBounds();
      const n = await prisma.confirmedAppointment.count({
        where: { doctorId: d.id, appointmentDate: { gte, lt }, status: { not: 'CANCELLED' } },
      });
      if (n === 0) {
        await autoStopLive(d.id, 'queue-empty');
        stopped++;
      }
    } catch (error) {
      console.error('[SerialLive] sweep failed for doctor=', d.id, error);
    }
  }
  if (stopped > 0) console.log(`[SerialLive] sweep stopped ${stopped} stale live(s)`);
  return stopped;
}

/**
 * Start a break ("বিরতি"): the public board shows the reason + return time,
 * and the TV stops repeating the next-person call until the break ends.
 * Minutes are clamped to 1–180.
 */
export async function startLiveBreak(caller: SerialLiveCaller, reasonRaw: unknown, minutesRaw: unknown) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true, liveSkippedAt: true },
  });
  if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
  if (!doctor.serialLive) throw new Error('NO_LIVE');
  const minutes = typeof minutesRaw === 'string' && minutesRaw.trim() !== '' ? Number(minutesRaw) : minutesRaw;
  if (typeof minutes !== 'number' || !Number.isFinite(minutes)) throw new Error('INVALID_BREAK');
  const mins = Math.min(180, Math.max(1, Math.round(minutes)));
  const reason = typeof reasonRaw === 'string' ? reasonRaw.trim().slice(0, 140) : '';
  const liveBreak: LiveBreak = { reason: reason || 'বিরতি', endsAt: new Date(Date.now() + mins * 60000) };
  const updated = await prisma.doctor.update({
    where: { id: doctorId },
    data: { liveBreakReason: liveBreak.reason, liveBreakUntil: liveBreak.endsAt, liveUpdatedAt: new Date() },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  const queue = await todayQueue(doctorId);
  const skipMap = parseSkipMap(doctor.liveSkippedAt);
  notifyLive(updated.id);
  return { doctorId: updated.id, ...snapshot(updated.serialLive, updated.liveCurrentSerial, updated.liveUpdatedAt, queue, skipMap, liveBreak) };
}

/** End the break early — the board and the repeating next-call resume. */
export async function endLiveBreak(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true, liveSkippedAt: true },
  });
  if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
  if (!doctor.serialLive) throw new Error('NO_LIVE');
  const updated = await prisma.doctor.update({
    where: { id: doctorId },
    data: { liveBreakReason: null, liveBreakUntil: null, liveUpdatedAt: new Date() },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  const queue = await todayQueue(doctorId);
  const skipMap = parseSkipMap(doctor.liveSkippedAt);
  notifyLive(updated.id);
  return { doctorId: updated.id, ...snapshot(updated.serialLive, updated.liveCurrentSerial, updated.liveUpdatedAt, queue, skipMap, null) };
}

/**
 * Skip the current serial ("not present"): the board advances to the next
 * pending serial, and the skipped one drops into the `missed` list with a
 * skip timestamp (punishment clock — recall allowed only after 20 minutes).
 * The skipped booking stays in the queue — serving it later works normally,
 * and when everyone else is served it resurfaces as current on its own.
 */
export async function skipCurrentSerial(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveSkippedAt: true, liveBreakReason: true, liveBreakUntil: true },
  });
  if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
  if (!doctor.serialLive) throw new Error('NO_LIVE');
  const queue = await todayQueue(doctorId);
  const current =
    doctor.liveCurrentSerial != null
      ? (queue.find((q) => q.serial === doctor.liveCurrentSerial) ?? null)
      : (queue[0] ?? null);
  if (!current) throw new Error('NO_CURRENT');
  const next = queue.find((q) => q.serial > current.serial) ?? null;
  if (!next) throw new Error('NO_NEXT_SERIAL');
  // Stamp the skip clock; prune entries for serials no longer in the queue.
  const inQueue = new Set(queue.map((q) => String(q.serial)));
  const skipMap = parseSkipMap(doctor.liveSkippedAt);
  const pruned: Record<string, string> = {};
  for (const [k, v] of Object.entries(skipMap)) {
    if (inQueue.has(k)) pruned[k] = v;
  }
  pruned[String(current.serial)] = new Date().toISOString();
  const updated = await prisma.doctor.update({
    where: { id: doctorId },
    data: { liveCurrentSerial: next.serial, liveUpdatedAt: new Date(), liveSkippedAt: pruned },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  notifyLive(updated.id);
  return {
    doctorId: updated.id,
    skipped: { ...current, skippedAt: pruned[String(current.serial)] ?? null },
    ...snapshot(updated.serialLive, updated.liveCurrentSerial, updated.liveUpdatedAt, queue, pruned, toLiveBreak(updated.serialLive, doctor.liveBreakReason, doctor.liveBreakUntil)),
  };
}

/**
 * Few-left release: while the board is live and at most 2 active (non-missed)
 * bookings remain, outstanding skip clocks are wiped — no matter how much
 * punishment time is left — so missed serials rejoin the waiting flow.
 * Anything above that keeps the normal 20-minute rule. One write per
 * transition (afterwards the map is already clean, so polls stay read-only).
 */
async function autoReleaseIfFewLeft(
  doctorId: string,
  live: boolean,
  queue: LiveEntry[],
  skipMap: Record<string, string>,
  missedCount: number,
): Promise<Record<string, string>> {
  if (!live || missedCount === 0) return skipMap;
  if (queue.length - missedCount > 2) return skipMap;
  const inQueue = new Set(queue.map((q) => String(q.serial)));
  const pruned: Record<string, string> = {};
  for (const [k, v] of Object.entries(skipMap)) {
    if (!inQueue.has(k)) pruned[k] = v;
  }
  if (Object.keys(pruned).length === Object.keys(skipMap).length) return skipMap;
  await prisma.doctor.update({ where: { id: doctorId }, data: { liveSkippedAt: pruned } });
  return pruned;
}

/**
 * Recall a missed serial to the live board ("bring them on serial").
 * Punishment clock: an explicitly skipped serial returns only 20 minutes
 * after its skip. The serial must still be in today's unserved queue and
 * currently missed (below the board or in the skip map).
 */
export async function recallSerial(caller: SerialLiveCaller, serialRaw: unknown) {
  const serial = typeof serialRaw === 'string' && serialRaw.trim() !== '' ? Number(serialRaw) : serialRaw;
  if (typeof serial !== 'number' || !Number.isInteger(serial) || serial <= 0) throw new Error('INVALID_SERIAL');
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveSkippedAt: true, liveBreakReason: true, liveBreakUntil: true },
  });
  if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
  if (!doctor.serialLive) throw new Error('NO_LIVE');
  const queue = await todayQueue(doctorId);
  const target = queue.find((q) => q.serial === serial) ?? null;
  if (!target) throw new Error('NOT_IN_QUEUE');
  const skipMap = parseSkipMap(doctor.liveSkippedAt);
  const pinned =
    doctor.liveCurrentSerial != null
      ? (queue.find((q) => q.serial === doctor.liveCurrentSerial) ?? null)
      : null;
  const current = pinned ?? queue[0] ?? null;
  if (current && target.serial === current.serial) throw new Error('NOT_MISSED');
  const isMissed = !!current && (target.serial < current.serial || skipMap[String(serial)] != null);
  if (!isMissed) throw new Error('NOT_MISSED');
  const ts = skipMap[String(serial)];
  if (ts) {
    const elapsed = Date.now() - new Date(ts).getTime();
    if (elapsed < RECALL_COOLDOWN_MS) {
      const err = new Error('RECALL_COOLDOWN') as Error & { detail?: unknown };
      err.detail = { patientName: target.patientName, serial, remainingMs: RECALL_COOLDOWN_MS - elapsed };
      throw err;
    }
  }
  // Recall: put them back on the board, clear their skip clock, prune the map.
  const inQueue = new Set(queue.map((q) => String(q.serial)));
  const pruned: Record<string, string> = {};
  for (const [k, v] of Object.entries(skipMap)) {
    if (k !== String(serial) && inQueue.has(k)) pruned[k] = v;
  }
  const updated = await prisma.doctor.update({
    where: { id: doctorId },
    data: { liveCurrentSerial: serial, liveUpdatedAt: new Date(), liveSkippedAt: pruned },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  notifyLive(updated.id);
  return {
    doctorId: updated.id,
    recalled: target,
    ...snapshot(updated.serialLive, updated.liveCurrentSerial, updated.liveUpdatedAt, queue, pruned, toLiveBreak(updated.serialLive, doctor.liveBreakReason, doctor.liveBreakUntil)),
  };
}

/**
 * Called (best-effort) after a serve: when the served serial was the live
 * current one, the next pending serial takes the board ("get in") and the
 * one after is flagged ready. When NOBODY is left, the live stops itself
 * (serialLive=false) so the board flips to "সম্প্রচার বন্ধ" instead of
 * glowing LIVE on an empty list. Never throws — serving must not fail.
 */
export async function advanceSerialLiveAfterServe(doctorId: string, servedSerial: number): Promise<void> {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      select: { serialLive: true, liveCurrentSerial: true, liveSkippedAt: true },
    });
    if (!doctor?.serialLive) return;
    if (doctor.liveCurrentSerial != null && doctor.liveCurrentSerial !== servedSerial) {
      // Served out of order (e.g. a recalled missed serial) — just clear its
      // skip clock if it had one; the board pointer stays where it is.
      const skipMap = parseSkipMap(doctor.liveSkippedAt);
      if (skipMap[String(servedSerial)] != null) {
        const pruned = { ...skipMap };
        delete pruned[String(servedSerial)];
        await prisma.doctor.update({ where: { id: doctorId }, data: { liveSkippedAt: pruned } });
      }
      return;
    }
    const queue = await todayQueue(doctorId);
    const next = queue.find((q) => q.serial > servedSerial) ?? null;
    // Served serials leave the queue — drop their skip clock too.
    const skipMap = parseSkipMap(doctor.liveSkippedAt);
    const pruned = { ...skipMap };
    delete pruned[String(servedSerial)];
    if (!next) {
      if (queue.length === 0) {
        // Patient list truly finished — stop the live automatically so the
        // board flips to "সম্প্রচার বন্ধ" instead of glowing LIVE on nothing.
        await prisma.doctor.update({
          where: { id: doctorId },
          data: { serialLive: false, liveCurrentSerial: null, liveUpdatedAt: new Date(), liveSkippedAt: Prisma.DbNull, liveBreakReason: null, liveBreakUntil: null },
        });
      } else {
        // Only missed ("not present") serials remain below — put the first
        // back on the board and keep the live running for them.
        const firstLeft = queue[0];
        if (firstLeft) {
          await prisma.doctor.update({
            where: { id: doctorId },
            data: { liveCurrentSerial: firstLeft.serial, liveUpdatedAt: new Date(), liveSkippedAt: pruned },
          });
        }
      }
    } else {
      await prisma.doctor.update({
        where: { id: doctorId },
        data: { liveCurrentSerial: next.serial, liveUpdatedAt: new Date(), liveSkippedAt: pruned },
      });
    }
    notifyLive(doctorId);
  } catch (error) {
    console.error('[SerialLive] advance failed:', error);
  }
}
