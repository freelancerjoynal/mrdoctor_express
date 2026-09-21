// Per-page SEO admin endpoints (SUPER_ADMIN + ADMIN_MANAGER).
// Mirrors the location-settings endpoints — same auth, same response shape.
import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../authentication/middleware/authMiddleware.js';
import {
  listSeoSettings,
  getSeoSetting,
  upsertSeoSetting,
  deleteSeoSetting,
  normalizeSeoKey,
} from '../services/seoService.js';

// GET /api/admin/seo — every customized page (null rows = auto defaults).
export const listSeo = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    return res.json({ data: await listSeoSettings() });
  } catch {
    return res.status(500).json({ error: 'Failed to load SEO settings' });
  }
};

// GET /api/admin/seo/:pageType/:pageKey — one page's SEO (null = defaults).
export const showSeo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const norm = normalizeSeoKey(String(req.params.pageType ?? ''), String(req.params.pageKey ?? ''));
    if (!norm) return res.status(400).json({ error: 'Invalid pageType or pageKey' });
    return res.json({ data: await getSeoSetting(norm.pageType, norm.pageKey) });
  } catch {
    return res.status(500).json({ error: 'Failed to load SEO setting' });
  }
};

// PUT /api/admin/seo/:pageType/:pageKey — upsert one page's SEO.
export const saveSeo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const norm = normalizeSeoKey(String(req.params.pageType ?? ''), String(req.params.pageKey ?? ''));
    if (!norm) return res.status(400).json({ error: 'Invalid pageType or pageKey' });
    const body = (req.body ?? {}) as Record<string, unknown>;
    const data = await upsertSeoSetting(
      norm.pageType,
      norm.pageKey,
      {
        title: body.title,
        h1: body.h1,
        siteName: body.siteName,
        description: body.description,
        keywords: body.keywords,
        ogTitle: body.ogTitle,
        ogDescription: body.ogDescription,
        ogImage: body.ogImage,
        canonicalUrl: body.canonicalUrl,
        robots: body.robots,
        extraJsonLd: body.extraJsonLd,
      },
      req.user?.userId,
    );
    return res.json({ data });
  } catch {
    return res.status(500).json({ error: 'Failed to save SEO setting' });
  }
};

// DELETE /api/admin/seo/:pageType/:pageKey — drop the override (auto defaults return).
export const removeSeo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const norm = normalizeSeoKey(String(req.params.pageType ?? ''), String(req.params.pageKey ?? ''));
    if (!norm) return res.status(400).json({ error: 'Invalid pageType or pageKey' });
    return res.json({ data: { removed: await deleteSeoSetting(norm.pageType, norm.pageKey) } });
  } catch {
    return res.status(500).json({ error: 'Failed to delete SEO setting' });
  }
};
