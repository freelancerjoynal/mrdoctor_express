// Public appointment routing for the publicWebsite module.
// POST is deliberately open (creates PENDING rows); options serve chambers + running days.
// Mounted by websiteRoutes at /api/website.
import express from 'express';
import { postAppointment, showAppointmentOptions, showSerialLiveBoard } from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

// POST /api/website/appointments — { doctorUsername, hospitalSlug?, chamberId?, appointmentDate, patientName, contactPhone, problem, ... }
appointmentRouter.post('/appointments', postAppointment);
// GET /api/website/doctors/:username/appointment-options
appointmentRouter.get('/doctors/:username/appointment-options', showAppointmentOptions);
// GET /api/website/doctors/:username/serial-live — public scoreboard snapshot
appointmentRouter.get('/doctors/:username/serial-live', showSerialLiveBoard);

export default appointmentRouter;
