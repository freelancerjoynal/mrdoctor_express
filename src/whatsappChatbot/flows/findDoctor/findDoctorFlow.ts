import { prisma } from "../../../lib/prisma.js";
import {
    sendWhatsAppMessage,
    sendInteractiveButtons,
    sendTypingIndicator,
} from "../../lib/sendWhatsAppMessage.js";
import {
    getButtonId,
    isEntryWord,
    isValidProblem,
    type UpdateFn,
    type ResetFn,
} from "../../lib/session.js";
import { suggestCategoryFromFullList } from "../../services/aiService.js";
import { DOCTOR_SPECIALITIES } from "../../../lib/doctorSpeciality.js";
import { BACK_HINT, withNav } from "../../lib/navButtons.js";
import {
    findDivision,
    matchDivision,
    matchDistrict,
    matchThana,
    matchSpeciality,
    fetchAvailableSpecs,
    fetchLocationDoctors,
    sendDivisionPrompt,
    sendDistrictPrompt,
    sendThanaPrompt,
    sendSpecialityPrompt,
    sendDoctorCards,
    sendSeeMoreButton,
    buildLocationDoneMessage,
    advancePickedSpeciality,
    handleAltDistrict,
    handleAltThana,
    LOCATION_TEXTS,
    DOCTOR_CARD_PAGE,
    MORE_DOCTORS_ID,
    SUGGEST_SPEC_ID,
    type AvailableSpec,
} from "../../lib/locationSelect.js";
import { handleGetDoctorFlow } from "../getDoctor/getDoctorFlow.js";
import {
    FIND_DOCTOR_TEXTS,
    extractConnectUsername,
    isConnectClick,
} from "./findDoctorQA.js";

// NOTE: FIND flow is intentionally NOT persisted to DB (ChatSession).
// History is only kept after a real doctor connect (GET_DOCTOR_FLOW,
// saved via saveConnectSession with the doctor username). This no-op
// keeps the old call-sites compiling without writing history.
async function track(_phoneNumber: string, _step: string, _data: any) {
    void _phoneNumber;
    void _step;
    void _data;
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
        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.FALLBACK + BACK_HINT);
        return false;
    }

    // Card + "connecting" text are sent by the doctor flow (DIRECT_SEARCH),
    // so nothing is sent here — avoids a duplicate connecting message.
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
    const step = session?.step || "ASK_DIVISION";

    // Legacy / AI-first sessions -> back to existing location-first flow.
    if (step === "ASK_DOCTOR_TYPE" || step === "ASK_AREA" || step === "ASK_PROBLEM") {
        const next = { ...data, category: "DOCTOR" };
        updateSession("FIND_DOCTOR_FLOW", "ASK_DIVISION", next);
        await track(phoneNumber, "ASK_DIVISION", next);
        await sendDivisionPrompt(phoneNumber, "DOCTOR");
        return;
    }

    // ---------- LOCATION FIRST: division -> district -> thana -> category ----------
    if (step === "ASK_DIVISION") {
        const hit = matchDivision(rawText, buttonId);
        if (!hit) {
            await sendDivisionPrompt(phoneNumber, "DOCTOR");
            if (!isEntryWord(rawText)) {
                await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
            }
            return;
        }
        const next = { ...data, division: hit.name, category: "DOCTOR" };
        updateSession("FIND_DOCTOR_FLOW", "ASK_DISTRICT", next);
        await track(phoneNumber, "ASK_DISTRICT", next);
        await sendDistrictPrompt(phoneNumber, "DOCTOR", hit);
        return;
    }

    if (step === "ASK_DISTRICT") {
        const division = findDivision(String(data.division || ""));
        if (!division) {
            const next = { ...data, category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_DIVISION", next);
            await track(phoneNumber, "ASK_DIVISION", next);
            await sendDivisionPrompt(phoneNumber, "DOCTOR");
            return;
        }
        const hit = matchDistrict(division, rawText, buttonId);
        if (!hit) {
            await sendDistrictPrompt(phoneNumber, "DOCTOR", division);
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
            return;
        }
        const next = { ...data, division: division.name, district: hit.name, category: "DOCTOR" };
        updateSession("FIND_DOCTOR_FLOW", "ASK_THANA", next);
        await track(phoneNumber, "ASK_THANA", next);
        await sendThanaPrompt(phoneNumber, hit);
        return;
    }

    if (step === "ASK_THANA") {
        const division = findDivision(String(data.division || ""));
        const district = division?.districts.find((d) => d.name === data.district) || null;
        if (!division || !district) {
            const next = { ...data, category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_DIVISION", next);
            await track(phoneNumber, "ASK_DIVISION", next);
            await sendDivisionPrompt(phoneNumber, "DOCTOR");
            return;
        }
        const hit = matchThana(district, rawText, buttonId);
        if (!hit) {
            await sendThanaPrompt(phoneNumber, district);
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
            return;
        }
        // Only categories with a real chamber here move forward.
        // The last row is "🤔 সমস্যা লিখুন" -> can't find category? tell us
        // your problem, DeepSeek suggests it (ASK_SUGGEST_PROBLEM).
        const available: AvailableSpec[] = await fetchAvailableSpecs(hit, district.name);
        if (!available.length) {
            await sendWhatsAppMessage(
                phoneNumber,
                LOCATION_TEXTS.NO_DOCTORS_THANA(hit, district.name, division.name) + BACK_HINT
            );
            return;
        }
        const next = {
            ...data,
            division: division.name,
            district: district.name,
            thana: hit,
            location: `${hit}, ${district.name}`,
            availableSpecs: available,
            category: "DOCTOR",
        };
        updateSession("FIND_DOCTOR_FLOW", "ASK_SPECIALITY", next);
        await track(phoneNumber, "ASK_SPECIALITY", next);
        await sendSpecialityPrompt(phoneNumber, available);
        return;
    }

    if (step === "ASK_SPECIALITY") {
        // Resumed without location context -> pick thana again from the top.
        if (!data.thana || !data.district) {
            const restart = { ...data, category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_DIVISION", restart);
            await track(phoneNumber, "ASK_DIVISION", restart);
            await sendDivisionPrompt(phoneNumber, "DOCTOR");
            return;
        }
        const stored: AvailableSpec[] | undefined = Array.isArray(data.availableSpecs)
            ? data.availableSpecs
            : undefined;
        const allowed: AvailableSpec[] = stored?.length
            ? stored
            : await fetchAvailableSpecs(String(data.thana), String(data.district));
        if (!allowed.length) {
            await sendWhatsAppMessage(
                phoneNumber,
                LOCATION_TEXTS.NO_DOCTORS_THANA(String(data.thana), String(data.district || ""), String(data.division || "")) + BACK_HINT
            );
            return;
        }
        if (allowed !== stored) {
            const refreshed = { ...data, availableSpecs: allowed };
            updateSession("FIND_DOCTOR_FLOW", "ASK_SPECIALITY", refreshed);
            await track(phoneNumber, "ASK_SPECIALITY", refreshed);
        }
        // "Can't figure out?" row -> ask the problem, AI suggests the category.
        if (buttonId.toLowerCase().trim() === SUGGEST_SPEC_ID) {
            const next = { ...data, category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_SUGGEST_PROBLEM", next);
            await track(phoneNumber, "ASK_SUGGEST_PROBLEM", next);
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.SUGGEST_ASK_PROBLEM + BACK_HINT);
            return;
        }
        const hit = matchSpeciality(rawText, buttonId, allowed);
        if (!hit) {
            await sendSpecialityPrompt(phoneNumber, allowed);
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
            return;
        }
        await advancePickedSpeciality({
            flow: "FIND_DOCTOR_FLOW",
            kind: "DOCTOR",
            phoneNumber,
            data,
            bn: hit.specialty_bn,
            en: hit.specialty_en,
            updateSession,
            track: (s, d) => track(phoneNumber, s, d),
        });
        return;
    }

    // ---------- ALT-LOCATION: districts/thanas where this category exists ----------
    if (step === "ASK_ALT_DISTRICT") {
        await handleAltDistrict({
            flow: "FIND_DOCTOR_FLOW",
            kind: "DOCTOR",
            phoneNumber,
            rawText,
            buttonId,
            data,
            updateSession,
            track: (s, d) => track(phoneNumber, s, d),
        });
        return;
    }

    if (step === "ASK_ALT_THANA") {
        await handleAltThana({
            flow: "FIND_DOCTOR_FLOW",
            kind: "DOCTOR",
            phoneNumber,
            rawText,
            buttonId,
            data,
            updateSession,
            track: (s, d) => track(phoneNumber, s, d),
        });
        return;
    }

    if (step === "LOCATION_DONE") {
        await sendWhatsAppMessage(phoneNumber, buildLocationDoneMessage(data));
        await sendInteractiveButtons(phoneNumber, "আর কিছু করতে চাইলে নিচে থেকে বেছে নিন:", withNav([]));
        return;
    }

    // ---------- "Can't find category? Tell us" -> problem -> DeepSeek (FULL list) -> DB by area ----------
    if (step === "ASK_SUGGEST_PROBLEM") {
        if (!data.thana || !data.district) {
            const restart = { ...data, category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_DIVISION", restart);
            await track(phoneNumber, "ASK_DIVISION", restart);
            await sendDivisionPrompt(phoneNumber, "DOCTOR");
            return;
        }
        if (rawText.trim().length < 3) {
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.SUGGEST_ASK_PROBLEM + BACK_HINT);
            return;
        }
        // Accurate triage: classify from the FULL master list first (not the
        // tiny thana-available list), then fetch DB by (category + area).
        // advancePickedSpeciality shows cards, or "try different location" +
        // district list (with counts) -> thana list (with counts).
        await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.SUGGEST_THINKING);
        void sendTypingIndicator(phoneNumber, msg?.messageId);
        const pick = await suggestCategoryFromFullList(
            rawText,
            DOCTOR_SPECIALITIES.map((s) => ({ bn: s.specialty_bn, en: s.specialty_en }))
        );
        if (!pick) {
            const stored: AvailableSpec[] | undefined = Array.isArray(data.availableSpecs)
                ? data.availableSpecs
                : undefined;
            const allowed: AvailableSpec[] = stored?.length
                ? stored
                : await fetchAvailableSpecs(String(data.thana), String(data.district));
            const next = { ...data, category: "DOCTOR" };
            updateSession("FIND_DOCTOR_FLOW", "ASK_SPECIALITY", next);
            await track(phoneNumber, "ASK_SPECIALITY", next);
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.SUGGEST_FAILED);
            await sendSpecialityPrompt(phoneNumber, allowed);
            return;
        }
        await advancePickedSpeciality({
            flow: "FIND_DOCTOR_FLOW",
            kind: "DOCTOR",
            phoneNumber,
            data: { ...data, problem: rawText.trim(), suggestedProblem: rawText.trim() },
            bn: pick.bn,
            en: pick.en,
            lead: `✅ আপনার সমস্যা অনুযায়ী *${pick.bn}* বিভাগের ডাক্তার দেখানো হচ্ছে:`,
            updateSession,
            track: (s, d) => track(phoneNumber, s, d),
        });
        return;
    }

    // ---------- STEP 3: Connect click -> username sent -> direct doctor bot ----------
    if (step === "SELECT_DOCTOR" || step === "CONFIRM_RESULT") {
        const candidates: string[] = Array.isArray(data.candidates) ? data.candidates : [];

        // See-more tap -> next page of banner cards (no prompt text).
        if (buttonId.toLowerCase().trim() === MORE_DOCTORS_ID) {
            if (!data.thana || !data.district || !data.department) {
                const restart = { ...data, category: "DOCTOR" };
                updateSession("FIND_DOCTOR_FLOW", "ASK_DIVISION", restart);
                await track(phoneNumber, "ASK_DIVISION", restart);
                await sendDivisionPrompt(phoneNumber, "DOCTOR");
                return;
            }
            const skip = Number(data.doctorSkip ?? DOCTOR_CARD_PAGE);
            const total = Number(data.doctorTotal ?? skip);
            const doctors = await fetchLocationDoctors(
                String(data.thana || ""),
                String(data.district || ""),
                String(data.department || ""),
                DOCTOR_CARD_PAGE,
                skip
            );
            if (!doctors.length) return;
            await sendDoctorCards(phoneNumber, doctors);
            const nextSkip = skip + doctors.length;
            const next = {
                ...data,
                candidates: [...candidates, ...doctors.map((d) => d.username)],
                doctorSkip: nextSkip,
                doctorTotal: total,
            };
            updateSession("FIND_DOCTOR_FLOW", "SELECT_DOCTOR", next);
            await track(phoneNumber, "SELECT_DOCTOR", next);
            if (nextSkip < total) await sendSeeMoreButton(phoneNumber, total - nextSkip);
            return;
        }

        if (isConnectClick(rawText, buttonId)) {
            const username = extractConnectUsername(rawText, buttonId);
            const done = { ...data, confirmed: true, confirmedChoice: username };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctorDirectly(phoneNumber, msg, username, updateSession);
            if (ok) return;
            await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT + BACK_HINT);
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

        await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT + BACK_HINT);
        return;
    }

    if (step === "CONFIRMED") {
        await sendInteractiveButtons(phoneNumber, "✅ ধন্যবাদ! আর কিছু করতে চাইলে নিচে থেকে বেছে নিন:", withNav([]));
        return;
    }

    const restart = { ...data, category: "DOCTOR" };
    updateSession("FIND_DOCTOR_FLOW", "ASK_DIVISION", restart);
    await track(phoneNumber, "ASK_DIVISION", restart);
    await sendDivisionPrompt(phoneNumber, "DOCTOR");
}
