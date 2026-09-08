import { sendWhatsAppMessage, sendTypingIndicator, sendInteractiveButtons } from "../../../lib/sendWhatsAppMessage.js";

export async function handleProblemStep(
    phoneNumber: string, 
    text: string, 
    setSession: (state: string, problem: string) => void
) {
    if (!text) {
        await sendWhatsAppMessage(phoneNumber, "দয়া করে আপনার সমস্যার কথা একটু বিস্তারিত লিখুন:");
        return;
    }

    // স্টেট 'ASK_LOCATION' করা হলো এবং ইউজারের প্রবলেম সেভ করা হলো
    setSession("ASK_LOCATION", text);
    
    await sendTypingIndicator(phoneNumber);

    await sendInteractiveButtons(
        phoneNumber,
        "📍 আপনার লোকেশন দিতে নিচের বাটনে ক্লিক করুন",
        [{ id: "loc_btn", title: "📍 লোকেশন দিন" }]
    );

    await sendWhatsAppMessage(
        phoneNumber,
        "👉 বাটনে ক্লিক করুন, তারপর:\n📎 Attach → Location → Send Current Location\nঅথবা আপনার এলাকার নাম লিখুন"
    );
}