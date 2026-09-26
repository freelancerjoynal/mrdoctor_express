import { prisma } from "../../../lib/prisma.js";
import { sendWhatsAppMessage, sendWhatsAppImage, sendInteractiveButtons, sendButtonsChunked, sendTypingIndicator, } from "../../lib/sendWhatsAppMessage.js";
import { getButtonId, getLocationText, extractGps, isAreaClick, extractAreaIdx, isEntryWord, isValidLocation, shortTitle, } from "../../lib/session.js";
import { findNearestAreas, findNearestByName } from "../../services/nearbyAreas.js";
import { suggestAvailableSpeciality } from "../../services/aiService.js";
import { BACK_HINT, withNav } from "../../lib/navButtons.js";
import { findDivision, matchDivision, matchDistrict, matchThana, matchSpeciality, fetchAvailableSpecs, fetchLocationDoctors, countLocationDoctors, sendDivisionPrompt, sendDistrictPrompt, sendThanaPrompt, sendSpecialityPrompt, sendDoctorCards, sendSeeMoreButton, buildLocationDoneMessage, advancePickedSpeciality, handleAltDistrict, handleAltThana, LOCATION_TEXTS, DOCTOR_CARD_PAGE, MORE_DOCTORS_ID, SUGGEST_SPEC_ID, } from "../../lib/locationSelect.js";
import { findHospitalsByArea, getHospitalById, buildHospitalCard, } from "../../services/hospitalSearch.js";
import { buildDoctorCard } from "../../services/doctorSearch.js";
import { handleGetDoctorFlow } from "../getDoctor/getDoctorFlow.js";
import { HOSPITAL_TEXTS, buildTrackingSummary } from "./hospitalQA.js";
// FIND history is never persisted (only a doctor connect via username is).
// Kept as a no-op so existing call-sites compile unchanged.
async function track(_phoneNumber, _step, _data) {
    void _phoneNumber;
    void _step;
    void _data;
    void buildTrackingSummary;
}
// NOTE: hospital-select prefix is `hsel_` — never `hosp_`, because the main-menu
// hospital button id is `hosp_btn` and a `hosp_` prefix would hijack that click.
function hospButtonId(h) {
    return `hsel_${h.id}`;
}
function deptButtonId(idx) {
    return `hdept_${idx}`;
}
function connectButtonId(username) {
    return `connect_${username}`;
}
const MENU_BUTTON_IDS = new Set(["hosp_btn", "doc_btn", "home_btn", "menu_btn", "yes_restore"]);
function isHospClick(raw, buttonId) {
    const id = (buttonId || "").toLowerCase().trim();
    if (MENU_BUTTON_IDS.has(id))
        return false;
    return id.startsWith("hsel_") || (raw || "").toLowerCase().trim().startsWith("hsel_");
}
function extractHospId(raw, buttonId) {
    const src = buttonId || raw;
    return src.slice("hsel_".length).trim();
}
function isDeptClick(raw, buttonId) {
    return buttonId.toLowerCase().startsWith("hdept_") || raw.toLowerCase().startsWith("hdept_");
}
function extractDeptIdx(raw, buttonId) {
    const src = (buttonId || raw).trim();
    const n = parseInt(src.slice("hdept_".length), 10);
    return Number.isNaN(n) ? -1 : n;
}
function isConnectClick(raw, buttonId) {
    const t = (raw || "").toLowerCase().trim();
    const id = (buttonId || "").toLowerCase().trim();
    return id.startsWith("connect_") || t.startsWith("connect_");
}
function extractUsername(raw, buttonId) {
    const src = (buttonId || raw).trim();
    return src.slice("connect_".length).trim();
}
async function connectDoctor(phoneNumber, msg, username, updateSession) {
    const clean = (username || "").trim();
    if (!clean)
        return false;
    const doctor = await prisma.doctor.findUnique({ where: { username: clean } });
    if (!doctor) {
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
        return false;
    }
    // Card + "connecting" text are sent by the doctor flow (DIRECT_SEARCH),
    // so nothing is sent here — avoids a duplicate connecting message.
    await handleGetDoctorFlow(phoneNumber, doctor.username, msg, { flow: "GET_DOCTOR_FLOW", step: "DIRECT_SEARCH", data: { username: doctor.username } }, updateSession);
    return true;
}
async function showDepartments(phoneNumber, hospital, data, updateSession) {
    const departments = hospital.departments.slice(0, 10);
    const next = {
        ...data,
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        departments,
        category: "HOSPITAL",
    };
    updateSession("FIND_HOSPITAL_FLOW", "SELECT_DEPT", next);
    await track(phoneNumber, "SELECT_DEPT", next);
    // Hospital business card image FIRST, then the department list.
    if (hospital.businessCardImage) {
        await sendWhatsAppImage(phoneNumber, hospital.businessCardImage, `🏥 ${hospital.name}`);
    }
    if (!departments.length) {
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.NO_DEPT + BACK_HINT);
        return;
    }
    const buttons = departments.map((d, i) => ({ id: deptButtonId(i), title: shortTitle(d) }));
    await sendButtonsChunked(phoneNumber, HOSPITAL_TEXTS.ASK_DEPT(hospital.name) +
        "\n" +
        departments.map((d, i) => `${i + 1}. ${d}`).join("\n"), buttons);
}
async function showDeptDoctors(phoneNumber, hospital, dept, data, updateSession) {
    const list = hospital.doctors.filter((d) => (d.speciality || "জেনারেল").trim() === dept);
    const cards = list.map((d) => ({
        id: d.id,
        name: d.name,
        username: d.username,
        degree: d.degree,
        speciality: d.speciality,
        phone: d.phone,
        chambers: [
            {
                id: "",
                chamberName: d.chamberName,
                addressLine: d.addressLine,
                thana: d.thana,
                district: d.district,
                division: "",
                newPatientFee: d.newPatientFee ?? null,
                oldPatientFee: d.oldPatientFee ?? null,
                hospital: { id: hospital.id, name: hospital.name },
            },
        ],
    }));
    const next = {
        ...data,
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        department: dept,
        doctorsInDept: list.map((d) => d.username),
        candidates: list.map((d) => d.username),
        category: "HOSPITAL",
    };
    updateSession("FIND_HOSPITAL_FLOW", "SELECT_DOCTOR", next);
    await track(phoneNumber, "SELECT_DOCTOR", next);
    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.DEPT_DOCTORS_HEADER(hospital.name, dept));
    for (let i = 0; i < cards.slice(0, 5).length; i++) {
        const c = cards[i];
        await sendInteractiveButtons(phoneNumber, buildDoctorCard(i, c), [
            { id: connectButtonId(c.username), title: "Connect করুন" },
        ]);
    }
    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT + BACK_HINT);
}
export async function findHospitalFlow(phoneNumber, text, msg, session, updateSession, _resetSession) {
    void _resetSession;
    const rawText = (text || "").trim();
    const buttonId = getButtonId(msg);
    const data = session?.data || {};
    const step = session?.step || "ASK_AREA";
    // ---------- LOCATION: division -> district -> thana -> speciality (stop) ----------
    if (step === "ASK_DIVISION") {
        const hit = matchDivision(rawText, buttonId);
        if (!hit) {
            await sendDivisionPrompt(phoneNumber, "HOSPITAL");
            if (!isEntryWord(rawText)) {
                await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
            }
            return;
        }
        const next = { ...data, division: hit.name, category: "HOSPITAL" };
        updateSession("FIND_HOSPITAL_FLOW", "ASK_DISTRICT", next);
        await track(phoneNumber, "ASK_DISTRICT", next);
        await sendDistrictPrompt(phoneNumber, "HOSPITAL", hit);
        return;
    }
    if (step === "ASK_DISTRICT") {
        const division = findDivision(String(data.division || ""));
        if (!division) {
            const next = { ...data, category: "HOSPITAL" };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_DIVISION", next);
            await track(phoneNumber, "ASK_DIVISION", next);
            await sendDivisionPrompt(phoneNumber, "HOSPITAL");
            return;
        }
        const hit = matchDistrict(division, rawText, buttonId);
        if (!hit) {
            await sendDistrictPrompt(phoneNumber, "HOSPITAL", division);
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
            return;
        }
        const next = { ...data, division: division.name, district: hit.name, category: "HOSPITAL" };
        updateSession("FIND_HOSPITAL_FLOW", "ASK_THANA", next);
        await track(phoneNumber, "ASK_THANA", next);
        await sendThanaPrompt(phoneNumber, hit);
        return;
    }
    if (step === "ASK_THANA") {
        const division = findDivision(String(data.division || ""));
        const district = division?.districts.find((d) => d.name === data.district) || null;
        if (!division || !district) {
            const next = { ...data, category: "HOSPITAL" };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_DIVISION", next);
            await track(phoneNumber, "ASK_DIVISION", next);
            await sendDivisionPrompt(phoneNumber, "HOSPITAL");
            return;
        }
        const hit = matchThana(district, rawText, buttonId);
        if (!hit) {
            await sendThanaPrompt(phoneNumber, district);
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
            return;
        }
        // Only specialities with a real chamber here move forward.
        const available = await fetchAvailableSpecs(hit, district.name);
        if (!available.length) {
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.NO_DOCTORS_THANA(hit) + BACK_HINT);
            return;
        }
        const next = {
            ...data,
            division: division.name,
            district: district.name,
            thana: hit,
            location: `${hit}, ${district.name}`,
            availableSpecs: available,
            category: "HOSPITAL",
        };
        updateSession("FIND_HOSPITAL_FLOW", "ASK_SPECIALITY", next);
        await track(phoneNumber, "ASK_SPECIALITY", next);
        await sendSpecialityPrompt(phoneNumber, available);
        return;
    }
    if (step === "ASK_SPECIALITY") {
        // Resumed without location context -> pick thana again from the top.
        if (!data.thana || !data.district) {
            const restart = { ...data, category: "HOSPITAL" };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_DIVISION", restart);
            await track(phoneNumber, "ASK_DIVISION", restart);
            await sendDivisionPrompt(phoneNumber, "HOSPITAL");
            return;
        }
        // Keep a resumed session: recompute what's actually available here
        // instead of falling back to the full unfiltered list.
        const stored = Array.isArray(data.availableSpecs)
            ? data.availableSpecs
            : undefined;
        const allowed = stored?.length
            ? stored
            : await fetchAvailableSpecs(String(data.thana), String(data.district));
        if (!allowed.length) {
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.NO_DOCTORS_THANA(String(data.thana)) + BACK_HINT);
            return;
        }
        if (allowed !== stored) {
            const refreshed = { ...data, availableSpecs: allowed };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_SPECIALITY", refreshed);
            await track(phoneNumber, "ASK_SPECIALITY", refreshed);
        }
        // "Can't figure out?" row -> ask the problem, AI suggests the category.
        if (buttonId.toLowerCase().trim() === SUGGEST_SPEC_ID) {
            const next = { ...data, category: "HOSPITAL" };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_SUGGEST_PROBLEM", next);
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
            flow: "FIND_HOSPITAL_FLOW",
            kind: "HOSPITAL",
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
            flow: "FIND_HOSPITAL_FLOW",
            kind: "HOSPITAL",
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
            flow: "FIND_HOSPITAL_FLOW",
            kind: "HOSPITAL",
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
    // ---------- AI SUGGEST: problem -> DeepSeek picks from available list ----------
    if (step === "ASK_SUGGEST_PROBLEM") {
        if (!data.thana || !data.district) {
            const restart = { ...data, category: "HOSPITAL" };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_DIVISION", restart);
            await track(phoneNumber, "ASK_DIVISION", restart);
            await sendDivisionPrompt(phoneNumber, "HOSPITAL");
            return;
        }
        if (rawText.trim().length < 3) {
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.SUGGEST_ASK_PROBLEM + BACK_HINT);
            return;
        }
        const stored = Array.isArray(data.availableSpecs)
            ? data.availableSpecs
            : undefined;
        const allowed = stored?.length
            ? stored
            : await fetchAvailableSpecs(String(data.thana), String(data.district));
        if (!allowed.length) {
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.NO_DOCTORS_THANA(String(data.thana)) + BACK_HINT);
            return;
        }
        if (allowed !== stored) {
            const refreshed = { ...data, availableSpecs: allowed };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_SUGGEST_PROBLEM", refreshed);
            await track(phoneNumber, "ASK_SUGGEST_PROBLEM", refreshed);
        }
        await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.SUGGEST_THINKING);
        void sendTypingIndicator(phoneNumber, msg?.messageId);
        const pick = await suggestAvailableSpeciality(rawText, `${data.thana || ""}, ${data.district || ""}`, allowed.map((a) => a.bn));
        const entry = (pick && allowed.find((a) => a.bn === pick)) || null;
        if (!entry) {
            const next = { ...data, category: "HOSPITAL" };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_SPECIALITY", next);
            await track(phoneNumber, "ASK_SPECIALITY", next);
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.SUGGEST_FAILED);
            await sendSpecialityPrompt(phoneNumber, allowed);
            return;
        }
        const picked = {
            ...data,
            department: entry.bn,
            department_en: entry.en,
            suggestedProblem: rawText.trim(),
            category: "HOSPITAL",
        };
        await sendWhatsAppMessage(phoneNumber, `✅ আপনার সমস্যা অনুযায়ী *${entry.bn}* বিভাগের ডাক্তার দেখানো হচ্ছে:`);
        const thana = String(data.thana || "");
        const district = String(data.district || "");
        const [total, doctors] = await Promise.all([
            countLocationDoctors(thana, district, entry.bn),
            fetchLocationDoctors(thana, district, entry.bn),
        ]);
        if (!doctors.length) {
            updateSession("FIND_HOSPITAL_FLOW", "ASK_SPECIALITY", picked);
            await track(phoneNumber, "ASK_SPECIALITY", picked);
            await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.NO_DOCTORS_THANA(thana) + BACK_HINT);
            return;
        }
        await sendDoctorCards(phoneNumber, doctors);
        const shown = doctors.length;
        if (total > shown)
            await sendSeeMoreButton(phoneNumber, total - shown);
        const withCandidates = {
            ...picked,
            candidates: doctors.map((d) => d.username),
            doctorsInDept: doctors.map((d) => d.username),
            doctorSkip: shown,
            doctorTotal: total,
        };
        updateSession("FIND_HOSPITAL_FLOW", "SELECT_DOCTOR", withCandidates);
        await track(phoneNumber, "SELECT_DOCTOR", withCandidates);
        return;
    }
    // ---------- STEP 1: area ----------
    if (step === "WELCOME" || step === "ASK_AREA") {
        const entryHit = !msg?.location &&
            isEntryWord(rawText) &&
            !data.location;
        if (step === "WELCOME" || entryHit) {
            const next = { ...data, category: "HOSPITAL" };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_AREA", next);
            await track(phoneNumber, "ASK_AREA", next);
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.ASK_AREA + BACK_HINT);
            return;
        }
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
                    category: "HOSPITAL",
                };
                updateSession("FIND_HOSPITAL_FLOW", "ASK_AREA", next);
                await track(phoneNumber, "ASK_AREA", next);
                const buttons = nearest.map((n, i) => ({ id: `area_${i}`, title: shortTitle(n) }));
                await sendButtonsChunked(phoneNumber, HOSPITAL_TEXTS.NEARBY_HEADER(nearest[0]), buttons);
                return;
            }
        }
        let locationText = getLocationText(rawText, msg);
        if (areaIdx >= 0 && areaSug[areaIdx])
            locationText = areaSug[areaIdx];
        if (!msg?.location && !isValidLocation(locationText)) {
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.INVALID_LOCATION + BACK_HINT);
            return;
        }
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.PROCESSING);
        void sendTypingIndicator(phoneNumber, msg?.messageId);
        const areaForSearch = locationText;
        const hospitals = await findHospitalsByArea(areaForSearch, 5);
        if (!hospitals.length) {
            // Nothing found -> offer nearby areas (from earlier GPS or by typed name).
            const suggestions = areaSug.length ? areaSug : findNearestByName(locationText, 3);
            const next = {
                ...data,
                location: locationText,
                areaSuggestions: suggestions.length ? suggestions : areaSug,
                category: "HOSPITAL",
            };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_AREA", next);
            await track(phoneNumber, "ASK_AREA", next);
            if (suggestions.length) {
                const buttons = suggestions.map((n, i) => ({ id: `area_${i}`, title: shortTitle(n) }));
                await sendButtonsChunked(phoneNumber, HOSPITAL_TEXTS.NO_HOSPITAL(locationText) + "\n\n📍 কাছের এলাকা থেকে বেছে নিন 👇", buttons);
            }
            else {
                await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.NO_HOSPITAL(locationText) + BACK_HINT);
            }
            return;
        }
        const next = {
            ...data,
            location: locationText,
            hospitalCandidates: hospitals.map((h) => h.id),
            // cache for number/name fallback (ids only in session; full rows re-fetched on click)
            category: "HOSPITAL",
        };
        updateSession("FIND_HOSPITAL_FLOW", "SELECT_HOSPITAL", next);
        await track(phoneNumber, "SELECT_HOSPITAL", next);
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.HOSPITAL_LIST_HEADER(locationText));
        for (let i = 0; i < hospitals.length; i++) {
            const h = hospitals[i];
            await sendInteractiveButtons(phoneNumber, buildHospitalCard(i, h), [
                { id: hospButtonId(h), title: "Select করুন" },
            ]);
        }
        return;
    }
    // ---------- STEP 2: hospital click -> departments ----------
    if (step === "SELECT_HOSPITAL") {
        // Button click with hospital id
        if (isHospClick(rawText, buttonId)) {
            const id = extractHospId(rawText, buttonId);
            const hospital = await getHospitalById(id);
            if (hospital) {
                await showDepartments(phoneNumber, hospital, data, updateSession);
                return;
            }
        }
        // Number 1-5 (resolve via candidates)
        const num = parseInt(rawText.trim(), 10);
        const candidates = Array.isArray(data.hospitalCandidates) ? data.hospitalCandidates : [];
        if (!Number.isNaN(num) && num >= 1 && num <= candidates.length) {
            const hospital = await getHospitalById(candidates[num - 1]);
            if (hospital) {
                await showDepartments(phoneNumber, hospital, data, updateSession);
                return;
            }
        }
        // Name typed -> search hospitals in same area
        if (rawText.trim().length >= 2 && !isEntryWord(rawText)) {
            const hospitals = await findHospitalsByArea(data.location || rawText, 5);
            const hit = hospitals.find((h) => h.name === rawText.trim()) ||
                hospitals.find((h) => rawText.includes(h.name) || h.name.includes(rawText.trim()));
            if (hit) {
                const full = await getHospitalById(hit.id);
                if (full) {
                    await showDepartments(phoneNumber, full, data, updateSession);
                    return;
                }
            }
        }
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
        return;
    }
    // ---------- STEP 3: department click -> doctors ----------
    if (step === "SELECT_DEPT") {
        const departments = Array.isArray(data.departments) ? data.departments : [];
        const hospital = data.hospitalId ? await getHospitalById(data.hospitalId) : null;
        if (!hospital) {
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
            return;
        }
        if (isDeptClick(rawText, buttonId)) {
            const idx = extractDeptIdx(rawText, buttonId);
            if (idx >= 0 && idx < departments.length) {
                await showDeptDoctors(phoneNumber, hospital, departments[idx], data, updateSession);
                return;
            }
        }
        const num = parseInt(rawText.trim(), 10);
        if (!Number.isNaN(num) && num >= 1 && num <= departments.length) {
            await showDeptDoctors(phoneNumber, hospital, departments[num - 1], data, updateSession);
            return;
        }
        const hit = departments.find((d) => d === rawText.trim() || rawText.includes(d) || d.includes(rawText.trim()));
        if (hit) {
            await showDeptDoctors(phoneNumber, hospital, hit, data, updateSession);
            return;
        }
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
        return;
    }
    // ---------- STEP 4: doctor click -> username -> direct doctor bot ----------
    if (step === "SELECT_DOCTOR") {
        // See-more tap -> next page of banner cards (no prompt text).
        if (buttonId.toLowerCase().trim() === MORE_DOCTORS_ID) {
            if (!data.thana || !data.district || !data.department) {
                const restart = { ...data, category: "HOSPITAL" };
                updateSession("FIND_HOSPITAL_FLOW", "ASK_DIVISION", restart);
                await track(phoneNumber, "ASK_DIVISION", restart);
                await sendDivisionPrompt(phoneNumber, "HOSPITAL");
                return;
            }
            const skip = Number(data.doctorSkip ?? DOCTOR_CARD_PAGE);
            const total = Number(data.doctorTotal ?? skip);
            const doctors = await fetchLocationDoctors(String(data.thana || ""), String(data.district || ""), String(data.department || ""), DOCTOR_CARD_PAGE, skip);
            if (!doctors.length)
                return;
            await sendDoctorCards(phoneNumber, doctors);
            const usernames = doctors.map((d) => d.username);
            const nextSkip = skip + doctors.length;
            const inDept = Array.isArray(data.doctorsInDept) ? data.doctorsInDept : [];
            const next = {
                ...data,
                candidates: [...(Array.isArray(data.candidates) ? data.candidates : []), ...usernames],
                doctorsInDept: [...inDept, ...usernames],
                doctorSkip: nextSkip,
                doctorTotal: total,
            };
            updateSession("FIND_HOSPITAL_FLOW", "SELECT_DOCTOR", next);
            await track(phoneNumber, "SELECT_DOCTOR", next);
            if (nextSkip < total)
                await sendSeeMoreButton(phoneNumber, total - nextSkip);
            return;
        }
        if (isConnectClick(rawText, buttonId)) {
            const username = extractUsername(rawText, buttonId);
            const done = { ...data, confirmed: true, confirmedChoice: username };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctor(phoneNumber, msg, username, updateSession);
            if (ok)
                return;
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT + BACK_HINT);
            return;
        }
        const m = rawText.match(/(dr-[a-zA-Z0-9-]+)/i);
        if (m?.[1]) {
            const done = { ...data, confirmed: true, confirmedChoice: m[1] };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctor(phoneNumber, msg, m[1].trim(), updateSession);
            if (ok)
                return;
        }
        const typed = rawText.toLowerCase().trim();
        const inDept = Array.isArray(data.doctorsInDept) ? data.doctorsInDept : [];
        const hit = inDept.find((c) => c.toLowerCase() === typed);
        if (hit) {
            const done = { ...data, confirmed: true, confirmedChoice: hit };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctor(phoneNumber, msg, hit, updateSession);
            if (ok)
                return;
        }
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT + BACK_HINT);
        return;
    }
    if (step === "CONFIRMED") {
        await sendInteractiveButtons(phoneNumber, "✅ ধন্যবাদ! আর কিছু করতে চাইলে নিচে থেকে বেছে নিন:", withNav([]));
        return;
    }
    const next = { ...data, category: "HOSPITAL" };
    updateSession("FIND_HOSPITAL_FLOW", "ASK_AREA", next);
    await track(phoneNumber, "ASK_AREA", next);
    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.ASK_AREA + BACK_HINT);
}
//# sourceMappingURL=findHospitalFlow.js.map