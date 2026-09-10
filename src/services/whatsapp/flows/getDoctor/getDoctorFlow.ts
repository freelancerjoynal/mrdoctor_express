import { sendWhatsAppMessage, sendInteractiveButtons } from "../../../../lib/sendWhatsAppMessage.js";
import { prisma } from "../../../../lib/prisma.js";
import { DOCTOR_TEXTS, getDoctorAnswer } from "./doctorQA.js";

export async function handleGetDoctorFlow(
    phoneNumber: string,
    text: string,
    msg: any,
    session: any,
    updateSession?: (flow: string, step: string, data: any) => void
) {
    const norm = (text || "").toLowerCase().trim();

    // All DB / session / WhatsApp-sending logic stays here.
    if (session.step === "DIRECT_SEARCH" || norm.startsWith("dr-")) {
        const usernameParam = (session.data?.username || text).trim();

        console.log("🔍 Fetching Doctor by Username:", usernameParam);
        await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.WAITING_TEXT);

        try {
            const doctor = await prisma.doctor.findUnique({
                where: { username: usernameParam }
            });

            if (!doctor) {
                await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.NOT_FOUND);
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
                DOCTOR_TEXTS.welcomeMessage(doctor.name),
                [{ id: `location_${doctor.id}`, title: "হ্যাঁ, লোকেশন জানতে চাই" }]
            );

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

    // One question -> one answer (sync switch from doctorQA.ts)
    const answer = getDoctorAnswer(norm, doctorData);

    if (answer.buttons?.length) {
        await sendInteractiveButtons(phoneNumber, answer.message, answer.buttons);
    } else {
        await sendWhatsAppMessage(phoneNumber, answer.message);
    }
}
