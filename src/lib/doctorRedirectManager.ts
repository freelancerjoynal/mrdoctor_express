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

        // ডাটাবেজ থেকে চেক করে নেওয়া যে আইডিটি আসলেই ডাটাবেজে আছে কি না
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctor) {
            return res.status(404).send("❌ দুঃখিত, এই আইডি দিয়ে কোনো ডাক্তার খুঁজে পাওয়া যায়নি!");
        }

        // ডাক্তারের আসল আইডি পেন্ডিং ম্যাপে সেভ করে রাখা হলো
        userPendingDoctorMap.set(phoneNumber, doctor.id);

        // ইউজারকে হোয়াটসঅ্যাপে রিডাইরেক্ট করা হচ্ছে যেখানে শুধু 'Hi' লেখা থাকবে
        const whatsappNumber = process.env.WHATSAPP_TEST_NUMBER || "15551967401";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi`;
        
        res.redirect(whatsappUrl);

    } catch (error) {
        console.error("❌ Redirect Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;