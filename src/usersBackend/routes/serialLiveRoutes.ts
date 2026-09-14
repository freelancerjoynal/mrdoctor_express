// Live serial scoreboard controls — doctor + staff start/stop the board.
// Mounted by src/usersBackend/routes/index.ts at /api/users/serial-live.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import {
  showSerialLiveStatus,
  runSerialLiveStart,
  runSerialLiveStop,
} from '../controllers/serialLiveController.js';

const serialLiveRouter = express.Router();

const OPERATORS = ['DOCTOR', 'DOCTOR_STAFF'] as const;

serialLiveRouter.get('/status', protectedRoute(...OPERATORS), showSerialLiveStatus);
serialLiveRouter.post('/start', protectedRoute(...OPERATORS), runSerialLiveStart);
serialLiveRouter.post('/stop', protectedRoute(...OPERATORS), runSerialLiveStop);

export default serialLiveRouter;
