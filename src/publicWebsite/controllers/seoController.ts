// Public SEO read: GET /api/website/seo?pageType=LOCATION&pageKey=nilphamari
// Unauthenticated by design. Missing row (null) → page renders auto defaults.
import type { Request, Response } from 'express';
import { getPublicSeo } from '../services/seoService.js';

export const getSeo = async (req: Request, res: Response) => {
  try {
    const data = await getPublicSeo(String(req.query.pageType ?? ''), String(req.query.pageKey ?? ''));
    return res.json({ backend: 'publicWebsite', data });
  } catch {
    return res.status(500).json({ error: 'Failed to load SEO' });
  }
};
