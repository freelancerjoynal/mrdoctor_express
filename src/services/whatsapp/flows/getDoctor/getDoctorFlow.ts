import { sendWhatsAppMessage, sendInteractiveButtons } from "../../../../lib/sendWhatsAppMessage.js";
import { prisma } from "../../../../lib/prisma.js";

export async function handleGetDoctorFlow(
    phoneNumber: string, 
    text: string, 
    msg: any, 
    session: any,
    updateSession?: (flow: string, step: string, data: any) => void
) {
    const norm = (text || "").toLowerCase().trim();

    // ১. প্রথম এন্ট্রি: লিংক বা ডিরেক্ট সার্চ থেকে আসলে ডাটা ফেচ করে সেশন সেট করা
    if (session.step === "DIRECT_SEARCH" || norm.startsWith("doctor_")) {
        const doctorId = (session.data?.doctorId || text.replace(/doctor_/i, "")).trim();

        console.log("🔍 Fetching Doctor by ID:", doctorId);
        await sendWhatsAppMessage(phoneNumber, "⏳ ডাক্তারের প্রোফাইল লোড হচ্ছে...");

        try {
            const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });

            if (!doctor) {
                await sendWhatsAppMessage(phoneNumber, "❌ দুঃখিত, এই ডাক্তারের কোনো তথ্য পাওয়া যায়নি। মূল মেনুতে যেতে 'menu' লিখুন।");
                return;
            }

            // সেশন আপডেট
            const sessionData = { 
                doctorId: doctor.id, 
                name: doctor.name,
                workingPlace: doctor.workingPlace,
                phone: doctor.phone || ""
            };
            session.flow = "GET_DOCTOR_FLOW";
            session.step = "ACTIVE_CHAT";
            session.data = sessionData;
            if (updateSession) updateSession("GET_DOCTOR_FLOW", "ACTIVE_CHAT", sessionData);

            // প্রথম ওয়েলকাম মেসেজ ও বাটন
            await sendInteractiveButtons(
                phoneNumber,
                `Hi, ami ${doctor.name} bolchi, apnake kivabe help korte pari?`,
                [{ id: `location_${doctor.id}`, title: "লোকেশন জানতে চান" }]
            );

        } catch (error) {
            console.error("❌ DB Error:", error);
            await sendWhatsAppMessage(phoneNumber, "❌ তথ্য লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        }
        return;
    }

    // ২. সেশন ভ্যালিডেশন
    const doctorData = session.data || {};
    const doctorId = doctorData.doctorId;

    if (!doctorId) {
        await sendWhatsAppMessage(phoneNumber, "সেশন রিসেট হয়ে গেছে। দয়া করে আবার লিংক থেকে প্রবেশ করুন অথবা 'menu' লিখুন।");
        return;
    }

    // ৩. বাটন ক্লিক বা টেক্সট ইনপুট হ্যান্ডেলিং (সিম্পল সুইচ বা ইফ-এলস)
    if (norm.includes("location") || norm.includes("লোকেশন") || norm.includes("chamber") || norm.includes("চেম্বার") || norm.includes("ঠিকানা")) {
        await sendInteractiveButtons(
            phoneNumber,
            `Amar chamber location: ${doctorData.workingPlace || "চেম্বার নির্ধারিত নেই"}\n\nApni amar mobile number jante chan?`,
            [{ id: `mobile_${doctorId}`, title: "মোবাইল নম্বর জানতে চান" }]
        );
        return;
    }

    if (norm.includes("mobile") || norm.includes("মোবাইল") || norm.includes("নম্বর") || norm.includes("number") || norm.includes("phone")) {
        const replyText = doctorData.phone 
            ? `Amar mobile number: ${doctorData.phone}` 
            : "Dukkhito, amar mobile number ekhon deya nei.";
        
        await sendWhatsAppMessage(phoneNumber, replyText);
        return;
    }

    // ৪. ফলব্যাক রেসপন্স
    await sendInteractiveButtons(
        phoneNumber,
        `Ami ${doctorData.name || "ডাক্তার"} bolchi. Ei bisoye ami kono answer dite parbo na.`,
        [
            { id: `location_${doctorId}`, title: "লোকেশন জানতে চান" },
            { id: `mobile_${doctorId}`, title: "মোবাইল নম্বর জানতে চান" },
        ]
    );
}