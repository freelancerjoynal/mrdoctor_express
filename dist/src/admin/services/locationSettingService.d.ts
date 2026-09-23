export interface PortalSettingInput {
    division?: string | null;
    district?: string | null;
    thana?: string | null;
    heroImage?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    description?: string | null;
    notice?: string | null;
}
export declare function getPortalSetting(slug: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    division: string | null;
    district: string | null;
    thana: string | null;
    heroImage: string | null;
    headline: string | null;
    subheadline: string | null;
    description: string | null;
    notice: string | null;
    updatedBy: string | null;
} | null>;
export declare function upsertPortalSetting(slug: string, input: PortalSettingInput, updatedBy?: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    division: string | null;
    district: string | null;
    thana: string | null;
    heroImage: string | null;
    headline: string | null;
    subheadline: string | null;
    description: string | null;
    notice: string | null;
    updatedBy: string | null;
}>;
export declare function listPortalSettings(): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    division: string | null;
    district: string | null;
    thana: string | null;
    heroImage: string | null;
    headline: string | null;
    subheadline: string | null;
    description: string | null;
    notice: string | null;
    updatedBy: string | null;
}[]>;
//# sourceMappingURL=locationSettingService.d.ts.map