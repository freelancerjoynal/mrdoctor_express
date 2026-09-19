// Service layer for the usersBackend module.
// Resolves profile data through PROFILE_VISIBILITY so the controller stays thin.
// Never selects secrets (password, otp, refreshToken).
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma.js';
import { PROFILE_VISIBILITY } from '../policies/profilePolicy.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
import { isAdminRole } from '../../authentication/middleware/authMiddleware.js';

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
      profilePicture: true,
      role: true,
      isVerified: true,
      canApprove: true,
      canManageChambers: true,
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
          religion: true,
          username: true,
        },
      },
      // Which hospital this hospital-staff user works under (null for others).
      staffHospital: {
        select: { id: true, name: true, slug: true },
      },
    },
  });
}

export interface DoctorProfileUpdateInput {
  name?: unknown;
  name_en?: unknown;
  degree?: unknown;
  degree_en?: unknown;
  speciality?: unknown;
  speciality_en?: unknown;
  tagline?: unknown;
  tagline_en?: unknown;
  bio?: unknown;
  bio_en?: unknown;
  phone?: unknown;
  whatsappNumber?: unknown;
  whatsappAccessToken?: unknown;
  whatsappId?: unknown;
  templateName?: unknown;
  profilePicture?: unknown;
  gender?: unknown;
  religion?: unknown;
  startedYear?: unknown;
  /** Immutable — accepted only to reject explicitly. */
  email?: unknown;
  username?: unknown;
  status?: unknown;
  id?: unknown;
  userId?: unknown;
}

export interface UpdateProfileInput {
  name?: unknown;
  currentPassword?: unknown;
  newPassword?: unknown;
  /** Profile photo URL (all roles — staff upload it like the doctor does). */
  profilePicture?: unknown;
  /** Email is immutable — accepted only to reject it explicitly. */
  email?: unknown;
  /** Username is immutable — accepted only to reject it explicitly. */
  username?: unknown;
  /** Status is admin-controlled — accepted only to reject it explicitly. */
  status?: unknown;
  /** Doctor's own editable fields (DOCTOR role only). Email/username excluded. */
  doctor?: unknown;
}

function cleanName(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_NAME');
  const name = raw.trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 80) throw new Error('INVALID_NAME');
  return name;
}

function cleanRequiredText(raw: unknown, min: number, max: number, code = 'INVALID_DOCTOR_FIELD'): string {
  if (typeof raw !== 'string') throw new Error(code);
  const v = raw.trim().replace(/\s+/g, ' ');
  if (v.length < min || v.length > max) throw new Error(code);
  return v;
}

/** Optional text: undefined = skip, null/'' = clear, else trimmed (max enforced). */
function cleanOptionalText(raw: unknown, max: number, code = 'INVALID_DOCTOR_FIELD'): string | null | undefined {
  if (raw === undefined) return undefined;
  if (raw === null) return null;
  if (typeof raw !== 'string') throw new Error(code);
  const v = raw.trim().replace(/\s+/g, ' ');
  if (!v) return null;
  if (v.length > max) throw new Error(code);
  return v;
}

/** Optional long text (bio etc.): keeps newlines, collapses blank lines. */
function cleanOptionalLong(raw: unknown, max: number, code = 'INVALID_DOCTOR_FIELD'): string | null | undefined {
  if (raw === undefined) return undefined;
  if (raw === null) return null;
  if (typeof raw !== 'string') throw new Error(code);
  const v = raw.trim().replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  if (!v) return null;
  if (v.length > max) throw new Error(code);
  return v;
}

function parseDoctorPayload(input: unknown): Record<string, string | number | null> {
  if (input === undefined || input === null) return {};
  if (typeof input !== 'object' || Array.isArray(input)) throw new Error('INVALID_DOCTOR_FIELD');
  const d = input as DoctorProfileUpdateInput;

  // Immutable doctor identifiers — never editable from edit-profile.
  if (typeof d.email === 'string' && d.email.trim().length > 0) throw new Error('EMAIL_IMMUTABLE');
  if (typeof d.username === 'string' && d.username.trim().length > 0) throw new Error('USERNAME_IMMUTABLE');
  if (d.status !== undefined && d.status !== null && String(d.status).trim().length > 0) {
    throw new Error('STATUS_IMMUTABLE');
  }
  if (d.id !== undefined && d.id !== null && String(d.id).trim().length > 0) throw new Error('IMMUTABLE_FIELD');
  if (d.userId !== undefined && d.userId !== null && String(d.userId).trim().length > 0) {
    throw new Error('IMMUTABLE_FIELD');
  }

  const out: Record<string, string | number | null> = {};

  if (d.name !== undefined) out.name = cleanRequiredText(d.name, 2, 80);
  if (d.name_en !== undefined) out.name_en = cleanOptionalText(d.name_en, 80) ?? null;
  if (d.degree !== undefined) out.degree = cleanRequiredText(d.degree, 2, 200);
  if (d.degree_en !== undefined) out.degree_en = cleanOptionalText(d.degree_en, 200) ?? null;
  if (d.speciality !== undefined) out.speciality = cleanRequiredText(d.speciality, 2, 120);
  if (d.speciality_en !== undefined) out.speciality_en = cleanOptionalText(d.speciality_en, 120) ?? null;
  if (d.tagline !== undefined) out.tagline = cleanOptionalText(d.tagline, 200) ?? null;
  if (d.tagline_en !== undefined) out.tagline_en = cleanOptionalText(d.tagline_en, 200) ?? null;
  if (d.bio !== undefined) out.bio = cleanOptionalLong(d.bio, 5000) ?? null;
  if (d.bio_en !== undefined) out.bio_en = cleanOptionalLong(d.bio_en, 5000) ?? null;

  if (d.phone !== undefined) {
    const phone = cleanRequiredText(d.phone, 6, 20);
    if (!/^[+\d][\d\s\-()]{5,19}$/.test(phone)) throw new Error('INVALID_DOCTOR_FIELD');
    out.phone = phone;
  }
  if (d.whatsappNumber !== undefined) {
    const v = cleanOptionalText(d.whatsappNumber, 20);
    if (v && !/^[+\d][\d\s\-()]{5,19}$/.test(v)) throw new Error('INVALID_DOCTOR_FIELD');
    out.whatsappNumber = v ?? null;
  }
  if (d.whatsappId !== undefined) out.whatsappId = cleanOptionalText(d.whatsappId, 100) ?? null;
  if (d.whatsappAccessToken !== undefined) out.whatsappAccessToken = cleanOptionalText(d.whatsappAccessToken, 1000) ?? null;
  if (d.templateName !== undefined) out.templateName = cleanRequiredText(d.templateName, 1, 50);
  if (d.profilePicture !== undefined) out.profilePicture = cleanOptionalText(d.profilePicture, 500) ?? null;
  if (d.religion !== undefined) out.religion = cleanOptionalText(d.religion, 50) ?? null;

  if (d.gender !== undefined) {
    if (d.gender === null) out.gender = null;
    else if (typeof d.gender !== 'string') throw new Error('INVALID_DOCTOR_FIELD');
    else {
      const g = d.gender.trim().toUpperCase();
      if (!g) out.gender = null;
      else if (g !== 'MALE' && g !== 'FEMALE') throw new Error('INVALID_DOCTOR_FIELD');
      else out.gender = g;
    }
  }

  if (d.startedYear !== undefined) {
    if (d.startedYear === null) out.startedYear = null;
    else if (typeof d.startedYear === 'string' && !d.startedYear.trim()) out.startedYear = null;
    else {
      const y = typeof d.startedYear === 'number' ? d.startedYear : Number(String(d.startedYear).trim());
      const currentYear = new Date().getFullYear();
      if (!Number.isInteger(y) || y < 1950 || y > currentYear) throw new Error('INVALID_DOCTOR_FIELD');
      out.startedYear = y;
    }
  }

  return out;
}

/**
 * Update the caller's OWN profile. Email/username can never be changed.
 * - name: saved to users.name always; also mirrored to the linked
 *   doctors / hospitals / super_admin_profiles row when one exists.
 * - password: requires currentPassword match; newPassword min 6 chars.
 * - doctor: DOCTOR role only — every Doctor column except
 *   email/username/status/id/userId (incl. all *_en mirrors).
 */
export async function updateProfileData(caller: ProfileCaller, input: UpdateProfileInput) {
  if (typeof input.email === 'string' && input.email.trim().length > 0) {
    throw new Error('EMAIL_IMMUTABLE');
  }
  if (typeof input.username === 'string' && input.username.trim().length > 0) {
    throw new Error('USERNAME_IMMUTABLE');
  }
  if (input.status !== undefined && input.status !== null && String(input.status).trim().length > 0) {
    throw new Error('STATUS_IMMUTABLE');
  }

  const wantsName = input.name !== undefined;
  const wantsPassword = input.currentPassword !== undefined || input.newPassword !== undefined;
  const wantsDoctor = input.doctor !== undefined && input.doctor !== null;
  const wantsPicture = input.profilePicture !== undefined;

  let doctorData: Record<string, string | number | null> = {};
  if (wantsDoctor) {
    if (caller.role !== 'DOCTOR') throw new Error('FORBIDDEN');
    doctorData = parseDoctorPayload(input.doctor);
  }

  if (!wantsName && !wantsPassword && !wantsPicture && Object.keys(doctorData).length === 0) {
    throw new Error('NOTHING_TO_UPDATE');
  }

  let name: string | undefined;
  if (wantsName) name = cleanName(input.name);

  // Profile photo for roles without a dedicated profile table (staff etc.).
  // Same rules as the doctor's picture: URL or empty (clear), max 500 chars.
  let picture: string | null | undefined;
  if (wantsPicture) picture = cleanOptionalText(input.profilePicture, 500, 'INVALID_PICTURE') ?? null;

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

  // Doctor.name is the source of truth — keep users.name in sync with it.
  const effectiveUserName = caller.role === 'DOCTOR' ? ((doctorData.name as string | undefined) ?? name) : name;
  const doctorMirrorName = caller.role === 'DOCTOR' && doctorData.name === undefined ? name : undefined;

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: caller.userId },
      data: {
        ...(effectiveUserName !== undefined ? { name: effectiveUserName } : {}),
        ...(hashedPassword ? { password: hashedPassword } : {}),
        ...(picture !== undefined ? { profilePicture: picture } : {}),
      },
    });

    // Mirror the display name into the role's dedicated profile row.
    if (caller.role === 'DOCTOR') {
      const data: Record<string, string | number | null> = { ...doctorData };
      if (doctorMirrorName !== undefined) data.name = doctorMirrorName;
      if (Object.keys(data).length > 0) {
        const existing = await tx.doctor.findFirst({
          where: { userId: caller.userId },
          select: { id: true },
        });
        if (!existing) throw new Error('NO_DOCTOR_PROFILE');
        await tx.doctor.update({ where: { id: existing.id }, data: data as any });
      }
    } else if (effectiveUserName !== undefined) {
      if (caller.role === 'HOSPITAL') {
        await tx.hospital.updateMany({ where: { userId: caller.userId }, data: { name: effectiveUserName } });
      } else if (isAdminRole(caller.role)) {
        await tx.superAdminProfile.upsert({
          where: { userId: caller.userId },
          create: { userId: caller.userId, name: effectiveUserName },
          update: { name: effectiveUserName },
        });
      }
    }
  });

  return getProfileData(caller);
}
