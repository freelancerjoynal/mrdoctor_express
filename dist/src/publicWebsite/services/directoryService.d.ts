export interface DirectoryPaging {
    page: number;
    limit: number;
}
export interface DoctorFilters extends DirectoryPaging {
    search?: string;
    speciality?: string;
    division?: string;
    district?: string;
    thana?: string;
}
export interface HospitalFilters extends DirectoryPaging {
    search?: string;
    division?: string;
    district?: string;
    thana?: string;
}
export interface ChamberFilters extends DirectoryPaging {
    search?: string;
    division?: string;
    district?: string;
    thana?: string;
}
export interface BlogFilters extends DirectoryPaging {
    search?: string;
    category?: string;
    authorType?: string;
    doctorUsername?: string;
    hospitalSlug?: string;
}
export declare function getPublicDoctors(filters: DoctorFilters): Promise<{
    data: {
        name: string;
        profilePicture: string | null;
        degree: string;
        speciality: string;
        tagline: string | null;
        bio: string | null;
        username: string;
        gender: import("../../../generated/prisma/enums.js").Gender | null;
        startedYear: number | null;
        bmdcNumber: string | null;
        chambers: {
            id: string;
            hospital: {
                name: string;
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
        schedules: {
            chamber: {
                id: string;
                chamberName: string | null;
            } | null;
            dayOfWeek: import("../../../generated/prisma/enums.js").DayOfWeek;
            startTime: string;
            endTime: string;
        }[];
        information: {
            updatedAt: Date;
            expertise: import("@prisma/client/runtime/client").JsonValue;
            expertise_en: import("@prisma/client/runtime/client").JsonValue;
            timeline: import("@prisma/client/runtime/client").JsonValue;
            highlights: import("@prisma/client/runtime/client").JsonValue;
            highlights_en: import("@prisma/client/runtime/client").JsonValue;
            stats: import("@prisma/client/runtime/client").JsonValue;
            stats_en: import("@prisma/client/runtime/client").JsonValue;
            aboutImage: string | null;
        } | null;
        blogs: {
            id: string;
            slug: string;
            title: string;
            excerpt: string | null;
            content: string;
            coverImage: string | null;
            coverGradient: string;
            coverSymbol: string;
            category: string;
            tags: string[];
            authorName: string | null;
            publishedAt: Date | null;
            views: number;
        }[];
        reviews: {
            id: string;
            createdAt: Date;
            title: string | null;
            rating: number;
            reviewerName: string;
            comment: string;
        }[];
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function getPublicDoctorByUsername(username: string): Promise<{
    rating: {
        average: number;
        count: number;
    };
    name: string;
    profilePicture: string | null;
    degree: string;
    speciality: string;
    tagline: string | null;
    bio: string | null;
    username: string;
    gender: import("../../../generated/prisma/enums.js").Gender | null;
    startedYear: number | null;
    bmdcNumber: string | null;
    chambers: {
        id: string;
        hospital: {
            name: string;
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
    schedules: {
        chamber: {
            id: string;
            chamberName: string | null;
        } | null;
        dayOfWeek: import("../../../generated/prisma/enums.js").DayOfWeek;
        startTime: string;
        endTime: string;
    }[];
    information: {
        updatedAt: Date;
        expertise: import("@prisma/client/runtime/client").JsonValue;
        expertise_en: import("@prisma/client/runtime/client").JsonValue;
        timeline: import("@prisma/client/runtime/client").JsonValue;
        highlights: import("@prisma/client/runtime/client").JsonValue;
        highlights_en: import("@prisma/client/runtime/client").JsonValue;
        stats: import("@prisma/client/runtime/client").JsonValue;
        stats_en: import("@prisma/client/runtime/client").JsonValue;
        aboutImage: string | null;
    } | null;
    blogs: {
        id: string;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        coverImage: string | null;
        coverGradient: string;
        coverSymbol: string;
        category: string;
        tags: string[];
        authorName: string | null;
        publishedAt: Date | null;
        views: number;
    }[];
    reviews: {
        id: string;
        createdAt: Date;
        title: string | null;
        rating: number;
        reviewerName: string;
        comment: string;
    }[];
} | null>;
export declare function getPublicHospitals(filters: HospitalFilters): Promise<{
    data: {
        address: string | null;
        name: string;
        phone: string | null;
        chambers: {
            id: string;
            doctor: {
                name: string;
                profilePicture: string | null;
                degree: string;
                speciality: string;
                tagline: string | null;
                username: string;
                gender: import("../../../generated/prisma/enums.js").Gender | null;
            } | null;
            division: string | null;
            district: string | null;
            thana: string | null;
            addressLine: string | null;
            chamberName: string | null;
            newPatientFee: number;
            oldPatientFee: number;
        }[];
        blogs: {
            id: string;
            slug: string;
            title: string;
            excerpt: string | null;
            content: string;
            coverImage: string | null;
            coverGradient: string;
            coverSymbol: string;
            category: string;
            tags: string[];
            authorName: string | null;
            publishedAt: Date | null;
            views: number;
        }[];
        reviews: {
            id: string;
            createdAt: Date;
            title: string | null;
            rating: number;
            reviewerName: string;
            comment: string;
        }[];
        slug: string;
        establishedYear: number | null;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function getPublicHospitalBySlug(slug: string): Promise<{
    rating: {
        average: number;
        count: number;
    };
    address: string | null;
    name: string;
    phone: string | null;
    chambers: {
        id: string;
        doctor: {
            name: string;
            profilePicture: string | null;
            degree: string;
            speciality: string;
            tagline: string | null;
            username: string;
            gender: import("../../../generated/prisma/enums.js").Gender | null;
        } | null;
        division: string | null;
        district: string | null;
        thana: string | null;
        addressLine: string | null;
        chamberName: string | null;
        newPatientFee: number;
        oldPatientFee: number;
    }[];
    blogs: {
        id: string;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        coverImage: string | null;
        coverGradient: string;
        coverSymbol: string;
        category: string;
        tags: string[];
        authorName: string | null;
        publishedAt: Date | null;
        views: number;
    }[];
    reviews: {
        id: string;
        createdAt: Date;
        title: string | null;
        rating: number;
        reviewerName: string;
        comment: string;
    }[];
    slug: string;
    establishedYear: number | null;
} | null>;
export declare function getPublicChambers(filters: ChamberFilters): Promise<{
    data: {
        id: string;
        doctor: {
            name: string;
            profilePicture: string | null;
            degree: string;
            speciality: string;
            tagline: string | null;
            username: string;
            gender: import("../../../generated/prisma/enums.js").Gender | null;
        } | null;
        hospital: {
            name: string;
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
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function getPublicChamberById(id: string): Promise<{
    id: string;
    doctor: {
        name: string;
        profilePicture: string | null;
        degree: string;
        speciality: string;
        tagline: string | null;
        username: string;
        gender: import("../../../generated/prisma/enums.js").Gender | null;
    } | null;
    hospital: {
        name: string;
        slug: string;
    } | null;
    division: string | null;
    district: string | null;
    thana: string | null;
    addressLine: string | null;
    chamberName: string | null;
    newPatientFee: number;
    oldPatientFee: number;
} | null>;
export declare function getPublicBlogs(filters: BlogFilters): Promise<{
    data: {
        id: string;
        doctor: {
            name: string;
            speciality: string;
            username: string;
        } | null;
        hospital: {
            name: string;
            slug: string;
        } | null;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        coverImage: string | null;
        coverGradient: string;
        coverSymbol: string;
        category: string;
        tags: string[];
        authorType: import("../../../generated/prisma/enums.js").BlogAuthorType;
        authorName: string | null;
        publishedAt: Date | null;
        views: number;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function getPublicBlogBySlug(slug: string): Promise<{
    id: string;
    doctor: {
        name: string;
        speciality: string;
        username: string;
    } | null;
    hospital: {
        name: string;
        slug: string;
    } | null;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    coverGradient: string;
    coverSymbol: string;
    category: string;
    tags: string[];
    authorType: import("../../../generated/prisma/enums.js").BlogAuthorType;
    authorName: string | null;
    publishedAt: Date | null;
    views: number;
} | null>;
export declare function getPublicHospitalBlogs(slug: string, take?: number): Promise<{
    id: string;
    doctor: {
        name: string;
        speciality: string;
        username: string;
    } | null;
    hospital: {
        name: string;
        slug: string;
    } | null;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    coverGradient: string;
    coverSymbol: string;
    category: string;
    tags: string[];
    authorType: import("../../../generated/prisma/enums.js").BlogAuthorType;
    authorName: string | null;
    publishedAt: Date | null;
    views: number;
}[] | null>;
export declare function getPublicDoctorBlogs(username: string, take?: number): Promise<{
    id: string;
    doctor: {
        name: string;
        speciality: string;
        username: string;
    } | null;
    hospital: {
        name: string;
        slug: string;
    } | null;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    coverGradient: string;
    coverSymbol: string;
    category: string;
    tags: string[];
    authorType: import("../../../generated/prisma/enums.js").BlogAuthorType;
    authorName: string | null;
    publishedAt: Date | null;
    views: number;
}[] | null>;
//# sourceMappingURL=directoryService.d.ts.map