// Thin controllers for the applications module.
// Public POST routes need no auth; everything else is SUPER_ADMIN-only
// (enforced by protectedRoute on the route).
import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../../authentication/middleware/authMiddleware.js';
import {
  submitDoctorApplication,
  submitHospitalApplication,
  listApplications,
  countPendingApplications,
  approveApplication,
  rejectApplication,
  createDoctor,
  createHospital,
} from '../services/applicationService.js';

function badRequest(res: Response, error: unknown) {
  const code = error instanceof Error ? error.message : 'FAILED';
  const map: Record<string, { status: number; error: string }> = {
    INVALID_EMAIL: { status: 400, error: 'সঠিক ইমেইল দিন।' },
    INVALID_PHONE: { status: 400, error: 'সঠিক ফোন নম্বর দিন।' },
    INVALID_NAME: { status: 400, error: 'সঠিক নাম দিন।' },
    INVALID_DEGREE: { status: 400, error: 'ডিগ্রি দিন।' },
    INVALID_SPECIALITY: { status: 400, error: 'বিশেষজ্ঞতা দিন।' },
    INVALID_USERNAME: { status: 400, error: 'সঠিক ইউজারনেম দিন (কমপক্ষে ৩ অক্ষর)।' },
    INVALID_SLUG: { status: 400, error: 'সঠিক স্লাগ দিন (কমপক্ষে ৩ অক্ষর)।' },
    INVALID_DIVISION: { status: 400, error: 'বিভাগ দিন।' },
    INVALID_DISTRICT: { status: 400, error: 'জেলা দিন।' },
    INVALID_THANA: { status: 400, error: 'থানা দিন।' },
    INVALID_INPUT: { status: 400, error: 'অনুগ্রহ করে সঠিক তথ্য দিন।' },
    PASSWORD_TOO_SHORT: { status: 400, error: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।' },
    ALREADY_APPLIED: { status: 409, error: 'এই ইমেইল থেকে ইতিমধ্যে একটি আবেদন জমা আছে।' },
    EMAIL_TAKEN: { status: 409, error: 'এই ইমেইলে ইতিমধ্যে অ্যাকাউন্ট আছে।' },
    USERNAME_TAKEN: { status: 409, error: 'এই ইউজারনেমটি নেওয়া হয়ে গেছে।' },
    SLUG_TAKEN: { status: 409, error: 'এই স্লাগটি নেওয়া হয়ে গেছে।' },
    APPLICATION_NOT_FOUND: { status: 404, error: 'আবেদন পাওয়া যায়নি।' },
    APPLICATION_INCOMPLETE: { status: 422, error: 'আবেদনের তথ্য অসম্পূর্ণ — সরাসরি তৈরি করুন।' },
  };
  const hit = map[code];
  if (hit) return res.status(hit.status).json({ error: hit.error, code });
  console.error('Application error:', error);
  return res.status(500).json({ error: 'কিছু ভুল হয়েছে। আবার চেষ্টা করুন।' });
}

// POST /api/applications/doctor — public
export const submitDoctor = async (req: Request, res: Response) => {
  try {
    const app = await submitDoctorApplication(req.body ?? {});
    return res.status(201).json({ success: true, message: 'আবেদন জমা হয়েছে! অনুমোদনের পর ইমেইলে লগইন তথ্য পাবেন।', data: { id: app.id } });
  } catch (error) {
    return badRequest(res, error);
  }
};

// POST /api/applications/hospital — public
export const submitHospital = async (req: Request, res: Response) => {
  try {
    const app = await submitHospitalApplication(req.body ?? {});
    return res.status(201).json({ success: true, message: 'আবেদন জমা হয়েছে! অনুমোদনের পর ইমেইলে লগইন তথ্য পাবেন।', data: { id: app.id } });
  } catch (error) {
    return badRequest(res, error);
  }
};

// GET /api/applications[?status=&type=] — SUPER_ADMIN
export const listAll = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await listApplications({
      status: (req.query as Record<string, unknown>).status,
      type: (req.query as Record<string, unknown>).type,
    });
    return res.json({ data });
  } catch (error) {
    return badRequest(res, error);
  }
};

// GET /api/applications/pending-count — SUPER_ADMIN
export const pendingCount = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    return res.json({ data: await countPendingApplications() });
  } catch (error) {
    return badRequest(res, error);
  }
};

// PATCH /api/applications/:id/approve — SUPER_ADMIN (creates account + emails credentials)
export const approve = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await approveApplication(String(req.params.id), req.user!.userId);
    return res.json({ success: true, message: 'অনুমোদন সম্পন্ন — লগইন তথ্য ইমেইলে পাঠানো হয়েছে।', data });
  } catch (error) {
    return badRequest(res, error);
  }
};

// PATCH /api/applications/:id/reject — SUPER_ADMIN
export const reject = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await rejectApplication(String(req.params.id), req.user!.userId);
    return res.json({ success: true, data });
  } catch (error) {
    return badRequest(res, error);
  }
};

// POST /api/applications/create-doctor — SUPER_ADMIN (no application needed)
export const createDoctorDirect = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await createDoctor(req.body ?? {});
    return res.status(201).json({ success: true, message: 'ডাক্তার অ্যাকাউন্ট তৈরি হয়েছে।', data });
  } catch (error) {
    return badRequest(res, error);
  }
};

// POST /api/applications/create-hospital — SUPER_ADMIN (no application needed)
export const createHospitalDirect = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await createHospital(req.body ?? {});
    return res.status(201).json({ success: true, message: 'হাসপাতাল অ্যাকাউন্ট তৈরি হয়েছে।', data });
  } catch (error) {
    return badRequest(res, error);
  }
};
