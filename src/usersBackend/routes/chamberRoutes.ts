// Doctor chamber + schedule (timing / date availability) routes.
// Mounted by src/usersBackend/routes/index.ts at /api/users/chambers.
// DOCTOR owns; DOCTOR_STAFF needs users.canManageChambers (enabled per staff).
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import {
  listUserChambers,
  storeUserChamber,
  modifyUserChamber,
  removeUserChamber,
  listUserHospitalOptions,
  listUserSchedules,
  storeUserSchedule,
  modifyUserSchedule,
  removeUserSchedule,
} from '../controllers/chamberController.js';

const chamberRouter = express.Router();

const MANAGERS = ['SUPER_ADMIN', 'ADMIN_MANAGER', 'DOCTOR', 'DOCTOR_STAFF'] as const;

// Fixed paths first so they never collide with "/:id".
chamberRouter.get('/hospitals/options', protectedRoute(...MANAGERS), listUserHospitalOptions);
chamberRouter.get('/schedules', protectedRoute(...MANAGERS), listUserSchedules);
chamberRouter.post('/schedules', protectedRoute(...MANAGERS), storeUserSchedule);
chamberRouter.patch('/schedules/:id', protectedRoute(...MANAGERS), modifyUserSchedule);
chamberRouter.delete('/schedules/:id', protectedRoute(...MANAGERS), removeUserSchedule);

chamberRouter.get('/', protectedRoute(...MANAGERS), listUserChambers);
chamberRouter.post('/', protectedRoute(...MANAGERS), storeUserChamber);
chamberRouter.patch('/:id', protectedRoute(...MANAGERS), modifyUserChamber);
chamberRouter.delete('/:id', protectedRoute(...MANAGERS), removeUserChamber);

export default chamberRouter;
