import { sendWhatsAppMessage } from "../../../../lib/sendWhatsAppMessage.js";

export async function handleGetHospitalFlow(
    phoneNumber: string, 
    text: string, 
    msg: any, 
    session: any,
    updateSession: (flow: string, step: string, data: any) => void,
    resetSession: () => void
) {
    // ইউজার যদি হসপিটাল অপশন বা হসপিটাল ডিপ লিংকে আসে (যেমন: hospital_dmc)
    if (session.step === "WELCOME" || text.startsWith("hospital_") || text.includes("হসপিটাল") || text.includes("hosp")) {
        
        await sendWhatsAppMessage(
            phoneNumber,
            "🏥 *হসপিটাল সেবা*\n\nহসপিটাল বা ক্লিনিক খোঁজার এই ফিচারটি খুব শীঘ্রই আসছে! আমরা কাজ করছি। খুব শীঘ্রই আপনারা এই সেবাটি ব্যবহার করতে পারবেন ইনশাআল্লাহ। ✨"
        );

        // ইউজারকে চাইলে আবার মূল মেনুতে ফেরত পাঠাতে পারেন অথবা সেশন রিসেট করতে পারেন
        resetSession();
        
        await sendWhatsAppMessage(
            phoneNumber,
            "মূল মেনুতে ফিরে যেতে যেকোনো সময় 'menu' বা 'home' লিখুন।"
        );
        return;
    }

    resetSession();
    await sendWhatsAppMessage(phoneNumber, "বট রিস্টার্ট করা হয়েছে। শুরু করতে 'Hi' বা 'Hello' লিখুন।");
}