import express from 'express';
import { protectedRoute } from '../../middleware/authMiddleware.js';
import { seedAll } from '../../controllers/seeders/demoSeeder.js';



const seederRouter = express.Router();

seederRouter.get('/seed-all', protectedRoute('SUPER_ADMIN'), seedAll );

export default seederRouter;
