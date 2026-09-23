// Central routing barrel for the usersBackend module.
// Mounted by src/server.ts at /api/users — do not define user routes elsewhere.
import express from 'express';
import usersProfileRouter from './profileRoutes.js';
import doctorInformationRouter from './doctorInformationRoutes.js';
import blogRouter from './blogRoutes.js';
import reviewRouter from './reviewRoutes.js';
import appointmentRouter from './appointmentRoutes.js';
import staffRouter from './staffRoutes.js';
import chamberRouter from './chamberRoutes.js';
import serialLiveRouter from './serialLiveRoutes.js';
import creditRouter from './creditRoutes.js';
import hospitalBalanceRouter from './hospitalBalanceRoutes.js';
import incomeRouter from './incomeRoutes.js';
import streamRouter from '../../realtime/streamRoutes.js';
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
// GET|POST|PATCH|DELETE /api/users/chambers — own chambers + weekly schedules
usersRouter.use('/chambers', chamberRouter);
// GET|POST /api/users/serial-live — live serial scoreboard controls
usersRouter.use('/serial-live', serialLiveRouter);
// GET /api/users/credits/balance — own credit wallet (doctor/hospital/staff)
usersRouter.use('/credits', creditRouter);
// GET /api/users/hospital-balance/summary|payouts — online balance ledger (hospital owner + super-admin)
usersRouter.use('/hospital-balance', hospitalBalanceRouter);
// GET /api/users/income/overview — platform-wide doctor/hospital income (super-admin only)
usersRouter.use('/income', incomeRouter);
// GET /api/users/stream — websocket-style SSE push (scoped channels)
usersRouter.use('/stream', streamRouter);
export { usersRouter };
export default usersRouter;
//# sourceMappingURL=index.js.map