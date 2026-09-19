// Authenticated profile routes — part of the authentication module
// since access is guarded by protectedRoute.
import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import { getProfile } from '../controllers/profileController.js';

const profileRouter = express.Router();

// এখানে আপনার প্রয়োজনমতো রোলগুলো (যেমন: 'BUSINESS_OWNER', 'SUPER_ADMIN', 'DOCTOR' ইত্যাদি) পাস করে দিতে হবে
profileRouter.get('/', protectedRoute('BUSINESS_OWNER', 'SUPER_ADMIN', 'ADMIN_MANAGER', 'DOCTOR'), getProfile);

export default profileRouter;
