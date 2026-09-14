// Service layer for a doctor's staff (DOCTOR_STAFF users).
// Only the owning DOCTOR may invite/list/remove; SUPER_ADMIN may list.
// Invite creates a verified staff user linked via users.staffDoctorId and
// emails the one-time credentials (also returned once in the response).
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
import { sendStaffCredentialsEmail } from '../../authentication/lib/mailer.js';

export interface StaffCaller {
  userId: string;
  role: UserRole;
}

const STAFF_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  isVerified: true,
  canApprove: true,
  canManageChambers: true,
  createdAt: true,
} as const;

async function resolveOwnDoctorId(caller: StaffCaller): Promise<string> {
  if (caller.role === 'SUPER_ADMIN') return '';
  if (caller.role !== 'DOCTOR') throw new Error('FORBIDDEN');
  const own = await prisma.user.findUnique({
    where: { id: caller.userId },
    select: { doctorProfile: { select: { id: true, name: true } } },
  });
  const doctor = (own as { doctorProfile?: { id: string; name: string } | null } | null)?.doctorProfile;
  if (!doctor) throw new Error('NO_DOCTOR_PROFILE');
  return doctor.id;
}

function cleanName(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_NAME');
  const name = raw.trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 80) throw new Error('INVALID_NAME');
  return name;
}

function cleanEmail(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_EMAIL');
  const email = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160) throw new Error('INVALID_EMAIL');
  return email;
}

/** 10-char alphanumeric temporary password. */
function makeTempPassword(): string {
  return crypto.randomBytes(8).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).padEnd(10, '7');
}

export async function listStaff(caller: StaffCaller) {
  if (caller.role !== 'DOCTOR' && caller.role !== 'SUPER_ADMIN') throw new Error('FORBIDDEN');
  const where: Record<string, unknown> =
    caller.role === 'DOCTOR' ? { role: 'DOCTOR_STAFF', staffDoctorId: await resolveOwnDoctorId(caller) } : { role: 'DOCTOR_STAFF' };
  return prisma.user.findMany({
    where: where as never,
    select: { ...STAFF_SELECT, staffDoctor: { select: { id: true, name: true, username: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function inviteStaff(
  caller: StaffCaller,
  input: { email?: string; name?: string; canApprove?: unknown; canManageChambers?: unknown },
) {
  const doctorId = await resolveOwnDoctorId(caller);
  const email = cleanEmail(input.email);
  const name = cleanName(input.name);
  // Manage-approve option: false = staff can only collect + update,
  // approval (serve/done) stays with the doctor. Default true (full rights).
  const canApprove = input.canApprove === undefined ? true : Boolean(input.canApprove);
  // Chamber-manage option: true = staff can manage chambers + schedules
  // (timing / date availability). Default false (doctor only).
  const canManageChambers =
    input.canManageChambers === undefined ? false : Boolean(input.canManageChambers);
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) throw new Error('EMAIL_TAKEN');

  const tempPassword = makeTempPassword();
  const hashedPassword = await bcrypt.hash(tempPassword, 10);
  const doctor = await prisma.doctor.findUnique({ where: { id: doctorId }, select: { name: true } });

  const staff = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: 'DOCTOR_STAFF',
      isVerified: true,
      staffDoctorId: doctorId,
      canApprove,
      canManageChambers,
    },
    select: STAFF_SELECT,
  });

  let emailSent = true;
  try {
    await sendStaffCredentialsEmail(email, tempPassword, doctor?.name ?? 'আপনার ডাক্তার', name);
  } catch (error) {
    console.error('Staff credentials email failed:', error);
    emailSent = false;
  }
  // tempPassword is shown exactly once — it is never stored in plain text.
  return { staff, tempPassword, emailSent };
}

/** Flip a staff member's rights (DOCTOR owns, SUPER_ADMIN may).
 * - canApprove: approval (serve/done) right.
 * - canManageChambers: chambers + schedules (timing / date availability) right.
 */
export async function updateStaff(
  caller: StaffCaller,
  id: string,
  input: { canApprove?: unknown; canManageChambers?: unknown },
) {
  if (caller.role !== 'DOCTOR' && caller.role !== 'SUPER_ADMIN') throw new Error('FORBIDDEN');
  const target = await prisma.user.findUnique({ where: { id }, select: { id: true, role: true, staffDoctorId: true } });
  if (!target || target.role !== 'DOCTOR_STAFF') throw new Error('STAFF_NOT_FOUND');
  if (caller.role === 'DOCTOR') {
    const doctorId = await resolveOwnDoctorId(caller);
    if (target.staffDoctorId !== doctorId) throw new Error('FORBIDDEN');
  }
  const data: Record<string, boolean> = {};
  if (input.canApprove !== undefined) data.canApprove = Boolean(input.canApprove);
  if (input.canManageChambers !== undefined) data.canManageChambers = Boolean(input.canManageChambers);
  if (Object.keys(data).length === 0) throw new Error('NOTHING_TO_UPDATE');
  return prisma.user.update({
    where: { id },
    data,
    select: STAFF_SELECT,
  });
}

export async function removeStaff(caller: StaffCaller, id: string) {
  if (caller.role !== 'DOCTOR' && caller.role !== 'SUPER_ADMIN') throw new Error('FORBIDDEN');
  const target = await prisma.user.findUnique({ where: { id }, select: { id: true, role: true, staffDoctorId: true } });
  if (!target || target.role !== 'DOCTOR_STAFF') throw new Error('STAFF_NOT_FOUND');
  if (caller.role === 'DOCTOR') {
    const doctorId = await resolveOwnDoctorId(caller);
    if (target.staffDoctorId !== doctorId) throw new Error('FORBIDDEN');
  }
  await prisma.user.delete({ where: { id } });
  return { id };
}
