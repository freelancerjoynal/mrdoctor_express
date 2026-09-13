// The one and only profile route — role-aware via PROFILE_VISIBILITY.
// All roles from the Role enum in prisma/schema.prisma may call it;
// the service decides between self data and others data.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/profileController.js';

const usersProfileRouter = express.Router();

const profileRoles = ['SUPER_ADMIN', 'DOCTOR', 'DOCTOR_STAFF', 'BUSINESS_OWNER', 'HOSPITAL', 'HOSPITAL_STAFF'] as const;

usersProfileRouter.get(
  '/',
  protectedRoute(...profileRoles),
  getUserProfile,
);

// PATCH|PUT /api/users/profile — own name / password only; email is immutable.
usersProfileRouter.patch(
  '/',
  protectedRoute(...profileRoles),
  updateUserProfile,
);

usersProfileRouter.put(
  '/',
  protectedRoute(...profileRoles),
  updateUserProfile,
);

export default usersProfileRouter;
