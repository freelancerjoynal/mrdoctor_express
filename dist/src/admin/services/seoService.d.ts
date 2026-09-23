export declare const SEO_PAGE_TYPES: readonly ["GLOBAL", "LOCATION", "DOCTOR", "HOSPITAL"];
export type SeoPageType = (typeof SEO_PAGE_TYPES)[number];
export declare function normalizeSeoKey(pageType: string, pageKey: string): {
    pageType: SeoPageType;
    pageKey: string;
} | null;
export declare function listSeoSettings(): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string | null;
    description: string | null;
    updatedBy: string | null;
    pageKey: string;
    pageType: import("../../../generated/prisma/enums.js").SeoPageType;
    h1: string | null;
    siteName: string | null;
    keywords: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    canonicalUrl: string | null;
    robots: string | null;
    extraJsonLd: import("@prisma/client/runtime/client").JsonValue | null;
}[]>;
export declare function getSeoSetting(pageType: SeoPageType, pageKey: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string | null;
    description: string | null;
    updatedBy: string | null;
    pageKey: string;
    pageType: import("../../../generated/prisma/enums.js").SeoPageType;
    h1: string | null;
    siteName: string | null;
    keywords: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    canonicalUrl: string | null;
    robots: string | null;
    extraJsonLd: import("@prisma/client/runtime/client").JsonValue | null;
} | null>;
export declare function deleteSeoSetting(pageType: SeoPageType, pageKey: string): Promise<boolean>;
export interface SeoUpsertInput {
    title?: unknown;
    h1?: unknown;
    siteName?: unknown;
    description?: unknown;
    keywords?: unknown;
    ogTitle?: unknown;
    ogDescription?: unknown;
    ogImage?: unknown;
    canonicalUrl?: unknown;
    robots?: unknown;
    extraJsonLd?: unknown;
}
export declare function upsertSeoSetting(pageType: SeoPageType, pageKey: string, input: SeoUpsertInput, updatedBy?: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string | null;
    description: string | null;
    updatedBy: string | null;
    pageKey: string;
    pageType: import("../../../generated/prisma/enums.js").SeoPageType;
    h1: string | null;
    siteName: string | null;
    keywords: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    canonicalUrl: string | null;
    robots: string | null;
    extraJsonLd: import("@prisma/client/runtime/client").JsonValue | null;
}>;
//# sourceMappingURL=seoService.d.ts.map