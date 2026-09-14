// Thin controller for the doctor_informations resource.
// GET  /api/users/doctor-information[?doctorId=] — own row for DOCTOR, any row for SUPER_ADMIN.
// PUT  /api/users/doctor-information — partial upsert of any groups:
// { doctorId?, expertise[], expertise_en[], timeline[], highlights[],
//   highlights_en[], stats[], stats_en[], aboutImage }.
import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../authentication/middleware/authMiddleware.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
import { getDoctorInformation, upsertDoctorInformation } from '../services/doctorInformationService.js';

function callerOf(req: AuthenticatedRequest) {
  return { userId: req.user!.userId, role: req.user!.role as UserRole };
}

export const showDoctorInformation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const raw = req.query.doctorId;
    const doctorId = typeof raw === 'string' && raw.trim() ? raw.trim() : undefined;
    const info = await getDoctorInformation(callerOf(req), doctorId);
    return res.json({ backend: 'usersBackend', data: info });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE')
      return res.status(404).json({ error: 'No doctor profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'Doctor not found' });
    return res.status(500).json({ error: 'Failed to load doctor information' });
  }
};

export const saveDoctorInformation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      doctorId,
      expertise,
      expertise_en,
      timeline,
      highlights,
      highlights_en,
      stats,
      stats_en,
      aboutImage,
    } = req.body ?? {};
    const info = await upsertDoctorInformation(callerOf(req), {
      doctorId,
      expertise,
      expertise_en,
      timeline,
      highlights,
      highlights_en,
      stats,
      stats_en,
      aboutImage,
    });
    return res.json({ backend: 'usersBackend', data: info });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NOTHING_TO_UPDATE')
      return res.status(400).json({ error: 'Nothing to update.' });
    if (error.message === 'INVALID_PAYLOAD')
      return res.status(400).json({
        error:
          'Invalid payload. Send any of { expertise[], timeline[], highlights: [{ icon, text }], stats: [{ value, label }], aboutImage }',
      });
    if (error.message === 'NO_DOCTOR_PROFILE')
      return res.status(404).json({ error: 'No doctor profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'Doctor not found' });
    return res.status(500).json({ error: 'Failed to save doctor information' });
  }
};
