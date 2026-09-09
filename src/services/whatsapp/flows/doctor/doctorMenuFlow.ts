import { sendWhatsAppMessage, sendInteractiveButtons } from "../../../../lib/sendWhatsAppMessage.js";

export async function handleDoctorMenuFlow(
    phoneNumber: string, 
    text: string, 
    msg: any, 
    session: any, 
    updateSession: (flow: string, step: string, data: any) => void,
    resetSession: () => void
) {
    if (session.step === "ASK_DOCTOR_TYPE") {
        
        // ১. যদি কোনো অপশন সিলেক্ট করা না থাকে, তবে সবার প্রথমে এই প্রশ্ন ও অপশনগুলো দেখাবে
        if (!text.includes("এআই") && !text.includes("ai") && !text.includes("রোগ") && !text.includes("এলাকা") && !text.includes("area") && !text.includes("ai_search") && !text.includes("area_search")) {
            await sendInteractiveButtons(
                phoneNumber,
                "আপনি কোন ধরনের সেবা চাচ্ছেন?",
                [
                    { id: "ai_search", title: "রোগ বলে এআই দিয়ে খুঁজি" },
                    { id: "area_search", title: "এলাকার ডাক্তার" },
                    { id: "home_btn", title: "🏠 মূল মেনু" }
                ]
            );
            return;
        }

        // ২. ইউজার যদি এআই অপশন সিলেক্ট করে
        if (text.includes("এআই") || text.includes("ai") || text.includes("রোগ") || text.includes("ai_search")) {
            updateSession("AI_DOCTOR_FLOW", "ASK_PROBLEM", session.data);
            await sendWhatsAppMessage(phoneNumber, "রোগীর কী সমস্যা বা কী লক্ষণ দেখা যাচ্ছে বিস্তারিত লিখুন:");
            return;
        }
        
        // ৩. ইউজার যদি এলাকার ডাক্তার অপশন সিলেক্ট করে
        if (text.includes("এলাকা") || text.includes("area") || text.includes("area_search")) {
            await sendInteractiveButtons(
                phoneNumber,
                "📍 এলাকার ডাক্তার খোঁজার ফিচারটি খুব শীঘ্রই আসছে!\n\nআপনি চাইলে অন্য সেবাটি বেছে নিতে পারেন:",
                [
                    { id: "ai_search", title: "রোগ বলে এআই দিয়ে খুঁজি" },
                    { id: "home_btn", title: "🏠 মূল মেনু" }
                ]
            );
            return;
        }
    }
}