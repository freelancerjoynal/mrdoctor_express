import { sendWhatsAppMessage } from "../../../../lib/sendWhatsAppMessage.js";

export async function handleDoctorMenuFlow(
    phoneNumber: string, 
    text: string, 
    session: any, 
    updateSession: (flow: string, step: string, data: any) => void
) {
    if (session.step === "ASK_DOCTOR_TYPE") {
        if (text.includes("এআই") || text.includes("ai") || text.includes("রোগ")) {
            updateSession("AI_DOCTOR_FLOW", "ASK_PROBLEM", session.data);
            await sendWhatsAppMessage(phoneNumber, "রোগীর কী সমস্যা বা কী লক্ষণ দেখা যাচ্ছে বিস্তারিত লিখুন:");
            return;
        }
        
        if (text.includes("এলাকা") || text.includes("area")) {
            updateSession("DOCTOR_MENU", "ASK_AREA", session.data);
            await sendWhatsAppMessage(phoneNumber, "আপনার এলাকার নাম লিখুন:");
            return;
        }

        await sendWhatsAppMessage(phoneNumber, "দয়া করে সঠিক অপশনটি সিলেক্ট করুন।");
    }
}