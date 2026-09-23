// Read-only portal customization for the location subdomains.
// Unauthenticated by design — hero image and texts are public content.
import { prisma } from '../../lib/prisma.js';
export async function getPortalSetting(slug) {
    const key = slug.trim().toLowerCase();
    if (!key)
        return null;
    return prisma.locationPortalSetting.findUnique({ where: { slug: key } });
}
export async function upsertPortalSetting(slug, input, updatedBy) {
    const key = slug.trim().toLowerCase();
    if (!key)
        throw new Error('Slug is required');
    const data = {
        division: input.division?.trim() || null,
        district: input.district?.trim() || null,
        thana: input.thana?.trim() || null,
        heroImage: input.heroImage?.trim() || null,
        headline: input.headline?.trim() || null,
        subheadline: input.subheadline?.trim() || null,
        description: input.description?.trim() || null,
        notice: input.notice?.trim() || null,
        updatedBy: updatedBy || null,
    };
    return prisma.locationPortalSetting.upsert({
        where: { slug: key },
        create: { slug: key, ...data },
        update: { ...data },
    });
}
export async function listPortalSettings() {
    return prisma.locationPortalSetting.findMany({ orderBy: { updatedAt: 'desc' } });
}
//# sourceMappingURL=locationSettingService.js.map