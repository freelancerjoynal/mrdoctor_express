import { env } from "../../config/env.js";
export const verifyWebhook = (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (!mode || !token) {
        return res.sendStatus(400);
    }
    if (mode === "subscribe" && token === env.VERIFY_TOKEN) {
        return res.status(200).send(challenge);
    }
    return res.sendStatus(403);
};
//# sourceMappingURL=verifyWebhook.js.map