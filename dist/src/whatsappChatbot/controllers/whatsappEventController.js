import { parseWhatsAppMessage } from "../lib/whatsappParser.js";
import { handleIncomingMessage } from "../services/whatsappService.js";
export const receiveMessage = (req, res) => {
    const messages = parseWhatsAppMessage(req.body);
    messages.forEach((msg) => {
        handleIncomingMessage(msg);
    });
    res.sendStatus(200);
};
//# sourceMappingURL=whatsappEventController.js.map