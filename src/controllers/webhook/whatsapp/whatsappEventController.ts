// src/controllers/whatsappWebhookController.ts
import { Request, Response } from 'express';
import { parseWhatsAppMessage } from '../../../lib/whatsappParser.js';
// import { prisma } from '../../lib/prisma.js';

export const receiveMessage = (req: Request, res: Response) => {
    const messages = parseWhatsAppMessage(req.body);

    messages.forEach(msg => {
        console.log("📩", msg);
    });

    res.sendStatus(200);
};
