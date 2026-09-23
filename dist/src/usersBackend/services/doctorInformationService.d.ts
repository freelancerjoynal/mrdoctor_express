import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface ProfileCaller {
    userId: string;
    role: UserRole;
}
export interface ExpertiseItem {
    icon: string;
    service: string;
    service_details: string;
}
export interface TimelineItem {
    year: string;
    title: string;
}
export interface HighlightItem {
    icon: string;
    text: string;
}
export interface StatItem {
    value: string;
    label: string;
}
export declare function normalizeExpertise(input: unknown): ExpertiseItem[];
export declare function normalizeTimeline(input: unknown): TimelineItem[];
export declare function normalizeHighlights(input: unknown): HighlightItem[];
export declare function normalizeStats(input: unknown): StatItem[];
export declare function getDoctorInformation(caller: ProfileCaller, explicitDoctorId?: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    expertise: import("@prisma/client/runtime/client").JsonValue;
    expertise_en: import("@prisma/client/runtime/client").JsonValue | null;
    timeline: import("@prisma/client/runtime/client").JsonValue;
    highlights: import("@prisma/client/runtime/client").JsonValue;
    highlights_en: import("@prisma/client/runtime/client").JsonValue | null;
    stats: import("@prisma/client/runtime/client").JsonValue;
    stats_en: import("@prisma/client/runtime/client").JsonValue | null;
    aboutImage: string | null;
} | null>;
export declare function upsertDoctorInformation(caller: ProfileCaller, input: {
    doctorId?: string;
    expertise?: unknown;
    expertise_en?: unknown;
    timeline?: unknown;
    highlights?: unknown;
    highlights_en?: unknown;
    stats?: unknown;
    stats_en?: unknown;
    aboutImage?: unknown;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    expertise: import("@prisma/client/runtime/client").JsonValue;
    expertise_en: import("@prisma/client/runtime/client").JsonValue | null;
    timeline: import("@prisma/client/runtime/client").JsonValue;
    highlights: import("@prisma/client/runtime/client").JsonValue;
    highlights_en: import("@prisma/client/runtime/client").JsonValue | null;
    stats: import("@prisma/client/runtime/client").JsonValue;
    stats_en: import("@prisma/client/runtime/client").JsonValue | null;
    aboutImage: string | null;
}>;
//# sourceMappingURL=doctorInformationService.d.ts.map