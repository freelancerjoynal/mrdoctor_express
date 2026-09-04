import axios from "axios";
import { env } from "../config/env.js";

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
                timeout: 10000, // ১০ সেকেন্ড টাইমআউট
            }
        );

        console.log("📤 Sent:", response.data);
    } catch (error: any) {
        console.error("❌ Send Error:", error.response?.data || error.message);
    }
}