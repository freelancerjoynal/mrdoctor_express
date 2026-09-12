// Thin controller for pending-appointment intake review.
// GET /api/users/appointments[?status=&doctorUsername=&hospitalSlug=&page=&limit=]
// PATCH /api/users/appointments/:id — { status: PENDING | CONFIRMED | CANCELLED }
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import { listAppointments, updateAppointmentStatus } from '../services/appointmentService.js';

function callerOf(req: AuthenticatedRequest) {
  return { userId: req.user!.userId, role: req.user!.role as UserRole };
}

function parsePaging(req: AuthenticatedRequest): { page: number; limit: number } {
  const rawPage = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
  const rawLimit = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
  return {
    page: Math.max(1, parseInt(typeof rawPage === 'string' ? rawPage : '1', 10) || 1),
    limit: Math.min(50, Math.max(1, parseInt(typeof rawLimit === 'string' ? rawLimit : '20', 10) || 20)),
  };
}

function parseOptional(req: AuthenticatedRequest, key: string): string | undefined {
  const raw = Array.isArray(req.query[key]) ? req.query[key][0] : req.query[key];
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed ? trimmed : undefined;
}

export const listUserAppointments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await listAppointments(callerOf(req), {
      ...parsePaging(req),
      status: parseOptional(req, 'status'),
      doctorUsername: parseOptional(req, 'doctorUsername'),
      hospitalSlug: parseOptional(req, 'hospitalSlug'),
    });
    return res.json({ backend: 'usersBackend', ...result });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    return res.status(500).json({ error: 'Failed to load appointments' });
  }
};

export const patchUserAppointment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = await updateAppointmentStatus(callerOf(req), req.params.id as string, req.body?.status);
    return res.json({ backend: 'usersBackend', data: updated });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'APPOINTMENT_NOT_FOUND') return res.status(404).json({ error: 'Appointment not found' });
    if (error.message === 'INVALID_STATUS')
      return res.status(400).json({ error: 'Status must be PENDING, CONFIRMED or CANCELLED' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    return res.status(500).json({ error: 'Failed to update appointment' });
  }
};
