// Central routing barrel for the usersBackend module.
// Mounted by src/server.ts at /api/users — do not define user routes elsewhere.
import express from 'express';
import usersProfileRouter from './profileRoutes.js';

const usersRouter = express.Router();

// GET /api/users/profile[?userId=] — canonical role-based profile lookup
usersRouter.use('/profile', usersProfileRouter);

export { usersRouter };
export default usersRouter;
