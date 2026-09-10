import { sendWhatsAppMessage, sendInteractiveButtons } from "../../../../lib/sendWhatsAppMessage.js";
import { prisma } from "../../../../lib/prisma.js";
import { getOpenAIResponse } from "../../../AiService/deepseek.js";
import {
    HOSPITAL_TEXTS,
    HOSPITAL_BUTTONS,
    isHospitalTypeSelected,
    normalizeHospitalType,
    isConfirmYes,
    isValidLocation,
    isValidService,
    buildHospitalPrompt,
    buildTrackingSummary,
} from "./hospitalQA.js";

type UpdateFn = (flow: string, step: string, data: any) => void;
type ResetFn = () => void;

function getButtonId(msg: any): string {
    return (
        msg?.buttonId ||
        msg?.buttonReply?.id ||
        msg?.interactive?.button_reply?.id ||
        msg?.interactive?.button_reply?.button_id ||
        ""
    );
}

function getLocationText(text: string, msg: any): string {
    if (msg?.location?.latitude && msg?.location?.longitude) {
        return `Lat:${msg.location.latitude},Lng:${msg.location.longitude}`;
    }
    return (text || "").trim();
}

// Per-step tracking: persists flow/step all the way to the last step.
async function trackStep(phoneNumber: string, step: string, data: any) {
    try {
        const summary = buildTrackingSummary({
            location: data?.location,
            hospType: data?.hospType,
            service: data?.service,
        });
        await prisma.chatSession.upsert({
            where: { phoneNumber },
            update: {
                targetType: "FIND_HOSPITAL",
                targetId: data?.hospitalId || undefined,
                targetName: summary.slice(0, 200),
                lastFlow: "FIND_HOSPITAL_FLOW",
                lastStep: step,
            },
            create: {
                phoneNumber,
                targetType: "FIND_HOSPITAL",
                targetId: data?.hospitalId || null,
                targetName: summary.slice(0, 200),
                lastFlow: "FIND_HOSPITAL_FLOW",
                lastStep: step,
            },
        });
    } catch (e) {
        console.error("❌ FindHospital tracking error:", e);
    }
}

export async function findHospitalFlow(
    phoneNumber: string,
    text: string,
    msg: any,
    session: any,
    updateSession: UpdateFn,
    resetSession: ResetFn
) {
    const rawText = (text || "").trim();
    const buttonId = getButtonId(msg);
    const data = session?.data || {};
    const step = session?.step || "ASK_LOCATION";

    // ---------- STEP 1 (FIRST): ask location ----------
    // User sends "hospital" -> we ask "where you want to get hospital".
    if (step === "WELCOME" || step === "ASK_LOCATION") {
        // If user already sent a location-like text (entry text was "হসপিটাল", don't treat as location).
        const entryWords = ["হসপিটাল", "hospital", "hosp", "ডাক্তার", "doctor", "menu", "মেনু", "hi", "hello"];
        const isEntryWord =
            !msg?.location &&
            entryWords.some((w) => rawText.toLowerCase() === w || (rawText.toLowerCase().length < 10 && rawText.toLowerCase().includes(w)));

        if (step === "WELCOME" || (isEntryWord && !data.location)) {
            const next = { ...data, category: "HOSPITAL" };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_LOCATION", next);
            await trackStep(phoneNumber, "ASK_LOCATION", next);
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.ASK_LOCATION);
            return;
        }

        // User answered with a location.
        const locationText = getLocationText(rawText, msg);
        if (!msg?.location && !isValidLocation(locationText)) {
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.INVALID_LOCATION);
            return;
        }

        const next = { ...data, location: locationText, category: "HOSPITAL" };
        updateSession("FIND_HOSPITAL_FLOW", "ASK_TYPE", next);
        await trackStep(phoneNumber, "ASK_TYPE", next);
        await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.ASK_TYPE, HOSPITAL_BUTTONS.ASK_TYPE);
        return;
    }

    // ---------- STEP 2: hospital type ----------
    if (step === "ASK_TYPE") {
        if (!isHospitalTypeSelected(rawText, buttonId)) {
            await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.ASK_TYPE, HOSPITAL_BUTTONS.ASK_TYPE);
            return;
        }
        const next = { ...data, hospType: normalizeHospitalType(rawText, buttonId) };
        updateSession("FIND_HOSPITAL_FLOW", "ASK_SERVICE", next);
        await trackStep(phoneNumber, "ASK_SERVICE", next);
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.ASK_SERVICE);
        return;
    }

    // ---------- STEP 3: needed service ----------
    if (step === "ASK_SERVICE") {
        if (!isValidService(rawText)) {
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.INVALID_SERVICE);
            return;
        }
        const next = { ...data, service: rawText };
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.PROCESSING);

        const prompt = buildHospitalPrompt(next.location || "বাংলাদেশ", next.hospType || "যেকোনো", next.service);
        const aiReply = await getOpenAIResponse(prompt);
        await sendWhatsAppMessage(phoneNumber, aiReply);

        updateSession("FIND_HOSPITAL_FLOW", "CONFIRM_RESULT", next);
        await trackStep(phoneNumber, "CONFIRM_RESULT", next);
        await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.CONFIRM_QUESTION, HOSPITAL_BUTTONS.CONFIRM);
        return;
    }

    // ---------- STEP 4: confirmation (last step, tracked) ----------
    if (step === "CONFIRM_RESULT") {
        const summary = buildTrackingSummary({
            location: data.location,
            hospType: data.hospType,
            service: data.service,
        });

        if (isConfirmYes(rawText, buttonId) || isValidService(rawText)) {
            const done = { ...data, confirmed: true, confirmedChoice: rawText };
            await trackStep(phoneNumber, "CONFIRMED", done);
            updateSession("FIND_HOSPITAL_FLOW", "CONFIRMED", done);
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.CONFIRMED(summary + `\n📝 আপনার পছন্দ: ${rawText}`));
            // Keep DB tracking for recovery, reset in-memory to main menu.
            resetSession();
            return;
        }

        await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.FALLBACK, HOSPITAL_BUTTONS.CONFIRM);
        return;
    }

    // ---------- STEP 5: already confirmed ----------
    if (step === "CONFIRMED") {
        await sendWhatsAppMessage(phoneNumber, "মূল মেনুতে যেতে 'menu' লিখুন।");
        return;
    }

    // Unknown step -> restart from location question.
    const next = { ...data, category: "HOSPITAL" };
    updateSession("FIND_HOSPITAL_FLOW", "ASK_LOCATION", next);
    await trackStep(phoneNumber, "ASK_LOCATION", next);
    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.ASK_LOCATION);
}
