import { prisma } from "../../lib/prisma.js";
import { shuffle } from "../lib/session.js";
import { sendInteractiveButtons, sendListChunked, type ListRow } from "../lib/sendWhatsAppMessage.js";
import type { DoctorWithChambers } from "./doctorSearch.js";

/** Page size for hospital department doctor cards. */
export const HOSP_DEPT_PAGE = 5;
/** hosp_more tap -> next page of this department's doctor cards. */
export const HOSP_MORE_DOCTORS_ID = "hosp_more_doctors";

export interface HospitalWithDoctors {
    id: string;
    name: string;
    slug: string;
    address: string | null;
    phone: string | null;
    businessCardImage: string | null;
    bannerCardImage: string | null;
    doctorCount: number;
    departments: string[];
    doctors: {
        id: string;
        name: string;
        username: string;
        degree: string | null;
        speciality: string | null;
        phone: string | null;
        chamberName: string | null;
        addressLine: string;
        thana: string;
        district: string;
        division: string | null;
        newPatientFee: number | null;
        oldPatientFee: number | null;
        bannerCardImage: string | null;
    }[];
}

function areaFilter(area: string) {
    const q = (area || "").trim();
    return {
        OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { address: { contains: q, mode: "insensitive" as const } },
            {
                chambers: {
                    some: {
                        OR: [
                            { thana: { contains: q, mode: "insensitive" as const } },
                            { district: { contains: q, mode: "insensitive" as const } },
                            { division: { contains: q, mode: "insensitive" as const } },
                            { addressLine: { contains: q, mode: "insensitive" as const } },
                        ],
                    },
                },
            },
        ],
    };
}

function toHospital(h: any): HospitalWithDoctors {
    const seenDoc = new Map<string, any>();
    for (const c of h.chambers || []) {
        const d = c.doctor;
        if (!d || seenDoc.has(d.id)) continue;
        seenDoc.set(d.id, {
            id: d.id,
            name: d.name,
            username: d.username,
            degree: d.degree ?? null,
            speciality: d.speciality ?? null,
            phone: d.phone ?? null,
            chamberName: c.chamberName ?? null,
            addressLine: c.addressLine,
            thana: c.thana,
            district: c.district,
            division: c.division ?? null,
            newPatientFee: c.newPatientFee ?? null,
            oldPatientFee: c.oldPatientFee ?? null,
            bannerCardImage: d.bannerCardImage ?? null,
        });
    }
    const doctors = [...seenDoc.values()];
    const departments = [...new Set(doctors.map((d) => (d.speciality || "জেনারেল").trim()))];
    return {
        id: h.id,
        name: h.name,
        slug: h.slug,
        address: h.address ?? null,
        phone: h.phone ?? null,
        businessCardImage: h.businessCardImage ?? null,
        bannerCardImage: h.bannerCardImage ?? null,
        doctorCount: doctors.length,
        departments,
        doctors,
    };
}

/** Random 5 hospitals in the user's area (new schema). */
export async function findHospitalsByArea(area: string, limit = 5): Promise<HospitalWithDoctors[]> {
    const q = (area || "").trim();
    if (!q) return [];

    const hospitals = await prisma.hospital.findMany({
        where: { ...areaFilter(q), status: "APPROVED" },
        include: { chambers: { include: { doctor: true } } },
        take: 30,
    });

    if (!hospitals.length) return [];
    return shuffle(hospitals).slice(0, limit).map(toHospital);
}

export async function getHospitalById(hospitalId: string): Promise<HospitalWithDoctors | null> {
    const h = await prisma.hospital.findUnique({
        where: { id: hospitalId },
        include: { chambers: { include: { doctor: true } } },
    });
    if (!h) return null;
    return toHospital(h);
}

export interface HospitalLocationFilter {
    division?: string;
    district?: string;
    thana?: string;
}

function localChamberWhere(f: HospitalLocationFilter) {
    return {
        ...(f.division ? { division: { contains: f.division, mode: "insensitive" as const } } : {}),
        ...(f.district ? { district: { contains: f.district, mode: "insensitive" as const } } : {}),
        ...(f.thana ? { thana: { contains: f.thana, mode: "insensitive" as const } } : {}),
    };
}

/**
 * Hospitals with at least one chamber in this thana (division -> district ->
 * thana). Chambers are pre-filtered to the thana, so `departments` only
 * lists categories actually available here — never another thana's.
 */
export async function findHospitalsByLocation(
    f: HospitalLocationFilter,
    limit = 50
): Promise<HospitalWithDoctors[]> {
    const local = localChamberWhere(f);
    const hospitals = await prisma.hospital.findMany({
        where: { status: "APPROVED", chambers: { some: local } },
        include: { chambers: { where: local, include: { doctor: true } } },
        orderBy: { name: "asc" },
        take: Math.min(Math.max(limit, 1), 50),
    });
    return hospitals.map(toHospital);
}

/** One hospital with chambers trimmed to this thana (local departments only). */
export async function getHospitalInLocation(
    hospitalId: string,
    f: HospitalLocationFilter
): Promise<HospitalWithDoctors | null> {
    const local = localChamberWhere(f);
    const h = await prisma.hospital.findUnique({
        where: { id: hospitalId },
        include: { chambers: { where: local, include: { doctor: true } } },
    });
    if (!h) return null;
    return toHospital(h);
}

/** Selectable hospital list (list rows carry hsel_<id>). */
export async function sendHospitalListPrompt(
    to: string,
    bodyText: string,
    hospitals: HospitalWithDoctors[]
): Promise<void> {
    const rows: ListRow[] = hospitals.map((h) => ({
        id: `hsel_${h.id}`,
        title: h.name,
        description: `${h.doctorCount} জন ডাক্তার`,
    }));
    await sendListChunked(to, bodyText, "📋 হসপিটাল দেখুন", rows, "হসপিটাল");
}

/** "See more" button for a hospital department's remaining doctors. */
export async function sendHospSeeMoreButton(to: string, remaining: number): Promise<void> {
    await sendInteractiveButtons(
        to,
        `➕ আরও ${remaining} জন ডাক্তার আছে — দেখতে নিচে চাপ দিন:`,
        [{ id: HOSP_MORE_DOCTORS_ID, title: "আরও দেখুন" }]
    );
}

export function doctorsToCards(doctors: DoctorWithChambers[]): string {
    return doctors
        .map(
            (d, i) =>
                `${i + 1}. 🩺 *${d.name}*\n   🎓 ${d.degree || "MBBS"}\n   ⭐ ${d.speciality || "জেনারেল"}\n   📞 ${d.phone || "নম্বর নেই"}`
        )
        .join("\n\n");
}

export function buildHospitalCard(index: number, h: HospitalWithDoctors): string {
    return [
        `*${index + 1}. 🏥 ${h.name}*`,
        `📍 ${h.address || "ঠিকানা নেই"}`,
        `📞 ${h.phone || "নম্বর নেই"}`,
        `👨‍⚕️ ডাক্তার: ${h.doctorCount} জন`,
        "",
        "নিচের Select বাটনে চাপ দিলে বিভাগ দেখতে পাবেন 👇",
    ].join("\n");
}
