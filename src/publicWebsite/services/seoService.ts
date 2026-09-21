// Public per-page SEO read — single row per page render.
// Unauthenticated by design (meta tags are public content).
// Only the fields the website needs are selected; heavy appointment
// tables are never touched by this query.
import { prisma } from '../../lib/prisma.js';
import { SEO_PAGE_TYPES } from '../../admin/services/seoService.js';

export async function getPublicSeo(pageType: string, pageKey: string) {
  const t = pageType.trim().toUpperCase();
  if (!(SEO_PAGE_TYPES as readonly string[]).includes(t)) return null;
  const k = t === 'GLOBAL' ? 'home' : pageKey.trim().toLowerCase();
  if (!k) return null;
  return prisma.seoSetting.findUnique({
    where: { pageType_pageKey: { pageType: t as (typeof SEO_PAGE_TYPES)[number], pageKey: k } },
    select: {
      title: true,
      h1: true,
      siteName: true,
      description: true,
      keywords: true,
      ogTitle: true,
      ogDescription: true,
      ogImage: true,
      canonicalUrl: true,
      robots: true,
      extraJsonLd: true,
      updatedAt: true,
    },
  });
}
