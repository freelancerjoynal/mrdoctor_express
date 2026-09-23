export declare const REVIEWER_NAMES: string[];
export interface ReviewComment {
    rating: number;
    title?: string;
    comment: string;
}
export declare const REVIEW_COMMENTS: ReviewComment[];
export declare const HOSPITAL_COMMENTS: ReviewComment[];
export interface DummyReview {
    rating: number;
    reviewerName: string;
    title?: string;
    comment: string;
    status: 'APPROVED' | 'PENDING';
    daysAgo: number;
}
/** 3–5 reviews per profile — ~1 in 10 stays PENDING to demo moderation. */
export declare function buildDummyReviews(index: number, hospital?: boolean): DummyReview[];
//# sourceMappingURL=reviewSeedContent.d.ts.map