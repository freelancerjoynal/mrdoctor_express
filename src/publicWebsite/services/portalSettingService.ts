// Public portal-customization read for the location subdomains.
// Unauthenticated by design — hero image and texts are public content.
import { prisma } from '../../lib/prisma.js';

export async function getPublicPortalSetting(slug: string) {
  const key = slug.trim().toLowerCase();
  if (!key) return null;
  return prisma.locationPortalSetting.findUnique({ where: { slug: key } });
}
