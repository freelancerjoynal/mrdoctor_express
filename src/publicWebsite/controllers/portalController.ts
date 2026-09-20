// Public thana-portal endpoint: categories + doctors + hospitals for one thana.
// Unauthenticated by design — everything returned is already public-safe.
import type { Request, Response } from 'express';
import { getThanaPortal } from '../services/portalService.js';

function parseOptional(req: Request, key: string): string | undefined {
  const raw = Array.isArray(req.query[key]) ? req.query[key][0] : req.query[key];
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed ? trimmed : undefined;
}

export const getPortal = async (req: Request, res: Response) => {
  try {
    const rawLimit = parseOptional(req, 'limit');
    const limit = rawLimit ? parseInt(rawLimit, 10) : 100;
    const result = await getThanaPortal({
      division: parseOptional(req, 'division'),
      district: parseOptional(req, 'district'),
      thana: parseOptional(req, 'thana'),
      districtWide: parseOptional(req, 'scope') === 'district',
      limit: Number.isFinite(limit) ? limit : 100,
    });
    return res.json({ backend: 'publicWebsite', ...result });
  } catch {
    return res.status(500).json({ error: 'Failed to load portal' });
  }
};
