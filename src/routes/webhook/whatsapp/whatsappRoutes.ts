// src/routes/webhookRoutes.ts
import express from 'express';
import {  receiveMessage } from '../../../controllers/webhook/whatsapp/whatsappEventController.js';
import { verifyWebhook } from   '../../../controllers/webhook/whatsapp/verifyWebhook.js';

const webHookWhatsAppRouter = express.Router();

// মেটা ওয়েবহুক ভেরিফিকেশন (GET)
webHookWhatsAppRouter.get('/incoming', verifyWebhook);

// ইনকামিং মেসেজ হ্যান্ডেলিং (POST)
webHookWhatsAppRouter.post('/incoming', receiveMessage);

export default webHookWhatsAppRouter;






// https://rapid-tag-hiring-gather.trycloudflare.com
