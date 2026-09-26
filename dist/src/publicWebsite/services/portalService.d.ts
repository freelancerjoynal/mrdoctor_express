export interface PortalFilters {
    division?: string;
    district?: string;
    thana?: string;
    /** Whole-district portal (`?scope=district`) — thana skipped. */
    districtWide?: boolean;
    limit?: number;
}
export interface PortalCategory {
    speciality: string;
    doctors: number;
}
export declare function getThanaPortal(filters: PortalFilters): Promise<{
    data: {
        categories: PortalCategory[];
        doctors: any[];
        doctorsTotal: number;
        hospitals: {
            address: string | null;
            name: string;
            phone: string | null;
            businessCardImage: string | null;
            bannerCardImage: string | null;
            chambers: {
                id: string;
                doctor: {
                    name: string;
                    profilePicture: string | null;
                    degree: string;
                    speciality: string;
                    tagline: string | null;
                    username: string;
                    businessCardImage: string | null;
                    bannerCardImage: string | null;
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
        hospitalsTotal: number;
        chambers: number;
    };
}>;
//# sourceMappingURL=portalService.d.ts.map