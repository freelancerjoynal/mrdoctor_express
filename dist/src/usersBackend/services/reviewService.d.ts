import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface ReviewCaller {
    userId: string;
    role: UserRole;
}
export declare function listReviews(caller: ReviewCaller, opts?: {
    status?: string;
    take?: number;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../../generated/prisma/enums.js").ReviewStatus;
    doctorId: string | null;
    hospitalId: string | null;
    source: string;
    title: string | null;
    rating: number;
    reviewerName: string;
    reviewerPhone: string | null;
    comment: string;
}[]>;
export declare function moderateReview(caller: ReviewCaller, id: string, status: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../../generated/prisma/enums.js").ReviewStatus;
    doctorId: string | null;
    hospitalId: string | null;
    source: string;
    title: string | null;
    rating: number;
    reviewerName: string;
    reviewerPhone: string | null;
    comment: string;
}>;
export declare function deleteReview(caller: ReviewCaller, id: string): Promise<{
    id: string;
}>;
//# sourceMappingURL=reviewService.d.ts.map