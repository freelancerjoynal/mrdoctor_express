import { Router } from 'express';
import { prisma } from './prisma.js';

const router = Router();

export const userPendingDoctorMap = new Map<string, string>();

router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params; // যেমন: dr-moniruzzaman
        const phoneNumber = (req.query.phone as string) || "8801883314353"; 

        // সরাসরি ডাটাবেজে username দিয়ে খোঁজা হচ্ছে
        const doctor = await prisma.doctor.findUnique({
            where: { username: identifier }
        });

        if (!doctor) {
            return res.status(404).send("❌ দুঃখিত, এই ইউজারনেমে কোনো ডাক্তার খুঁজে পাওয়া যায়নি!");
        }

        // ফ্লো বা সেশনের জন্য ডাক্তারের আসল id ম্যাপে সেভ থাকছে
        userPendingDoctorMap.set(phoneNumber, doctor.id);

        const whatsappNumber = process.env.WHATSAPP_TEST_NUMBER || "15551967401";
        
        const topText = `ডাক্তার সাহেব কি আছেন?`;
        const break1 = "\n\n";
        const emojiDesign = `🩺✨🏥💊🏥✨🩺`;
        const break2 = "\n\n";
        
        // 🚀 এখানে আর কোনো 'doctor_' বা আইডি নেই, সরাসরি ডাক্তারের ইউজারনেম (যেমন: dr-moniruzzaman) পাঠানো হচ্ছে
        const fullMessage = `${topText}${break1}${emojiDesign}${break2}${doctor.username}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
        
        res.redirect(whatsappUrl);

    } catch (error) {
        console.error("❌ Redirect Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;