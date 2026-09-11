// Isolated routing for the publicWebsite module.
// Mounted by src/server.ts via ./publicWebsite/routes/index.js
// Mirrors src/whatsappChatbot/routes/* — no imports from whatsappChatbot.
import express from 'express';
import { getHealth, getHome } from '../controllers/websiteController.js';

const websiteRouter = express.Router();

websiteRouter.get('/', getHome);
websiteRouter.get('/health', getHealth);

export default websiteRouter;
