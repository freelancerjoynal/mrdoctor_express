// Isolated controller for the authenticated profile resource.
// Extracted from the old inline handler in src/routes/profile/profile.ts
// so routes stay thin, like whatsappChatbot and publicWebsite.
import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/authMiddleware.js';

export const getProfile = (req: AuthenticatedRequest, res: Response) => {
  // Accessing user data attached by the protectedRoute middleware
  res.json({
    message: 'Protected data accessed successfully',
    user: req.user
  });
};
