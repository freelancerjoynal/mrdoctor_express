import { getAdminOverview, getLocationOptions, listDirectory, getDoctorOverview, getHospitalOverview, } from '../services/adminService.js';
import { getPortalSetting, upsertPortalSetting, listPortalSettings, } from '../services/locationSettingService.js';
// GET /api/admin/overview — platform-wide counts for the /admin dashboard.
export const showAdminOverview = async (_req, res) => {
    try {
        return res.json({ data: await getAdminOverview() });
    }
    catch (error) {
        console.error('Admin overview error:', error);
        return res.status(500).json({ error: 'ওভারভিউ লোড করা যায়নি।' });
    }
};
// GET /api/admin/locations — distinct divisions/districts/thanas for filters.
export const showLocationOptions = async (_req, res) => {
    try {
        return res.json({ data: await getLocationOptions() });
    }
    catch (error) {
        console.error('Admin locations error:', error);
        return res.status(500).json({ error: 'লোকেশন লোড করা যায়নি।' });
    }
};
// GET /api/admin/directory?type=hospital|doctor&division=&district=&thana=&speciality=&q=
export const showDirectory = async (req, res) => {
    try {
        const q = req.query;
        const data = await listDirectory({
            type: q.type,
            division: q.division,
            district: q.district,
            thana: q.thana,
            speciality: q.speciality,
            q: q.q,
            take: q.take,
        });
        return res.json({ data });
    }
    catch (error) {
        console.error('Admin directory error:', error);
        return res.status(500).json({ error: 'তালিকা লোড করা যায়নি।' });
    }
};
function notFound(res, error) {
    const code = error instanceof Error ? error.message : 'FAILED';
    if (code === 'DOCTOR_NOT_FOUND' || code === 'HOSPITAL_NOT_FOUND') {
        return res.status(404).json({ error: 'তথ্য পাওয়া যায়নি।' });
    }
    console.error('Admin detail error:', error);
    return res.status(500).json({ error: 'তথ্য লোড করা যায়নি।' });
}
// GET /api/admin/doctors/:id/overview — profile + bookings + income, one trip.
export const showDoctorOverview = async (req, res) => {
    try {
        return res.json({ data: await getDoctorOverview(String(req.params.id)) });
    }
    catch (error) {
        return notFound(res, error);
    }
};
// GET /api/admin/hospitals/:id/overview — profile + bookings + income + payouts, one trip.
export const showHospitalOverview = async (req, res) => {
    try {
        return res.json({ data: await getHospitalOverview(String(req.params.id)) });
    }
    catch (error) {
        return notFound(res, error);
    }
};
// GET /api/admin/location-settings — every customized thana portal, newest first.
export const listLocationSettings = async (_req, res) => {
    try {
        return res.json({ data: await listPortalSettings() });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load location settings' });
    }
};
// GET /api/admin/location-settings/:slug — one thana portal's customization (null = defaults).
export const showLocationSetting = async (req, res) => {
    try {
        return res.json({ data: await getPortalSetting(String(req.params.slug)) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load location setting' });
    }
};
// PUT /api/admin/location-settings/:slug — upsert hero image + texts (SUPER_ADMIN + ADMIN_MANAGER).
export const saveLocationSetting = async (req, res) => {
    try {
        const body = (req.body ?? {});
        const str = (v) => (typeof v === 'string' ? v : '');
        const data = await upsertPortalSetting(String(req.params.slug), {
            division: str(body.division) || null,
            district: str(body.district) || null,
            thana: str(body.thana) || null,
            heroImage: str(body.heroImage) || null,
            headline: str(body.headline) || null,
            subheadline: str(body.subheadline) || null,
            description: str(body.description) || null,
            notice: str(body.notice) || null,
        }, req.user?.userId);
        return res.json({ data });
    }
    catch {
        return res.status(500).json({ error: 'Failed to save location setting' });
    }
};
//# sourceMappingURL=adminController.js.map