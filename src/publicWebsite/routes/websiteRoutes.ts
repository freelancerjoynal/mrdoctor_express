// Isolated routing for the publicWebsite module.
// Mounted by src/server.ts via ./publicWebsite/routes/index.js
// Mirrors src/whatsappChatbot/routes/* — no imports from whatsappChatbot.
import express from 'express';
import { getHealth, getHome } from '../controllers/websiteController.js';
import directoryRouter from './directoryRoutes.js';
import locationRouter from './locationRoutes.js';
import blogRouter from './blogRoutes.js';
import reviewRouter from './reviewRoutes.js';
import appointmentRouter from './appointmentRoutes.js';
import seoRouter from './seoRoutes.js';

const websiteRouter = express.Router();

websiteRouter.get('/', getHome);
websiteRouter.get('/health', getHealth);

// 3-level location catalog (Division > District > Thana)
websiteRouter.use('/', locationRouter);

// Public directory catalog (unauthenticated by design)
websiteRouter.use('/', directoryRouter);

// Public blogs (unauthenticated by design — PUBLISHED only)
websiteRouter.use('/', blogRouter);

// Public reviews (unauthenticated by design — APPROVED only, open submit)
websiteRouter.use('/', reviewRouter);

// Public appointments (unauthenticated by design — creates PENDING rows)
websiteRouter.use('/', appointmentRouter);

// Public per-page SEO (unauthenticated by design — single-row read)
websiteRouter.use('/', seoRouter);

export default websiteRouter;
