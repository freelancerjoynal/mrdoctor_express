import { Router } from "express";
import { prisma } from "../../lib/prisma.js";

const router = Router();

export const userPendingDoctorMap = new Map<string, string>();

router.get("/:identifier", async (req, res) => {
    try {
        const { identifier } = req.params;
        const phoneNumber = (req.query.phone as string) || "8801883314353";

        const doctor = await prisma.doctor.findUnique({
            where: { username: identifier },
        });

        if (!doctor) {
            return res.status(404).send("❌ দুঃখিত, এই ইউজারনেমে কোনো ডাক্তার খুঁজে পাওয়া যায়নি!");
        }

        userPendingDoctorMap.set(phoneNumber, doctor.id);

        const whatsappNumber = process.env.WHATSAPP_TEST_NUMBER || "15551967401";

        const fullMessage = `ডাক্তার সাহেব কি আছেন?\n\n🩺✨🏥💊🏥✨🩺\n\n${doctor.username}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

        return res.redirect(whatsappUrl);
    } catch (error) {
        console.error("❌ Redirect Error:", error);
        return res.status(500).send("Internal Server Error");
    }
});

export default router;
