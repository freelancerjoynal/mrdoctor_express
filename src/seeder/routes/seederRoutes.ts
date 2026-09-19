// Seeder routing for the seeder module.
// Mounted by src/server.ts at /api/seeders via ./seeder/routes/index.js
// - /seed-all: SUPER_ADMIN / ADMIN_MANAGER (access token required).
// - /seed-super-admin: PUBLIC bootstrap — no access token. Guarded inside the
//   controller (SEED_SECRET when configured, else one-time use while no admin
//   exists). Accepts { email, password, name?, role? }.
// - /seed-admin-manager: SUPER_ADMIN only — creates ADMIN_MANAGER accounts.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { seedAll, seedAdminManager, seedSuperAdminPublic } from '../controllers/seederController.js';

const seederRouter = express.Router();

// Separate public bootstrap route — no protectedRoute here by design.
seederRouter.post('/seed-super-admin', seedSuperAdminPublic);

seederRouter.post('/seed-admin-manager', protectedRoute('SUPER_ADMIN'), seedAdminManager);

seederRouter.get('/seed-all', protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER'), seedAll);

export default seederRouter;
