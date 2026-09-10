import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { seedAll } from '../../controllers.../seeders/demoSeeder.js';



const seederRouter = express.Router();

seederRouter.get('/seed-all', protect, seedAll );

export default seederRouter;
