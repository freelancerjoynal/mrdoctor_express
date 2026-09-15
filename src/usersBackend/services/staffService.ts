// Service layer for staff users (DOCTOR_STAFF + HOSPITAL_STAFF).
// - DOCTOR invites/lists/removes their own DOCTOR_STAFF (users.staffDoctorId).
// - HOSPITAL (hospital owner) invites/lists/removes their own HOSPITAL_STAFF
//   (users.staffHospitalId). Hospital staff get NO chamber management and NO
//   serve/approve right — only the doctor marks service-done. They book and
//   manage appointments for any doctor of that hospital.
// - SUPER_ADMIN may list/remove/update either kind.
// Invite creates a verified staff user and emails one-time credentials
// (also returned once in the response).
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

async function resolveOwnHospitalId(caller: StaffCaller): Promise<string> {
  if (caller.role === 'SUPER_ADMIN') return '';
  if (caller.role !== 'HOSPITAL') throw new Error('FORBIDDEN');
  const own = await prisma.user.findUnique({
    where: { id: caller.userId },
    select: { hospitalProfile: { select: { id: true, name: true } } },
  });
  const hospital = (own as { hospitalProfile?: { id: string; name: string } | null } | null)?.hospitalProfile;
  if (!hospital) throw new Error('NO_HOSPITAL_PROFILE');
  return hospital.id;
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
  if (caller.role === 'DOCTOR') {
    return prisma.user.findMany({
      where: { role: 'DOCTOR_STAFF', staffDoctorId: await resolveOwnDoctorId(caller) } as never,
      select: { ...STAFF_SELECT, staffDoctor: { select: { id: true, name: true, username: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
  if (caller.role === 'HOSPITAL') {
    return prisma.user.findMany({
      where: { role: 'HOSPITAL_STAFF', staffHospitalId: await resolveOwnHospitalId(caller) } as never,
      select: { ...STAFF_SELECT, staffHospital: { select: { id: true, name: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
  if (caller.role === 'SUPER_ADMIN') {
    return prisma.user.findMany({
      where: { role: { in: ['DOCTOR_STAFF', 'HOSPITAL_STAFF'] } } as never,
      select: {
        ...STAFF_SELECT,
        staffDoctor: { select: { id: true, name: true, username: true } },
        staffHospital: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  throw new Error('FORBIDDEN');
}

export async function inviteStaff(
  caller: StaffCaller,
  input: { email?: string; name?: string; canApprove?: unknown; canManageChambers?: unknown },
) {
  const email = cleanEmail(input.email);
  const name = cleanName(input.name);
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) throw new Error('EMAIL_TAKEN');

  const tempPassword = makeTempPassword();
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  // Hospital owner invites HOSPITAL_STAFF: no chamber management, no
  // serve/approve right — only booking + update. Flags are forced off.
  if (caller.role === 'HOSPITAL') {
    const hospitalId = await resolveOwnHospitalId(caller);
    const hospital = await prisma.hospital.findUnique({ where: { id: hospitalId }, select: { name: true } });
    const staff = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'HOSPITAL_STAFF',
        isVerified: true,
        staffHospitalId: hospitalId,
        canApprove: false,
        canManageChambers: false,
      },
      select: STAFF_SELECT,
    });
    let emailSent = true;
    try {
      await sendStaffCredentialsEmail(email, tempPassword, hospital?.name ?? 'আপনার হাসপাতাল', name);
    } catch (error) {
      console.error('Staff credentials email failed:', error);
      emailSent = false;
    }
    return { staff, tempPassword, emailSent };
  }

  const doctorId = await resolveOwnDoctorId(caller);
  // Manage-approve option: false = staff can only collect + update,
  // approval (serve/done) stays with the doctor. Default true (full rights).
  const canApprove = input.canApprove === undefined ? true : Boolean(input.canApprove);
  // Chamber-manage option: true = staff can manage chambers + schedules
  // (timing / date availability). Default false (doctor only).
  const canManageChambers =
    input.canManageChambers === undefined ? false : Boolean(input.canManageChambers);
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

/** Flip a staff member's rights.
 * - DOCTOR_STAFF: DOCTOR owns (or SUPER_ADMIN) — canApprove + canManageChambers.
 * - HOSPITAL_STAFF: fixed at no-approve / no-chambers — PATCH is a no-op
 *   guard (hospital owner has nothing to toggle).
 */
export async function updateStaff(
  caller: StaffCaller,
  id: string,
  input: { canApprove?: unknown; canManageChambers?: unknown },
) {
  const target = await prisma.user.findUnique({
    where: { id },
    select: { id: true, role: true, staffDoctorId: true, staffHospitalId: true },
  });
  if (!target || (target.role !== 'DOCTOR_STAFF' && target.role !== 'HOSPITAL_STAFF')) {
    throw new Error('STAFF_NOT_FOUND');
  }
  if (target.role === 'DOCTOR_STAFF') {
    if (caller.role !== 'DOCTOR' && caller.role !== 'SUPER_ADMIN') throw new Error('FORBIDDEN');
    if (caller.role === 'DOCTOR') {
      const doctorId = await resolveOwnDoctorId(caller);
      if (target.staffDoctorId !== doctorId) throw new Error('FORBIDDEN');
    }
    const data: Record<string, boolean> = {};
    if (input.canApprove !== undefined) data.canApprove = Boolean(input.canApprove);
    if (input.canManageChambers !== undefined) data.canManageChambers = Boolean(input.canManageChambers);
    if (Object.keys(data).length === 0) throw new Error('NOTHING_TO_UPDATE');
    return prisma.user.update({ where: { id }, data, select: STAFF_SELECT });
  }
  // HOSPITAL_STAFF: nothing to toggle — rights are fixed.
  if (caller.role !== 'HOSPITAL' && caller.role !== 'SUPER_ADMIN') throw new Error('FORBIDDEN');
  if (caller.role === 'HOSPITAL') {
    const hospitalId = await resolveOwnHospitalId(caller);
    if ((target as { staffHospitalId?: string | null }).staffHospitalId !== hospitalId) {
      throw new Error('FORBIDDEN');
    }
  }
  throw new Error('NOTHING_TO_UPDATE');
}

export async function removeStaff(caller: StaffCaller, id: string) {
  const target = await prisma.user.findUnique({
    where: { id },
    select: { id: true, role: true, staffDoctorId: true, staffHospitalId: true },
  });
  if (!target || (target.role !== 'DOCTOR_STAFF' && target.role !== 'HOSPITAL_STAFF')) {
    throw new Error('STAFF_NOT_FOUND');
  }
  if (target.role === 'DOCTOR_STAFF') {
    if (caller.role !== 'DOCTOR' && caller.role !== 'SUPER_ADMIN') throw new Error('FORBIDDEN');
    if (caller.role === 'DOCTOR') {
      const doctorId = await resolveOwnDoctorId(caller);
      if (target.staffDoctorId !== doctorId) throw new Error('FORBIDDEN');
    }
  } else {
    if (caller.role !== 'HOSPITAL' && caller.role !== 'SUPER_ADMIN') throw new Error('FORBIDDEN');
    if (caller.role === 'HOSPITAL') {
      const hospitalId = await resolveOwnHospitalId(caller);
      if ((target as { staffHospitalId?: string | null }).staffHospitalId !== hospitalId) {
        throw new Error('FORBIDDEN');
      }
    }
  }
  await prisma.user.delete({ where: { id } });
  return { id };
}
