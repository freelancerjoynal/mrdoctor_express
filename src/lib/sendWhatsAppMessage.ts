import axios from "axios";
import { env } from "../config/env.js";

interface ButtonItem {
    id: string;
    title: string;
}

/**
 * জাস্ট টেক্সট পাঠানোর জন্য বেসিক ফাংশন
 */
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

/**
 * টাইপিং ইন্ডিকেটর পাঠানোর জন্য
 */
export async function sendTypingIndicator(to: string) {
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
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
 * ডাইনামিক বাটন পাঠানোর জন্য
 */
export async function sendInteractiveButtons(to: string, bodyText: string, buttons: ButtonItem[]) {
    try {
        const formattedButtons = buttons.slice(0, 3).map((btn) => ({
            type: "reply",
            reply: {
                id: btn.id,
                title: btn.title,
            },
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