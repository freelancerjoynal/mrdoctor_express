// Public contact routing for the publicWebsite module.
// POST is deliberately open (creates NEW rows); there is no public listing.
// Mounted by websiteRoutes at /api/website.
import express from 'express';
import { postContact, listContactTopics } from '../controllers/contactController.js';

const contactRouter = express.Router();

// POST /api/website/contact — { name, phone, email?, topic?, subject?, message }
contactRouter.post('/contact', postContact);
// GET /api/website/contact/topics — topic dropdown options
contactRouter.get('/contact/topics', listContactTopics);

export default contactRouter;
