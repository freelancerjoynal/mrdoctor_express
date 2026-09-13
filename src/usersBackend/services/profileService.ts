// Service layer for the usersBackend module.
// Resolves profile data through PROFILE_VISIBILITY so the controller stays thin.
// Never selects secrets (password, otp, refreshToken).
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma.js';
import { PROFILE_VISIBILITY } from '../policies/profilePolicy.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface ProfileCaller {
  userId: string;
  role: UserRole;
}

export async function getProfileData(caller: ProfileCaller, targetUserId?: string) {
  const targetId = targetUserId?.trim() || caller.userId;
  const visibility = PROFILE_VISIBILITY[caller.role];

  // "Others" data is a privilege, not a default.
  if (targetId !== caller.userId && !visibility.canViewOthers) {
    throw new Error('FORBIDDEN');
  }

  const isSelf = targetId === caller.userId;

  return prisma.user.findUnique({
    where: { id: targetId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isVerified: true,
      createdAt: true,
      // Self view follows the caller's matrix row; privileged others-view gets everything.
      doctorProfile: isSelf ? visibility.includeDoctorProfile : true,
      hospitalProfile: isSelf ? visibility.includeHospitalProfile : true,
      superAdminProfile: isSelf ? visibility.includeSuperAdminProfile : true,
      // Which doctor this staff user works under (null for non-staff).
      // Non-secret linkage info — always included so staff UI can show "my doctor".
      staffDoctor: {
        select: {
          id: true,
          name: true,
          degree: true,
          speciality: true,
          tagline: true,
          phone: true,
          profilePicture: true,
          gender: true,
          username: true,
        },
      },
    },
  });
}

export interface UpdateProfileInput {
  name?: unknown;
  currentPassword?: unknown;
  newPassword?: unknown;
  /** Email is immutable — accepted only to reject it explicitly. */
  email?: unknown;
}

function cleanName(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_NAME');
  const name = raw.trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 80) throw new Error('INVALID_NAME');
  return name;
}

/**
 * Update the caller's OWN profile. Email can never be changed.
 * - name: saved to users.name always; also mirrored to the linked
 *   doctors / hospitals / super_admin_profiles row when one exists.
 * - password: requires currentPassword match; newPassword min 6 chars.
 */
export async function updateProfileData(caller: ProfileCaller, input: UpdateProfileInput) {
  if (typeof input.email === 'string' && input.email.trim().length > 0) {
    throw new Error('EMAIL_IMMUTABLE');
  }

  const wantsName = input.name !== undefined;
  const wantsPassword = input.currentPassword !== undefined || input.newPassword !== undefined;

  if (!wantsName && !wantsPassword) throw new Error('NOTHING_TO_UPDATE');

  let name: string | undefined;
  if (wantsName) name = cleanName(input.name);

  let hashedPassword: string | undefined;
  if (wantsPassword) {
    if (typeof input.currentPassword !== 'string' || typeof input.newPassword !== 'string') {
      throw new Error('INVALID_PASSWORD');
    }
    const newPassword = input.newPassword;
    if (newPassword.length < 6 || newPassword.length > 128) throw new Error('INVALID_PASSWORD');
    const user = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { password: true },
    });
    if (!user || !(await bcrypt.compare(input.currentPassword, user.password))) {
      throw new Error('INVALID_PASSWORD');
    }
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: caller.userId },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(hashedPassword ? { password: hashedPassword } : {}),
      },
    });

    // Mirror the display name into the role's dedicated profile row.
    if (name !== undefined) {
      if (caller.role === 'DOCTOR') {
        await tx.doctor.updateMany({ where: { userId: caller.userId }, data: { name } });
      } else if (caller.role === 'HOSPITAL') {
        await tx.hospital.updateMany({ where: { userId: caller.userId }, data: { name } });
      } else if (caller.role === 'SUPER_ADMIN') {
        await tx.superAdminProfile.upsert({
          where: { userId: caller.userId },
          create: { userId: caller.userId, name },
          update: { name },
        });
      }
    }
  });

  return getProfileData(caller);
}
