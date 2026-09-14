// Live serial scoreboard ("doctor-serial-live").
// Doctor + staff start/stop it from the dashboard; the public board shows the
// current serial (get in), the next one (be ready) and the waiting count —
// like a live score telecast. Advancing piggybacks on serve (সেবা সম্পন্ন).
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface SerialLiveCaller {
  userId: string;
  role: UserRole;
}

export interface LiveEntry {
  serial: number;
  patientName: string;
  chamberName: string | null;
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
  waitingCount: number;
  totalToday: number;
  liveUpdatedAt: Date | null;
}

function snapshot(
  live: boolean,
  liveCurrentSerial: number | null,
  liveUpdatedAt: Date | null,
  queue: LiveEntry[],
): LiveSnapshot {
  const pinned = liveCurrentSerial != null ? (queue.find((q) => q.serial === liveCurrentSerial) ?? null) : null;
  const current = pinned ?? queue[0] ?? null;
  const next = current ? (queue.find((q) => q.serial > current.serial) ?? null) : null;
  const upcoming = current ? queue.filter((q) => q.serial > current.serial).slice(0, 8) : [];
  return {
    live,
    current,
    next,
    upcoming,
    // Whoever is inside is NOT counted as waiting.
    waitingCount: current ? queue.filter((q) => q.serial > current.serial).length : queue.length,
    totalToday: queue.length,
    liveUpdatedAt,
  };
}

export async function getSerialLiveStatus(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
  const queue = await todayQueue(doctorId);
  return { doctorId: doctor.id, ...snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue) };
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
    },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  return { doctorId: doctor.id, ...snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue) };
}

export async function stopSerialLive(caller: SerialLiveCaller) {
  const doctorId = await resolveOwnDoctorId(caller);
  const doctor = await prisma.doctor.update({
    where: { id: doctorId },
    data: { serialLive: false, liveCurrentSerial: null, liveUpdatedAt: new Date() },
    select: { id: true, serialLive: true, liveCurrentSerial: true, liveUpdatedAt: true },
  });
  const queue = await todayQueue(doctorId);
  return { doctorId: doctor.id, ...snapshot(doctor.serialLive, doctor.liveCurrentSerial, doctor.liveUpdatedAt, queue) };
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
      select: { serialLive: true, liveCurrentSerial: true },
    });
    if (!doctor?.serialLive) return;
    if (doctor.liveCurrentSerial != null && doctor.liveCurrentSerial !== servedSerial) return;
    const queue = await todayQueue(doctorId);
    const next = queue.find((q) => q.serial > servedSerial) ?? null;
    await prisma.doctor.update({
      where: { id: doctorId },
      data: { liveCurrentSerial: next?.serial ?? null, liveUpdatedAt: new Date() },
    });
  } catch (error) {
    console.error('[SerialLive] advance failed:', error);
  }
}
