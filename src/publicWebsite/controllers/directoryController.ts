// Thin public controllers for the directory resource.
// No auth here by design — everything returned is already public-safe.
import type { Request, Response } from 'express';
import {
  getPublicDoctors,
  getPublicDoctorByUsername,
  getPublicHospitals,
  getPublicHospitalBySlug,
  getPublicChambers,
  getPublicChamberById,
} from '../services/directoryService.js';

function parsePaging(req: Request): { page: number; limit: number } {
  const rawPage = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
  const rawLimit = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
  const page = Math.max(1, parseInt(typeof rawPage === 'string' ? rawPage : '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(typeof rawLimit === 'string' ? rawLimit : '12', 10) || 12));
  return { page, limit };
}

function parseOptional(req: Request, key: string): string | undefined {
  const raw = Array.isArray(req.query[key]) ? req.query[key][0] : req.query[key];
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed ? trimmed : undefined;
}

export const listDoctors = async (req: Request, res: Response) => {
  try {
    const result = await getPublicDoctors({
      ...parsePaging(req),
      search: parseOptional(req, 'search'),
      speciality: parseOptional(req, 'speciality'),
      division: parseOptional(req, 'division'),
      district: parseOptional(req, 'district'),
      thana: parseOptional(req, 'thana'),
    });
    return res.json({ backend: 'publicWebsite', ...result });
  } catch {
    return res.status(500).json({ error: 'Failed to load doctors' });
  }
};

export const showDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await getPublicDoctorByUsername(req.params.username as string);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    return res.json({ backend: 'publicWebsite', data: doctor });
  } catch {
    return res.status(500).json({ error: 'Failed to load doctor' });
  }
};

export const listHospitals = async (req: Request, res: Response) => {
  try {
    const result = await getPublicHospitals({
      ...parsePaging(req),
      search: parseOptional(req, 'search'),
      division: parseOptional(req, 'division'),
      district: parseOptional(req, 'district'),
      thana: parseOptional(req, 'thana'),
    });
    return res.json({ backend: 'publicWebsite', ...result });
  } catch {
    return res.status(500).json({ error: 'Failed to load hospitals' });
  }
};

export const showHospital = async (req: Request, res: Response) => {
  try {
    const hospital = await getPublicHospitalBySlug(req.params.slug as string);
    if (!hospital) return res.status(404).json({ error: 'Hospital not found' });
    return res.json({ backend: 'publicWebsite', data: hospital });
  } catch {
    return res.status(500).json({ error: 'Failed to load hospital' });
  }
};

export const listChambers = async (req: Request, res: Response) => {
  try {
    const result = await getPublicChambers({
      ...parsePaging(req),
      search: parseOptional(req, 'search'),
      division: parseOptional(req, 'division'),
      district: parseOptional(req, 'district'),
      thana: parseOptional(req, 'thana'),
    });
    return res.json({ backend: 'publicWebsite', ...result });
  } catch {
    return res.status(500).json({ error: 'Failed to load chambers' });
  }
};

export const showChamber = async (req: Request, res: Response) => {
  try {
    const chamber = await getPublicChamberById(req.params.id as string);
    if (!chamber) return res.status(404).json({ error: 'Chamber not found' });
    return res.json({ backend: 'publicWebsite', data: chamber });
  } catch {
    return res.status(500).json({ error: 'Failed to load chamber' });
  }
};
