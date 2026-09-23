// Authenticated review-moderation routes.
// Mounted by src/usersBackend/routes/index.ts at /api/users/reviews.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { listUserReviews, moderateUserReview, removeUserReview } from '../controllers/reviewController.js';
const reviewRouter = express.Router();
const OWNERS = ['SUPER_ADMIN', 'ADMIN_MANAGER', 'DOCTOR', 'HOSPITAL'];
reviewRouter.get('/', protectedRoute(...OWNERS), listUserReviews);
reviewRouter.put('/:id', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), moderateUserReview);
reviewRouter.delete('/:id', protectedRoute(...OWNERS), removeUserReview);
export default reviewRouter;
//# sourceMappingURL=reviewRoutes.js.map