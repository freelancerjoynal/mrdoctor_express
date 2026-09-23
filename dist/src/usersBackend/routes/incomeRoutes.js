// SUPER_ADMIN + ADMIN_MANAGER income overview routes.
// Mounted by src/usersBackend/routes/index.ts at /api/users/income.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { showIncomeOverview } from '../controllers/incomeController.js';
const incomeRouter = express.Router();
incomeRouter.get('/overview', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), showIncomeOverview);
export default incomeRouter;
//# sourceMappingURL=incomeRoutes.js.map