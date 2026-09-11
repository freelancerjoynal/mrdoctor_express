import axios from "axios";
import { env } from "../../config/env.js";

export interface ButtonItem {
    id: string;
    title: string;
}

/** Plain text message (shows typing first, like normal chat). */
export async function sendWhatsAppMessage(to: string, message: string, messageId?: string) {
    // Fire-and-forget: typing shows while the real message is on its way.
    void sendTypingIndicator(to, messageId);
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

/**
 * Typing indicator (correct Cloud API form).
 * Marks the inbound message read AND shows "typing…" — dismissed when we
 * respond or after ~25s. Needs the inbound wamid; skipped without one.
 * Uses a newer Graph version because v20.0 has no typing support.
 */
const TYPING_API_VERSION = "v22.0";

export async function sendTypingIndicator(_to: string, messageId?: string) {
    if (!messageId) return;
    try {
        await axios.post(
            `https://graph.facebook.com/${TYPING_API_VERSION}/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                status: "read",
                message_id: messageId,
                typing_indicator: { type: "text" },
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
export async function sendInteractiveButtons(to: string, bodyText: string, buttons: ButtonItem[], messageId?: string) {
    // Fire-and-forget: typing shows while the real message is on its way.
    void sendTypingIndicator(to, messageId);
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
