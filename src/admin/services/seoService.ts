// Per-page SEO management (SUPER_ADMIN + ADMIN_MANAGER only).
// Own table — appointment and other hot paths never query seo_settings.
import { prisma } from '../../lib/prisma.js';

export const SEO_PAGE_TYPES = ['GLOBAL', 'LOCATION', 'DOCTOR', 'HOSPITAL'] as const;
export type SeoPageType = (typeof SEO_PAGE_TYPES)[number];

export function normalizeSeoKey(pageType: string, pageKey: string): { pageType: SeoPageType; pageKey: string } | null {
  const t = pageType.trim().toUpperCase();
  if (!(SEO_PAGE_TYPES as readonly string[]).includes(t)) return null;
  const k = pageType.trim().toUpperCase() === 'GLOBAL' ? 'home' : pageKey.trim().toLowerCase();
  if (!k) return null;
  return { pageType: t as SeoPageType, pageKey: k };
}

const clean = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.length > max ? t.slice(0, max) : t;
};

export async function listSeoSettings() {
  return prisma.seoSetting.findMany({ orderBy: [{ pageType: 'asc' }, { pageKey: 'asc' }] });
}

export async function getSeoSetting(pageType: SeoPageType, pageKey: string) {
  return prisma.seoSetting.findUnique({ where: { pageType_pageKey: { pageType, pageKey } } });
}

export async function deleteSeoSetting(pageType: SeoPageType, pageKey: string) {
  try {
    await prisma.seoSetting.delete({ where: { pageType_pageKey: { pageType, pageKey } } });
    return true;
  } catch {
    return false;
  }
}

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

export async function upsertSeoSetting(
  pageType: SeoPageType,
  pageKey: string,
  input: SeoUpsertInput,
  updatedBy?: string,
) {
  let extraJsonLd: object[] | null = null;
  if (Array.isArray(input.extraJsonLd)) {
    extraJsonLd = input.extraJsonLd.filter((b) => b && typeof b === 'object').slice(0, 5) as object[];
    if (extraJsonLd.length === 0) extraJsonLd = null;
  }
  return prisma.seoSetting.upsert({
    where: { pageType_pageKey: { pageType, pageKey } },
    create: {
      pageType,
      pageKey,
      title: clean(input.title, 120),
      h1: clean(input.h1, 200),
      siteName: clean(input.siteName, 120),
      description: clean(input.description, 320),
      keywords: clean(input.keywords, 500),
      ogTitle: clean(input.ogTitle, 120),
      ogDescription: clean(input.ogDescription, 320),
      ogImage: clean(input.ogImage, 1000),
      canonicalUrl: clean(input.canonicalUrl, 1000),
      robots: clean(input.robots, 200),
      extraJsonLd: extraJsonLd ?? undefined,
      updatedBy: updatedBy ?? null,
    },
    update: {
      title: clean(input.title, 120),
      h1: clean(input.h1, 200),
      siteName: clean(input.siteName, 120),
      description: clean(input.description, 320),
      keywords: clean(input.keywords, 500),
      ogTitle: clean(input.ogTitle, 120),
      ogDescription: clean(input.ogDescription, 320),
      ogImage: clean(input.ogImage, 1000),
      canonicalUrl: clean(input.canonicalUrl, 1000),
      robots: clean(input.robots, 200),
      ...(extraJsonLd !== null || Array.isArray(input.extraJsonLd)
        ? { extraJsonLd: extraJsonLd ?? [] }
        : {}),
      updatedBy: updatedBy ?? null,
    },
  });
}
