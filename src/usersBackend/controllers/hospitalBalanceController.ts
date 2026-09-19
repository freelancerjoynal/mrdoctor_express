// Thin controller for the hospital online-balance ledger.
// GET  /api/users/hospital-balance/summary[?hospitalId=] — currentBalance + today/week/month + ledger preview + payout preview (one round trip)
// GET  /api/users/hospital-balance/days[?hospitalId=][&page=&limit=] — frozen daily-ledger history
// GET  /api/users/hospital-balance/payouts[?hospitalId=][&page=&limit=] — payment history
// POST /api/users/hospital-balance/close — freeze finished days now (cron at 00:05; otherwise lazy)
// POST /api/users/hospital-balance/payouts — super-admin sends money (balance drops)
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import {
  getHospitalBalanceSummary,
  listOnlineDays,
  closeLedgerNow,
  listHospitalPayouts,
  createHospitalPayout,
  searchHospitalsForPayout,
} from '../services/hospitalBalanceService.js';

function callerOf(req: AuthenticatedRequest) {
  return { userId: req.user!.userId, role: req.user!.role as UserRole };
}

function parseOptional(req: AuthenticatedRequest, key: string): string | undefined {
  const raw = Array.isArray(req.query[key]) ? req.query[key][0] : req.query[key];
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed ? trimmed : undefined;
}

export const showHospitalBalanceSummary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getHospitalBalanceSummary(callerOf(req), {
      hospitalId: parseOptional(req, 'hospitalId'),
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    const msg = error?.message ?? 'UNKNOWN';
    if (msg === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (msg === 'NO_HOSPITAL_PROFILE') return res.status(404).json({ error: 'No profile linked to this user' });
    if (msg === 'HOSPITAL_REQUIRED') return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
    if (msg === 'HOSPITAL_NOT_FOUND') return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
    return res.status(500).json({ error: 'Failed to load balance' });
  }
};

export const showHospitalPayouts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawPage = parseOptional(req, 'page');
    const rawLimit = parseOptional(req, 'limit');
    const data = await listHospitalPayouts(callerOf(req), {
      hospitalId: parseOptional(req, 'hospitalId'),
      page: rawPage ? parseInt(rawPage, 10) : 1,
      limit: rawLimit ? parseInt(rawLimit, 10) : 20,
    });
    return res.json({ backend: 'usersBackend', ...data });
  } catch (error: any) {
    const msg = error?.message ?? 'UNKNOWN';
    if (msg === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (msg === 'NO_HOSPITAL_PROFILE') return res.status(404).json({ error: 'No profile linked to this user' });
    if (msg === 'HOSPITAL_REQUIRED') return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
    if (msg === 'HOSPITAL_NOT_FOUND') return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
    return res.status(500).json({ error: 'Failed to load payouts' });
  }
};

export const showOnlineDays = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawPage = parseOptional(req, 'page');
    const rawLimit = parseOptional(req, 'limit');
    const data = await listOnlineDays(callerOf(req), {
      hospitalId: parseOptional(req, 'hospitalId'),
      page: rawPage ? parseInt(rawPage, 10) : 1,
      limit: rawLimit ? parseInt(rawLimit, 10) : 14,
    });
    return res.json({ backend: 'usersBackend', ...data });
  } catch (error: any) {
    const msg = error?.message ?? 'UNKNOWN';
    if (msg === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (msg === 'NO_HOSPITAL_PROFILE') return res.status(404).json({ error: 'No profile linked to this user' });
    if (msg === 'HOSPITAL_REQUIRED') return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
    if (msg === 'HOSPITAL_NOT_FOUND') return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
    return res.status(500).json({ error: 'Failed to load ledger' });
  }
};

export const postCloseLedger = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await closeLedgerNow(callerOf(req), { hospitalId: parseOptional(req, 'hospitalId') ?? req.body?.hospitalId });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    const msg = error?.message ?? 'UNKNOWN';
    if (msg === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (msg === 'NO_HOSPITAL_PROFILE') return res.status(404).json({ error: 'No profile linked to this user' });
    if (msg === 'HOSPITAL_REQUIRED') return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
    if (msg === 'HOSPITAL_NOT_FOUND') return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
    return res.status(500).json({ error: 'Failed to close ledger' });
  }
};

export const postHospitalPayout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const created = await createHospitalPayout(callerOf(req), {
      hospitalId: req.body?.hospitalId,
      amount: req.body?.amount,
      method: req.body?.method,
      note: req.body?.note,
    });
    return res.status(201).json({ backend: 'usersBackend', data: created });
  } catch (error: any) {
    const msg = error?.message ?? 'UNKNOWN';
    if (msg === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (msg === 'HOSPITAL_REQUIRED') return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
    if (msg === 'HOSPITAL_NOT_FOUND') return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
    if (msg === 'INVALID_AMOUNT') return res.status(400).json({ error: 'সঠিক টাকার পরিমাণ দিন।' });
    return res.status(500).json({ error: 'Failed to create payout' });
  }
};

// GET /api/users/hospital-balance/hospitals?search= — super-admin picker (id + name).
export const searchHospitals = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await searchHospitalsForPayout(callerOf(req), parseOptional(req, 'search'));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error?.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    return res.status(500).json({ error: 'Failed to load hospitals' });
  }
};
