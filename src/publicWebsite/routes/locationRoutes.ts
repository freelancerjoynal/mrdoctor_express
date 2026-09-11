// Public location routing: Division > District > Thana tree + flat lists.
// Mounted by websiteRoutes.js at /api/website. Unauthenticated by design.
// IMPORTANT: register before directoryRouter's /doctors/:username style
// param routes — Express matches in order, no conflicts here since paths differ.
import express from 'express';
import { getTree, getDivisions, getDistricts, getThanas } from '../controllers/locationController.js';

const locationRouter = express.Router();

// GET /api/website/locations (full 3-level tree with counts)
locationRouter.get('/locations', getTree);
// GET /api/website/locations/divisions
locationRouter.get('/locations/divisions', getDivisions);
// GET /api/website/locations/districts?division=
locationRouter.get('/locations/districts', getDistricts);
// GET /api/website/locations/thanas?division=&district=
locationRouter.get('/locations/thanas', getThanas);

export default locationRouter;
