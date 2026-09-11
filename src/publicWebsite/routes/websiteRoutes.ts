// Isolated routing for the publicWebsite module.
// Mounted by src/server.ts via ./publicWebsite/routes/index.js
// Mirrors src/whatsappChatbot/routes/* — no imports from whatsappChatbot.
import express from 'express';
import { getHealth, getHome } from '../controllers/websiteController.js';
import directoryRouter from './directoryRoutes.js';
import locationRouter from './locationRoutes.js';

const websiteRouter = express.Router();

websiteRouter.get('/', getHome);
websiteRouter.get('/health', getHealth);

// 3-level location catalog (Division > District > Thana)
websiteRouter.use('/', locationRouter);

// Public directory catalog (unauthenticated by design)
websiteRouter.use('/', directoryRouter);

export default websiteRouter;
