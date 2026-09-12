// Central routing barrel for the usersBackend module.
// Mounted by src/server.ts at /api/users — do not define user routes elsewhere.
import express from 'express';
import usersProfileRouter from './profileRoutes.js';
import doctorInformationRouter from './doctorInformationRoutes.js';
import blogRouter from './blogRoutes.js';

const usersRouter = express.Router();

// GET /api/users/profile[?userId=] — canonical role-based profile lookup
usersRouter.use('/profile', usersProfileRouter);

// GET|PUT /api/users/doctor-information — one-to-one doctor_informations table
usersRouter.use('/doctor-information', doctorInformationRouter);

// GET|POST /api/users/blogs — blogs by doctors, hospitals and super-admins
usersRouter.use('/blogs', blogRouter);

export { usersRouter };
export default usersRouter;
