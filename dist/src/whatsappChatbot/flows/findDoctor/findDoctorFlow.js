import { prisma } from "../../../lib/prisma.js";
import { sendWhatsAppMessage, sendInteractiveButtons, sendButtonsChunked, sendTypingIndicator, } from "../../lib/sendWhatsAppMessage.js";
import { trackFlowStep } from "../../lib/chatSession.js";
import { getButtonId, getLocationText, extractGps, isAreaClick, extractAreaIdx, isEntryWord, isValidLocation, isValidProblem, shortTitle, } from "../../lib/session.js";
import { findNearestAreas, findNearestByName } from "../../services/nearbyAreas.js";
import { BACK_HINT, withNav } from "../../lib/navButtons.js";
import { suggestDepartment } from "../../services/aiService.js";
import { findDoctorsByArea, buildDoctorCard } from "../../services/doctorSearch.js";
import { handleGetDoctorFlow } from "../getDoctor/getDoctorFlow.js";
import { FIND_DOCTOR_TEXTS, buildConnectButton, buildTrackingSummary, extractConnectUsername, isConnectClick, } from "./findDoctorQA.js";
async function track(phoneNumber, step, data) {
    await trackFlowStep(phoneNumber, "FIND_DOCTOR", "FIND_DOCTOR_FLOW", step, buildTrackingSummary({
        problem: data?.problem,
        department: data?.department,
        location: data?.location,
        candidates: data?.candidates,
    }), data?.doctorId || null);
}
/** Connect -> send username to chat -> direct doctor bot takes over. */
async function connectDoctorDirectly(phoneNumber, msg, username, updateSession) {
    const clean = (username || "").trim();
    if (!clean)
        return false;
    const doctor = await prisma.doctor.findUnique({ where: { username: clean } });
    if (!doctor) {
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.FALLBACK + BACK_HINT);
        return false;
    }
    await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.CONNECTED(doctor.name));
    await handleGetDoctorFlow(phoneNumber, doctor.username, msg, { flow: "GET_DOCTOR_FLOW", step: "DIRECT_SEARCH", data: { username: doctor.username } }, updateSession);
    return true;
}
export async function findDoctorFlow(phoneNumber, text, msg, session, updateSession, _resetSession) {
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
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM + BACK_HINT);
        return;
    }
    // ---------- STEP 1: problem -> AI suggests department + why -> ask area ----------
    if (step === "ASK_PROBLEM") {
        if (isEntryWord(rawText) && !data.problem) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM + BACK_HINT);
            return;
        }
        if (!isValidProblem(rawText)) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.INVALID_PROBLEM + BACK_HINT);
            return;
        }
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ANALYZING);
        void sendTypingIndicator(phoneNumber, msg?.messageId);
        const { department, why } = await suggestDepartment(rawText);
        const next = { ...data, problem: rawText, department, departmentWhy: why, category: "DOCTOR" };
        updateSession("FIND_DOCTOR_FLOW", "ASK_AREA", next);
        await track(phoneNumber, "ASK_AREA", next);
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_AREA(department, why) + BACK_HINT);
        return;
    }
    // ---------- STEP 2: area -> DB chamber search -> random 5 doctors ----------
    if (step === "ASK_AREA") {
        // Suggested nearby-area button tapped (area_0, area_1, ...) -> resolve name.
        const areaIdx = isAreaClick(rawText, buttonId) ? extractAreaIdx(rawText, buttonId) : -1;
        const areaSug = Array.isArray(data.areaSuggestions) ? data.areaSuggestions : [];
        // GPS shared from device -> suggest the 3 nearest Bengali areas as buttons.
        // (No auto-search: the user confirms with one tap, fixing any wrong guess.)
        const gps = extractGps(msg);
        if (gps && areaIdx < 0) {
            const nearest = findNearestAreas(gps.lat, gps.lng, 3);
            if (nearest.length) {
                const next = {
                    ...data,
                    areaSuggestions: nearest,
                    detectedArea: nearest[0],
                    category: "DOCTOR",
                };
                updateSession("FIND_DOCTOR_FLOW", "ASK_AREA", next);
                await track(phoneNumber, "ASK_AREA", next);
                const buttons = nearest.map((n, i) => ({ id: `area_${i}`, title: shortTitle(n) }));
                await sendButtonsChunked(phoneNumber, FIND_DOCTOR_TEXTS.NEARBY_HEADER(nearest[0]), buttons);
                return;
            }
        }
        let locationText = getLocationText(rawText, msg);
        if (areaIdx >= 0 && areaSug[areaIdx])
            locationText = areaSug[areaIdx];
        if (!msg?.location && !isValidLocation(locationText)) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.INVALID_LOCATION + BACK_HINT);
            return;
        }
        if (!msg?.location && isEntryWord(locationText) && !data.location) {
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_AREA_RETRY + BACK_HINT);
            return;
        }
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.PROCESSING);
        void sendTypingIndicator(phoneNumber, msg?.messageId);
        const areaForSearch = locationText;
        const { doctors, totalInArea } = await findDoctorsByArea(areaForSearch, data.department, 5);
        if (!doctors.length) {
            // Nothing found -> offer nearby areas (from earlier GPS or by typed name).
            const suggestions = areaSug.length ? areaSug : findNearestByName(locationText, 3);
            const next = {
                ...data,
                location: locationText,
                areaSuggestions: suggestions.length ? suggestions : areaSug,
                category: "DOCTOR",
            };
            updateSession("FIND_DOCTOR_FLOW", "ASK_AREA", next);
            await track(phoneNumber, "ASK_AREA", next);
            if (suggestions.length) {
                const buttons = suggestions.map((n, i) => ({ id: `area_${i}`, title: shortTitle(n) }));
                await sendButtonsChunked(phoneNumber, FIND_DOCTOR_TEXTS.NO_AREA_DOCTOR(locationText) + "\n\n📍 কাছের এলাকা থেকে বেছে নিন 👇", buttons);
            }
            else {
                await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.NO_AREA_DOCTOR(locationText) + BACK_HINT);
            }
            return;
        }
        void totalInArea;
        const next = { ...data, location: locationText, category: "DOCTOR" };
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.AREA_RESULT_HEADER(locationText, data.department || "ডাক্তার"));
        const top = doctors.slice(0, 5);
        for (let i = 0; i < top.length; i++) {
            const d = top[i];
            await sendInteractiveButtons(phoneNumber, buildDoctorCard(i, d), [
                buildConnectButton(d.username),
            ]);
        }
        const withCandidates = {
            ...next,
            candidates: top.map((d) => d.username),
        };
        updateSession("FIND_DOCTOR_FLOW", "SELECT_DOCTOR", withCandidates);
        await track(phoneNumber, "SELECT_DOCTOR", withCandidates);
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT + BACK_HINT);
        return;
    }
    // ---------- STEP 3: Connect click -> username sent -> direct doctor bot ----------
    if (step === "SELECT_DOCTOR" || step === "CONFIRM_RESULT") {
        const candidates = Array.isArray(data.candidates) ? data.candidates : [];
        if (isConnectClick(rawText, buttonId)) {
            const username = extractConnectUsername(rawText, buttonId);
            const done = { ...data, confirmed: true, confirmedChoice: username };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, username, updateSession);
            if (ok)
                return;
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT + BACK_HINT);
            return;
        }
        const m = rawText.match(/(dr-[a-zA-Z0-9-]+)/i);
        if (m?.[1]) {
            const done = { ...data, confirmed: true, confirmedChoice: m[1] };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, m[1].trim(), updateSession);
            if (ok)
                return;
        }
        const typed = rawText.toLowerCase().trim();
        const hit = candidates.find((c) => c.toLowerCase() === typed);
        if (hit) {
            const done = { ...data, confirmed: true, confirmedChoice: hit };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, hit, updateSession);
            if (ok)
                return;
        }
        // Name typed -> resolve against candidates, then DB.
        if (isValidProblem(rawText) && !isEntryWord(rawText)) {
            let target = null;
            if (candidates.length) {
                const found = await prisma.doctor.findMany({ where: { username: { in: candidates } } });
                target =
                    found.find((d) => d.name === rawText.trim()) ||
                        found.find((d) => rawText.includes(d.name) || d.name.includes(rawText.trim()));
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
                if (ok)
                    return;
            }
        }
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT + BACK_HINT);
        return;
    }
    if (step === "CONFIRMED") {
        await sendInteractiveButtons(phoneNumber, "✅ ধন্যবাদ! আর কিছু করতে চাইলে নিচে থেকে বেছে নিন:", withNav([]));
        return;
    }
    const restart = { ...data, category: "DOCTOR" };
    updateSession("FIND_DOCTOR_FLOW", "ASK_PROBLEM", restart);
    await track(phoneNumber, "ASK_PROBLEM", restart);
    await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM + BACK_HINT);
}
//# sourceMappingURL=findDoctorFlow.js.map