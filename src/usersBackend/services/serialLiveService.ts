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

/** Punishment clock: a skipped serial returns to the board after 20 minutes. */
export const RECALL_COOLDOWN_MS = 20 * 60 * 1000;

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
}

function snapshot(
  live: boolean,
  liveCurrentSerial: number | null,
  liveUpdatedAt: Date | null,
  queue: LiveEntry[],
  skipMap: Record<string, string> = {},
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
  };
}

export async function getSerialLiveStatus(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true, liveSkippedAt: true },
  });
  if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
  const queue = await todayQueue(doctorId);
  let skipMap = parseSkipMap(doctor.liveSkippedAt);
  let snap = snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue, skipMap);
  const released = await autoReleaseIfFewLeft(doctor.id, doctor.serialLive, queue, skipMap, snap.missed.length);
  if (released !== skipMap) {
    skipMap = released;
    snap = snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue, skipMap);
  }
  return { doctorId: doctor.id, ...snap };
}

export async function startSerialLive(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const queue = await todayQueue(doctorId);
  const doctor = await prisma.doctor.update({
    where: { id: doctorId },
    data: {
      serialLive: true,
      liveCurrentSerial: queue[0]?.serial ?? null,
      liveUpdatedAt: new Date(),
      // Fresh board — yesterday's skip clocks never carry over.
      liveSkippedAt: Prisma.DbNull,
    },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  return { doctorId: doctor.id, ...snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue) };
}

export async function stopSerialLive(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.update({
    where: { id: doctorId },
    data: { serialLive: false, liveCurrentSerial: null, liveUpdatedAt: new Date(), liveSkippedAt: Prisma.DbNull },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  const queue = await todayQueue(doctorId);
  return { doctorId: doctor.id, ...snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue) };
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
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveSkippedAt: true },
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
  return {
    doctorId: updated.id,
    skipped: { ...current, skippedAt: pruned[String(current.serial)] ?? null },
    ...snapshot(updated.serialLive, updated.liveCurrentSerial, updated.liveUpdatedAt, queue, pruned),
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
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveSkippedAt: true },
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
  return {
    doctorId: updated.id,
    recalled: target,
    ...snapshot(updated.serialLive, updated.liveCurrentSerial, updated.liveUpdatedAt, queue, pruned),
  };
}

/**
 * Called (best-effort) after a serve: when the served serial was the live
 * current one, the next pending serial takes the board ("get in") and the
 * one after is flagged ready. Never throws — serving must not fail.
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
    await prisma.doctor.update({
      where: { id: doctorId },
      data: { liveCurrentSerial: next?.serial ?? null, liveUpdatedAt: new Date(), liveSkippedAt: pruned },
    });
  } catch (error) {
    console.error('[SerialLive] advance failed:', error);
  }
}
