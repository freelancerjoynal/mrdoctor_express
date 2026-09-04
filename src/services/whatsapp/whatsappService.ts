import { sendWhatsAppMessage } from "../../lib/sendWhatsAppMessage.js";

export async function handleIncomingMessage(msg: any) {
    const text = msg.text?.toLowerCase()?.trim();

    // 🎯 Auto reply
    if (["hi", "hello", "hey"].includes(text)) {
        await sendWhatsAppMessage(
            msg.number,
            "Hello 👋\nHow can I help you?"
        );
    }
}