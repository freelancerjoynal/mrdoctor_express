import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface BlogCaller {
    userId: string;
    role: UserRole;
}
export type BlogAuthorType = 'DOCTOR' | 'HOSPITAL' | 'SUPER_ADMIN';
export type BlogStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export interface BlogInput {
    slug?: string;
    title: string;
    excerpt?: string;
    content: string;
    coverImage?: string;
    coverGradient?: string;
    coverSymbol?: string;
    category?: string;
    tags?: unknown;
    authorType?: BlogAuthorType;
    authorName?: string;
    doctorId?: string;
    hospitalId?: string;
    status?: BlogStatus;
}
export declare function listBlogs(caller: BlogCaller, opts?: {
    status?: string;
    take?: number;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../../generated/prisma/enums.js").BlogStatus;
    slug: string;
    doctorId: string | null;
    hospitalId: string | null;
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
    authorUserId: string | null;
    publishedAt: Date | null;
    views: number;
}[]>;
export declare function getBlog(caller: BlogCaller, id: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../../generated/prisma/enums.js").BlogStatus;
    slug: string;
    doctorId: string | null;
    hospitalId: string | null;
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
    authorUserId: string | null;
    publishedAt: Date | null;
    views: number;
}>;
export declare function createBlog(caller: BlogCaller, input: BlogInput): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../../generated/prisma/enums.js").BlogStatus;
    slug: string;
    doctorId: string | null;
    hospitalId: string | null;
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
    authorUserId: string | null;
    publishedAt: Date | null;
    views: number;
}>;
export declare function updateBlog(caller: BlogCaller, id: string, input: BlogInput): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../../generated/prisma/enums.js").BlogStatus;
    slug: string;
    doctorId: string | null;
    hospitalId: string | null;
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
    authorUserId: string | null;
    publishedAt: Date | null;
    views: number;
}>;
export declare function deleteBlog(caller: BlogCaller, id: string): Promise<{
    id: string;
}>;
//# sourceMappingURL=blogService.d.ts.map