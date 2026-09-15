// Walk-in (local) offline booking by doctor staff.
// Creates a ConfirmedAppointment with bookingType OFFLINE,
// then sends an SMS receipt (best effort, never fails the booking).
import { prisma } from '../../lib/prisma.js';
import { singleMessage } from '../../lib/sms.js';
import { createConfirmedWithSerial } from './confirmedService.js';
import { notifyAppointments } from '../../realtime/notify.js';
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
  /** Hospital desk: which doctor of this hospital to book (required for HOSPITAL / HOSPITAL_STAFF). */
  doctorId?: unknown;
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

/** Today only: walk-in (local) bookings are always for the current day. */
function openDays(schedules: Array<{ dayOfWeek: string }>): Array<{ date: string; dayOfWeek: string; label: string }> {
  const running = new Set(schedules.map((s) => String(s.dayOfWeek).toUpperCase()));
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayOfWeek = jsDayToEnum(date);
  if (running.size > 0 && !running.has(dayOfWeek)) return [];
  return [{ date: isoDay(date), dayOfWeek, label: dayLabel(date, 0) }];
}

/** Chamber that owns a weekday via its own schedules (one day = one chamber). */
function chamberOwningDay(
  schedules: Array<{ dayOfWeek: string; chamberId: string | null }>,
  dayOfWeek: string,
): string | null {
  const hit = schedules.find(
    (s) => s.chamberId && String(s.dayOfWeek).toUpperCase() === dayOfWeek,
  );
  return hit?.chamberId ?? null;
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

/** Hospital behind a HOSPITAL / HOSPITAL_STAFF call. */
async function resolveHospital(caller: LocalBookingCaller): Promise<{ id: string; name: string }> {
  if (caller.role === 'HOSPITAL') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { hospitalProfile: { select: { id: true, name: true } } },
    });
    const hospital = (own as { hospitalProfile?: { id: string; name: string } | null } | null)?.hospitalProfile;
    if (!hospital) throw new Error('NO_HOSPITAL_PROFILE');
    return hospital;
  }
  if (caller.role === 'HOSPITAL_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffHospital: { select: { id: true, name: true } } },
    });
    const hospital = (own as { staffHospital?: { id: string; name: string } | null } | null)?.staffHospital;
    if (!hospital) throw new Error('NO_HOSPITAL_PROFILE');
    return hospital;
  }
  throw new Error('FORBIDDEN');
}

/** Hospital desk: validate the chosen doctor belongs to this hospital. */
async function resolveHospitalDoctor(
  hospitalId: string,
  rawDoctorId: unknown,
): Promise<{ id: string; name: string }> {
  const doctorId = typeof rawDoctorId === 'string' ? rawDoctorId.trim() : '';
  if (!doctorId) throw new Error('DOCTOR_REQUIRED');
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, name: true },
  });
  if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
  const [chamberHit, scheduleHit] = await Promise.all([
    prisma.chamber.findFirst({ where: { doctorId, hospitalId }, select: { id: true } }),
    prisma.doctorSchedule.findFirst({ where: { doctorId, hospitalId }, select: { id: true } }),
  ]);
  if (!chamberHit && !scheduleHit) throw new Error('DOCTOR_NOT_IN_HOSPITAL');
  return doctor;
}

/** Doctors of one hospital running TODAY (chamber or schedule linked + weekday roster). */
export async function hospitalDoctorsToday(hospitalId: string) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnum = jsDayToEnum(today);
  // Doctor ids linked to this hospital via chambers or schedules.
  const [chambers, schedules] = await Promise.all([
    prisma.chamber.findMany({ where: { hospitalId }, select: { doctorId: true } }),
    prisma.doctorSchedule.findMany({ where: { hospitalId }, select: { doctorId: true, dayOfWeek: true } }),
  ]);
  const linked = new Set<string>();
  for (const c of chambers) if (c.doctorId) linked.add(c.doctorId);
  for (const s of schedules) if (s.doctorId) linked.add(s.doctorId);
  if (linked.size === 0) return [];
  const runningToday = new Set(
    schedules
      .filter((s) => s.doctorId && String(s.dayOfWeek).toUpperCase() === todayEnum)
      .map((s) => s.doctorId as string),
  );
  const doctors = await prisma.doctor.findMany({
    where: { id: { in: [...linked] } },
    select: { id: true, name: true, speciality: true, degree: true },
    orderBy: { name: 'asc' },
  });
  return doctors.map((d) => ({ ...d, availableToday: runningToday.has(d.id) }));
}

export async function createLocalBooking(caller: LocalBookingCaller, input: LocalBookingInput) {
  const isHospitalDesk = caller.role === 'HOSPITAL' || caller.role === 'HOSPITAL_STAFF';
  if (caller.role !== 'DOCTOR' && caller.role !== 'DOCTOR_STAFF' && !isHospitalDesk) {
    throw new Error('FORBIDDEN');
  }

  // Hospital desk books for any doctor of that hospital (doctorId required).
  const hospital = isHospitalDesk ? await resolveHospital(caller) : null;
  const doctor = isHospitalDesk
    ? await resolveHospitalDoctor(hospital!.id, input.doctorId)
    : await resolveDoctor(caller);
  const patientName = cleanName(input.patientName);
  const phone = cleanPhone(input.phone);

  const type = typeof input.patientType === 'string' ? input.patientType.trim().toUpperCase() : '';
  if (type !== 'NEW' && type !== 'RENEW') throw new Error('INVALID_PATIENT_TYPE');

  const collectionAmount = cleanAmount(input.collectionAmount);

  // Walk-in bookings are locked to today — the date is never editable.
  const now = new Date();
  const appointmentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (input.date !== undefined && input.date !== null && String(input.date).trim() !== '') {
    const parsed = parseDay(input.date);
    if (!parsed || isoDay(parsed) !== isoDay(appointmentDate)) throw new Error('INVALID_DATE');
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

  // Chamber is resolved from today's availability (one weekday = one chamber).
  // An explicitly sent chamber must be today's running chamber; otherwise the
  // request is rejected — the client never picks a chamber by itself.
  // Hospital desk: schedules/chambers are scoped to this hospital.
  const todayEnum = jsDayToEnum(appointmentDate);
  const schedules = await prisma.doctorSchedule.findMany({
    where: isHospitalDesk ? { doctorId: doctor.id, hospitalId: hospital!.id } : { doctorId: doctor.id },
    select: { dayOfWeek: true, chamberId: true },
  });
  const autoChamberId = chamberOwningDay(schedules, todayEnum);

  const requestedChamberId =
    typeof input.chamberId === 'string' && input.chamberId.trim() ? input.chamberId.trim() : null;
  if (requestedChamberId && autoChamberId && requestedChamberId.toLowerCase() !== autoChamberId.toLowerCase()) {
    throw new Error('INVALID_CHAMBER');
  }
  if (schedules.length > 0 && !autoChamberId) {
    const runningToday = schedules.some((s) => String(s.dayOfWeek).toUpperCase() === todayEnum);
    if (!runningToday) throw new Error('CLOSED_DAY');
  }

  let chamberId: string | null = null;
  let chamberName: string | null = null;
  let chamberText = '';
  let mapLink = '';
  let hospitalId: string | null = null;
  let resolvedHospitalName: string | null = null;
  const effectiveChamberId = requestedChamberId ?? autoChamberId;
  const chamber = effectiveChamberId
    ? await prisma.chamber.findUnique({
        where: { id: effectiveChamberId },
        select: {
          id: true,
          doctorId: true,
          hospitalId: true,
          hospital: { select: { name: true } },
          chamberName: true,
          addressLine: true,
          thana: true,
          district: true,
          latitude: true,
          longitude: true,
        },
      })
    : await prisma.chamber.findFirst({
        where: isHospitalDesk ? { doctorId: doctor.id, hospitalId: hospital!.id } : { doctorId: doctor.id },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          doctorId: true,
          hospitalId: true,
          hospital: { select: { name: true } },
          chamberName: true,
          addressLine: true,
          thana: true,
          district: true,
          latitude: true,
          longitude: true,
        },
      });
  if (effectiveChamberId && (!chamber || chamber.doctorId !== doctor.id)) throw new Error('INVALID_CHAMBER');
  // Hospital desk: the chamber must belong to this hospital.
  if (isHospitalDesk && chamber && chamber.hospitalId !== hospital!.id) throw new Error('INVALID_CHAMBER');
  if (chamber) {
    chamberId = chamber.id;
    chamberName = chamber.chamberName;
    hospitalId = chamber.hospitalId ?? (isHospitalDesk ? hospital!.id : null);
    resolvedHospitalName = chamber.hospital?.name ?? (isHospitalDesk ? hospital!.name : null);
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

  // Hospital desk without a chamber row (schedule-only link): still tag the hospital.
  if (isHospitalDesk && !hospitalId) {
    hospitalId = hospital!.id;
    resolvedHospitalName = hospital!.name;
  }

  const taker = await resolveTaker(caller);
  const booking = await createConfirmedWithSerial({
    doctorId: doctor.id,
    appointmentDate,
    doctorName: doctor.name,
    hospitalId,
    hospitalName: resolvedHospitalName,
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

  notifyAppointments({ doctorId: doctor.id, hospitalId, chamberId });
  return { booking, smsSent };
}

/**
 * Booking options for the staff walk-in form: chambers + schedules +
 * today only (walk-ins are locked to the current day). The chamber is
 * auto-selected from today's availability (one weekday = one chamber).
 * Hospital desk (HOSPITAL / HOSPITAL_STAFF): returns `doctors` — every doctor
 * linked to this hospital plus an `availableToday` flag — so the desk can
 * pick which doctor to book. Single-doctor callers keep the old shape.
 */
export async function getLocalBookingOptions(caller: LocalBookingCaller) {
  if (caller.role === 'HOSPITAL' || caller.role === 'HOSPITAL_STAFF') {
    const hospital = await resolveHospital(caller);
    const doctors = await hospitalDoctorsToday(hospital.id);
    const todayDoctors = doctors.filter((d) => d.availableToday);
    // Default chamber context comes from the first available doctor so the
    // form still shows today's date label even before a doctor is picked.
    const firstId = todayDoctors[0]?.id ?? doctors[0]?.id ?? null;
    let chambers: Array<{ id: string; name: string; area: string }> = [];
    let schedules: Array<{ dayOfWeek: string; chamberId: string | null; startTime: string; endTime: string }> = [];
    if (firstId) {
      const [chRows, scRows] = await Promise.all([
        prisma.chamber.findMany({
          where: { doctorId: firstId, hospitalId: hospital.id },
          orderBy: { createdAt: 'asc' },
          select: { id: true, chamberName: true, addressLine: true, thana: true, district: true },
        }),
        prisma.doctorSchedule.findMany({
          where: { doctorId: firstId, hospitalId: hospital.id },
          select: { dayOfWeek: true, chamberId: true, startTime: true, endTime: true },
        }),
      ]);
      chambers = chRows.map((c) => ({
        id: c.id,
        name: c.chamberName || c.addressLine || 'চেম্বার',
        area: [c.thana, c.district].filter(Boolean).join(', '),
      }));
      schedules = scRows.map((s) => ({
        dayOfWeek: String(s.dayOfWeek),
        chamberId: s.chamberId,
        startTime: s.startTime,
        endTime: s.endTime,
      }));
    }
    const days = openDays(schedules.length > 0 ? schedules : [{ dayOfWeek: jsDayToEnum(new Date()) }]);
    // Hospital desk with no roster at all: still allow today (doctors list drives availability).
    const today = days[0] ?? null;
    const todayEnum = today ? today.dayOfWeek : null;
    const autoChamberId = todayEnum ? chamberOwningDay(schedules, todayEnum) : null;
    return {
      doctors,
      chambers,
      schedules,
      days,
      today,
      autoChamberId,
      todayClosed: doctors.length > 0 && todayDoctors.length === 0,
    };
  }
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
  const days = openDays(schedules);
  const today = days[0] ?? null;
  const todayEnum = today ? today.dayOfWeek : null;
  const autoChamberId = todayEnum ? chamberOwningDay(schedules, todayEnum) : null;
  const todayClosed = today === null;
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
    days,
    today,
    autoChamberId,
    todayClosed,
  };
}
