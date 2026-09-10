import type { Request, Response } from "express";
import { parseWhatsAppMessage } from "../lib/whatsappParser.js";
import { handleIncomingMessage } from "../services/whatsappService.js";

export const receiveMessage = (req: Request, res: Response) => {
    const messages = parseWhatsAppMessage(req.body);

    messages.forEach((msg) => {
        handleIncomingMessage(msg);
    });

    res.sendStatus(200);
};
