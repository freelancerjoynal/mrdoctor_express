// ============================================================================
// locationSelect.ts — shared division → district → thana → speciality picker.
// Used by FIND_DOCTOR_FLOW and FIND_HOSPITAL_FLOW right after the user picks
// "ডাক্তার" / "হসপিটাল" from the main menu. Button ids (div_/dis_/th_/spec_)
// never collide with other flow prefixes. Matching works by button tap,
// typed number ("2"), or typed name.
// ============================================================================
import { prisma } from "../../lib/prisma.js";
import { DIVISIONS, type Division, type District } from "../../lib/areas.js";
import { DOCTOR_SPECIALITIES, type DoctorSpeciality } from "../../lib/doctorSpeciality.js";
import {
    sendWhatsAppMessage,
    sendListChunked,
    sendImageButtons,
    sendInteractiveButtons,
    type ListRow,
} from "./sendWhatsAppMessage.js";
import { BACK_HINT, type UpdateFn } from "./session.js";

/** Page size for the post-category doctor cards. */
export const DOCTOR_CARD_PAGE = 5;
/** more_doctors tap -> next page of cards. */
export const MORE_DOCTORS_ID = "more_doctors";

export type LocationKind = "DOCTOR" | "HOSPITAL";

export const LOCATION_TEXTS = {
    ASK_DIVISION: (kind: LocationKind) =>
        kind === "HOSPITAL"
            ? "📍 আপনি কোন বিভাগে হসপিটাল খুঁজছেন? তালিকা থেকে বিভাগ বেছে নিন 👇"
            : "📍 আপনি কোন বিভাগে ডাক্তার দেখাতে চান? তালিকা থেকে বিভাগ বেছে নিন 👇",
    ASK_DISTRICT: (kind: LocationKind, division: string) =>
        kind === "HOSPITAL"
            ? `📍 ${division} বিভাগের কোন জেলায় হসপিটাল খুঁজছেন? তালিকা থেকে বেছে নিন 👇`
            : `📍 ${division} বিভাগের কোন জেলায় ডাক্তার দেখাতে চান? তালিকা থেকে বেছে নিন 👇`,
    ASK_THANA: (district: string) =>
        `📍 ${district} জেলার কোন থানায়/এলাকায় দেখাতে চান? তালিকা থেকে বেছে নিন 👇`,
    ASK_SPECIALITY:
        "🏷️ কোন ক্যাটাগরির ডাক্তার খুঁজছেন? তালিকা থেকে বেছে নিন 👇",
    INVALID_PICK: "দয়া করে তালিকা থেকে বেছে নিন অথবা নামটি লিখুন 👇",
    NO_DOCTORS_THANA: (thana: string, district?: string, division?: string) =>
        `😔 দুঃখিত, "${formatLocationPath(division, district, thana)}" এলাকায় এখনও কোনো ডাক্তারের চেম্বার পাওয়া যায়নি। অন্য লোকেশন চেষ্টা করুন।`,
    SUGGEST_ASK_PROBLEM:
        "🤔 কোন ডাক্তার দেখাবেন বুঝতে পারছেন না? আপনার সমস্যাটি সংক্ষেপে লিখুন (যেমন: ৩ দিন ধরে জ্বর ও কাশি) — আমরা সঠিক বিভাগ সাজেস্ট করছি।",
    SUGGEST_THINKING: "🤔 একটু ভাবছি, আপনার জন্য সঠিক বিভাগ খুঁজছি…",
    SUGGEST_FAILED:
        "😔 দুঃখিত, সমস্যাটি বুঝতে পারিনি। তালিকা থেকে সরাসরি বেছে নিন 👇",
    NO_DOCTORS_DIVISION: (spec: string, division: string, district?: string, thana?: string) =>
        `😔 দুঃখিত, "${formatLocationPath(division, district, thana)}" লোকেশনে *${spec}* বিভাগের ডাক্তার পাওয়া যায়নি।\nঅন্য লোকেশন / অন্য বিভাগ চেষ্টা করুন 👇`,
};

/** Location path in division -> district -> thana order (big to small). */
export function formatLocationPath(division?: string, district?: string, thana?: string): string {
    return [division, district, thana].map((s) => (s || "").trim()).filter(Boolean).join("-");
}

/** Dynamic picker buttons — named for what each list opens. */
const DIVISION_BUTTON = "📋 বিভাগ দেখুন";
const DISTRICT_BUTTON = "📋 জেলা দেখুন";
const THANA_BUTTON = "📋 থানা দেখুন";
const SPECIALITY_BUTTON = "📋 বিশেষজ্ঞ দেখুন";
/** "Can't figure out the right doctor?" row -> problem-based AI suggest. */
export const SUGGEST_SPEC_ID = "spec_suggest";
const SUGGEST_ROW: ListRow = {
    id: SUGGEST_SPEC_ID,
    title: "🤔 সমস্যা লিখুন",
    description: "বুঝতে পারছেন না? লিখুন, সাজেস্ট করছি",
};

/** Button tap (div_2) or typed number ("3") -> 0-based index, -1 when neither. */
function pickIndex(rawText: string, buttonId: string, prefix: string, count: number): number {
    const src = (buttonId || "").trim() || (rawText || "").trim();
    const m = src.match(new RegExp(`^${prefix}_(\\d+)$`, "i"));
    if (m) {
        const n = parseInt(m[1]!, 10);
        if (!Number.isNaN(n) && n >= 0 && n < count) return n;
    }
    const digits = (rawText || "").trim().replace(/[^0-9]/g, "");
    if (digits) {
        const n = Number(digits);
        if (Number.isInteger(n) && n >= 1 && n <= count) return n - 1;
    }
    return -1;
}

function nameMatch<T>(list: T[], getName: (v: T) => string, rawText: string): T | null {
    const t = (rawText || "").trim();
    if (t.length < 2) return null;
    return (
        list.find((v) => getName(v) === t) ||
        list.find((v) => t.includes(getName(v)) || getName(v).includes(t)) ||
        null
    );
}

// ---------------------------------------------------------------- divisions

export function findDivision(name: string): Division | null {
    const t = (name || "").trim();
    if (!t) return null;
    return DIVISIONS.find((d) => d.name === t) || null;
}

export function matchDivision(rawText: string, buttonId: string): Division | null {
    const idx = pickIndex(rawText, buttonId, "div", DIVISIONS.length);
    if (idx >= 0) return DIVISIONS[idx]!;
    return nameMatch(DIVISIONS, (d) => d.name, rawText);
}

export async function sendDivisionPrompt(to: string, kind: LocationKind): Promise<void> {
    // 8 rows = 1 list message (fewer sends = faster load + less server work
    // than one button per division).
    const rows: ListRow[] = DIVISIONS.map((d, i) => ({
        id: `div_${i}`,
        title: d.name,
        description: `${d.districts.length} জেলা`,
    }));
    await sendListChunked(to, LOCATION_TEXTS.ASK_DIVISION(kind), DIVISION_BUTTON, rows, "বিভাগ");
}

// ---------------------------------------------------------------- districts

export function matchDistrict(division: Division, rawText: string, buttonId: string): District | null {
    const list = division.districts || [];
    const idx = pickIndex(rawText, buttonId, "dis", list.length);
    if (idx >= 0) return list[idx]!;
    return nameMatch(list, (d) => d.name, rawText);
}

export async function sendDistrictPrompt(to: string, kind: LocationKind, division: Division): Promise<void> {
    const list = division.districts || [];
    const rows: ListRow[] = list.map((d, i) => ({
        id: `dis_${i}`,
        title: d.name,
        description: `${d.thanas.length} থানা`,
    }));
    await sendListChunked(to, LOCATION_TEXTS.ASK_DISTRICT(kind, division.name), DISTRICT_BUTTON, rows, "জেলা");
}

// ------------------------------------------------------------------- thanas

export function matchThana(district: District, rawText: string, buttonId: string): string | null {
    const list = district.thanas || [];
    const idx = pickIndex(rawText, buttonId, "th", list.length);
    if (idx >= 0) return list[idx]!;
    return nameMatch(list, (v) => v, rawText);
}

export async function sendThanaPrompt(to: string, district: District): Promise<void> {
    const list = district.thanas || [];
    const rows: ListRow[] = list.map((t, i) => ({ id: `th_${i}`, title: t }));
    await sendListChunked(to, LOCATION_TEXTS.ASK_THANA(district.name), THANA_BUTTON, rows, "থানা");
}

// -------------------------------------------------------------- speciality

/** Master speciality with live availability in one thana. */
export interface AvailableSpec {
    /** Index in DOCTOR_SPECIALITIES (row ids stay spec_<idx>). */
    idx: number;
    bn: string;
    en: string;
    /** Approved doctors with a chamber in this thana. */
    doctors: number;
}

/**
 * Master-list specialities that actually have a chamber in this thana
 * (single groupBy — one cheap query). Sorted by doctor count, most first.
 */
export async function fetchAvailableSpecs(thana: string, district: string): Promise<AvailableSpec[]> {
    const groups = await prisma.doctor.groupBy({
        by: ["speciality"],
        where: {
            status: "APPROVED",
            chambers: {
                some: {
                    ...(district ? { district: { contains: district, mode: "insensitive" as const } } : {}),
                    ...(thana ? { thana: { contains: thana, mode: "insensitive" as const } } : {}),
                },
            },
        },
        _count: { speciality: true },
    });
    const byBn = new Map(DOCTOR_SPECIALITIES.map((s, idx) => [s.specialty_bn, { idx, en: s.specialty_en }]));
    return groups
        .flatMap((g) => {
            const hit = byBn.get(g.speciality);
            return hit ? [{ idx: hit.idx, bn: g.speciality, en: hit.en, doctors: g._count.speciality }] : [];
        })
        .sort((a, b) => b.doctors - a.doctors);
}

export function matchSpeciality(
    rawText: string,
    buttonId: string,
    allowed?: Pick<AvailableSpec, "bn" | "en">[] | null
): DoctorSpeciality | null {
    // Row taps carry the global spec_<idx> id — always valid.
    const idx = pickIndex(rawText, buttonId, "spec", DOCTOR_SPECIALITIES.length);
    if (idx >= 0) return DOCTOR_SPECIALITIES[idx]!;
    // Typed names only match what was actually offered (chambers here).
    const pool: Pick<DoctorSpeciality, "specialty_bn" | "specialty_en">[] = allowed?.length
        ? allowed.map((a) => ({ specialty_bn: a.bn, specialty_en: a.en }))
        : DOCTOR_SPECIALITIES;
    const t = (rawText || "").trim();
    if (t.length < 2) return null;
    const low = t.toLowerCase();
    return (
        (pool.find((s) => s.specialty_bn === t || s.specialty_en.toLowerCase() === low) as DoctorSpeciality | undefined) ||
        (pool.find((s) => t.includes(s.specialty_bn) || s.specialty_bn.includes(t)) as DoctorSpeciality | undefined) ||
        null
    );
}

export async function sendSpecialityPrompt(to: string, specs?: AvailableSpec[] | null): Promise<void> {
    // Only what this thana actually has — each row shows its live doctor
    // count so the user sees what's inside. 10 or fewer rows = ONE list
    // message (Meta cap); more spill into further lists. Row ids stay
    // spec_<global index> so matching is unchanged.
    const list: AvailableSpec[] = specs?.length
        ? specs
        : DOCTOR_SPECIALITIES.map((s, idx) => ({ idx, bn: s.specialty_bn, en: s.specialty_en, doctors: 0 }));
    const rows: ListRow[] = [
        ...list.map((s) => ({
            id: `spec_${s.idx}`,
            title: s.bn,
            description: s.doctors > 0 ? `${s.doctors} জন ডাক্তার` : s.en,
        })),
        // Last row: can't figure out -> describe the problem, AI suggests.
        SUGGEST_ROW,
    ];
    await sendListChunked(to, LOCATION_TEXTS.ASK_SPECIALITY, SPECIALITY_BUTTON, rows, "বিশেষজ্ঞ");
}

/** Chamber filter shared by the doctor pool + its count. */
function locationChamberFilter(thana: string, district: string) {
    return {
        some: {
            ...(district ? { district: { contains: district, mode: "insensitive" as const } } : {}),
            ...(thana ? { thana: { contains: thana, mode: "insensitive" as const } } : {}),
        },
    };
}

/** One doctor row for the post-category cards. */
export interface LocationDoctorCard {
    username: string;
    name: string;
    degree: string | null;
    speciality: string | null;
    chamberName: string | null;
    bannerCardImage: string | null;
}

/**
 * Approved doctors of one speciality with a chamber in this thana
 * (by name, paged) — the pool behind the Contact cards.
 */
export async function fetchLocationDoctors(
    thana: string,
    district: string,
    specialityBn: string,
    take = DOCTOR_CARD_PAGE,
    skip = 0
): Promise<LocationDoctorCard[]> {
    const rows = await prisma.doctor.findMany({
        where: {
            status: "APPROVED",
            speciality: specialityBn,
            chambers: locationChamberFilter(thana, district),
        },
        select: {
            username: true,
            name: true,
            degree: true,
            speciality: true,
            bannerCardImage: true,
            chambers: {
                where: {
                    ...(district ? { district: { contains: district, mode: "insensitive" as const } } : {}),
                    ...(thana ? { thana: { contains: thana, mode: "insensitive" as const } } : {}),
                },
                take: 1,
                select: { chamberName: true },
            },
        },
        orderBy: { name: "asc" },
        take: Math.min(Math.max(take, 1), DOCTOR_CARD_PAGE),
        skip: Math.max(skip, 0),
    });
    return rows.map((r) => ({
        username: r.username,
        name: r.name,
        degree: r.degree,
        speciality: r.speciality,
        chamberName: r.chambers[0]?.chamberName ?? null,
        bannerCardImage: r.bannerCardImage,
    }));
}

/** Total pool size behind the cards (drives the see-more button). */
export async function countLocationDoctors(
    thana: string,
    district: string,
    specialityBn: string
): Promise<number> {
    return prisma.doctor.count({
        where: {
            status: "APPROVED",
            speciality: specialityBn,
            chambers: locationChamberFilter(thana, district),
        },
    });
}

export function buildLocationDoctorCard(d: LocationDoctorCard): string {
    return (
        `🩺 *${d.name}*\n` +
        `\n` +
        `🎓 ${d.degree || "MBBS"}\n` +
        `⭐ ${d.speciality || "জেনারেল"}\n` +
        `🏥 ${d.chamberName || "চেম্বার"}\n`
    );
}

/** "See more" button when further doctors remain past the shown cards. */
export async function sendSeeMoreButton(to: string, remaining: number): Promise<void> {
    await sendInteractiveButtons(
        to,
        `➕ আরও ${remaining} জন ডাক্তার আছে — দেখতে নিচে চাপ দিন:`,
        [{ id: MORE_DOCTORS_ID, title: "আরও দেখুন" }]
    );
}

/**
 * Banner-image cards, each with a Contact button (connect_<username>).
 * Tapping joins that doctor's booking flow via the global connect handler.
 */
export async function sendDoctorCards(to: string, doctors: LocationDoctorCard[]): Promise<void> {
    for (const d of doctors) {
        await sendImageButtons(to, d.bannerCardImage || "", buildLocationDoctorCard(d), [
            { id: `connect_${d.username}`, title: "Contact করুন" },
        ]);
    }
}

/**
 * Back-resend for ASK_SPECIALITY: recomputes availability when the resumed
 * session lost it, restarts at division when even the thana is gone.
 */
export async function resendSpecialityPrompt(to: string, kind: LocationKind, data: any): Promise<void> {
    if (!data?.thana || !data?.district) {
        await sendDivisionPrompt(to, kind);
        return;
    }
    const stored: AvailableSpec[] | undefined = Array.isArray(data.availableSpecs)
        ? data.availableSpecs
        : undefined;
    const allowed: AvailableSpec[] = stored?.length
        ? stored
        : await fetchAvailableSpecs(String(data.thana), String(data.district));
    if (!allowed.length) {
        await sendWhatsAppMessage(to, LOCATION_TEXTS.NO_DOCTORS_THANA(String(data.thana)));
        return;
    }
    await sendSpecialityPrompt(to, allowed);
}

/** Where one speciality is available: district -> doctor count. */
export interface DistrictAvailability {
    district: string;
    doctors: number;
}

/** Where one speciality is available: thana -> doctor count. */
export interface ThanaAvailability {
    thana: string;
    doctors: number;
}

/** Distinct approved doctors of one speciality, grouped by their chamber district. */
export async function fetchAvailabilityByDistrict(
    division: string,
    specialityBn: string
): Promise<DistrictAvailability[]> {
    const docs = await prisma.doctor.findMany({
        where: {
            status: "APPROVED",
            speciality: specialityBn,
            chambers: {
                some: {
                    ...(division ? { division: { contains: division, mode: "insensitive" as const } } : {}),
                },
            },
        },
        select: { id: true, chambers: { select: { district: true, division: true } } },
    });
    const counts = new Map<string, Set<string>>();
    const has = (value: string | null | undefined, needle: string) =>
        (value ?? "").toLowerCase().includes(needle.toLowerCase());
    for (const d of docs) {
        for (const c of d.chambers) {
            if (division && !has(c.division, division)) continue;
            const name = (c.district || "").trim();
            if (!name) continue;
            if (!counts.has(name)) counts.set(name, new Set());
            counts.get(name)!.add(d.id);
        }
    }
    return [...counts.entries()]
        .map(([district, ids]) => ({ district, doctors: ids.size }))
        .sort((a, b) => b.doctors - a.doctors);
}

/** Distinct approved doctors of one speciality, grouped by their chamber thana. */
export async function fetchAvailabilityByThana(
    division: string,
    district: string,
    specialityBn: string
): Promise<ThanaAvailability[]> {
    const docs = await prisma.doctor.findMany({
        where: {
            status: "APPROVED",
            speciality: specialityBn,
            chambers: {
                some: {
                    ...(division ? { division: { contains: division, mode: "insensitive" as const } } : {}),
                    ...(district ? { district: { contains: district, mode: "insensitive" as const } } : {}),
                },
            },
        },
        select: { id: true, chambers: { select: { thana: true, district: true, division: true } } },
    });
    const counts = new Map<string, Set<string>>();
    const has = (value: string | null | undefined, needle: string) =>
        (value ?? "").toLowerCase().includes(needle.toLowerCase());
    for (const d of docs) {
        for (const c of d.chambers) {
            if (division && !has(c.division, division)) continue;
            if (district && !has(c.district, district)) continue;
            const name = (c.thana || "").trim();
            if (!name) continue;
            if (!counts.has(name)) counts.set(name, new Set());
            counts.get(name)!.add(d.id);
        }
    }
    return [...counts.entries()]
        .map(([thana, ids]) => ({ thana, doctors: ids.size }))
        .sort((a, b) => b.doctors - a.doctors);
}

/** Alt-district list: where in this division the speciality IS available. */
export async function sendAltDistrictPrompt(
    to: string,
    specBn: string,
    thana: string,
    division: string,
    alts: DistrictAvailability[],
    district?: string
): Promise<void> {
    const rows: ListRow[] = alts.map((a, i) => ({
        id: `adis_${i}`,
        title: a.district,
        description: `${a.doctors} জন ডাক্তার`,
    }));
    await sendListChunked(
        to,
        `😔 "${formatLocationPath(division, district, thana)}" লোকেশনে *${specBn}* পাওয়া যায়নি। অন্য লোকেশন চেষ্টা করুন।\n\n✅ ${division} বিভাগে এই বিভাগের ডাক্তার যেখানে আছে — নিচে থেকে জেলা বেছে নিন 👇 (পাশে সংখ্যা = কতজন ডাক্তার)`,
        "📋 জেলা দেখুন",
        rows,
        "জেলা"
    );
}

/** Alt-thana list inside the picked district. */
export async function sendAltThanaPrompt(
    to: string,
    specBn: string,
    district: string,
    alts: ThanaAvailability[]
): Promise<void> {
    const rows: ListRow[] = alts.map((a, i) => ({
        id: `ath_${i}`,
        title: a.thana,
        description: `${a.doctors} জন ডাক্তার`,
    }));
    await sendListChunked(
        to,
        `🏷️ *${specBn}* — ${district} জেলায় যেখানে ডাক্তার আছে, থানা বেছে নিন 👇 (পাশে সংখ্যা = কতজন ডাক্তার)`,
        "📋 থানা দেখুন",
        rows,
        "থানা"
    );
}

export type FindFlow = "FIND_DOCTOR_FLOW" | "FIND_HOSPITAL_FLOW";

/**
 * Shared post-category advance (manual pick + AI suggest, both flows):
 * ack -> doctor cards here, or the alternate-location path when this
 * thana has none (districts in this division -> thanas there -> cards).
 */
export async function advancePickedSpeciality(args: {
    flow: FindFlow;
    kind: LocationKind;
    phoneNumber: string;
    data: any;
    bn: string;
    en: string;
    /** Optional line before the ack (e.g. "AI picked this for your problem"). */
    lead?: string;
    updateSession: UpdateFn;
    track: (step: string, data: any) => Promise<void>;
}): Promise<void> {
    const { flow, kind, phoneNumber, data, bn, en, updateSession, track } = args;
    const category = kind === "HOSPITAL" ? "HOSPITAL" : "DOCTOR";
    const picked = { ...data, department: bn, department_en: en, category };
    if (args.lead) await sendWhatsAppMessage(phoneNumber, args.lead);
    await sendWhatsAppMessage(phoneNumber, buildLocationDoneMessage(picked));
    const thana = String(data.thana || "");
    const district = String(data.district || "");
    const division = String(data.division || "");
    const [total, doctors] = await Promise.all([
        countLocationDoctors(thana, district, bn),
        fetchLocationDoctors(thana, district, bn),
    ]);
    if (!doctors.length) {
        const alts = await fetchAvailabilityByDistrict(division, bn);
        if (!alts.length) {
            const restart = { ...data, category };
            updateSession(flow, "ASK_DIVISION", restart);
            await track("ASK_DIVISION", restart);
            await sendWhatsAppMessage(
                phoneNumber,
                LOCATION_TEXTS.NO_DOCTORS_DIVISION(bn, division || "এই", district, thana) + BACK_HINT
            );
            await sendDivisionPrompt(phoneNumber, kind);
            return;
        }
        const next = { ...data, ...picked, altDistricts: alts };
        updateSession(flow, "ASK_ALT_DISTRICT", next);
        await track("ASK_ALT_DISTRICT", next);
        await sendAltDistrictPrompt(phoneNumber, bn, thana, division, alts, district);
        return;
    }
    await sendDoctorCards(phoneNumber, doctors);
    const shown = doctors.length;
    if (total > shown) await sendSeeMoreButton(phoneNumber, total - shown);
    const withCandidates: Record<string, unknown> = {
        ...picked,
        candidates: doctors.map((d) => d.username),
        doctorSkip: shown,
        doctorTotal: total,
    };
    if (flow === "FIND_HOSPITAL_FLOW") {
        withCandidates.doctorsInDept = doctors.map((d) => d.username);
    }
    updateSession(flow, "SELECT_DOCTOR", withCandidates);
    await track("SELECT_DOCTOR", withCandidates);
}

/** Match a tap/number/name against an offered alt-district list. */
export function matchAltDistrict(
    alts: DistrictAvailability[],
    rawText: string,
    buttonId: string
): DistrictAvailability | null {
    const idx = pickIndex(rawText, buttonId, "adis", alts.length);
    if (idx >= 0) return alts[idx]!;
    const t = (rawText || "").trim();
    if (t.length < 2) return null;
    return (
        alts.find((a) => a.district === t) ||
        alts.find((a) => t.includes(a.district) || a.district.includes(t)) ||
        null
    );
}

/** Match a tap/number/name against an offered alt-thana list. */
export function matchAltThana(
    alts: ThanaAvailability[],
    rawText: string,
    buttonId: string
): ThanaAvailability | null {
    const idx = pickIndex(rawText, buttonId, "ath", alts.length);
    if (idx >= 0) return alts[idx]!;
    const t = (rawText || "").trim();
    if (t.length < 2) return null;
    return (
        alts.find((a) => a.thana === t) ||
        alts.find((a) => t.includes(a.thana) || a.thana.includes(t)) ||
        null
    );
}

/**
 * Shared ASK_ALT_DISTRICT step: picked district -> thana availability list.
 */
export async function handleAltDistrict(args: {
    flow: FindFlow;
    kind: LocationKind;
    phoneNumber: string;
    rawText: string;
    buttonId: string;
    data: any;
    updateSession: UpdateFn;
    track: (step: string, data: any) => Promise<void>;
}): Promise<void> {
    const { flow, phoneNumber, rawText, buttonId, data, updateSession, track } = args;
    const alts: DistrictAvailability[] = Array.isArray(data.altDistricts) ? data.altDistricts : [];
    const bn = String(data.department || "");
    const division = String(data.division || "");
    if (!bn || !division || !alts.length) {
        const restart = { ...data, category: args.kind === "HOSPITAL" ? "HOSPITAL" : "DOCTOR" };
        updateSession(flow, "ASK_DIVISION", restart);
        await track("ASK_DIVISION", restart);
        await sendDivisionPrompt(phoneNumber, args.kind);
        return;
    }
    const hit = matchAltDistrict(alts, rawText, buttonId);
    if (!hit) {
        await sendAltDistrictPrompt(phoneNumber, bn, String(data.thana || ""), division, alts, String(data.district || ""));
        await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
        return;
    }
    const thanas = await fetchAvailabilityByThana(division, hit.district, bn);
    if (!thanas.length) {
        await sendAltDistrictPrompt(phoneNumber, bn, String(data.thana || ""), division, alts, String(data.district || ""));
        await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
        return;
    }
    const next = { ...data, district: hit.district, altThanas: thanas };
    updateSession(flow, "ASK_ALT_THANA", next);
    await track("ASK_ALT_THANA", next);
    await sendAltThanaPrompt(phoneNumber, bn, hit.district, thanas);
}

/**
 * Shared ASK_ALT_THANA step: picked thana -> refresh availability -> cards.
 */
export async function handleAltThana(args: {
    flow: FindFlow;
    kind: LocationKind;
    phoneNumber: string;
    rawText: string;
    buttonId: string;
    data: any;
    updateSession: UpdateFn;
    track: (step: string, data: any) => Promise<void>;
}): Promise<void> {
    const { flow, phoneNumber, rawText, buttonId, data, updateSession, track } = args;
    const alts: ThanaAvailability[] = Array.isArray(data.altThanas) ? data.altThanas : [];
    const bn = String(data.department || "");
    const district = String(data.district || "");
    if (!bn || !district || !alts.length) {
        const restart = { ...data, category: args.kind === "HOSPITAL" ? "HOSPITAL" : "DOCTOR" };
        updateSession(flow, "ASK_DIVISION", restart);
        await track("ASK_DIVISION", restart);
        await sendDivisionPrompt(phoneNumber, args.kind);
        return;
    }
    const hit = matchAltThana(alts, rawText, buttonId);
    if (!hit) {
        await sendAltThanaPrompt(phoneNumber, bn, district, alts);
        await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.INVALID_PICK + BACK_HINT);
        return;
    }
    // New thana: refresh what's available here, then show this category's cards.
    const [available, total, doctors] = await Promise.all([
        fetchAvailableSpecs(hit.thana, district),
        countLocationDoctors(hit.thana, district, bn),
        fetchLocationDoctors(hit.thana, district, bn),
    ]);
    const thana = hit.thana;
    const location = `${thana}, ${district}`;
    if (!doctors.length) {
        await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.NO_DOCTORS_THANA(thana, district, String(data.division || "")) + BACK_HINT);
        return;
    }
    await sendWhatsAppMessage(phoneNumber, buildLocationDoneMessage({ ...data, thana, district, department: bn }));
    await sendDoctorCards(phoneNumber, doctors);
    const shown = doctors.length;
    if (total > shown) await sendSeeMoreButton(phoneNumber, total - shown);
    const withCandidates: Record<string, unknown> = {
        ...data,
        thana,
        district,
        location,
        availableSpecs: available,
        candidates: doctors.map((d) => d.username),
        doctorSkip: shown,
        doctorTotal: total,
    };
    if (flow === "FIND_HOSPITAL_FLOW") {
        withCandidates.doctorsInDept = doctors.map((d) => d.username);
    }
    updateSession(flow, "SELECT_DOCTOR", withCandidates);
    await track("SELECT_DOCTOR", withCandidates);
}

/** Terminal ack after thana + category are picked (division -> district -> thana order). */
export function buildLocationDoneMessage(data: {
    thana?: string;
    district?: string;
    division?: string;
    department?: string;
}): string {
    return (
        `✅ ধন্যবাদ! আপনার পছন্দ নোট করা হয়েছে।\n\n` +
        `📍 ${formatLocationPath(data.division, data.district, data.thana)}\n` +
        `🏷️ ${data.department || ""}`
    );
}
