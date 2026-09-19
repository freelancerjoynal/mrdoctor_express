// SUPER_ADMIN-only income overview controllers.
// Mounted by src/usersBackend/routes/index.ts at /api/users/income.
import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../authentication/middleware/authMiddleware.js';
import { getIncomeOverview } from '../services/incomeOverviewService.js';

// GET /api/users/income/overview?scope=doctors|hospitals&period=daily|weekly|monthly&anchor=yyyy-mm-dd&search=&take=
export const showIncomeOverview = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const q = req.query as Record<string, unknown>;
    const data = await getIncomeOverview({
      scope: q.scope,
      period: q.period,
      anchor: q.anchor,
      search: q.search,
      take: q.take,
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error) {
    console.error('Income overview error:', error);
    return res.status(500).json({ error: 'Failed to load income overview' });
  }
};
