// Authenticated routes for the doctor_informations table.
// Mounted by src/usersBackend/routes/index.ts at /api/users/doctor-information.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { showDoctorInformation, saveDoctorInformation } from '../controllers/doctorInformationController.js';

const doctorInformationRouter = express.Router();

// GET /api/users/doctor-information[?doctorId=]
doctorInformationRouter.get(
  '/',
  protectedRoute('SUPER_ADMIN', 'DOCTOR', 'DOCTOR_STAFF', 'BUSINESS_OWNER', 'HOSPITAL', 'HOSPITAL_STAFF'),
  showDoctorInformation,
);

// PUT /api/users/doctor-information
doctorInformationRouter.put('/', protectedRoute('DOCTOR', 'SUPER_ADMIN'), saveDoctorInformation);

export default doctorInformationRouter;
