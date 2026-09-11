// Service layer for the usersBackend module.
// Resolves profile data through PROFILE_VISIBILITY so the controller stays thin.
// Never selects secrets (password, otp, refreshToken).
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
      role: true,
      isVerified: true,
      createdAt: true,
      // Self view follows the caller's matrix row; privileged others-view gets everything.
      doctorProfile: isSelf ? visibility.includeDoctorProfile : true,
      hospitalProfile: isSelf ? visibility.includeHospitalProfile : true,
      superAdminProfile: isSelf ? visibility.includeSuperAdminProfile : true,
    },
  });
}
