import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { seedDoctors } from '../../controllers.../doctors/DoctorsController.js';



const doctorRouter = express.Router();

doctorRouter.get('/doctor', protect, seedDoctors );

export default doctorRouter;
