// Read-only portal customization for the location subdomains.
// Unauthenticated by design — hero image and texts are public content.
import { prisma } from '../../lib/prisma.js';

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

export async function getPortalSetting(slug: string) {
  const key = slug.trim().toLowerCase();
  if (!key) return null;
  return prisma.locationPortalSetting.findUnique({ where: { slug: key } });
}

export async function upsertPortalSetting(slug: string, input: PortalSettingInput, updatedBy?: string) {
  const key = slug.trim().toLowerCase();
  if (!key) throw new Error('Slug is required');
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
