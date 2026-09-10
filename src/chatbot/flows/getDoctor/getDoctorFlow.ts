import {
    sendWhatsAppMessage,
    sendInteractiveButtons,
} from "../../lib/sendWhatsAppMessage.js";
import { saveConnectSession } from "../../lib/chatSession.js";
import { prisma } from "../../../lib/prisma.js";
import { DOCTOR_TEXTS, getDoctorAnswer } from "./doctorQA.js";
import type { UpdateFn } from "../../lib/session.js";

const DAY_LABEL: Record<string, string> = {
    SATURDAY: "শনিবার",
    SUNDAY: "রবিবার",
    MONDAY: "সোমবার",
    TUESDAY: "মঙ্গলবার",
    WEDNESDAY: "বুধবার",
    THURSDAY: "বৃহস্পতিবার",
    FRIDAY: "শুক্রবার",
};

export async function handleGetDoctorFlow(
    phoneNumber: string,
    text: string,
    _msg: any,
    session: any,
    updateSession?: UpdateFn
) {
    void _msg;
    const norm = (text || "").toLowerCase().trim();

    // Direct entry: username (dr-xxx) or DIRECT_SEARCH step.
    if (session.step === "DIRECT_SEARCH" || norm.startsWith("dr-")) {
        const usernameParam = ((session.data?.username || text) as string).trim();

        console.log("🔍 Fetching Doctor by Username:", usernameParam);
        await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.WAITING_TEXT);

        try {
            const doctor: any = await prisma.doctor.findUnique({
                where: { username: usernameParam },
                include: {
                    chambers: { include: { hospital: true } },
                    schedules: { include: { chamber: true, hospital: true } },
                },
            });

            if (!doctor) {
                await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.NOT_FOUND);
                return;
            }

            const chambersText = (doctor.chambers || [])
                .slice(0, 3)
                .map((c: any) => {
                    const hosp = c.hospital?.name || c.chamberName || "";
                    const area = [c.thana, c.district].filter(Boolean).join(", ");
                    return `• ${[hosp, area].filter(Boolean).join(" — ") || c.addressLine}`;
                })
                .join("\n");

            const feeText = (doctor.chambers || [])
                .slice(0, 3)
                .map((c: any) => {
                    const hosp = c.hospital?.name || c.chamberName || c.addressLine;
                    const parts: string[] = [];
                    if (Number(c.newPatientFee) > 0) parts.push(`নতুন: ${c.newPatientFee} টাকা`);
                    if (Number(c.oldPatientFee) > 0) parts.push(`পুরনো: ${c.oldPatientFee} টাকা`);
                    return parts.length ? `• ${hosp}: ${parts.join(" | ")}` : "";
                })
                .filter(Boolean)
                .join("\n");

            const scheduleText = (doctor.schedules || [])
                .slice(0, 7)
                .map(
                    (s: any) =>
                        `• ${DAY_LABEL[s.dayOfWeek] || s.dayOfWeek}: ${s.startTime}–${s.endTime}` +
                        (s.hospital?.name ? ` (${s.hospital.name})` : "")
                )
                .join("\n");

            const sessionData = {
                doctorId: doctor.id,
                name: doctor.name,
                username: doctor.username,
                degree: doctor.degree || "",
                specialty: doctor.speciality || "",
                chambersText,
                scheduleText,
                feeText,
                phone: doctor.phone || "",
            };

            session.flow = "GET_DOCTOR_FLOW";
            session.step = "ACTIVE_CHAT";
            session.data = sessionData;
            if (updateSession) updateSession("GET_DOCTOR_FLOW", "ACTIVE_CHAT", sessionData);
            await saveConnectSession(
                phoneNumber,
                "DOCTOR",
                doctor.id,
                doctor.name,
                "GET_DOCTOR_FLOW",
                "ACTIVE_CHAT"
            );

            await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.welcomeMessage(doctor.name));

            const businessCardText =
                `🩺 *ডাক্তারের তথ্য ও বিবরণী*\n\n` +
                `নাম: ${doctor.name}\n` +
                `🎓 ডিগ্রি: ${doctor.degree || "এমবিবিএস"}\n` +
                `⭐ বিশেষজ্ঞতা: ${doctor.speciality || "মেডিসিন বিশেষজ্ঞ"}\n` +
                `🏥 চেম্বার:\n${chambersText || "নির্ধারিত নেই"}\n` +
                (feeText ? `💰 ভিজিট ফি:\n${feeText}\n` : "") +
                `\nআপনাকে কীভাবে সাহায্য করতে পারি নিচে থেকে বেছে নিন:`;

            await sendInteractiveButtons(phoneNumber, businessCardText, [
                { id: `location_${doctor.id}`, title: "লোকেশন জানতে চাই" },
            ]);
        } catch (error) {
            console.error("❌ DB Error:", error);
            await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.DB_ERROR);
        }
        return;
    }

    const doctorData = session.data || {};
    const doctorId = doctorData.doctorId;

    if (!doctorId) {
        await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.SESSION_RESET);
        return;
    }

    const answer = getDoctorAnswer(norm, doctorData);

    if (answer.buttons?.length) {
        await sendInteractiveButtons(phoneNumber, answer.message, answer.buttons);
    } else {
        await sendWhatsAppMessage(phoneNumber, answer.message);
    }
}
