// Staff-management routes (doctor staff + hospital staff).
// Mounted by src/usersBackend/routes/index.ts at /api/users/staff.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { listUserStaff, inviteUserStaff, removeUserStaff, patchUserStaff } from '../controllers/staffController.js';
const staffRouter = express.Router();
staffRouter.get('/', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER', 'DOCTOR', 'HOSPITAL'), listUserStaff);
staffRouter.post('/', protectedRoute('DOCTOR', 'HOSPITAL'), inviteUserStaff);
staffRouter.patch('/:id', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER', 'DOCTOR', 'HOSPITAL'), patchUserStaff);
staffRouter.delete('/:id', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER', 'DOCTOR', 'HOSPITAL'), removeUserStaff);
export default staffRouter;
//# sourceMappingURL=staffRoutes.js.map