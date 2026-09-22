// Live serial scoreboard controls — doctor + staff start/stop the board.
// Mounted by src/usersBackend/routes/index.ts at /api/users/serial-live.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import {
  showSerialLiveStatus,
  runSerialLiveStart,
  runSerialLiveStop,
  runSerialLiveSkip,
  runSerialLiveRecall,
  runLiveBreakStart,
  runLiveBreakEnd,
} from '../controllers/serialLiveController.js';

const serialLiveRouter = express.Router();

const OPERATORS = ['DOCTOR', 'DOCTOR_STAFF'] as const;

serialLiveRouter.get('/status', protectedRoute(...OPERATORS), showSerialLiveStatus);
serialLiveRouter.post('/start', protectedRoute(...OPERATORS), runSerialLiveStart);
serialLiveRouter.post('/stop', protectedRoute(...OPERATORS), runSerialLiveStop);
serialLiveRouter.post('/skip', protectedRoute(...OPERATORS), runSerialLiveSkip);
serialLiveRouter.post('/recall', protectedRoute(...OPERATORS), runSerialLiveRecall);
serialLiveRouter.post('/break', protectedRoute(...OPERATORS), runLiveBreakStart);
serialLiveRouter.post('/break/end', protectedRoute(...OPERATORS), runLiveBreakEnd);

export default serialLiveRouter;
