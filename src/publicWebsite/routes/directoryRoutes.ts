// Public directory routing for the publicWebsite module.
// Deliberately NO protectedRoute here — this is the unauthenticated catalog.
// Mounted by src/server.ts at /api/website via ./websiteRoutes.js
import express from 'express';
import { listDoctors, showDoctor, listHospitals, showHospital, listChambers, showChamber } from '../controllers/directoryController.js';

const directoryRouter = express.Router();

// GET /api/website/doctors?search=&speciality=&division=&district=&thana=&page=&limit=
directoryRouter.get('/doctors', listDoctors);
// GET /api/website/doctors/:username
directoryRouter.get('/doctors/:username', showDoctor);
// GET /api/website/hospitals?search=&division=&district=&thana=&page=&limit=
directoryRouter.get('/hospitals', listHospitals);
// GET /api/website/hospitals/:slug
directoryRouter.get('/hospitals/:slug', showHospital);
// GET /api/website/chambers?search=&division=&district=&thana=&page=&limit=
directoryRouter.get('/chambers', listChambers);
// GET /api/website/chambers/:id
directoryRouter.get('/chambers/:id', showChamber);

export default directoryRouter;
