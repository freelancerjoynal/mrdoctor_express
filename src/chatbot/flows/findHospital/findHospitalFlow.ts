import { prisma } from "../../../lib/prisma.js";
import {
    sendWhatsAppMessage,
    sendInteractiveButtons,
    sendButtonsChunked,
} from "../../lib/sendWhatsAppMessage.js";
import { trackFlowStep } from "../../lib/chatSession.js";
import {
    getButtonId,
    getLocationText,
    extractGps,
    isAreaClick,
    extractAreaIdx,
    isEntryWord,
    isValidLocation,
    shortTitle,
    type UpdateFn,
    type ResetFn,
} from "../../lib/session.js";
import { findNearestAreas, findNearestByName } from "../../services/nearbyAreas.js";
import { withNav } from "../../lib/navButtons.js";
import {
    findHospitalsByArea,
    getHospitalById,
    buildHospitalCard,
    type HospitalWithDoctors,
} from "../../services/hospitalSearch.js";
import { buildDoctorCard, type DoctorWithChambers } from "../../services/doctorSearch.js";
import { handleGetDoctorFlow } from "../getDoctor/getDoctorFlow.js";
import { HOSPITAL_TEXTS, buildTrackingSummary } from "./hospitalQA.js";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function track(phoneNumber: string, step: string, data: any) {
    await trackFlowStep(
        phoneNumber,
        "FIND_HOSPITAL",
        "FIND_HOSPITAL_FLOW",
        step,
        buildTrackingSummary({
            location: data?.location,
            hospitalName: data?.hospitalName,
            department: data?.department,
        }),
        data?.hospitalId || null
    );
}

// NOTE: hospital-select prefix is `hsel_` — never `hosp_`, because the main-menu
// hospital button id is `hosp_btn` and a `hosp_` prefix would hijack that click.
function hospButtonId(h: HospitalWithDoctors) {
    return `hsel_${h.id}`;
}
function deptButtonId(idx: number) {
    return `hdept_${idx}`;
}
function connectButtonId(username: string) {
    return `connect_${username}`;
}

const MENU_BUTTON_IDS = new Set(["hosp_btn", "doc_btn", "home_btn", "menu_btn", "yes_restore"]);

function isHospClick(raw: string, buttonId: string) {
    const id = (buttonId || "").toLowerCase().trim();
    if (MENU_BUTTON_IDS.has(id)) return false;
    return id.startsWith("hsel_") || (raw || "").toLowerCase().trim().startsWith("hsel_");
}
function extractHospId(raw: string, buttonId: string) {
    const src = buttonId || raw;
    return src.slice("hsel_".length).trim();
}
function isDeptClick(raw: string, buttonId: string) {
    return buttonId.toLowerCase().startsWith("hdept_") || raw.toLowerCase().startsWith("hdept_");
}
function extractDeptIdx(raw: string, buttonId: string): number {
    const src = (buttonId || raw).trim();
    const n = parseInt(src.slice("hdept_".length), 10);
    return Number.isNaN(n) ? -1 : n;
}
function isConnectClick(raw: string, buttonId: string) {
    const t = (raw || "").toLowerCase().trim();
    const id = (buttonId || "").toLowerCase().trim();
    return id.startsWith("connect_") || t.startsWith("connect_");
}
function extractUsername(raw: string, buttonId: string) {
    const src = (buttonId || raw).trim();
    return src.slice("connect_".length).trim();
}

async function connectDoctor(
    phoneNumber: string,
    msg: any,
    username: string,
    updateSession: UpdateFn
) {
    const clean = (username || "").trim();
    if (!clean) return false;
    const doctor = await prisma.doctor.findUnique({ where: { username: clean } });
    if (!doctor) {
        await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.FALLBACK, withNav([]));
        return false;
    }
    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.CONNECTED(doctor.name));
    await handleGetDoctorFlow(
        phoneNumber,
        doctor.username,
        msg,
        { flow: "GET_DOCTOR_FLOW", step: "DIRECT_SEARCH", data: { username: doctor.username } },
        updateSession
    );
    return true;
}

async function showDepartments(
    phoneNumber: string,
    hospital: HospitalWithDoctors,
    data: any,
    updateSession: UpdateFn
) {
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
        await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.NO_DEPT, withNav([]));
        return;
    }

    const buttons = withNav(departments.map((d, i) => ({ id: deptButtonId(i), title: shortTitle(d) })));
    await sendButtonsChunked(
        phoneNumber,
        HOSPITAL_TEXTS.ASK_DEPT(hospital.name) +
            "\n" +
            departments.map((d, i) => `${i + 1}. ${d}`).join("\n"),
        buttons
    );
}

async function showDeptDoctors(
    phoneNumber: string,
    hospital: HospitalWithDoctors,
    dept: string,
    data: any,
    updateSession: UpdateFn
) {
    const list = hospital.doctors.filter((d) => (d.speciality || "জেনারেল").trim() === dept);
    const cards: DoctorWithChambers[] = list.map((d) => ({
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
        const c = cards[i]!;
        await sendInteractiveButtons(phoneNumber, buildDoctorCard(i, c), [
            { id: connectButtonId(c.username), title: "Connect করুন" },
        ]);
        // One doctor every 5 seconds, as requested.
        if (i < cards.slice(0, 5).length - 1) await sleep(5000);
    }
    await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT, withNav([]));
}

export async function findHospitalFlow(
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
    const step = session?.step || "ASK_AREA";

    // ---------- STEP 1: area ----------
    if (step === "WELCOME" || step === "ASK_AREA") {
        const entryHit =
            !msg?.location &&
            isEntryWord(rawText) &&
            !data.location;

        if (step === "WELCOME" || entryHit) {
            const next = { ...data, category: "HOSPITAL" };
            updateSession("FIND_HOSPITAL_FLOW", "ASK_AREA", next);
            await track(phoneNumber, "ASK_AREA", next);
            await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.ASK_AREA, withNav([]));
            return;
        }

        // Suggested nearby-area button tapped (area_0, area_1, ...) -> resolve name.
        const areaIdx = isAreaClick(rawText, buttonId) ? extractAreaIdx(rawText, buttonId) : -1;
        const areaSug: string[] = Array.isArray(data.areaSuggestions) ? data.areaSuggestions : [];

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
                const buttons = withNav(nearest.map((n, i) => ({ id: `area_${i}`, title: shortTitle(n) })));
                await sendButtonsChunked(phoneNumber, HOSPITAL_TEXTS.NEARBY_HEADER(nearest[0]!), buttons);
                return;
            }
        }

        let locationText = getLocationText(rawText, msg);
        if (areaIdx >= 0 && areaSug[areaIdx]) locationText = areaSug[areaIdx]!;
        if (!msg?.location && !isValidLocation(locationText)) {
            await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.INVALID_LOCATION, withNav([]));
            return;
        }

        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.PROCESSING);

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
                const buttons = withNav(suggestions.map((n, i) => ({ id: `area_${i}`, title: shortTitle(n) })));
                await sendButtonsChunked(
                    phoneNumber,
                    HOSPITAL_TEXTS.NO_HOSPITAL(locationText) + "\n\n📍 কাছের এলাকা থেকে বেছে নিন 👇",
                    buttons
                );
            } else {
                await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.NO_HOSPITAL(locationText), withNav([]));
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
            const h = hospitals[i]!;
            await sendInteractiveButtons(phoneNumber, buildHospitalCard(i, h), [
                { id: hospButtonId(h), title: "Select করুন" },
            ]);
            if (i < hospitals.length - 1) await sleep(500);
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
        const candidates: string[] = Array.isArray(data.hospitalCandidates) ? data.hospitalCandidates : [];
        if (!Number.isNaN(num) && num >= 1 && num <= candidates.length) {
            const hospital = await getHospitalById(candidates[num - 1]!);
            if (hospital) {
                await showDepartments(phoneNumber, hospital, data, updateSession);
                return;
            }
        }
        // Name typed -> search hospitals in same area
        if (rawText.trim().length >= 2 && !isEntryWord(rawText)) {
            const hospitals = await findHospitalsByArea(data.location || rawText, 5);
            const hit =
                hospitals.find((h) => h.name === rawText.trim()) ||
                hospitals.find((h) => rawText.includes(h.name) || h.name.includes(rawText.trim()));
            if (hit) {
                const full = await getHospitalById(hit.id);
                if (full) {
                    await showDepartments(phoneNumber, full, data, updateSession);
                    return;
                }
            }
        }
        await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.FALLBACK, withNav([]));
        return;
    }

    // ---------- STEP 3: department click -> doctors ----------
    if (step === "SELECT_DEPT") {
        const departments: string[] = Array.isArray(data.departments) ? data.departments : [];
        const hospital = data.hospitalId ? await getHospitalById(data.hospitalId) : null;
        if (!hospital) {
            await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.FALLBACK, withNav([]));
            return;
        }

        if (isDeptClick(rawText, buttonId)) {
            const idx = extractDeptIdx(rawText, buttonId);
            if (idx >= 0 && idx < departments.length) {
                await showDeptDoctors(phoneNumber, hospital, departments[idx]!, data, updateSession);
                return;
            }
        }
        const num = parseInt(rawText.trim(), 10);
        if (!Number.isNaN(num) && num >= 1 && num <= departments.length) {
            await showDeptDoctors(phoneNumber, hospital, departments[num - 1]!, data, updateSession);
            return;
        }
        const hit = departments.find(
            (d) => d === rawText.trim() || rawText.includes(d) || d.includes(rawText.trim())
        );
        if (hit) {
            await showDeptDoctors(phoneNumber, hospital, hit, data, updateSession);
            return;
        }
        await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.FALLBACK, withNav([]));
        return;
    }

    // ---------- STEP 4: doctor click -> username -> direct doctor bot ----------
    if (step === "SELECT_DOCTOR") {
        if (isConnectClick(rawText, buttonId)) {
            const username = extractUsername(rawText, buttonId);
            const done = { ...data, confirmed: true, confirmedChoice: username };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctor(phoneNumber, msg, username, updateSession);
            if (ok) return;
            await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT, withNav([]));
            return;
        }
        const m = rawText.match(/(dr-[a-zA-Z0-9-]+)/i);
        if (m?.[1]) {
            const done = { ...data, confirmed: true, confirmedChoice: m[1] };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctor(phoneNumber, msg, m[1].trim(), updateSession);
            if (ok) return;
        }
        const typed = rawText.toLowerCase().trim();
        const inDept: string[] = Array.isArray(data.doctorsInDept) ? data.doctorsInDept : [];
        const hit = inDept.find((c) => c.toLowerCase() === typed);
        if (hit) {
            const done = { ...data, confirmed: true, confirmedChoice: hit };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctor(phoneNumber, msg, hit, updateSession);
            if (ok) return;
        }
        await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT, withNav([]));
        return;
    }

    if (step === "CONFIRMED") {
        await sendInteractiveButtons(phoneNumber, "✅ ধন্যবাদ! আর কিছু করতে চাইলে নিচে থেকে বেছে নিন:", withNav([]));
        return;
    }

    const next = { ...data, category: "HOSPITAL" };
    updateSession("FIND_HOSPITAL_FLOW", "ASK_AREA", next);
    await track(phoneNumber, "ASK_AREA", next);
    await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.ASK_AREA, withNav([]));
}
