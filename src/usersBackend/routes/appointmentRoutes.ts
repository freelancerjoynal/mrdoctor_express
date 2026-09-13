// Authenticated appointment admin-panel routes.
// Mounted by src/usersBackend/routes/index.ts at /api/users/appointments.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import {
  listUserAppointments,
  showTodayAppointments,
  showAppointmentSummary,
  patchUserAppointment,
  createLocalBookingAppointment,
  listConfirmedAppointments,
} from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

const OWNERS = ['SUPER_ADMIN', 'DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL'] as const;

// Specific GETs first so they never collide with "/:id".
appointmentRouter.get('/today', protectedRoute(...OWNERS), showTodayAppointments);
appointmentRouter.get('/summary', protectedRoute(...OWNERS), showAppointmentSummary);
appointmentRouter.get('/confirmed', protectedRoute(...OWNERS), listConfirmedAppointments);
appointmentRouter.get('/', protectedRoute(...OWNERS), listUserAppointments);
appointmentRouter.patch('/:id', protectedRoute(...OWNERS), patchUserAppointment);

// Walk-in offline booking (doctor + staff): ConfirmedAppointment OFFLINE + SMS receipt.
appointmentRouter.post('/local', protectedRoute('DOCTOR', 'DOCTOR_STAFF'), createLocalBookingAppointment);

export default appointmentRouter;
