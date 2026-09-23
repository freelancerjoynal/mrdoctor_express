// Authenticated appointment admin-panel routes.
// Mounted by src/usersBackend/routes/index.ts at /api/users/appointments.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { listUserAppointments, showTodayAppointments, showAppointmentSummary, patchUserAppointment, createLocalBookingAppointment, showLocalBookingOptions, showCollectionSummary, showCollectionDays, showCollectionWeek, showCollectionDoctors, listConfirmedAppointments, showConfirmedCounts, listServedAppointments, showServedCounts, showLifetimeBalance, patchConfirmedAppointment, deleteConfirmedAppointment, postCancelRequest, showStaffCollections, showStaffCollectionRows, showLocalMonthlyCounts, } from '../controllers/appointmentController.js';
const appointmentRouter = express.Router();
const OWNERS = ['SUPER_ADMIN', 'ADMIN_MANAGER', 'DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'];
// Row operators: book / update / delete-own / cancel-request (serve = doctor only, enforced in service).
const OPERATORS = ['DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'];
// Specific GETs first so they never collide with "/:id".
appointmentRouter.get('/today', protectedRoute(...OWNERS), showTodayAppointments);
appointmentRouter.get('/summary', protectedRoute(...OWNERS), showAppointmentSummary);
appointmentRouter.get('/confirmed', protectedRoute(...OWNERS), listConfirmedAppointments);
appointmentRouter.get('/confirmed/counts', protectedRoute(...OWNERS), showConfirmedCounts);
appointmentRouter.post('/confirmed/:id/cancel-request', protectedRoute(...OPERATORS), postCancelRequest);
appointmentRouter.patch('/confirmed/:id', protectedRoute(...OPERATORS), patchConfirmedAppointment);
appointmentRouter.delete('/confirmed/:id', protectedRoute(...OPERATORS), deleteConfirmedAppointment);
appointmentRouter.get('/served', protectedRoute(...OWNERS), listServedAppointments);
appointmentRouter.get('/served/counts', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'SUPER_ADMIN', 'ADMIN_MANAGER', 'HOSPITAL', 'HOSPITAL_STAFF'), showServedCounts);
appointmentRouter.get('/local-options', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'), showLocalBookingOptions);
appointmentRouter.get('/collection/lifetime-balance', protectedRoute('HOSPITAL'), showLifetimeBalance);
appointmentRouter.get('/collection/summary', protectedRoute(...OWNERS), showCollectionSummary);
appointmentRouter.get('/collection/days', protectedRoute('DOCTOR', 'SUPER_ADMIN', 'ADMIN_MANAGER', 'HOSPITAL', 'HOSPITAL_STAFF'), showCollectionDays);
appointmentRouter.get('/collection/week', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'SUPER_ADMIN', 'ADMIN_MANAGER', 'HOSPITAL', 'HOSPITAL_STAFF'), showCollectionWeek);
appointmentRouter.get('/collection/doctors', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'SUPER_ADMIN', 'ADMIN_MANAGER', 'HOSPITAL', 'HOSPITAL_STAFF'), showCollectionDoctors);
appointmentRouter.get('/staff-collections', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'), showStaffCollections);
appointmentRouter.get('/staff-collections/monthly', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'), showLocalMonthlyCounts);
appointmentRouter.get('/staff-collections/rows', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'), showStaffCollectionRows);
appointmentRouter.get('/', protectedRoute(...OWNERS), listUserAppointments);
appointmentRouter.patch('/:id', protectedRoute(...OWNERS), patchUserAppointment);
// Walk-in offline booking (doctor + staff, hospital + hospital-staff): ConfirmedAppointment OFFLINE + SMS receipt.
appointmentRouter.post('/local', protectedRoute(...OPERATORS), createLocalBookingAppointment);
export default appointmentRouter;
//# sourceMappingURL=appointmentRoutes.js.map