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

    if (session.step === "DIRECT_SEARCH" || norm.startsWith("doctor_")) {
        const doctorIdentifier = (session.data?.doctorId || text.replace(/doctor_/i, "")).trim();

        console.log("🔍 Fetching Doctor by Identifier (ID/Username):", doctorIdentifier);
        await sendWhatsAppMessage(phoneNumber, "⏳ দয়া করে অপেক্ষা করুন, ডাক্তার সাহেদ আপনার সাথে সংযুক্ত হচ্ছেন… ⏳");

        try {
            // প্রথমে ইউজারনেম দিয়ে চেক, না পেলে আইডি দিয়ে চেক
            let doctor = await prisma.doctor.findUnique({ where: { username: doctorIdentifier } });
            if (!doctor) {
                doctor = await prisma.doctor.findUnique({ where: { id: doctorIdentifier } });
            }

            if (!doctor) {
                await sendWhatsAppMessage(phoneNumber, "❌ দুঃখিত, এই ডাক্তারের কোনো তথ্য পাওয়া যায়নি। মূল মেনুতে যেতে 'menu' লিখুন।");
                return;
            }

            const sessionData = { 
                doctorId: doctor.id, 
                name: doctor.name,
                username: doctor.username,
                workingPlace: doctor.workingPlace,
                phone: doctor.phone || ""
            };
            session.flow = "GET_DOCTOR_FLOW";
            session.step = "ACTIVE_CHAT";
            session.data = sessionData;
            if (updateSession) updateSession("GET_DOCTOR_FLOW", "ACTIVE_CHAT", sessionData);

            await sendInteractiveButtons(
                phoneNumber,
                `Hi, ami ${doctor.name} bolchi, apnake kivabe help korte pari?`,
                [{ id: `location_${doctor.id}`, title: "হ্যাঁ, লোকেশন জানতে চাই" }]
            );

        } catch (error) {
            console.error("❌ DB Error:", error);
            await sendWhatsAppMessage(phoneNumber, "❌ তথ্য লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        }
        return;
    }

    const doctorData = session.data || {};
    const doctorId = doctorData.doctorId;

    if (!doctorId) {
        await sendWhatsAppMessage(phoneNumber, "সেশন রিসেট হয়ে গেছে। দয়া করে আবার লিংক থেকে প্রবেশ করুন অথবা 'menu' লিখুন।");
        return;
    }

    if (norm.includes("location") || norm.includes("লোকেশন") || norm.includes("chamber") || norm.includes("চেম্বার") || norm.includes("ঠিকানা")) {
        await sendInteractiveButtons(
            phoneNumber,
            `আমার চেম্বারের ঠিকানা: ${doctorData.workingPlace || "চেম্বার নির্ধারিত নেই"}`,
            [{ id: `mobile_${doctorId}`, title: "হ্যাঁ, মোবাইল নম্বর জানতে চাই" }]
        );
        return;
    }

    if (norm.includes("mobile") || norm.includes("মোবাইল") || norm.includes("নম্বর") || norm.includes("number") || norm.includes("phone")) {
        const replyText = doctorData.phone 
            ? `আমার মোবাইল নম্বর: ${doctorData.phone}` 
            : "দুঃখিত, এই মুহূর্তে মোবাইল নম্বর দেওয়া নেই।";
        
        await sendWhatsAppMessage(phoneNumber, replyText);
        return;
    }

    await sendInteractiveButtons(
        phoneNumber,
        `আমি ${doctorData.name || "ডাক্তার"} বলছি। এই বিষয়ে আমি কোনো উত্তর দিতে পারব না।`,
        [
            { id: `location_${doctorId}`, title: "হ্যাঁ, লোকেশন জানতে চাই" },
            { id: `mobile_${doctorId}`, title: "হ্যাঁ, মোবাইল নম্বর জানতে চাই" },
        ]
    );
}