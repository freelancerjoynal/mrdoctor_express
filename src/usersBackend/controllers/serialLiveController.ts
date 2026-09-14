// Thin controller for the live serial scoreboard controls.
// GET /api/users/serial-live/status — own live state + today's queue snapshot.
// POST /api/users/serial-live/start|stop — doctor + staff run the board.
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import { getSerialLiveStatus, startSerialLive, stopSerialLive } from '../services/serialLiveService.js';

function callerOf(req: AuthenticatedRequest) {
  return { userId: req.user!.userId, role: req.user!.role as UserRole };
}

function handleError(res: Response, error: any, fallback: string) {
  const code = error?.message as string | undefined;
  if (code === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
  if (code === 'NO_DOCTOR_PROFILE')
    return res.status(404).json({ error: 'No doctor linked to this account' });
  return res.status(500).json({ error: fallback });
}

export const showSerialLiveStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getSerialLiveStatus(callerOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to load live status');
  }
};

export const runSerialLiveStart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await startSerialLive(callerOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to start live serial');
  }
};

export const runSerialLiveStop = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await stopSerialLive(callerOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to stop live serial');
  }
};
