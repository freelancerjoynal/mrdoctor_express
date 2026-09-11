// Minimal controller for the single canonical profile endpoint.
// The route guard enforces authentication + role; the service enforces visibility.
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import { getProfileData } from '../services/profileService.js';

// GET /api/users/profile[?userId=] — own data for every role, others for SUPER_ADMIN only.
export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const raw = req.query.userId;
    const targetUserId = typeof raw === 'string' ? raw : undefined;

    const profile = await getProfileData(
      { userId: req.user!.userId, role: req.user!.role as UserRole },
      targetUserId,
    );

    if (!profile) return res.status(404).json({ error: 'User not found' });
    return res.json({ backend: 'usersBackend', profile });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') {
      return res.status(403).json({ error: 'You can only view your own profile' });
    }
    return res.status(500).json({ error: 'Failed to load profile' });
  }
};
