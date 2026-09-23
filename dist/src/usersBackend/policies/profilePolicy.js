// NOTE: DOCTOR_STAFF / HOSPITAL_STAFF / BUSINESS_OWNER have no dedicated
// profile tables in the schema, so they resolve to their User row for now.
export const PROFILE_VISIBILITY = {
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
//# sourceMappingURL=profilePolicy.js.map