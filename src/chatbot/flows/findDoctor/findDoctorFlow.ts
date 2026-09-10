import { prisma } from "../../../lib/prisma.js";
import {
    sendWhatsAppMessage,
    sendInteractiveButtons,
} from "../../lib/sendWhatsAppMessage.js";
import { trackFlowStep } from "../../lib/chatSession.js";
import {
    getButtonId,
    getLocationText,
    isEntryWord,
    isGpsLocation,
    isValidLocation,
    isValidProblem,
    type UpdateFn,
    type ResetFn,
} from "../../lib/session.js";
import { suggestDepartment } from "../../services/aiService.js";
import { findDoctorsByArea, buildDoctorCard } from "../../services/doctorSearch.js";
import { handleGetDoctorFlow } from "../getDoctor/getDoctorFlow.js";
import {
    FIND_DOCTOR_TEXTS,
    buildConnectButton,
    buildTrackingSummary,
    extractConnectUsername,
    isConnectClick,
} from "./findDoctorQA.js";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function track(phoneNumber: string, step: string, data: any) {
    await trackFlowStep(
        phoneNumber,
        "FIND_DOCTOR",
        "FIND_DOCTOR_FLOW",
        step,
        buildTrackingSummary({
            problem: data?.problem,
            department: data?.department,
            location: data?.location,
            candidates: data?.candidates,
        }),
        data?.doctorId || null
    );
}

/** Connect -> send username to chat -> direct doctor bot takes over. */
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
    await handleGetDoctorFlow(
        phoneNumber,
        doctor.username,
        msg,
        { flow: "GET_DOCTOR_FLOW", step: "DIRECT_SEARCH", data: { username: doctor.username } },
        updateSession
    );
    return true;
}

export async function findDoctorFlow(
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

    // Legacy entry compat: old ASK_DOCTOR_TYPE step -> problem-first.
    if (step === "ASK_DOCTOR_TYPE") {
        const next = { ...data, category: "DOCTOR" };
        updateSession("FIND_DOCTOR_FLOW", "ASK_PROBLEM", next);
        await track(phoneNumber, "ASK_PROBLEM", next);
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM);
        return;
    }

    // ---------- STEP 1: problem -> AI suggests department + why -> ask area ----------
    if (step === "ASK_PROBLEM") {
        if (isEntryWord(rawText) && !data.problem) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM);
            return;
        }
        if (!isValidProblem(rawText)) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.INVALID_PROBLEM);
            return;
        }

        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ANALYZING);
        const { department, why } = await suggestDepartment(rawText);

        const next = { ...data, problem: rawText, department, departmentWhy: why, category: "DOCTOR" };
        updateSession("FIND_DOCTOR_FLOW", "ASK_AREA", next);
        await track(phoneNumber, "ASK_AREA", next);
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_AREA(department, why));
        return;
    }

    // ---------- STEP 2: area -> DB chamber search -> random 5 doctors ----------
    if (step === "ASK_AREA") {
        const locationText = getLocationText(rawText, msg);

        if (!msg?.location && !isValidLocation(locationText)) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.INVALID_LOCATION);
            return;
        }
        if (!msg?.location && isEntryWord(locationText) && !data.location) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_AREA_RETRY);
            return;
        }

        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.PROCESSING);

        let areaForSearch = locationText;
        // GPS share -> keep raw; DB match will likely miss, then we fall back to district-less random.
        // Try reverse-geocode district for better hit (best-effort, non-blocking failure).
        if (msg?.location && isGpsLocation(locationText)) {
            try {
                const { getLocationDetails } = await import("../../services/locationService.js");
                const det = await getLocationDetails(msg.location.latitude, msg.location.longitude);
                const guess = det?.district || det?.upazila || "";
                if (guess) areaForSearch = guess;
            } catch { /* keep raw */ }
        }

        const { doctors, totalInArea } = await findDoctorsByArea(
            areaForSearch,
            data.department,
            5
        );

        if (!doctors.length) {
            const next = { ...data, location: locationText, category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_AREA", next);
            await track(phoneNumber, "ASK_AREA", next);
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.NO_AREA_DOCTOR(locationText));
            return;
        }

        void totalInArea;
        const next = { ...data, location: locationText, category: "DOCTOR" };

        await sendWhatsAppMessage(
            phoneNumber,
            FIND_DOCTOR_TEXTS.AREA_RESULT_HEADER(locationText, data.department || "ডাক্তার")
        );

        const top = doctors.slice(0, 5);
        for (let i = 0; i < top.length; i++) {
            const d = top[i]!;
            await sendInteractiveButtons(phoneNumber, buildDoctorCard(i, d), [
                buildConnectButton(d.username),
            ]);
            if (i < top.length - 1) await sleep(500);
        }

        const withCandidates = {
            ...next,
            candidates: top.map((d) => d.username),
        };
        updateSession("FIND_DOCTOR_FLOW", "SELECT_DOCTOR", withCandidates);
        await track(phoneNumber, "SELECT_DOCTOR", withCandidates);
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT);
        return;
    }

    // ---------- STEP 3: Connect click -> username sent -> direct doctor bot ----------
    if (step === "SELECT_DOCTOR" || step === "CONFIRM_RESULT") {
        const candidates: string[] = Array.isArray(data.candidates) ? data.candidates : [];

        if (isConnectClick(rawText, buttonId)) {
            const username = extractConnectUsername(rawText, buttonId);
            const done = { ...data, confirmed: true, confirmedChoice: username };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, username, updateSession);
            if (ok) return;
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT);
            return;
        }

        const m = rawText.match(/(dr-[a-zA-Z0-9-]+)/i);
        if (m?.[1]) {
            const done = { ...data, confirmed: true, confirmedChoice: m[1] };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, m[1].trim(), updateSession);
            if (ok) return;
        }
        const typed = rawText.toLowerCase().trim();
        const hit = candidates.find((c) => c.toLowerCase() === typed);
        if (hit) {
            const done = { ...data, confirmed: true, confirmedChoice: hit };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, hit, updateSession);
            if (ok) return;
        }

        // Name typed -> resolve against candidates, then DB.
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
                });
            }
            if (target) {
                const done = { ...data, confirmed: true, confirmedChoice: target.username };
                await track(phoneNumber, "CONFIRMED", done);
                const ok = await connectDoctorDirectly(phoneNumber, msg, target.username, updateSession);
                if (ok) return;
            }
        }

        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT);
        return;
    }

    if (step === "CONFIRMED") {
        await sendWhatsAppMessage(phoneNumber, "মূল মেনুতে যেতে 'menu' লিখুন।");
        return;
    }

    const restart = { ...data, category: "DOCTOR" };
    updateSession("FIND_DOCTOR_FLOW", "ASK_PROBLEM", restart);
    await track(phoneNumber, "ASK_PROBLEM", restart);
    await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM);
}
