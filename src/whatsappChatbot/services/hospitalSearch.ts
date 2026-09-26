import { prisma } from "../../lib/prisma.js";
import { shuffle } from "../lib/session.js";
import type { DoctorWithChambers } from "./doctorSearch.js";

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
        newPatientFee: number | null;
        oldPatientFee: number | null;
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
            newPatientFee: c.newPatientFee ?? null,
            oldPatientFee: c.oldPatientFee ?? null,
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
