import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface ProfileCaller {
    userId: string;
    role: UserRole;
}
export declare function getProfileData(caller: ProfileCaller, targetUserId?: string): Promise<{
    name: string | null;
    role: import("../../../generated/prisma/enums.js").Role;
    id: string;
    email: string;
    profilePicture: string | null;
    isVerified: boolean;
    createdAt: Date;
    canApprove: boolean;
    canManageChambers: boolean;
    doctorProfile: {
        name: string;
        userId: string | null;
        id: string;
        email: string | null;
        profilePicture: string | null;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        name_en: string | null;
        degree: string;
        degree_en: string | null;
        speciality: string;
        speciality_en: string | null;
        tagline: string | null;
        tagline_en: string | null;
        bio: string | null;
        bio_en: string | null;
        whatsappNumber: string | null;
        whatsappAccessToken: string | null;
        whatsappId: string | null;
        username: string;
        templateName: string;
        businessCardImage: string | null;
        bannerCardImage: string | null;
        gender: import("../../../generated/prisma/enums.js").Gender | null;
        religion: string | null;
        startedYear: number | null;
        bmdcNumber: string | null;
        status: import("../../../generated/prisma/enums.js").DoctorStatus;
        serialLive: boolean;
        liveCurrentSerial: number | null;
        liveUpdatedAt: Date | null;
        liveSkippedAt: import("@prisma/client/runtime/client").JsonValue | null;
        liveBreakReason: string | null;
        liveBreakUntil: Date | null;
        creditBalance: number;
    } | null;
    hospitalProfile: {
        name: string;
        userId: string | null;
        id: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name_en: string | null;
        templateName: string;
        businessCardImage: string | null;
        bannerCardImage: string | null;
        status: import("../../../generated/prisma/enums.js").HospitalStatus;
        creditBalance: number;
        slug: string;
        division: string;
        division_en: string | null;
        district: string;
        district_en: string | null;
        thana: string;
        thana_en: string | null;
        addressLine: string | null;
        addressLine_en: string | null;
        establishedYear: number | null;
    } | null;
    superAdminProfile: {
        name: string | null;
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        permissions: string[];
    } | null;
    staffDoctor: {
        name: string;
        id: string;
        profilePicture: string | null;
        phone: string;
        degree: string;
        speciality: string;
        tagline: string | null;
        username: string;
        gender: import("../../../generated/prisma/enums.js").Gender | null;
        religion: string | null;
    } | null;
    staffHospital: {
        name: string;
        id: string;
        slug: string;
    } | null;
} | null>;
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
    businessCardImage?: unknown;
    bannerCardImage?: unknown;
    gender?: unknown;
    religion?: unknown;
    startedYear?: unknown;
    bmdcNumber?: unknown;
    /** Immutable — accepted only to reject explicitly. */
    email?: unknown;
    username?: unknown;
    status?: unknown;
    id?: unknown;
    userId?: unknown;
}
export interface HospitalProfileUpdateInput {
    businessCardImage?: unknown;
    bannerCardImage?: unknown;
    /** Immutable — accepted only to reject explicitly. */
    name?: unknown;
    slug?: unknown;
    email?: unknown;
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
    /** Hospital's own editable card images (HOSPITAL role only). */
    hospital?: unknown;
}
/**
 * Update the caller's OWN profile. Email/username can never be changed.
 * - name: saved to users.name always; also mirrored to the linked
 *   doctors / hospitals / super_admin_profiles row when one exists.
 * - password: requires currentPassword match; newPassword min 6 chars.
 * - doctor: DOCTOR role only — every Doctor column except
 *   email/username/status/id/userId (incl. all *_en mirrors).
 * - hospital: HOSPITAL role only — businessCardImage + bannerCardImage.
 */
export declare function updateProfileData(caller: ProfileCaller, input: UpdateProfileInput): Promise<{
    name: string | null;
    role: import("../../../generated/prisma/enums.js").Role;
    id: string;
    email: string;
    profilePicture: string | null;
    isVerified: boolean;
    createdAt: Date;
    canApprove: boolean;
    canManageChambers: boolean;
    doctorProfile: {
        name: string;
        userId: string | null;
        id: string;
        email: string | null;
        profilePicture: string | null;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        name_en: string | null;
        degree: string;
        degree_en: string | null;
        speciality: string;
        speciality_en: string | null;
        tagline: string | null;
        tagline_en: string | null;
        bio: string | null;
        bio_en: string | null;
        whatsappNumber: string | null;
        whatsappAccessToken: string | null;
        whatsappId: string | null;
        username: string;
        templateName: string;
        businessCardImage: string | null;
        bannerCardImage: string | null;
        gender: import("../../../generated/prisma/enums.js").Gender | null;
        religion: string | null;
        startedYear: number | null;
        bmdcNumber: string | null;
        status: import("../../../generated/prisma/enums.js").DoctorStatus;
        serialLive: boolean;
        liveCurrentSerial: number | null;
        liveUpdatedAt: Date | null;
        liveSkippedAt: import("@prisma/client/runtime/client").JsonValue | null;
        liveBreakReason: string | null;
        liveBreakUntil: Date | null;
        creditBalance: number;
    } | null;
    hospitalProfile: {
        name: string;
        userId: string | null;
        id: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name_en: string | null;
        templateName: string;
        businessCardImage: string | null;
        bannerCardImage: string | null;
        status: import("../../../generated/prisma/enums.js").HospitalStatus;
        creditBalance: number;
        slug: string;
        division: string;
        division_en: string | null;
        district: string;
        district_en: string | null;
        thana: string;
        thana_en: string | null;
        addressLine: string | null;
        addressLine_en: string | null;
        establishedYear: number | null;
    } | null;
    superAdminProfile: {
        name: string | null;
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        permissions: string[];
    } | null;
    staffDoctor: {
        name: string;
        id: string;
        profilePicture: string | null;
        phone: string;
        degree: string;
        speciality: string;
        tagline: string | null;
        username: string;
        gender: import("../../../generated/prisma/enums.js").Gender | null;
        religion: string | null;
    } | null;
    staffHospital: {
        name: string;
        id: string;
        slug: string;
    } | null;
} | null>;
//# sourceMappingURL=profileService.d.ts.map