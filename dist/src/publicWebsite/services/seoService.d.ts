export declare function getPublicSeo(pageType: string, pageKey: string): Promise<{
    updatedAt: Date;
    title: string | null;
    description: string | null;
    h1: string | null;
    siteName: string | null;
    keywords: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    canonicalUrl: string | null;
    robots: string | null;
    extraJsonLd: import("@prisma/client/runtime/client").JsonValue;
} | null>;
//# sourceMappingURL=seoService.d.ts.map