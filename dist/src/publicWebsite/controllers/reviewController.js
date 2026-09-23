import { submitReview, getDoctorReviews, getDoctorSpotlightReviews, getDoctorRatingSummary, getHospitalReviews, getHospitalRatingSummary, } from '../services/reviewService.js';
function parsePaging(req) {
    const rawPage = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
    const rawLimit = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
    const page = Math.max(1, parseInt(typeof rawPage === 'string' ? rawPage : '1', 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(typeof rawLimit === 'string' ? rawLimit : '6', 10) || 6));
    return { page, limit };
}
export const postReview = async (req, res) => {
    try {
        const { doctorUsername, hospitalSlug, reviewerName, reviewerPhone, rating, title, comment } = req.body ?? {};
        const review = await submitReview({
            doctorUsername,
            hospitalSlug,
            reviewerName,
            reviewerPhone,
            rating,
            title,
            comment,
        });
        return res.status(201).json({
            backend: 'publicWebsite',
            data: review,
            message: 'মতামত পাঠানোর জন্য ধন্যবাদ! অনুমোদনের পর এটি দেখা যাবে।',
        });
    }
    catch (error) {
        const msg = error?.message ?? 'UNKNOWN';
        if (msg === 'INVALID_TARGET')
            return res.status(400).json({ error: 'Exactly one of doctorUsername / hospitalSlug is required' });
        if (msg === 'INVALID_RATING')
            return res.status(400).json({ error: 'Rating must be 1–5' });
        if (msg === 'INVALID_NAME')
            return res.status(400).json({ error: 'Please provide your name (2–60 characters)' });
        if (msg === 'INVALID_COMMENT')
            return res.status(400).json({ error: 'Please write a comment (5–1000 characters)' });
        if (msg === 'DOCTOR_NOT_FOUND')
            return res.status(404).json({ error: 'Doctor not found' });
        if (msg === 'HOSPITAL_NOT_FOUND')
            return res.status(404).json({ error: 'Hospital not found' });
        return res.status(500).json({ error: 'Failed to submit review' });
    }
};
export const listDoctorReviews = async (req, res) => {
    try {
        const result = await getDoctorReviews(req.params.username, parsePaging(req));
        if (!result)
            return res.status(404).json({ error: 'Doctor not found' });
        return res.json({ backend: 'publicWebsite', ...result });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load reviews' });
    }
};
export const showDoctorSpotlight = async (req, res) => {
    try {
        const data = await getDoctorSpotlightReviews(req.params.username, 2, 10);
        if (!data)
            return res.status(404).json({ error: 'Doctor not found' });
        return res.json({ backend: 'publicWebsite', data });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load spotlight reviews' });
    }
};
export const showDoctorRating = async (req, res) => {
    try {
        const rating = await getDoctorRatingSummary(req.params.username);
        if (!rating)
            return res.status(404).json({ error: 'Doctor not found' });
        return res.json({ backend: 'publicWebsite', data: rating });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load rating' });
    }
};
export const listHospitalReviews = async (req, res) => {
    try {
        const result = await getHospitalReviews(req.params.slug, parsePaging(req));
        if (!result)
            return res.status(404).json({ error: 'Hospital not found' });
        return res.json({ backend: 'publicWebsite', ...result });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load reviews' });
    }
};
export const showHospitalRating = async (req, res) => {
    try {
        const rating = await getHospitalRatingSummary(req.params.slug);
        if (!rating)
            return res.status(404).json({ error: 'Hospital not found' });
        return res.json({ backend: 'publicWebsite', data: rating });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load rating' });
    }
};
//# sourceMappingURL=reviewController.js.map