import { Router } from 'express';
import { prisma } from './prisma.js';

const router = Router();

// মেমোরিতে পেন্ডিং ডাক্তার আইডি ধরে রাখার জন্য Map (ফোন নাম্বার -> ডাক্তার আইডি)
export const userPendingDoctorMap = new Map<string, string>();

// সরাসরি আইডি বা ইউইউআইডি দিয়ে রাউট হ্যান্ডেলিং: যেমন /d/44f026eb-5f89...
router.get('/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;
        const phoneNumber = (req.query.phone as string) || "8801883314353"; 

        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctor) {
            return res.status(404).send("❌ দুঃখিত, এই আইডি দিয়ে কোনো ডাক্তার খুঁজে পাওয়া যায়নি!");
        }

        userPendingDoctorMap.set(phoneNumber, doctor.id);

        const whatsappNumber = process.env.WHATSAPP_TEST_NUMBER || "15551967401";
        
        // 🚀 প্রথমে টেক্সট, ২টি লাইন ব্রেক, ইমোজি, ২টি লাইন ব্রেক, এবং সবার শেষে আইডি
        const topText = `ডাক্তার সাহেব কি আছেন?`;
        const break1 = "\n\n";
        const emojiDesign = `🩺✨🏥💊🏥✨🩺`;
        const break2 = "\n\n";
        const hiddenId = `doctor_${doctor.id}`;
        
        const fullMessage = `${topText}${break1}${emojiDesign}${break2}${hiddenId}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
        
        res.redirect(whatsappUrl);

    } catch (error) {
        console.error("❌ Redirect Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;