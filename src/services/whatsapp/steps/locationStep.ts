import { sendWhatsAppMessage } from "../../../lib/sendWhatsAppMessage.js";
import { getLocationTemplate } from "../../../lib/locationTemplate.js";

export async function handleLocationStep(
    phoneNumber: string, 
    text: string, 
    msg: any, 
    setSession: (state: string, loc: string) => void
) {
    if (text.includes("লোকেশন") || text.includes("location")) {
        await sendWhatsAppMessage(
            phoneNumber,
            `📍 লোকেশন পাঠাতে:\n\n1️⃣ 📎 (Attach) চাপুন\n2️⃣ Location নির্বাচন করুন\n3️⃣ Send Current Location চাপুন`
        );
        return;
    }

    if (msg.location) {
        const lat = msg.location.latitude;
        const lng = msg.location.longitude;

        const template = await getLocationTemplate(lat, lng);

        await sendWhatsAppMessage(
            phoneNumber,
            `${template.locationText}\n\n🗺️ ম্যাপে দেখতে:\n${template.mapsLink}\n\n👉 ঠিক থাকলে লিখুন "yes"\n👉 ভুল হলে আবার লোকেশন পাঠান`
        );

        // স্টেট কনফার্মেশনে নিয়ে যাওয়া এবং লোকেশন সেভ করা
        setSession("CONFIRM_LOCATION", template.locationText);
        return;
    }
}