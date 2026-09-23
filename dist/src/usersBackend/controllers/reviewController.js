import { listReviews, moderateReview, deleteReview } from '../services/reviewService.js';
function callerOf(req) {
    return { userId: req.user.userId, role: req.user.role };
}
export const listUserReviews = async (req, res) => {
    try {
        const rawStatus = req.query.status;
        const rawTake = req.query.take;
        const reviews = await listReviews(callerOf(req), {
            status: typeof rawStatus === 'string' ? rawStatus : undefined,
            take: typeof rawTake === 'string' ? parseInt(rawTake, 10) || undefined : undefined,
        });
        return res.json({ backend: 'usersBackend', data: reviews });
    }
    catch (error) {
        if (error.message === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
            return res.status(404).json({ error: 'No profile linked to this user' });
        return res.status(500).json({ error: 'Failed to load reviews' });
    }
};
export const moderateUserReview = async (req, res) => {
    try {
        const review = await moderateReview(callerOf(req), req.params.id, req.body?.status);
        return res.json({ backend: 'usersBackend', data: review });
    }
    catch (error) {
        if (error.message === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        if (error.message === 'REVIEW_NOT_FOUND')
            return res.status(404).json({ error: 'Review not found' });
        if (error.message === 'INVALID_STATUS')
            return res.status(400).json({ error: 'Status must be PENDING, APPROVED or REJECTED' });
        return res.status(500).json({ error: 'Failed to moderate review' });
    }
};
export const removeUserReview = async (req, res) => {
    try {
        const result = await deleteReview(callerOf(req), req.params.id);
        return res.json({ backend: 'usersBackend', data: result });
    }
    catch (error) {
        if (error.message === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        if (error.message === 'REVIEW_NOT_FOUND')
            return res.status(404).json({ error: 'Review not found' });
        if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
            return res.status(404).json({ error: 'No profile linked to this user' });
        return res.status(500).json({ error: 'Failed to delete review' });
    }
};
//# sourceMappingURL=reviewController.js.map