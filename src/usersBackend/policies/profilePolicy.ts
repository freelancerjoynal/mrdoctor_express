// Single source of truth for "who sees what" in the usersBackend module.
// Roles come from the Role enum in prisma/schema.prisma.
// To change a role's visibility, edit one row here — never a new folder.
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface RoleVisibility {
  // Which linked profiles are included when the caller views their OWN data.
  includeDoctorProfile: boolean;
  includeHospitalProfile: boolean;
  includeSuperAdminProfile: boolean;
  // Whether the caller may pass ?userId= to view OTHER users' data.
  canViewOthers: boolean;
}

// NOTE: DOCTOR_STAFF / HOSPITAL_STAFF / BUSINESS_OWNER have no dedicated
// profile tables in the schema, so they resolve to their User row for now.
export const PROFILE_VISIBILITY: Record<UserRole, RoleVisibility> = {
  SUPER_ADMIN: {
    includeDoctorProfile: true,
    includeHospitalProfile: true,
    includeSuperAdminProfile: true,
    canViewOthers: true,
  },
  ADMIN_MANAGER: {
    includeDoctorProfile: true,
    includeHospitalProfile: true,
    includeSuperAdminProfile: true,
    canViewOthers: true,
  },
  DOCTOR: {
    includeDoctorProfile: true,
    includeHospitalProfile: false,
    includeSuperAdminProfile: false,
    canViewOthers: false,
  },
  DOCTOR_STAFF: {
    includeDoctorProfile: false,
    includeHospitalProfile: false,
    includeSuperAdminProfile: false,
    canViewOthers: false,
  },
  BUSINESS_OWNER: {
    includeDoctorProfile: false,
    includeHospitalProfile: false,
    includeSuperAdminProfile: false,
    canViewOthers: false,
  },
  HOSPITAL: {
    includeDoctorProfile: false,
    includeHospitalProfile: true,
    includeSuperAdminProfile: false,
    canViewOthers: false,
  },
  HOSPITAL_STAFF: {
    includeDoctorProfile: false,
    includeHospitalProfile: false,
    includeSuperAdminProfile: false,
    canViewOthers: false,
  },
};
