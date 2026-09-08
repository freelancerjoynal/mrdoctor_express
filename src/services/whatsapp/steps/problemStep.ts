import { sendWhatsAppMessage, sendTypingIndicator, sendInteractiveButtons } from "../../../lib/sendWhatsAppMessage.js";

export async function handleProblemStep(phoneNumber: string, setSession: (state: string) => void) {
    setSession("ASK_LOCATION");
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

    // ⏳ Reminder
    setTimeout(async () => {
        // এখানে চাইলে সেশন চেক করে রিমাইন্ডার পাঠানো যাবে
    }, 25000);
}