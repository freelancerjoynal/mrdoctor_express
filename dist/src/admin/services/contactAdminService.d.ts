export declare const CONTACT_STATUSES: readonly ["NEW", "READ", "REPLIED", "ARCHIVED"];
export interface ContactListFilter {
    status?: unknown;
    topic?: unknown;
    q?: unknown;
    page?: unknown;
    limit?: unknown;
}
export declare function listContactMessages(filter: ContactListFilter): Promise<{
    data: {
        name: string;
        subject: string | null;
        message: string;
        id: string;
        email: string | null;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        source: string;
        topic: string;
    }[];
    counts: {
        [k: string]: number;
    };
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function updateContactStatus(id: string, status: unknown): Promise<{
    name: string;
    subject: string | null;
    message: string;
    id: string;
    email: string | null;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    source: string;
    topic: string;
}>;
//# sourceMappingURL=contactAdminService.d.ts.map