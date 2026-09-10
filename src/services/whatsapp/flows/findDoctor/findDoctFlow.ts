import { sendWhatsAppMessage, sendInteractiveButtons } from "../../../../lib/sendWhatsAppMessage.js";
import { prisma } from "../../../../lib/prisma.js";
import { recommendAreaDoctors } from "./aiDoctorSearch.js";
import { handleGetDoctorFlow } from "../getDoctor/getDoctorFlow.js";
import {
    FIND_DOCTOR_TEXTS,
    buildConnectButton,
    buildDoctorCard,
    isAiSearchSelected,
    isAreaSearchSelected,
    isConnectClick,
    extractConnectUsername,
    isValidProblem,
    isValidLocation,
    isEntryWord,
    buildTrackingSummary,
} from "./findDoctorQA.js";

type UpdateFn = (flow: string, step: string, data: any) => void;
type ResetFn = () => void;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
            searchType: data?.searchType,
            problem: data?.problem,
            location: data?.location,
            candidates: data?.candidates,
        });
        await prisma.chatSession.upsert({
            where: { phoneNumber },
            update: {
                targetType: "FIND_DOCTOR",
                targetId: data?.doctorId || undefined,
                targetName: summary.slice(0, 200),
                lastFlow: "FIND_DOCTOR_FLOW",
                lastStep: step,
            },
            create: {
                phoneNumber,
                targetType: "FIND_DOCTOR",
                targetId: data?.doctorId || null,
                targetName: summary.slice(0, 200),
                lastFlow: "FIND_DOCTOR_FLOW",
                lastStep: step,
            },
        });
    } catch (e) {
        console.error("❌ FindDoctor tracking error:", e);
    }
}

/** Connect the user directly to a doctor: username is "sent to the chat" then GET_DOCTOR takes over. */
async function connectDoctorDirectly(
    phoneNumber: string,
    msg: any,
    username: string,
    updateSession: UpdateFn
) {
    const clean = (username || "").trim();
    if (!clean) return false;

    const doctor = await prisma.doctor.findUnique({ where: { username: clean } });
    if (!doctor) {
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.FALLBACK);
        return false;
    }

    await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.CONNECTED(doctor.name));
    // Hand the username to the direct-doctor flow exactly as if the user typed it.
    await handleGetDoctorFlow(
        phoneNumber,
        doctor.username,
        msg,
        { flow: "GET_DOCTOR_FLOW", step: "DIRECT_SEARCH", data: { username: doctor.username } },
        updateSession
    );
    return true;
}

export async function findDoctFlow(
    phoneNumber: string,
    text: string,
    msg: any,
    session: any,
    updateSession: UpdateFn,
    _resetSession: ResetFn
) {
    void _resetSession;
    const rawText = (text || "").trim();
    const buttonId = getButtonId(msg);
    const data = session?.data || {};
    const step = session?.step || "ASK_PROBLEM";

    // ---------- STEP 1 (legacy): old type-selection step -> problem-first flow ----------
    if (step === "ASK_DOCTOR_TYPE") {
        // Backward compat: honor an explicit old choice.
        if (isAiSearchSelected(rawText, buttonId)) {
            const next = { ...data, searchType: "ai", category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_PROBLEM", next);
            await trackStep(phoneNumber, "ASK_PROBLEM", next);
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM);
            return;
        }
        if (isAreaSearchSelected(rawText, buttonId)) {
            const next = { ...data, searchType: "area", category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_LOCATION", next);
            await trackStep(phoneNumber, "ASK_LOCATION", next);
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_LOCATION);
            return;
        }
        // New behavior: user clicked find-doctor -> straight to problem.
        // If they already typed a real problem, accept it and ask location.
        if (isValidProblem(rawText) && !isEntryWord(rawText)) {
            const next = { ...data, problem: rawText, category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_LOCATION", next);
            await trackStep(phoneNumber, "ASK_LOCATION", next);
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_LOCATION);
            return;
        }
        const next = { ...data, category: "DOCTOR" };
        updateSession("FIND_DOCTOR_FLOW", "ASK_PROBLEM", next);
        await trackStep(phoneNumber, "ASK_PROBLEM", next);
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM);
        return;
    }

    // ---------- STEP 2: ask problem ----------
    if (step === "ASK_PROBLEM") {
        // Entry word from main menu (e.g. "ডাক্তার") is not a problem -> just prompt.
        if (isEntryWord(rawText) && !data.problem) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM);
            return;
        }
        if (!isValidProblem(rawText)) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.INVALID_PROBLEM);
            return;
        }
        const next = { ...data, problem: rawText, category: "DOCTOR" };
        updateSession("FIND_DOCTOR_FLOW", "ASK_LOCATION", next);
        await trackStep(phoneNumber, "ASK_LOCATION", next);
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_LOCATION);
        return;
    }

    // ---------- STEP 3: ask location -> local area query -> AI -> 5 cards ----------
    if (step === "ASK_LOCATION") {
        const locationText = getLocationText(rawText, msg);

        if (!msg?.location && !isValidLocation(locationText)) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.INVALID_LOCATION);
            return;
        }
        if (!msg?.location && isEntryWord(locationText) && !data.location) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_LOCATION);
            return;
        }

        const problem = data.problem || "";
        const next = { ...data, location: locationText, category: "DOCTOR" };

        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.PROCESSING);

        // Local-first: area doctors from DB, then AI ranks top 5.
        const rec = await recommendAreaDoctors(problem || locationText, locationText);

        if (!rec.doctors.length) {
            updateSession("FIND_DOCTOR_FLOW", "ASK_LOCATION", next);
            await trackStep(phoneNumber, "ASK_LOCATION", next);
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.NO_AREA_DOCTOR(locationText));
            return;
        }

        // Analysis first (one message), then 5 doctor cards as 5 separate messages.
        if (rec.analysis) {
            await sendWhatsAppMessage(
                phoneNumber,
                `${FIND_DOCTOR_TEXTS.ANALYSIS_HEADER(rec.specialty)}${rec.analysis}`
            );
        } else {
            await sendWhatsAppMessage(
                phoneNumber,
                `${FIND_DOCTOR_TEXTS.AREA_RESULT_HEADER(locationText)}আপনার সমস্যা অনুযায়ী সেরা ৫ জন ডাক্তার বাছাই করা হয়েছে:`
            );
        }

        const top = rec.doctors.slice(0, 5);
        for (let i = 0; i < top.length; i++) {
            const d = top[i]!;
            await sendInteractiveButtons(phoneNumber, buildDoctorCard(i, d, d.reason), [buildConnectButton(d.username)]);
            if (i < top.length - 1) await sleep(500); // keep card order stable
        }

        const withCandidates = {
            ...next,
            searchType: "ai",
            specialty: rec.specialty || undefined,
            candidates: rec.doctors.slice(0, 5).map((d) => d.username),
        };
        updateSession("FIND_DOCTOR_FLOW", "SELECT_DOCTOR", withCandidates);
        await trackStep(phoneNumber, "SELECT_DOCTOR", withCandidates);
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT);
        return;
    }

    // ---------- STEP 4: user taps Connect -> username goes to chat -> direct connect ----------
    if (step === "SELECT_DOCTOR" || step === "CONFIRM_RESULT") {
        const candidates: string[] = Array.isArray(data.candidates) ? data.candidates : [];

        // 1) Connect button click (id carries the username).
        if (isConnectClick(rawText, buttonId)) {
            const username = extractConnectUsername(rawText, buttonId);
            const done = { ...data, confirmed: true, confirmedChoice: username };
            await trackStep(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, username, updateSession);
            if (ok) return;
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT);
            return;
        }

        // 2) User typed/pasted a username (dr-... or connect_dr-... or plain candidate username).
        const m = rawText.match(/(dr-[a-zA-Z0-9-]+)/i);
        if (m?.[1]) {
            const done = { ...data, confirmed: true, confirmedChoice: m[1] };
            await trackStep(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, m[1].trim(), updateSession);
            if (ok) return;
        }
        const typedUsername = rawText.toLowerCase().trim();
        const hitByUsername = candidates.find((c) => c.toLowerCase() === typedUsername);
        if (hitByUsername) {
            const done = { ...data, confirmed: true, confirmedChoice: hitByUsername };
            await trackStep(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, hitByUsername, updateSession);
            if (ok) return;
        }

        // 3) User typed a doctor's name -> resolve against candidates first, then DB.
        if (isValidProblem(rawText) && !isEntryWord(rawText)) {
            let target: any = null;
            if (candidates.length) {
                const found = await prisma.doctor.findMany({ where: { username: { in: candidates } } });
                target =
                    found.find((d: any) => d.name === rawText.trim()) ||
                    found.find((d: any) => rawText.includes(d.name) || d.name.includes(rawText.trim()));
            }
            if (!target) {
                target = await prisma.doctor.findFirst({
                    where: { name: { contains: rawText.trim(), mode: "insensitive" } },
                    orderBy: { rating: "desc" },
                });
            }
            if (target) {
                const done = { ...data, confirmed: true, confirmedChoice: target.username };
                await trackStep(phoneNumber, "CONFIRMED", done);
                const ok = await connectDoctorDirectly(phoneNumber, msg, target.username, updateSession);
                if (ok) return;
            }
        }

        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT);
        return;
    }

    // ---------- STEP 5: already confirmed -> guide to menu ----------
    if (step === "CONFIRMED") {
        await sendWhatsAppMessage(phoneNumber, "মূল মেনুতে যেতে 'menu' লিখুন।");
        return;
    }

    // Unknown step -> restart at problem question.
    const restart = { ...data, category: "DOCTOR" };
    updateSession("FIND_DOCTOR_FLOW", "ASK_PROBLEM", restart);
    await trackStep(phoneNumber, "ASK_PROBLEM", restart);
    await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM);
}
