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
 * Image message by URL (Cloud API `image.link`).
 * Used for business/banner cards — fails silently (logs only) so the
 * text flow always continues even when the image URL is bad.
 */
export async function sendWhatsAppImage(to: string, imageUrl: string, caption?: string, messageId?: string) {
    const url = (imageUrl || "").trim();
    if (!url || !/^https?:\/\//i.test(url)) return;
    void sendTypingIndicator(to, messageId);
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                type: "image",
                image: {
                    link: url,
                    ...(caption?.trim() ? { caption: caption.trim().slice(0, 1024) } : {}),
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
                timeout: 15000,
            }
        );
    } catch (error: any) {
        console.error("❌ Image Send Error:", error.response?.data || error.message);
    }
}

/**
 * Small human-like pause between messages (non-blocking sleep — no extra
 * server pressure, it just keeps the async handler alive a bit longer).
 * Pair with the typing indicator so the user sees "typing…" before each
 * message lands.
 */
export function chatDelay(ms = 900): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

/**
 * Reply-buttons under an image header (doctor banner card + Contact button).
 * Falls back to a text button message when the image URL is missing/bad.
 */
export async function sendImageButtons(
    to: string,
    imageUrl: string,
    bodyText: string,
    buttons: ButtonItem[],
    messageId?: string
) {
    const url = (imageUrl || "").trim();
    if (!url || !/^https?:\/\//i.test(url)) {
        await sendInteractiveButtons(to, bodyText, buttons, messageId);
        return;
    }
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
                    header: { type: "image", image: { link: url } },
                    body: { text: bodyText.slice(0, 1024) },
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
        console.error("❌ Image Button Error:", err.response?.data || err.message);
    }
}

/**
 * CTA URL button (opens a link, e.g. payment page).
 * WhatsApp allows exactly ONE url button per message.
 * Falls back to a plain text link when the API call fails.
 */
export async function sendCtaUrlButton(
    to: string,
    bodyText: string,
    buttonText: string,
    url: string,
    messageId?: string
) {
    const link = (url || "").trim();
    if (!link || !/^https?:\/\//i.test(link)) {
        await sendWhatsAppMessage(to, `${bodyText}\n🔗 ${link}`, messageId);
        return;
    }
    void sendTypingIndicator(to, messageId);
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                type: "interactive",
                interactive: {
                    type: "cta_url",
                    body: { text: bodyText.slice(0, 1024) },
                    action: {
                        name: "cta_url",
                        parameters: {
                            display_text: buttonText.trim().slice(0, 20),
                            url: link,
                        },
                    },
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
        console.error("❌ CTA URL Button Error:", err.response?.data || err.message);
        await sendWhatsAppMessage(to, `${bodyText}\n🔗 ${link}`, messageId);
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

export interface ListRow {
    id: string;
    title: string;
    description?: string;
}

export interface ListSection {
    title: string;
    rows: ListRow[];
}

/** Row titles are capped at 24 chars by Meta. */
export function listRowTitle(s: string, max = 24): string {
    const t = (s || "").trim();
    return t.length > max ? t.slice(0, max - 1) + "…" : t;
}

/**
 * Interactive list-picker message (WhatsApp "menu" style).
 * The user taps one button, sees all rows, picks one — the list closes.
 * Limits: button ≤20 chars, body ≤1024, section title ≤24,
 * max 10 rows per message, row id ≤200, row title ≤24, description ≤72.
 */
export async function sendInteractiveList(
    to: string,
    bodyText: string,
    buttonText: string,
    sections: ListSection[],
    options?: { headerText?: string; footerText?: string; messageId?: string }
) {
    void sendTypingIndicator(to, options?.messageId);
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                type: "interactive",
                interactive: {
                    type: "list",
                    ...(options?.headerText?.trim()
                        ? { header: { type: "text", text: options.headerText.trim().slice(0, 60) } }
                        : {}),
                    body: { text: bodyText.slice(0, 1024) },
                    ...(options?.footerText?.trim()
                        ? { footer: { text: options.footerText.trim().slice(0, 60) } }
                        : {}),
                    action: {
                        button: buttonText.trim().slice(0, 20),
                        sections: sections.slice(0, 10).map((s) => ({
                            title: s.title.trim().slice(0, 24),
                            rows: s.rows.slice(0, 10).map((r) => ({
                                id: r.id.slice(0, 200),
                                title: listRowTitle(r.title),
                                ...(r.description?.trim()
                                    ? { description: r.description.trim().slice(0, 72) }
                                    : {}),
                            })),
                        })),
                    },
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
        console.error("❌ List Error:", err.response?.data || err.message);
    }
}

/** Send N list rows in chunks of 10 per message (Meta cap). */
export async function sendListChunked(
    to: string,
    bodyText: string,
    buttonText: string,
    rows: ListRow[],
    sectionTitle = "তালিকা",
    continuationText = "⬇️ আরও অপশন নিচে:"
) {
    for (let i = 0; i < rows.length; i += 10) {
        await sendInteractiveList(
            to,
            i === 0 ? bodyText : continuationText,
            buttonText,
            [{ title: sectionTitle, rows: rows.slice(i, i + 10) }]
        );
    }
}
