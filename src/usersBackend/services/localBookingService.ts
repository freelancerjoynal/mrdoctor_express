// Service for walk-in (local) offline bookings by doctor staff.
// POST /api/users/appointments/local — creates a ConfirmedAppointment with
// bookingType OFFLINE, then best-effort sends an SMS receipt to the patient.
// Mandatory: patient name, phone, NEW/RENEW type, collection amount.
import { prisma } from '../../lib/prisma.js';
import { normalizeBdPhone, sendSms } from '../../lib/sms.js';
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

function todayLocal(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function bnDate(dt: Date): string {
  try {
    return dt.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  }
}

async function resolveDoctor(caller: LocalBookingCaller): Promise<{ id: string; name: string }> {
  if (caller.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true, name: true } } },
    });
    const doctor = (own as { doctorProfile?: { id: string; name: string } | null } | null)?.doctorProfile;
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
  const phone = normalizeBdPhone(input.phone);

  const type = typeof input.patientType === 'string' ? input.patientType.trim().toUpperCase() : '';
  if (type !== 'NEW' && type !== 'RENEW') throw new Error('INVALID_PATIENT_TYPE');

  const collectionAmount = cleanAmount(input.collectionAmount);

  let appointmentDate = todayLocal();
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

  let chamberName: string | null = null;
  const chamberId = typeof input.chamberId === 'string' && input.chamberId.trim() ? input.chamberId.trim() : null;
  if (chamberId) {
    const chamber = await prisma.chamber.findUnique({
      where: { id: chamberId },
      select: { id: true, doctorId: true, chamberName: true },
    });
    if (!chamber || chamber.doctorId !== doctor.id) throw new Error('INVALID_CHAMBER');
    chamberName = chamber.chamberName;
  }

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
  });
  console.log(`[LocalBooking] saved id=${booking.id} serial=${booking.serial} type=${type} amount=${collectionAmount}`);

  // SMS receipt — best effort, never fails the booking.
  let smsSent = false;
  try {
    console.log(`[LocalBooking] SMS sending booking=${booking.id} to=${phone}`);
    const sms = await sendSms({
      to: phone,
      message: `প্রিয় ${patientName}, ${doctor.name}-এর চেম্বারে আপনার সিরিয়াল নিশ্চিত। তারিখ: ${bnDate(appointmentDate)}। ফি ৳${collectionAmount} গ্রহণ করা হয়েছে।`,
    });
    smsSent = true;
    console.log(`[LocalBooking] SMS sent booking=${booking.id} to=${phone} gateway=${sms.response.slice(0, 200)}`);
  } catch (error: any) {
    console.error(`[LocalBooking] SMS failed booking=${booking.id} to=${phone}:`, error?.message ?? error);
  }

  return { booking, smsSent };
}
