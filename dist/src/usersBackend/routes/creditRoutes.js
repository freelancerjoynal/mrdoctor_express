// Own credit wallet routes — every role sees its owner's balance.
// Mounted by src/usersBackend/routes/index.ts at /api/users/credits.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { showMyCreditBalance } from '../controllers/creditController.js';
const creditRouter = express.Router();
creditRouter.get('/balance', protectedRoute('DOCTOR', 'DOCTOR_STAFF', 'HOSPITAL', 'HOSPITAL_STAFF'), showMyCreditBalance);
export default creditRouter;
//# sourceMappingURL=creditRoutes.js.map