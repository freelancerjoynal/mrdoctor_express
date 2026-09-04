import { Request, Response } from "express";
import { env } from "../../../config/env.js";

export const verifyWebhook = (req: Request, res: Response) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (!mode || !token) {
        return res.sendStatus(400);
    }

    if (mode === "subscribe" && token === env.VERIFY_TOKEN) {
        console.log("✅ WEBHOOK VERIFIED");
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
};