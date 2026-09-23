export interface BlogSeed {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverGradient: string;
    coverSymbol: string;
    category: string;
    tags: string[];
    authorType: 'DOCTOR' | 'HOSPITAL' | 'SUPER_ADMIN';
    authorName: string;
    doctorUsername?: string;
    hospitalSlug?: string;
}
export declare const BLOG_SEEDS: BlogSeed[];
//# sourceMappingURL=blogSeedContent.d.ts.map