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
  showLocalBookingOptions,
  showCollectionSummary,
  showCollectionDays,
  showCollectionWeek,
  listConfirmedAppointments,
  showConfirmedCounts,
  listServedAppointments,
  showServedCounts,
  patchConfirmedAppointment,
  deleteConfirmedAppointment,
  postCancelRequest,
  showStaffCollections,
  showStaffCollectionRows,
} from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

const OWNERS = ['SUPER_ADMIN', 'DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'] as const;
// Row operators: book / update / delete-own / cancel-request (serve = doctor only, enforced in service).
const OPERATORS = ['DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'] as const;

// Specific GETs first so they never collide with "/:id".
appointmentRouter.get('/today', protectedRoute(...OWNERS), showTodayAppointments);
appointmentRouter.get('/summary', protectedRoute(...OWNERS), showAppointmentSummary);
appointmentRouter.get('/confirmed', protectedRoute(...OWNERS), listConfirmedAppointments);
appointmentRouter.get('/confirmed/counts', protectedRoute(...OWNERS), showConfirmedCounts);
appointmentRouter.post('/confirmed/:id/cancel-request', protectedRoute(...OPERATORS), postCancelRequest);
appointmentRouter.patch('/confirmed/:id', protectedRoute(...OPERATORS), patchConfirmedAppointment);
appointmentRouter.delete('/confirmed/:id', protectedRoute(...OPERATORS), deleteConfirmedAppointment);
appointmentRouter.get('/served', protectedRoute(...OWNERS), listServedAppointments);
appointmentRouter.get('/served/counts', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'SUPER_ADMIN', 'HOSPITAL', 'HOSPITAL_STAFF'), showServedCounts);
appointmentRouter.get('/local-options', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'), showLocalBookingOptions);
appointmentRouter.get('/collection/summary', protectedRoute(...OWNERS), showCollectionSummary);
appointmentRouter.get('/collection/days', protectedRoute('DOCTOR', 'SUPER_ADMIN'), showCollectionDays);
appointmentRouter.get('/collection/week', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'SUPER_ADMIN'), showCollectionWeek);
appointmentRouter.get('/staff-collections', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'), showStaffCollections);
appointmentRouter.get('/staff-collections/rows', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'), showStaffCollectionRows);
appointmentRouter.get('/', protectedRoute(...OWNERS), listUserAppointments);
appointmentRouter.patch('/:id', protectedRoute(...OWNERS), patchUserAppointment);

// Walk-in offline booking (doctor + staff, hospital + hospital-staff): ConfirmedAppointment OFFLINE + SMS receipt.
appointmentRouter.post('/local', protectedRoute(...OPERATORS), createLocalBookingAppointment);

export default appointmentRouter;
