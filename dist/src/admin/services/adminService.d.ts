export declare const getAdminOverview: () => Promise<{
    users: Record<string, number>;
    doctors: {
        approved: number;
        pending: number;
        total: number;
    };
    hospitals: {
        approved: number;
        pending: number;
        total: number;
    };
    joinRequests: {
        pendingDoctors: number;
        pendingHospitals: number;
        pendingTotal: number;
        total: number;
    };
    blogsPublished: number;
    reviewsPending: number;
}>;
export interface DirectoryFilter {
    type?: unknown;
    division?: unknown;
    district?: unknown;
    thana?: unknown;
    speciality?: unknown;
    q?: unknown;
    take?: unknown;
}
/** Distinct location options for the admin filter dropdowns. */
export declare const getLocationOptions: () => Promise<{
    divisions: string[];
    districts: {
        division: string;
        districts: string[];
    }[];
    thanas: {
        district: string;
        thanas: string[];
    }[];
}>;
export declare const listDirectory: (filter: DirectoryFilter) => Promise<{
    name: string;
    id: string;
    phone: string | null;
    status: import("../../../generated/prisma/enums.js").HospitalStatus;
    _count: {
        chambers: number;
    };
    slug: string;
    division: string;
    district: string;
    thana: string;
    addressLine: string | null;
}[] | {
    name: string;
    id: string;
    profilePicture: string | null;
    phone: string;
    degree: string;
    speciality: string;
    username: string;
    businessCardImage: string | null;
    bannerCardImage: string | null;
    status: import("../../../generated/prisma/enums.js").DoctorStatus;
    chambers: {
        id: string;
        division: string | null;
        district: string | null;
        thana: string | null;
        hospitalId: string | null;
        chamberName: string | null;
    }[];
}[]>;
export declare const getDoctorOverview: (id: string) => Promise<{
    doctor: {
        user: {
            email: string;
        } | null;
        name: string;
        id: string;
        profilePicture: string | null;
        phone: string;
        degree: string;
        speciality: string;
        username: string;
        businessCardImage: string | null;
        bannerCardImage: string | null;
        bmdcNumber: string | null;
        status: import("../../../generated/prisma/enums.js").DoctorStatus;
        chambers: {
            id: string;
            hospital: {
                name: string;
                id: string;
                slug: string;
            } | null;
            division: string | null;
            district: string | null;
            thana: string | null;
            addressLine: string | null;
            chamberName: string | null;
            newPatientFee: number;
            oldPatientFee: number;
        }[];
    };
    bookings: {
        pending: number;
        confirmed: number;
        served: number;
    };
    income: {
        servedTotal: number;
        servedToday: number;
        pendingExpected: number;
    };
}>;
export declare const getHospitalOverview: (id: string) => Promise<{
    hospital: {
        user: {
            email: string;
        } | null;
        name: string;
        id: string;
        phone: string | null;
        businessCardImage: string | null;
        bannerCardImage: string | null;
        status: import("../../../generated/prisma/enums.js").HospitalStatus;
        _count: {
            chambers: number;
        };
        slug: string;
        division: string;
        district: string;
        thana: string;
        addressLine: string | null;
    };
    doctorsCount: number;
    bookings: {
        pending: number;
        confirmed: number;
        served: number;
    };
    income: {
        servedTotal: number;
        servedToday: number;
        pendingExpected: number;
        paidOut: number;
        onlineBalance: number;
        lifetimeOnline: number;
    };
}>;
//# sourceMappingURL=adminService.d.ts.map