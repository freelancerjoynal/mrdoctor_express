// SSE stream handlers — the server side of the websocket-style push.
// Clients open one long-lived GET and receive `data: {types, at}` frames
// only when a mutation touches their scope. Heartbeat comments keep
// proxies from closing idle connections.
import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../authentication/middleware/authMiddleware.js';
import { isAdminRole } from '../authentication/middleware/authMiddleware.js';
import { prisma } from '../lib/prisma.js';
import { subscribe, doctorChannel, hospitalChannel, GLOBAL_CHANNEL, type RealtimeEvent } from './events.js';

const HEARTBEAT_MS = 25000;

function openStream(res: Response): void {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.write(': stream open\n\n');
}

function attachConnection(req: Request, res: Response, channels: string[], filter?: (e: RealtimeEvent) => boolean): void {
  const send = (event: RealtimeEvent) => {
    try {
      if (filter && !filter(event)) return;
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    } catch {
      /* closed connection — cleanup runs on 'close' */
    }
  };
  const unsubscribe = subscribe(channels, send);
  const beat = setInterval(() => {
    try {
      res.write(': ping\n\n');
    } catch {
      /* closed connection — cleanup runs on 'close' */
    }
  }, HEARTBEAT_MS);
  req.on('close', () => {
    clearInterval(beat);
    unsubscribe();
  });
}

/**
 * GET /api/users/stream — authenticated dashboard stream.
 * Scope mirrors the appointment ownership rules: doctors (+ their staff)
 * listen on their doctor channel, hospital desks on their hospital channel,
 * super-admins on the global channel.
 */
export const handleUserStream = async (req: AuthenticatedRequest, res: Response) => {
  const role = req.user!.role as string;
  const userId = req.user!.userId;
  try {
    let channels: string[] = [];
    if (isAdminRole(role)) {
      channels = [GLOBAL_CHANNEL];
    } else if (role === 'DOCTOR') {
      const own = await prisma.user.findUnique({
        where: { id: userId },
        select: { doctorProfile: { select: { id: true } } },
      });
      const id = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
      if (id) channels = [doctorChannel(id)];
    } else if (role === 'DOCTOR_STAFF') {
      const own = await prisma.user.findUnique({
        where: { id: userId },
        select: { staffDoctorId: true },
      });
      const id = (own as { staffDoctorId?: string | null } | null)?.staffDoctorId;
      if (id) channels = [doctorChannel(id)];
    } else if (role === 'HOSPITAL') {
      const own = await prisma.user.findUnique({
        where: { id: userId },
        select: { hospitalProfile: { select: { id: true } } },
      });
      const id = (own as { hospitalProfile?: { id: string } | null } | null)?.hospitalProfile?.id;
      if (id) channels = [hospitalChannel(id)];
    } else if (role === 'HOSPITAL_STAFF') {
      const own = await prisma.user.findUnique({
        where: { id: userId },
        select: { staffHospitalId: true },
      });
      const id = (own as { staffHospitalId?: string | null } | null)?.staffHospitalId;
      if (id) channels = [hospitalChannel(id)];
    }
    openStream(res);
    attachConnection(req, res, channels);
    return;
  } catch {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Stream unavailable' });
    } else {
      try {
        res.end();
      } catch {
        /* ignore */
      }
    }
    return;
  }
};

/**
 * GET /api/website/doctors/:username/stream — public live-board stream.
 * Only `live` frames for that doctor are forwarded (no booking data leaks).
 */
export const handlePublicLiveStream = async (req: Request, res: Response) => {
  const username = String((req.params as { username?: unknown }).username ?? '')
    .trim()
    .toLowerCase();
  if (!username) {
    res.status(400).json({ error: 'Doctor username required' });
    return;
  }
  try {
    const doctor = await prisma.doctor.findFirst({
      where: { username },
      select: { id: true },
    });
    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found' });
      return;
    }
    openStream(res);
    attachConnection(req, res, [doctorChannel(doctor.id)], (event) => event.types.includes('live'));
    return;
  } catch {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Stream unavailable' });
    } else {
      try {
        res.end();
      } catch {
        /* ignore */
      }
    }
    return;
  }
};
