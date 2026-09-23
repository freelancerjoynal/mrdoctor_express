import { getHospitalBalanceSummary, listOnlineDays, closeLedgerNow, listHospitalPayouts, createHospitalPayout, searchHospitalsForPayout, } from '../services/hospitalBalanceService.js';
function callerOf(req) {
    return { userId: req.user.userId, role: req.user.role };
}
function parseOptional(req, key) {
    const raw = Array.isArray(req.query[key]) ? req.query[key][0] : req.query[key];
    if (typeof raw !== 'string')
        return undefined;
    const trimmed = raw.trim();
    return trimmed ? trimmed : undefined;
}
export const showHospitalBalanceSummary = async (req, res) => {
    try {
        const data = await getHospitalBalanceSummary(callerOf(req), {
            hospitalId: parseOptional(req, 'hospitalId'),
        });
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        const msg = error?.message ?? 'UNKNOWN';
        if (msg === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        if (msg === 'NO_HOSPITAL_PROFILE')
            return res.status(404).json({ error: 'No profile linked to this user' });
        if (msg === 'HOSPITAL_REQUIRED')
            return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
        if (msg === 'HOSPITAL_NOT_FOUND')
            return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
        return res.status(500).json({ error: 'Failed to load balance' });
    }
};
export const showHospitalPayouts = async (req, res) => {
    try {
        const rawPage = parseOptional(req, 'page');
        const rawLimit = parseOptional(req, 'limit');
        const data = await listHospitalPayouts(callerOf(req), {
            hospitalId: parseOptional(req, 'hospitalId'),
            page: rawPage ? parseInt(rawPage, 10) : 1,
            limit: rawLimit ? parseInt(rawLimit, 10) : 20,
        });
        return res.json({ backend: 'usersBackend', ...data });
    }
    catch (error) {
        const msg = error?.message ?? 'UNKNOWN';
        if (msg === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        if (msg === 'NO_HOSPITAL_PROFILE')
            return res.status(404).json({ error: 'No profile linked to this user' });
        if (msg === 'HOSPITAL_REQUIRED')
            return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
        if (msg === 'HOSPITAL_NOT_FOUND')
            return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
        return res.status(500).json({ error: 'Failed to load payouts' });
    }
};
export const showOnlineDays = async (req, res) => {
    try {
        const rawPage = parseOptional(req, 'page');
        const rawLimit = parseOptional(req, 'limit');
        const data = await listOnlineDays(callerOf(req), {
            hospitalId: parseOptional(req, 'hospitalId'),
            page: rawPage ? parseInt(rawPage, 10) : 1,
            limit: rawLimit ? parseInt(rawLimit, 10) : 14,
        });
        return res.json({ backend: 'usersBackend', ...data });
    }
    catch (error) {
        const msg = error?.message ?? 'UNKNOWN';
        if (msg === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        if (msg === 'NO_HOSPITAL_PROFILE')
            return res.status(404).json({ error: 'No profile linked to this user' });
        if (msg === 'HOSPITAL_REQUIRED')
            return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
        if (msg === 'HOSPITAL_NOT_FOUND')
            return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
        return res.status(500).json({ error: 'Failed to load ledger' });
    }
};
export const postCloseLedger = async (req, res) => {
    try {
        const data = await closeLedgerNow(callerOf(req), { hospitalId: parseOptional(req, 'hospitalId') ?? req.body?.hospitalId });
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        const msg = error?.message ?? 'UNKNOWN';
        if (msg === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        if (msg === 'NO_HOSPITAL_PROFILE')
            return res.status(404).json({ error: 'No profile linked to this user' });
        if (msg === 'HOSPITAL_REQUIRED')
            return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
        if (msg === 'HOSPITAL_NOT_FOUND')
            return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
        return res.status(500).json({ error: 'Failed to close ledger' });
    }
};
export const postHospitalPayout = async (req, res) => {
    try {
        const created = await createHospitalPayout(callerOf(req), {
            hospitalId: req.body?.hospitalId,
            amount: req.body?.amount,
            method: req.body?.method,
            note: req.body?.note,
        });
        return res.status(201).json({ backend: 'usersBackend', data: created });
    }
    catch (error) {
        const msg = error?.message ?? 'UNKNOWN';
        if (msg === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        if (msg === 'HOSPITAL_REQUIRED')
            return res.status(400).json({ error: 'হাসপাতাল বেছে নিন।' });
        if (msg === 'HOSPITAL_NOT_FOUND')
            return res.status(404).json({ error: 'হাসপাতাল পাওয়া যায়নি।' });
        if (msg === 'INVALID_AMOUNT')
            return res.status(400).json({ error: 'সঠিক টাকার পরিমাণ দিন।' });
        return res.status(500).json({ error: 'Failed to create payout' });
    }
};
// GET /api/users/hospital-balance/hospitals?search= — super-admin picker (id + name).
export const searchHospitals = async (req, res) => {
    try {
        const data = await searchHospitalsForPayout(callerOf(req), parseOptional(req, 'search'));
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        if (error?.message === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        return res.status(500).json({ error: 'Failed to load hospitals' });
    }
};
//# sourceMappingURL=hospitalBalanceController.js.map