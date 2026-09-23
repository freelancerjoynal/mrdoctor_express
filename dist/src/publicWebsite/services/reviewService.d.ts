export interface ReviewPaging {
    page: number;
    limit: number;
}
export interface SubmitReviewInput {
    doctorUsername?: string;
    hospitalSlug?: string;
    reviewerName: string;
    reviewerPhone?: string;
    rating: number;
    title?: string;
    comment: string;
}
export declare function submitReview(input: SubmitReviewInput): Promise<{
    id: string;
    createdAt: Date;
    status: import("../../../generated/prisma/enums.js").ReviewStatus;
}>;
export declare function getDoctorSpotlightReviews(username: string, take?: number, pool?: number): Promise<{
    id: string;
    createdAt: Date;
    title: string | null;
    rating: number;
    reviewerName: string;
    comment: string;
}[] | null>;
export interface RatingSummary {
    average: number;
    count: number;
}
export declare function getDoctorRatingSummary(username: string): Promise<RatingSummary | null>;
export declare function getHospitalRatingSummary(slug: string): Promise<RatingSummary | null>;
export declare function getDoctorReviews(username: string, paging: ReviewPaging): Promise<{
    data: {
        id: string;
        createdAt: Date;
        title: string | null;
        rating: number;
        reviewerName: string;
        comment: string;
    }[];
    rating: RatingSummary;
    pagination: {
        total: number;
        totalPages: number;
        page: number;
        limit: number;
    };
} | null>;
export declare function getHospitalReviews(slug: string, paging: ReviewPaging): Promise<{
    data: {
        id: string;
        createdAt: Date;
        title: string | null;
        rating: number;
        reviewerName: string;
        comment: string;
    }[];
    rating: RatingSummary;
    pagination: {
        total: number;
        totalPages: number;
        page: number;
        limit: number;
    };
} | null>;
//# sourceMappingURL=reviewService.d.ts.map