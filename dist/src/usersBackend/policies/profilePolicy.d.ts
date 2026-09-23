import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface RoleVisibility {
    includeDoctorProfile: boolean;
    includeHospitalProfile: boolean;
    includeSuperAdminProfile: boolean;
    canViewOthers: boolean;
}
export declare const PROFILE_VISIBILITY: Record<UserRole, RoleVisibility>;
//# sourceMappingURL=profilePolicy.d.ts.map