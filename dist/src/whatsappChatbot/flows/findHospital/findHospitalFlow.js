import { prisma } from "../../../lib/prisma.js";
import { sendWhatsAppMessage, sendInteractiveButtons, sendButtonsChunked, sendTypingIndicator, } from "../../lib/sendWhatsAppMessage.js";
import { trackFlowStep } from "../../lib/chatSession.js";
import { getButtonId, getLocationText, extractGps, isAreaClick, extractAreaIdx, isEntryWord, isValidLocation, shortTitle, } from "../../lib/session.js";
import { findNearestAreas, findNearestByName } from "../../services/nearbyAreas.js";
import { BACK_HINT, withNav } from "../../lib/navButtons.js";
import { findHospitalsByArea, getHospitalById, buildHospitalCard, } from "../../services/hospitalSearch.js";
import { buildDoctorCard } from "../../services/doctorSearch.js";
import { handleGetDoctorFlow } from "../getDoctor/getDoctorFlow.js";
import { HOSPITAL_TEXTS, buildTrackingSummary } from "./hospitalQA.js";
async function track(phoneNumber, step, data) {
    await trackFlowStep(phoneNumber, "FIND_HOSPITAL", "FIND_HOSPITAL_FLOW", step, buildTrackingSummary({
        location: data?.location,
        hospitalName: data?.hospitalName,
        department: data?.department,
    }), data?.hospitalId || null);
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
    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.CONNECTED(doctor.name));
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