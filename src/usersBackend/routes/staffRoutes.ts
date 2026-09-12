// Doctor staff-management routes.
// Mounted by src/usersBackend/routes/index.ts at /api/users/staff.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { listUserStaff, inviteUserStaff, removeUserStaff } from '../controllers/staffController.js';

const staffRouter = express.Router();

staffRouter.get('/', protectedRoute('SUPER_ADMIN', 'DOCTOR'), listUserStaff);
staffRouter.post('/', protectedRoute('DOCTOR'), inviteUserStaff);
staffRouter.delete('/:id', protectedRoute('SUPER_ADMIN', 'DOCTOR'), removeUserStaff);

export default staffRouter;
