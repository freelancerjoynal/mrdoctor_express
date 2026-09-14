// Seeder routing for the seeder module.
// Mounted by src/server.ts at /api/seeders via ./seeder/routes/index.js
// Restricted to SUPER_ADMIN — seeding writes demo data across the whole DB.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { seedAll } from '../controllers/seederController.js';

const seederRouter = express.Router();

seederRouter.get('/seed-all', protectedRoute('SUPER_ADMIN', 'DOCTOR'), seedAll);

export default seederRouter;
