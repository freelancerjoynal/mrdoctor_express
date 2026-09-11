// Localized WhatsApp webhook routing for the whatsappChatbot module.
// Mounted by src/server.ts via ./whatsappChatbot/routes/index.js
import express from 'express';
import { receiveMessage } from '../controllers/whatsappEventController.js';
import { verifyWebhook } from '../controllers/verifyWebhook.js';

const whatsappRouter = express.Router();

// Meta webhook verification (GET)
whatsappRouter.get('/incoming', verifyWebhook);

// Incoming message handling (POST)
whatsappRouter.post('/incoming', receiveMessage);

export default whatsappRouter;
