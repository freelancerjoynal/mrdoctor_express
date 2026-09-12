// Central routing barrel for the usersBackend module.
// Mounted by src/server.ts at /api/users — do not define user routes elsewhere.
import express from 'express';
import usersProfileRouter from './profileRoutes.js';
import doctorInformationRouter from './doctorInformationRoutes.js';
import blogRouter from './blogRoutes.js';
import reviewRouter from './reviewRoutes.js';
import appointmentRouter from './appointmentRoutes.js';
import staffRouter from './staffRoutes.js';

const usersRouter = express.Router();

// GET /api/users/profile[?userId=] — canonical role-based profile lookup
usersRouter.use('/profile', usersProfileRouter);

// GET|PUT /api/users/doctor-information — one-to-one doctor_informations table
usersRouter.use('/doctor-information', doctorInformationRouter);

// GET|POST /api/users/blogs — blogs by doctors, hospitals and super-admins
usersRouter.use('/blogs', blogRouter);

// GET|PUT|DELETE /api/users/reviews — review moderation for profile owners
usersRouter.use('/reviews', reviewRouter);

// GET|PATCH /api/users/appointments — pending intake scoped to own doctor/hospital
usersRouter.use('/appointments', appointmentRouter);

// GET|POST|DELETE /api/users/staff — a doctor's own staff (DOCTOR_STAFF users)
usersRouter.use('/staff', staffRouter);

export { usersRouter };
export default usersRouter;
