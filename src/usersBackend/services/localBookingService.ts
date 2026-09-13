// Walk-in (local) offline booking by doctor staff.
// Creates a ConfirmedAppointment with bookingType OFFLINE,
// then sends an SMS receipt (best effort, never fails the booking).
import { prisma } from '../../lib/prisma.js';
import { singleMessage } from '../../lib/sms.js';
import { createConfirmedWithSerial } from './confirmedService.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface LocalBookingCaller {
  userId: string;
  role: UserRole;
}

export interface LocalBookingInput {
  patientName?: unknown;
  phone?: unknown;
  patientType?: unknown;
  collectionAmount?: unknown;
  date?: unknown;
  age?: unknown;
  area?: unknown;
  chamberId?: unknown;
  problem?: unknown;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function cleanName(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_NAME');
  const name = raw.trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 80) throw new Error('INVALID_NAME');
  return name;
}

function cleanPhone(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_PHONE');
  let digits = raw.replace(/[^\d]/g, '');
  if (digits.startsWith('880')) digits = '0' + digits.slice(3);
  if (digits.startsWith('00880')) digits = '0' + digits.slice(5);
  if (!/^01\d{9}$/.test(digits)) throw new Error('INVALID_PHONE');
  return digits;
}

function cleanAmount(raw: unknown): number {
  const n = typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : raw;
  if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 10000000) {
    throw new Error('INVALID_AMOUNT');
  }
  return Math.round(n * 100) / 100;
}

function parseDay(value: unknown): Date | null {
  if (typeof value !== 'string' || !DATE_RE.test(value.trim())) return null;
  const [y, m, d] = value.trim().split('-').map(Number);
  const dt = new Date(y!, m! - 1, d!);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function bnDate(dt: Date): string {
  try {
    return dt.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  }
}

const DAY_BN: Record<string, string> = {
  SATURDAY: 'শনিবার',
  SUNDAY: 'রবিবার',
  MONDAY: 'সোমবার',
  TUESDAY: 'মঙ্গলবার',
  WEDNESDAY: 'বুধবার',
  THURSDAY: 'বৃহস্পতিবার',
  FRIDAY: 'শুক্রবার',
};

function jsDayToEnum(d: Date): string {
  return ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][d.getDay()]!;
}

/** "আজকে — বৃহস্পতিবার, ১২ সেপ্টেম্বর" style label for the two booking days. */
function dayLabel(date: Date, offset: number): string {
  const prefix = offset === 0 ? 'আজকে — ' : 'আগামীকাল — ';
  return `${prefix}${DAY_BN[jsDayToEnum(date)]}, ${bnDate(date)}`;
}

function isoDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Today + tomorrow only, keeping ONLY running days. Max one day advance. */
function openDays(schedules: Array<{ dayOfWeek: string }>): Array<{ date: string; dayOfWeek: string; label: string }> {
  const running = new Set(schedules.map((s) => String(s.dayOfWeek).toUpperCase()));
  const out: Array<{ date: string; dayOfWeek: string; label: string }> = [];
  const now = new Date();
  for (let offset = 0; offset < 2; offset++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const dayOfWeek = jsDayToEnum(date);
    if (running.size > 0 && !running.has(dayOfWeek)) continue;
    out.push({ date: isoDay(date), dayOfWeek, label: dayLabel(date, offset) });
  }
  return out;
}

/** Who is taking this booking (cash tracking): user id + display name snapshot. */
async function resolveTaker(caller: LocalBookingCaller): Promise<{ id: string; name: string }> {
  const user = await prisma.user.findUnique({
    where: { id: caller.userId },
    select: {
      name: true,
      email: true,
      doctorProfile: { select: { name: true } },
    },
  });
  const base =
    caller.role === 'DOCTOR'
      ? user?.doctorProfile?.name || user?.name || ''
      : user?.name || '';
  const name = base.trim() || user?.email?.split('@')[0]?.trim() || 'স্টাফ';
  return { id: caller.userId, name };
}

async function resolveDoctor(caller: LocalBookingCaller): Promise<{ id: string; name: string }> {
  if (caller.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true, name: true } } },
    });
    const doctor = own?.doctorProfile;
    if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
    return doctor;
  }
  if (caller.role === 'DOCTOR_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffDoctor: { select: { id: true, name: true } } },
    });
    const doctor = (own as { staffDoctor?: { id: string; name: string } | null } | null)?.staffDoctor;
    if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
    return doctor;
  }
  throw new Error('FORBIDDEN');
}

export async function createLocalBooking(caller: LocalBookingCaller, input: LocalBookingInput) {
  if (caller.role !== 'DOCTOR' && caller.role !== 'DOCTOR_STAFF') throw new Error('FORBIDDEN');

  const doctor = await resolveDoctor(caller);
  const patientName = cleanName(input.patientName);
  const phone = cleanPhone(input.phone);

  const type = typeof input.patientType === 'string' ? input.patientType.trim().toUpperCase() : '';
  if (type !== 'NEW' && type !== 'RENEW') throw new Error('INVALID_PATIENT_TYPE');

  const collectionAmount = cleanAmount(input.collectionAmount);

  const now = new Date();
  let appointmentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (input.date !== undefined && input.date !== null && String(input.date).trim() !== '') {
    const parsed = parseDay(input.date);
    if (!parsed) throw new Error('INVALID_DATE');
    appointmentDate = parsed;
  }

  let age: number | undefined;
  if (input.age !== undefined && input.age !== null && String(input.age).trim() !== '') {
    const n = Number(input.age);
    if (!Number.isInteger(n) || n < 0 || n > 150) throw new Error('INVALID_AGE');
    age = n;
  }

  const area = typeof input.area === 'string' && input.area.trim() ? input.area.trim().slice(0, 120) : null;
  const problem =
    typeof input.problem === 'string' && input.problem.trim()
      ? input.problem.trim().slice(0, 500)
      : 'সরাসরি বুকিং';

  let chamberId: string | null = null;
  let chamberName: string | null = null;
  let chamberText = '';
  let mapLink = '';
  const requestedChamberId =
    typeof input.chamberId === 'string' && input.chamberId.trim() ? input.chamberId.trim() : null;
  const chamber = requestedChamberId
    ? await prisma.chamber.findUnique({
        where: { id: requestedChamberId },
        select: {
          id: true,
          doctorId: true,
          chamberName: true,
          addressLine: true,
          thana: true,
          district: true,
          latitude: true,
          longitude: true,
        },
      })
    : await prisma.chamber.findFirst({
        where: { doctorId: doctor.id },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          doctorId: true,
          chamberName: true,
          addressLine: true,
          thana: true,
          district: true,
          latitude: true,
          longitude: true,
        },
      });
  if (requestedChamberId && (!chamber || chamber.doctorId !== doctor.id)) throw new Error('INVALID_CHAMBER');
  if (chamber) {
    chamberId = chamber.id;
    chamberName = chamber.chamberName;
    chamberText = [chamber.chamberName, chamber.addressLine, chamber.thana, chamber.district]
      .filter(Boolean)
      .join(', ');
    // Google Map link built from the chamber's latitude/longitude stored in DB.
    if (chamber.latitude != null && chamber.longitude != null) {
      mapLink = `https://www.google.com/maps?q=${chamber.latitude},${chamber.longitude}`;
    } else if (chamberText) {
      mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(chamberText)}`;
    }
  }

  // Date rule: today + tomorrow only, and only a running day of this chamber
  // (chamber-bound schedules win, else the doctor's full roster).
  const startOf = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diffDays = Math.round((startOf(appointmentDate) - startOf(new Date())) / 86400000);
  if (diffDays < 0 || diffDays > 1) throw new Error('INVALID_DATE');
  const schedules = await prisma.doctorSchedule.findMany({
    where: { doctorId: doctor.id },
    select: { dayOfWeek: true, chamberId: true },
  });
  if (schedules.length > 0) {
    const own = chamberId
      ? schedules.filter((s) => (s.chamberId || '').toLowerCase() === chamberId!.toLowerCase())
      : [];
    const relevant = own.length > 0 ? own : schedules;
    if (!relevant.some((s) => String(s.dayOfWeek).toUpperCase() === jsDayToEnum(appointmentDate))) {
      throw new Error('CLOSED_DAY');
    }
  }

  const taker = await resolveTaker(caller);
  const booking = await createConfirmedWithSerial({
    doctorId: doctor.id,
    appointmentDate,
    doctorName: doctor.name,
    phoneNumber: phone,
    problem,
    dayLabel: bnDate(appointmentDate),
    chamberId,
    chamberName,
    patientName,
    patientType: type,
    patientAge: age,
    patientArea: area,
    contactPhone: phone,
    source: 'local',
    status: 'CONFIRMED',
    bookingType: 'OFFLINE',
    collectionAmount,
    createdBy: taker.id,
    createdByName: taker.name,
  });

  let smsSent = false;
  try {
    const serial = (booking as { serial?: number }).serial ?? '';
    const lines = [
      `প্রিয় ${patientName}, ${doctor.name}-এর চেম্বারে আপনার বুকিং নিশ্চিত।`,
      `সিরিয়াল: ${serial}, তারিখ: ${bnDate(appointmentDate)}।`,
    ];
    if (chamberText) lines.push(`চেম্বার: ${chamberText}।`);
    if (mapLink) lines.push(`ম্যাপ: ${mapLink}`);
    if (type === 'RENEW') lines.push(`অনুগ্রহ করে আপনার পুরনো প্রেসক্রিপশনটি সঙ্গে নিয়ে আসুন।`);
    lines.push(`ফি ৳${collectionAmount} গ্রহণ করা হয়েছে।`);
    await singleMessage(phone, lines.join('\n'));
    smsSent = true;
  } catch (error: any) {
    console.error(`[LocalBooking] SMS failed to=${phone}:`, error?.message ?? error);
  }

  return { booking, smsSent };
}

/**
 * Booking options for the staff walk-in form: chambers + schedules +
 * the next running days (today + tomorrow max, 2 options max).
 */
export async function getLocalBookingOptions(caller: LocalBookingCaller) {
  if (caller.role !== 'DOCTOR' && caller.role !== 'DOCTOR_STAFF') throw new Error('FORBIDDEN');
  const doctor = await resolveDoctor(caller);
  const [chambers, schedules] = await Promise.all([
    prisma.chamber.findMany({
      where: { doctorId: doctor.id },
      orderBy: { createdAt: 'asc' },
      select: { id: true, chamberName: true, addressLine: true, thana: true, district: true },
    }),
    prisma.doctorSchedule.findMany({
      where: { doctorId: doctor.id },
      select: { dayOfWeek: true, chamberId: true, startTime: true, endTime: true },
    }),
  ]);
  return {
    chambers: chambers.map((c) => ({
      id: c.id,
      name: c.chamberName || c.addressLine || 'চেম্বার',
      area: [c.thana, c.district].filter(Boolean).join(', '),
    })),
    schedules: schedules.map((s) => ({
      dayOfWeek: String(s.dayOfWeek),
      chamberId: s.chamberId,
      startTime: s.startTime,
      endTime: s.endTime,
    })),
    days: openDays(schedules),
  };
}
