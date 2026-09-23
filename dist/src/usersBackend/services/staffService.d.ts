import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface StaffCaller {
    userId: string;
    role: UserRole;
}
export declare function listStaff(caller: StaffCaller): Promise<{
    name: string | null;
    role: import("../../../generated/prisma/enums.js").Role;
    id: string;
    email: string;
    isVerified: boolean;
    phone: string | null;
    createdAt: Date;
    canApprove: boolean;
    canManageChambers: boolean;
    staffDoctor: {
        name: string;
        id: string;
        username: string;
    } | null;
}[] | {
    name: string | null;
    role: import("../../../generated/prisma/enums.js").Role;
    id: string;
    email: string;
    isVerified: boolean;
    phone: string | null;
    createdAt: Date;
    canApprove: boolean;
    canManageChambers: boolean;
    staffHospital: {
        name: string;
        id: string;
        slug: string;
    } | null;
}[]>;
export declare function inviteStaff(caller: StaffCaller, input: {
    email?: string;
    name?: string;
    phone?: string;
    canApprove?: unknown;
    canManageChambers?: unknown;
}): Promise<{
    staff: {
        name: string | null;
        role: import("../../../generated/prisma/enums.js").Role;
        id: string;
        email: string;
        isVerified: boolean;
        phone: string | null;
        createdAt: Date;
        canApprove: boolean;
        canManageChambers: boolean;
    };
    tempPassword: string;
    emailSent: boolean;
    smsSent: boolean;
}>;
/** Flip a staff member's rights.
 * - DOCTOR_STAFF: DOCTOR owns (or SUPER_ADMIN) — canApprove + canManageChambers.
 * - HOSPITAL_STAFF: fixed at no-approve / no-chambers — PATCH is a no-op
 *   guard (hospital owner has nothing to toggle).
 */
export declare function updateStaff(caller: StaffCaller, id: string, input: {
    canApprove?: unknown;
    canManageChambers?: unknown;
}): Promise<{
    name: string | null;
    role: import("../../../generated/prisma/enums.js").Role;
    id: string;
    email: string;
    isVerified: boolean;
    phone: string | null;
    createdAt: Date;
    canApprove: boolean;
    canManageChambers: boolean;
}>;
export declare function removeStaff(caller: StaffCaller, id: string): Promise<{
    id: string;
}>;
//# sourceMappingURL=staffService.d.ts.map