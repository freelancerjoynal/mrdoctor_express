import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../authentication/middleware/authMiddleware.js';
/**
 * GET /api/users/stream — authenticated dashboard stream.
 * Scope mirrors the appointment ownership rules: doctors (+ their staff)
 * listen on their doctor channel, hospital desks on their hospital channel,
 * super-admins on the global channel.
 */
export declare const handleUserStream: (req: AuthenticatedRequest, res: Response) => Promise<void>;
/**
 * GET /api/website/doctors/:username/stream — public live-board stream.
 * Only `live` frames for that doctor are forwarded (no booking data leaks).
 */
export declare const handlePublicLiveStream: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=streamController.d.ts.map