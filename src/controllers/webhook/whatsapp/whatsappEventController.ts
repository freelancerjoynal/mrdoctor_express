import { Request, Response } from "express";
import { parseWhatsAppMessage } from "../../../lib/whatsappParser.js";
import { handleIncomingMessage } from "../../../services/whatsapp/whatsappService.js";


export const receiveMessage = (req: Request, res: Response) => {
    const messages = parseWhatsAppMessage(req.body);

    messages.forEach(msg => {
        handleIncomingMessage(msg);
    });

    res.sendStatus(200);
};

// messages.forEach(msg => {
//         console.log("📩", msg);
//     });