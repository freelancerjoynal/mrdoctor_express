import express from 'express';
import { protectedRoute } from '../../middleware/authMiddleware.js';
import { seedAll } from '../../controllers/seeders/demoSeeder.js';



const seederRouter = express.Router();

seederRouter.get('/seed-all', protectedRoute('DOCTOR'), seedAll );

export default seederRouter;
