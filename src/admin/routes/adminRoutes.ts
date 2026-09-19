// Admin dashboard routing for the admin module.
// Mounted by src/server.ts at /api/admin via ./admin/routes/index.js
// Restricted to SUPER_ADMIN + ADMIN_MANAGER — platform-wide stats.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import {
  showAdminOverview,
  showLocationOptions,
  showDirectory,
  showDoctorOverview,
  showHospitalOverview,
} from '../controllers/adminController.js';

const adminRouter = express.Router();

const admins = protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER');

adminRouter.get('/overview', admins, showAdminOverview);
// Location-filtered directory: filter by division/district/thana, then drill in.
adminRouter.get('/locations', admins, showLocationOptions);
adminRouter.get('/directory', admins, showDirectory);
adminRouter.get('/doctors/:id/overview', admins, showDoctorOverview);
adminRouter.get('/hospitals/:id/overview', admins, showHospitalOverview);

export default adminRouter;
