// src/controllers/whatsappWebhookController.ts
import { Request, Response } from 'express';
import { parseWhatsAppMessage } from '../../../lib/whatsappParser.js';
// import { prisma } from '../../lib/prisma.js';
const VERIFY_TOKEN = "3453453453343ds4w3345erte5345";

export const verifyWebhook = (req: Request, res: Response) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
};


// export const receiveMessage = (req: Request, res: Response) => {
//     console.log("🔥 WEBHOOK HIT");
//     res.sendStatus(200);
// };


export const receiveMessage = (req: Request, res: Response) => {
    const messages = parseWhatsAppMessage(req.body);

    messages.forEach(msg => {
        console.log("📩", msg);
    });

    res.sendStatus(200);
};
