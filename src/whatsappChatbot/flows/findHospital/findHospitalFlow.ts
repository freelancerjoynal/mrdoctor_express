import { prisma } from "../../../lib/prisma.js";
import {
    sendWhatsAppMessage,
    sendWhatsAppImage,
    sendInteractiveButtons,
    sendListChunked,
    sendTypingIndicator,
} from "../../lib/sendWhatsAppMessage.js";
import {
    getButtonId,
    isEntryWord,
    type UpdateFn,
    type ResetFn,
} from "../../lib/session.js";
import { BACK_HINT, withNav } from "../../lib/navButtons.js";
import {
    findDivision,
    matchDivision,
    matchDistrict,
    matchThana,
    sendDivisionPrompt,
    sendDistrictPrompt,
    sendThanaPrompt,
    sendDoctorCards,
    LOCATION_TEXTS,
    type LocationDoctorCard,
} from "../../lib/locationSelect.js";
import {
    findHospitalsByLocation,
    getHospitalInLocation,
    sendHospitalListPrompt,
    sendHospSeeMoreButton,
    HOSP_DEPT_PAGE,
    HOSP_MORE_DOCTORS_ID,
    type HospitalWithDoctors,
} from "../../services/hospitalSearch.js";
import { handleGetDoctorFlow } from "../getDoctor/getDoctorFlow.js";
import { HOSPITAL_TEXTS, buildTrackingSummary } from "./hospitalQA.js";

// FIND history is never persisted (only a doctor connect via username is).
// Kept as a no-op so existing call-sites compile unchanged.
async function track(_phoneNumber: string, _step: string, _data: any) {
    void _phoneNumber;
    void _step;
    void _data;
    void buildTrackingSummary;
}

// NOTE: hospital-select prefix is `hsel_` — never `hosp_`, because the main-menu
// hospital button id is `hosp_btn` and a `hosp_` prefix would hijack that click.
function deptButtonId(idx: number) {
    return `hdept_${idx}`;
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

/** Contact -> username -> direct doctor bot takes over (same as doctor flow). */
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
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
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

/** Hospital picked -> business card image FIRST, then its available categories. */
async function showDepartments(
    phoneNumber: string,
    hospital: HospitalWithDoctors,
    data: any,
    updateSession: UpdateFn
) {
    // Categories with a real chamber in THIS hospital (local chambers only).
    const counts = new Map<string, number>();
    for (const doc of hospital.doctors) {
        const key = (doc.speciality || "জেনারেল").trim();
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const departments = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!);
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

    const rows = departments.map((d, i) => ({
        id: deptButtonId(i),
        title: d,
        description: `${counts.get(d)} জন ডাক্তার`,
    }));
    await sendListChunked(
        phoneNumber,
        HOSPITAL_TEXTS.ASK_DEPT(hospital.name),
        "📋 বিভাগ দেখুন",
        rows,
        "বিভাগ"
    );
}

/** Department doctors as banner cards — same style as the doctor flow. */
function toDeptCards(
    hospital: HospitalWithDoctors,
    dept: string
): { cards: LocationDoctorCard[]; usernames: string[] } {
    const list = hospital.doctors.filter((d) => (d.speciality || "জেনারেল").trim() === dept);
    const cards: LocationDoctorCard[] = list.map((d) => {
        // Full chamber line like the doctor flow: "চেম্বার, থানা, জেলা (বিভাগ)".
        const area = [d.thana, d.district].filter(Boolean).join(", ");
        const div = d.division ? ` (${d.division})` : "";
        const chamber = `${[d.chamberName || "চেম্বার", area].filter(Boolean).join(", ")}${div}`;
        return {
            username: d.username,
            name: d.name,
            degree: d.degree,
            speciality: d.speciality,
            chamberName: chamber,
            bannerCardImage: d.bannerCardImage,
        };
    });
    return { cards, usernames: list.map((d) => d.username) };
}

/** Category picked -> max 5 doctor cards, each with a Contact (username) button. */
async function showDeptDoctors(
    phoneNumber: string,
    hospital: HospitalWithDoctors,
    dept: string,
    data: any,
    updateSession: UpdateFn
) {
    const { cards, usernames } = toDeptCards(hospital, dept);
    const first = cards.slice(0, HOSP_DEPT_PAGE);
    const next = {
        ...data,
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        department: dept,
        deptUsernames: usernames,
        deptSkip: first.length,
        deptTotal: usernames.length,
        doctorsInDept: usernames,
        candidates: usernames,
        category: "HOSPITAL",
    };
    updateSession("FIND_HOSPITAL_FLOW", "SELECT_DOCTOR", next);
    await track(phoneNumber, "SELECT_DOCTOR", next);

    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.DEPT_DOCTORS_HEADER(hospital.name, dept));
    // Banner-image cards with Contact buttons — exactly like the doctor flow.
    await sendDoctorCards(phoneNumber, first);
    if (usernames.length > first.length) {
        await sendHospSeeMoreButton(phoneNumber, usernames.length - first.length);
    }
    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT + BACK_HINT);
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
    const step = session?.step || "ASK_DIVISION";

    // ---------- LOCATION FIRST: division -> district -> thana ----------
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

    // ---------- THANA -> selectable hospital list ----------
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
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.PROCESSING);
        void sendTypingIndicator(phoneNumber, msg?.messageId);
        const hospitals = await findHospitalsByLocation({
            division: division.name,
            district: district.name,
            thana: hit,
        });
        if (!hospitals.length) {
            await sendWhatsAppMessage(
                phoneNumber,
                HOSPITAL_TEXTS.NO_HOSPITAL_THANA(hit, district.name, division.name) + BACK_HINT
            );
            return;
        }
        const next = {
            ...data,
            division: division.name,
            district: district.name,
            thana: hit,
            location: `${hit}, ${district.name}`,
            hospitalCandidates: hospitals.map((h) => h.id),
            hospitalOptions: hospitals.map((h) => ({ id: h.id, name: h.name })),
            category: "HOSPITAL",
        };
        updateSession("FIND_HOSPITAL_FLOW", "SELECT_HOSPITAL", next);
        await track(phoneNumber, "SELECT_HOSPITAL", next);
        await sendHospitalListPrompt(
            phoneNumber,
            HOSPITAL_TEXTS.HOSPITAL_LIST_PROMPT(hit, district.name, division.name),
            hospitals
        );
        return;
    }

    // ---------- HOSPITAL picked -> business card + category list ----------
    if (step === "SELECT_HOSPITAL") {
        const loc = {
            division: String(data.division || ""),
            district: String(data.district || ""),
            thana: String(data.thana || ""),
        };
        // List tap with hospital id.
        if (isHospClick(rawText, buttonId)) {
            const hospital = await getHospitalInLocation(extractHospId(rawText, buttonId), loc);
            if (hospital) {
                await showDepartments(phoneNumber, hospital, data, updateSession);
                return;
            }
        }
        // Number 1-N (resolve via options).
        const options: { id: string; name: string }[] = Array.isArray(data.hospitalOptions)
            ? data.hospitalOptions
            : [];
        const num = parseInt(rawText.trim(), 10);
        if (!Number.isNaN(num) && num >= 1 && num <= options.length) {
            const hospital = await getHospitalInLocation(options[num - 1]!.id, loc);
            if (hospital) {
                await showDepartments(phoneNumber, hospital, data, updateSession);
                return;
            }
        }
        // Name typed -> match against the offered options.
        if (rawText.trim().length >= 2 && !isEntryWord(rawText)) {
            const t = rawText.trim();
            const opt =
                options.find((o) => o.name === t) ||
                options.find((o) => t.includes(o.name) || o.name.includes(t));
            if (opt) {
                const hospital = await getHospitalInLocation(opt.id, loc);
                if (hospital) {
                    await showDepartments(phoneNumber, hospital, data, updateSession);
                    return;
                }
            }
        }
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
        return;
    }

    // ---------- CATEGORY picked -> max 5 doctors ----------
    if (step === "SELECT_DEPT") {
        const departments: string[] = Array.isArray(data.departments) ? data.departments : [];
        const loc = {
            division: String(data.division || ""),
            district: String(data.district || ""),
            thana: String(data.thana || ""),
        };
        const hospitalId = String(data.hospitalId || "");
        if (!hospitalId || !departments.length) {
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
            return;
        }
        let dept: string | null = null;
        if (isDeptClick(rawText, buttonId)) {
            const idx = extractDeptIdx(rawText, buttonId);
            if (idx >= 0 && idx < departments.length) dept = departments[idx]!;
        }
        if (!dept) {
            const num = parseInt(rawText.trim(), 10);
            if (!Number.isNaN(num) && num >= 1 && num <= departments.length) {
                dept = departments[num - 1]!;
            }
        }
        if (!dept) {
            const t = rawText.trim();
            if (t.length >= 2) {
                dept =
                    departments.find((d) => d === t) ||
                    departments.find((d) => t.includes(d) || d.includes(t)) ||
                    null;
            }
        }
        if (!dept) {
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
            return;
        }
        const hospital = await getHospitalInLocation(hospitalId, loc);
        if (!hospital) {
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
            return;
        }
        await showDeptDoctors(phoneNumber, hospital, dept, data, updateSession);
        return;
    }

    // ---------- DOCTOR: see-more pages + Contact (username) -> direct doctor bot ----------
    if (step === "SELECT_DOCTOR") {
        // See-more tap -> next page of this department's cards.
        if (buttonId.toLowerCase().trim() === HOSP_MORE_DOCTORS_ID) {
            const hospitalId = String(data.hospitalId || "");
            const dept = String(data.department || "");
            if (!hospitalId || !dept) {
                await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT + BACK_HINT);
                return;
            }
            const hospital = await getHospitalInLocation(hospitalId, {
                division: String(data.division || ""),
                district: String(data.district || ""),
                thana: String(data.thana || ""),
            });
            if (!hospital) {
                await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.FALLBACK + BACK_HINT);
                return;
            }
            const { cards } = toDeptCards(hospital, dept);
            const skip = Number(data.deptSkip ?? HOSP_DEPT_PAGE);
            const page = cards.slice(skip, skip + HOSP_DEPT_PAGE);
            if (!page.length) return;
            await sendDoctorCards(phoneNumber, page);
            const nextSkip = skip + page.length;
            const total = Number(data.deptTotal ?? cards.length);
            const next = { ...data, deptSkip: nextSkip };
            updateSession("FIND_HOSPITAL_FLOW", "SELECT_DOCTOR", next);
            await track(phoneNumber, "SELECT_DOCTOR", next);
            if (nextSkip < total) await sendHospSeeMoreButton(phoneNumber, total - nextSkip);
            return;
        }
        if (isConnectClick(rawText, buttonId)) {
            const username = extractUsername(rawText, buttonId);
            const done = { ...data, confirmed: true, confirmedChoice: username };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctor(phoneNumber, msg, username, updateSession);
            if (ok) return;
            await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT + BACK_HINT);
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
        const inDept: string[] = Array.isArray(data.deptUsernames) ? data.deptUsernames : [];
        const hit = inDept.find((c) => c.toLowerCase() === typed);
        if (hit) {
            const done = { ...data, confirmed: true, confirmedChoice: hit };
            await track(phoneNumber, "CONFIRMED", done);
            const ok = await connectDoctor(phoneNumber, msg, hit, updateSession);
            if (ok) return;
        }
        await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT + BACK_HINT);
        return;
    }

    if (step === "CONFIRMED") {
        await sendInteractiveButtons(phoneNumber, "✅ ধন্যবাদ! আর কিছু করতে চাইলে নিচে থেকে বেছে নিন:", withNav([]));
        return;
    }

    const next = { ...data, category: "HOSPITAL" };
    updateSession("FIND_HOSPITAL_FLOW", "ASK_DIVISION", next);
    await track(phoneNumber, "ASK_DIVISION", next);
    await sendDivisionPrompt(phoneNumber, "HOSPITAL");
}
