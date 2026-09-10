import express from 'express';
import { createBusiness } from '../../controllers.../business/businessController.js';
import { protect } from '../../middleware/authMiddleware.js';



const businessRouter = express.Router();

businessRouter.post('/create',protect, createBusiness );

export default businessRouter;
