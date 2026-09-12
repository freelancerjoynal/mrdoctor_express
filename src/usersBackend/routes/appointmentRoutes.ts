// Authenticated pending-appointment routes.
// Mounted by src/usersBackend/routes/index.ts at /api/users/appointments.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { listUserAppointments, patchUserAppointment } from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

const OWNERS = ['SUPER_ADMIN', 'DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'] as const;

appointmentRouter.get('/', protectedRoute(...OWNERS), listUserAppointments);
appointmentRouter.patch('/:id', protectedRoute(...OWNERS), patchUserAppointment);

export default appointmentRouter;
