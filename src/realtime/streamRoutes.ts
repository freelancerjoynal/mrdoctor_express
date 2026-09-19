// Authenticated realtime stream.
// Mounted by src/usersBackend/routes/index.ts at /api/users/stream.
import express from 'express';
import { protectedRoute } from '../authentication/middleware/authMiddleware.js';
import { handleUserStream } from './streamController.js';

const streamRouter = express.Router();

streamRouter.get(
  '/',
  protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER', 'DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF', 'BUSINESS_OWNER'),
  handleUserStream,
);

export default streamRouter;
