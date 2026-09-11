// The one and only profile route — role-aware via PROFILE_VISIBILITY.
// All roles from the Role enum in prisma/schema.prisma may call it;
// the service decides between self data and others data.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { getUserProfile } from '../controllers/profileController.js';

const usersProfileRouter = express.Router();

usersProfileRouter.get(
  '/',
  protectedRoute('SUPER_ADMIN', 'DOCTOR', 'DOCTOR_STAFF', 'BUSINESS_OWNER', 'HOSPITAL', 'HOSPITAL_STAFF'),
  getUserProfile,
);

export default usersProfileRouter;
