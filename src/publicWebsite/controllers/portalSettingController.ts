// Public thana-portal customization: hero image + texts set by super-admin.
// Unauthenticated by design. Missing row → portal renders with defaults.
import type { Request, Response } from 'express';
import { getPublicPortalSetting } from '../services/portalSettingService.js';

export const getPortalSetting = async (req: Request, res: Response) => {
  try {
    const data = await getPublicPortalSetting(String(req.params.slug ?? ''));
    return res.json({ backend: 'publicWebsite', data });
  } catch {
    return res.status(500).json({ error: 'Failed to load portal setting' });
  }
};
