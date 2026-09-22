// Thin controller for the live serial scoreboard controls.
// GET /api/users/serial-live/status — own live state + today's queue snapshot.
// POST /api/users/serial-live/start|stop|skip|recall|break|break/end — doctor + staff run the board.
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import { getSerialLiveStatus, startSerialLive, stopSerialLive, skipCurrentSerial, recallSerial, startLiveBreak, endLiveBreak } from '../services/serialLiveService.js';

function callerOf(req: AuthenticatedRequest) {
  return { userId: req.user!.userId, role: req.user!.role as UserRole };
}

function handleError(res: Response, error: any, fallback: string) {
  const code = error?.message as string | undefined;
  if (code === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
  if (code === 'NO_DOCTOR_PROFILE')
    return res.status(404).json({ error: 'No doctor linked to this account' });
  if (code === 'NO_LIVE') return res.status(400).json({ error: 'লাইভ চালু নেই।' });
  if (code === 'NO_CURRENT') return res.status(400).json({ error: 'স্কিপ করার মতো সিরিয়াল নেই।' });
  if (code === 'NO_NEXT_SERIAL') return res.status(400).json({ error: 'এটাই শেষ সিরিয়াল — স্কিপ করা যাবে না।' });
  if (code === 'INVALID_BREAK') return res.status(400).json({ error: 'বিরতির সময় ১–১৮০ মিনিটের মধ্যে দিন।' });
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

export const runSerialLiveSkip = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await skipCurrentSerial(callerOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to skip serial');
  }
};

export const runSerialLiveRecall = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await recallSerial(callerOf(req), (req.body as { serial?: unknown } | undefined)?.serial);
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error?.message === 'RECALL_COOLDOWN') {
      const d = (error.detail ?? {}) as { patientName?: unknown; serial?: unknown; remainingMs?: unknown };
      const mins = typeof d.remainingMs === 'number' ? Math.max(1, Math.ceil(d.remainingMs / 60000)) : 20;
      const who = typeof d.patientName === 'string' && d.patientName.trim() ? d.patientName.trim() : 'রোগী';
      const serial = typeof d.serial === 'number' ? d.serial : '?';
      return res.status(400).json({
        error: `⏳ ${who} তার সিরিয়াল (${serial}) মিস করেছেন — শাস্তি হিসেবে আরো ${mins} মিনিট পর বোর্ডে আনা যাবে।`,
      });
    }
    if (error?.message === 'NOT_IN_QUEUE')
      return res.status(404).json({ error: 'এই সিরিয়াল আজকের তালিকায় নেই (সেবা হয়ে গেছে বা ভুল নম্বর)।' });
    if (error?.message === 'NOT_MISSED')
      return res.status(400).json({ error: 'এই সিরিয়াল মিস করেনি — বোর্ডে বা সামনে আছে।' });
    if (error?.message === 'INVALID_SERIAL')
      return res.status(400).json({ error: 'সঠিক সিরিয়াল নম্বর দিন।' });
    return handleError(res, error, 'Failed to recall serial');
  }
};

export const runLiveBreakStart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const body = (req.body ?? {}) as { reason?: unknown; minutes?: unknown };
    const data = await startLiveBreak(callerOf(req), body.reason, body.minutes);
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'বিরতি চালু করা যায়নি।');
  }
};

export const runLiveBreakEnd = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await endLiveBreak(callerOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'বিরতি শেষ করা যায়নি।');
  }
};
