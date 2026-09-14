// Thin controller for chambers + weekly schedules (timing / date availability).
// GET|POST /api/users/chambers — list / create
// PATCH|DELETE /api/users/chambers/:id — update / remove
// GET|POST /api/users/chambers/schedules — list / create (before "/:id")
// PATCH|DELETE /api/users/chambers/schedules/:id — update / remove
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import {
  listChambers,
  createChamber,
  updateChamber,
  deleteChamber,
  listHospitalOptions,
  listSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../services/chamberService.js';

function callerOf(req: AuthenticatedRequest) {
  return { userId: req.user!.userId, role: req.user!.role as UserRole };
}

function handleError(res: Response, error: any, fallback: string) {
  const code = error?.message as string | undefined;
  if (code === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
  if (code === 'NO_DOCTOR_PROFILE')
    return res.status(404).json({ error: 'No doctor profile linked to this user' });
  if (code === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'Doctor not found' });
  if (code === 'CHAMBER_NOT_FOUND') return res.status(404).json({ error: 'Chamber not found' });
  if (code === 'SCHEDULE_NOT_FOUND') return res.status(404).json({ error: 'Schedule not found' });
  if (code === 'HOSPITAL_NOT_FOUND') return res.status(404).json({ error: 'Hospital not found' });
  if (code === 'INVALID_CHAMBER_FIELD')
    return res.status(400).json({ error: 'Invalid chamber field. Chamber name or address is required; fees must be 0–100000.' });
  if (code === 'INVALID_SCHEDULE_FIELD')
    return res.status(400).json({ error: 'Invalid schedule. Day must be SATURDAY–FRIDAY and time HH:MM with start before end.' });
  if (code === 'NOTHING_TO_UPDATE') return res.status(400).json({ error: 'Nothing to update' });
  if (code === 'DAY_TAKEN')
    return res.status(409).json({ error: 'এই বারটি অন্য চেম্বারে ইতিমধ্যে নেওয়া আছে। একই বার দুই চেম্বারে রাখা যাবে না।' });
  return res.status(500).json({ error: fallback });
}

const doctorIdOf = (req: AuthenticatedRequest): string | undefined => {
  const raw = req.query.doctorId ?? req.body?.doctorId;
  return typeof raw === 'string' && raw.trim() ? raw.trim() : undefined;
};

export const listUserChambers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await listChambers(callerOf(req), doctorIdOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to load chambers');
  }
};

export const storeUserChamber = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await createChamber(callerOf(req), req.body ?? {});
    return res.status(201).json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to create chamber');
  }
};

export const modifyUserChamber = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await updateChamber(callerOf(req), req.params.id as string, req.body ?? {});
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to update chamber');
  }
};

export const removeUserChamber = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await deleteChamber(callerOf(req), req.params.id as string);
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to delete chamber');
  }
};

export const listUserHospitalOptions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const q = req.query as Record<string, unknown>;
    const str = (v: unknown): string | undefined =>
      typeof v === 'string' && v.trim() ? v.trim() : undefined;
    const data = await listHospitalOptions(callerOf(req), {
      search: str(q.search),
      division: str(q.division),
      district: str(q.district),
      thana: str(q.thana),
    });
    return res.json({ backend: 'usersBackend', data: data.data, facets: data.facets });
  } catch (error: any) {
    return handleError(res, error, 'Failed to load hospitals');
  }
};

export const listUserSchedules = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await listSchedules(callerOf(req), doctorIdOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to load schedules');
  }
};

export const storeUserSchedule = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await createSchedule(callerOf(req), req.body ?? {});
    return res.status(201).json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to create schedule');
  }
};

export const modifyUserSchedule = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await updateSchedule(callerOf(req), req.params.id as string, req.body ?? {});
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to update schedule');
  }
};

export const removeUserSchedule = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await deleteSchedule(callerOf(req), req.params.id as string);
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    return handleError(res, error, 'Failed to delete schedule');
  }
};
