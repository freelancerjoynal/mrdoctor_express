import { sendWhatsAppMessage, sendInteractiveButtons } from "../../../lib/sendWhatsAppMessage.js";

export async function handleMainFlow(
    phoneNumber: string, 
    text: string, 
    session: any, 
    updateSession: (flow: string, step: string, data: any) => void
) {
    if (session.step === "WELCOME" || ["hi", "hello", "start", "reset"].includes(text)) {
        updateSession("MAIN_MENU", "ASK_CATEGORY", {});
        await sendInteractiveButtons(
            phoneNumber,
            "স্বাগতম! আপনি কী খুঁজছেন?",
            [
                { id: "doc_btn", title: "ডাক্তার" },
                { id: "hosp_btn", title: "হসপিটাল" }
            ]
        );
        return;
    }

    if (session.step === "ASK_CATEGORY") {
        if (text.includes("ডাক্তার") || text.includes("doc")) {
            updateSession("DOCTOR_MENU", "ASK_DOCTOR_TYPE", { category: "DOCTOR" });
            
            await sendInteractiveButtons(
                phoneNumber,
                "আপনি কোন ধরনের সেবা চাচ্ছেন?",
                [
                    { id: "ai_search", title: "রোগ বলে এআই দিয়ে খুঁজি" },
                    { id: "area_search", title: "এলাকার ডাক্তার" }
                ]
            );
        } else if (text.includes("হসপিটাল") || text.includes("hosp")) {
            await sendWhatsAppMessage(phoneNumber, "🏥 হসপিটাল খোঁজার ফিচারটি খুব শীঘ্রই আসছে!");
            updateSession("MAIN_MENU", "WELCOME", {});
        } else {
            await sendWhatsAppMessage(phoneNumber, "দয়া করে নিচের বাটন থেকে একটি অপশন সিলেক্ট করুন।");
        }
    }
}