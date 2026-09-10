import axios from "axios";
import { env } from "../../config/env.js";

export interface ButtonItem {
    id: string;
    title: string;
}

/** Plain text message */
export async function sendWhatsAppMessage(to: string, message: string) {
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                type: "text",
                text: { body: message },
            },
            {
                headers: {
                    Authorization: `Bearer ${env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            }
        );
    } catch (error: any) {
        console.error("❌ Send Error:", error.response?.data || error.message);
    }
}

/** Typing indicator */
export async function sendTypingIndicator(to: string) {
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                recipient_type: "individual",
                messaging_product: "whatsapp",
                to,
                type: "typing_indicator",
            },
            {
                headers: {
                    Authorization: `Bearer ${env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
                timeout: 5000,
            }
        );
    } catch (error: any) {
        console.error("❌ Typing Indicator Error:", error.response?.data || error.message);
    }
}

/**
 * Interactive reply-buttons (WhatsApp allows max 3 per message).
 * Longer lists are chunked into multiple messages by sendButtonsChunked.
 */
export async function sendInteractiveButtons(to: string, bodyText: string, buttons: ButtonItem[]) {
    try {
        const formattedButtons = buttons.slice(0, 3).map((btn) => ({
            type: "reply",
            reply: { id: btn.id, title: btn.title.slice(0, 20) },
        }));

        await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                type: "interactive",
                interactive: {
                    type: "button",
                    body: { text: bodyText },
                    action: { buttons: formattedButtons },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (err: any) {
        console.error("❌ Button Error:", err.response?.data || err.message);
    }
}

/** Send N buttons in chunks of 3 (first chunk carries bodyText, rest carry continuation text). */
export async function sendButtonsChunked(
    to: string,
    bodyText: string,
    buttons: ButtonItem[],
    continuationText = "⬇️ আরও অপশন নিচে:"
) {
    const chunks: ButtonItem[][] = [];
    for (let i = 0; i < buttons.length; i += 3) chunks.push(buttons.slice(i, i + 3));
    for (let i = 0; i < chunks.length; i++) {
        await sendInteractiveButtons(to, i === 0 ? bodyText : continuationText, chunks[i]!);
    }
}
