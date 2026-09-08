import axios from "axios";
import { env } from "../config/env.js";

/**
 * Sends a text message to a WhatsApp user using the Cloud API.
 */
export async function sendWhatsAppMessage(to: string, message: string) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                type: "text",
                text: {
                    body: message,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            }
        );

        console.log("📤 Sent:", response.data);
    } catch (error: any) {
        console.error("❌ Send Error:", error.response?.data || error.message);
    }
}

/**
 * Sends a typing indicator dynamically to the specific user.
 */
export async function sendTypingIndicator(to: string) {
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to,
                type: "typing_indicator"
                // 'typing_indicator' অবজেক্টটি এখানে বাদ দিতে হবে কারণ মেটা শুধু type: "typing_indicator" চাচ্ছে
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