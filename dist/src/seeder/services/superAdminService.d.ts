export type AdminSeedRole = 'SUPER_ADMIN' | 'ADMIN_MANAGER';
export interface SuperAdminSeedInput {
    email: string;
    password: string;
    name?: string;
    /** Defaults to SUPER_ADMIN. Public bootstrap route also accepts ADMIN_MANAGER. */
    role?: AdminSeedRole;
}
export declare const runSeedAdminUser: (input: SuperAdminSeedInput) => Promise<{
    user: {
        name: string | null;
        role: import("../../../generated/prisma/enums.js").Role;
        id: string;
        email: string;
        password: string;
        profilePicture: string | null;
        isVerified: boolean;
        otp: string | null;
        otpExpiry: Date | null;
        refreshToken: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        staffDoctorId: string | null;
        staffHospitalId: string | null;
        canApprove: boolean;
        canManageChambers: boolean;
    };
    profile: {
        name: string | null;
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        permissions: string[];
    };
}>;
/** Backwards-compatible alias — seeds a SUPER_ADMIN (CLI default). */
export declare const runSeedSuperAdmin: (input: SuperAdminSeedInput) => Promise<{
    user: {
        name: string | null;
        role: import("../../../generated/prisma/enums.js").Role;
        id: string;
        email: string;
        password: string;
        profilePicture: string | null;
        isVerified: boolean;
        otp: string | null;
        otpExpiry: Date | null;
        refreshToken: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        staffDoctorId: string | null;
        staffHospitalId: string | null;
        canApprove: boolean;
        canManageChambers: boolean;
    };
    profile: {
        name: string | null;
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        permissions: string[];
    };
}>;
/** Convenience wrapper — seeds an ADMIN_MANAGER. */
export declare const runSeedAdminManager: (input: SuperAdminSeedInput) => Promise<{
    user: {
        name: string | null;
        role: import("../../../generated/prisma/enums.js").Role;
        id: string;
        email: string;
        password: string;
        profilePicture: string | null;
        isVerified: boolean;
        otp: string | null;
        otpExpiry: Date | null;
        refreshToken: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        staffDoctorId: string | null;
        staffHospitalId: string | null;
        canApprove: boolean;
        canManageChambers: boolean;
    };
    profile: {
        name: string | null;
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        permissions: string[];
    };
}>;
//# sourceMappingURL=superAdminService.d.ts.map