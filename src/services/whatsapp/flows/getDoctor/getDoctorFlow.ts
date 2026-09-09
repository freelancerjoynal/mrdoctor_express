import { sendWhatsAppMessage } from "../../../../lib/sendWhatsAppMessage.js";
import { prisma } from "../../../../lib/prisma.js";

export async function handleGetDoctorFlow(
    phoneNumber: string, 
    text: string, 
    msg: any, 
    session: any
) {
    if (session.step === "DIRECT_SEARCH" || text.startsWith("doctor_")) {
        const rawParam = session.data?.doctorId || text.replace("doctor_", "");
        const doctorId = rawParam.trim();

        console.log("🔍 Searching for Doctor ID in Database:", JSON.stringify(doctorId));

        await sendWhatsAppMessage(phoneNumber, "⏳ আপনার জন্য নির্দিষ্ট ডাক্তারের তথ্য খোঁজা হচ্ছে...");

        try {
            const doctor = await prisma.doctor.findUnique({
                where: { id: doctorId }
            });

            if (!doctor) {
                await sendWhatsAppMessage(phoneNumber, "❌ দুঃখিত, এই ডাক্তারের কোনো তথ্য পাওয়া যায়নি। মূল মেনুতে যেতে 'menu' বা 'home' লিখুন।");
                return;
            }

            const doctorDetails = `👨‍⚕️ *ডাক্তারের বিবরণী*\n\n` +
                `🔹 নাম: ${doctor.name}\n` +
                `🔹 ডিগ্রি: ${doctor.degree || "N/A"}\n` +
                `🔹 বিশেষজ্ঞতা: ${doctor.speciality}\n` +
                `🔹 কর্মস্থল/চেম্বার: ${doctor.workingPlace}\n` +
                `🔹 রেটিং: ⭐ ${doctor.rating || "N/A"}\n\n` +
                `সিরিয়াল বা অন্যান্য তথ্যের জন্য মূল মেনুতে ফিরে যেতে পারেন।`;

            await sendWhatsAppMessage(phoneNumber, doctorDetails);

        } catch (error) {
            console.error("❌ Get Doctor DB Error:", error);
            await sendWhatsAppMessage(phoneNumber, "❌ তথ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        }
        return;
    }

    await sendWhatsAppMessage(phoneNumber, "দয়া করে সঠিক নির্দেশনা অনুসরণ করুন। মূল মেনুতে যেতে 'menu' লিখুন।");
}