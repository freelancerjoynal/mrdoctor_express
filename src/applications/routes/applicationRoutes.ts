// Application routing for the applications module.
// Public apply routes need no auth (self-registration replacement).
// Everything else is SUPER_ADMIN-only.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import {
  submitDoctor,
  submitHospital,
  listAll,
  pendingCount,
  approve,
  reject,
  createDoctorDirect,
  createHospitalDirect,
} from '../controllers/applicationController.js';

const applicationRouter = express.Router();

// Public (no login needed)
applicationRouter.post('/doctor', submitDoctor);
applicationRouter.post('/hospital', submitHospital);

// SUPER_ADMIN + ADMIN_MANAGER review + direct creation
applicationRouter.get('/', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), listAll);
applicationRouter.get('/pending-count', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), pendingCount);
applicationRouter.patch('/:id/approve', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), approve);
applicationRouter.patch('/:id/reject', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), reject);
applicationRouter.post('/create-doctor', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), createDoctorDirect);
applicationRouter.post('/create-hospital', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), createHospitalDirect);

export default applicationRouter;
