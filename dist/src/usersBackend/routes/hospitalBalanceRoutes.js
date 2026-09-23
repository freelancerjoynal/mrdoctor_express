// Hospital online-balance ledger routes.
// Mounted by src/usersBackend/routes/index.ts at /api/users/hospital-balance.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { showHospitalBalanceSummary, showOnlineDays, postCloseLedger, showHospitalPayouts, postHospitalPayout, searchHospitals, } from '../controllers/hospitalBalanceController.js';
const hospitalBalanceRouter = express.Router();
const READERS = ['HOSPITAL', 'HOSPITAL_STAFF', 'SUPER_ADMIN', 'ADMIN_MANAGER'];
hospitalBalanceRouter.get('/hospitals', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), searchHospitals);
hospitalBalanceRouter.get('/summary', protectedRoute(...READERS), showHospitalBalanceSummary);
hospitalBalanceRouter.get('/days', protectedRoute(...READERS), showOnlineDays);
hospitalBalanceRouter.get('/payouts', protectedRoute(...READERS), showHospitalPayouts);
// Freeze finished days now (a cron hits this at 00:05; otherwise lazy on read).
hospitalBalanceRouter.post('/close', protectedRoute(...READERS), postCloseLedger);
// Super-admin transfer: currentBalance drops by amount.
hospitalBalanceRouter.post('/payouts', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), postHospitalPayout);
export default hospitalBalanceRouter;
//# sourceMappingURL=hospitalBalanceRoutes.js.map