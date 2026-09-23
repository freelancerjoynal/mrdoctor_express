import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
const router = Router();
export const userPendingDoctorMap = new Map();
router.get("/:identifier", async (req, res) => {
    try {
        const { identifier } = req.params;
        const phoneNumber = req.query.phone || "8801883314353";
        const doctor = await prisma.doctor.findUnique({
            where: { username: identifier },
        });
        if (doctor) {
            userPendingDoctorMap.set(phoneNumber, doctor.id);
            const whatsappNumber = process.env.WHATSAPP_TEST_NUMBER || "15551967401";
            const fullMessage = `ডাক্তার সাহেব কি আছেন?\n\n🩺✨🏥💊🏥✨🩺\n\n${doctor.username}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
            return res.redirect(whatsappUrl);
        }
        // Hospital slug fallback — same short-link shape `/d/<slug>`
        // so hospital serial links (mrdoctor.com.bd/d/<slug>) keep working.
        const hospital = await prisma.hospital.findUnique({
            where: { slug: identifier },
        });
        if (hospital) {
            const whatsappNumber = process.env.WHATSAPP_TEST_NUMBER || "15551967401";
            const fullMessage = `ডাক্তার সাহেব কি আছেন?\n\n🩺✨🏥💊🏥✨🩺\n\n${hospital.slug}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
            return res.redirect(whatsappUrl);
        }
        return res.status(404).send("❌ দুঃখিত, এই নামে কোনো ডাক্তার বা হাসপাতাল খুঁজে পাওয়া যায়নি!");
    }
    catch (error) {
        console.error("❌ Redirect Error:", error);
        return res.status(500).send("Internal Server Error");
    }
});
export default router;
//# sourceMappingURL=doctorRedirectManager.js.map