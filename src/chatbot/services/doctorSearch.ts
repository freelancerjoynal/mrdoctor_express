import { prisma } from "../../lib/prisma.js";
import { shuffle } from "../lib/session.js";

export interface DoctorWithChambers {
    id: string;
    name: string;
    username: string;
    degree: string | null;
    speciality: string | null;
    phone: string | null;
    chambers: {
        id: string;
        chamberName: string | null;
        addressLine: string;
        thana: string;
        district: string;
        division: string;
        newPatientFee: number | null;
        oldPatientFee: number | null;
        hospital: { id: string; name: string } | null;
    }[];
}

function areaWhere(area: string) {
    return {
        OR: [
            { thana: { contains: area, mode: "insensitive" as const } },
            { district: { contains: area, mode: "insensitive" as const } },
            { division: { contains: area, mode: "insensitive" as const } },
            { addressLine: { contains: area, mode: "insensitive" as const } },
            { chamberName: { contains: area, mode: "insensitive" as const } },
        ],
    };
}

function toDoctorWithChambers(d: any): DoctorWithChambers {
    return {
        id: d.id,
        name: d.name,
        username: d.username,
        degree: d.degree ?? null,
        speciality: d.speciality ?? null,
        phone: d.phone ?? null,
        chambers: (d.chambers || []).map((c: any) => ({
            id: c.id,
            chamberName: c.chamberName ?? null,
            addressLine: c.addressLine,
            thana: c.thana,
            district: c.district,
            division: c.division,
            newPatientFee: c.newPatientFee ?? null,
            oldPatientFee: c.oldPatientFee ?? null,
            hospital: c.hospital ? { id: c.hospital.id, name: c.hospital.name } : null,
        })),
    };
}

/**
 * New-schema area search: Chamber.thana / district / division / addressLine
 * matched against the user's area. Returns up to `limit` RANDOM doctors.
 * Doctors whose speciality matches the suggested department are preferred.
 */
export async function findDoctorsByArea(
    area: string,
    department?: string,
    limit = 5
): Promise<{ doctors: DoctorWithChambers[]; totalInArea: number }> {
    const q = (area || "").trim();
    if (!q) return { doctors: [], totalInArea: 0 };

    const chambers = await prisma.chamber.findMany({
        where: areaWhere(q),
        include: {
            hospital: { select: { id: true, name: true } },
            doctor: true,
        },
        take: 100,
    });

    // Distinct doctors (APPROVED first, then others)
    const byId = new Map<string, any>();
    for (const c of chambers) {
        const d: any = (c as any).doctor;
        if (!d) continue;
        if (!byId.has(d.id)) {
            byId.set(d.id, { ...d, chambers: [] });
        }
        byId.get(d.id).chambers.push(c);
    }

    let all = [...byId.values()];
    const approved = all.filter((d) => d.status === "APPROVED");
    if (approved.length) all = approved;
    const totalInArea = all.length;
    if (!all.length) return { doctors: [], totalInArea: 0 };

    // Prefer department match, then shuffle for randomness.
    const dept = (department || "").trim().toLowerCase();
    let matched: any[] = [];
    let rest: any[] = [];
    if (dept) {
        // Token-based loose match (works for Bengali + English specialities).
        const tokens = dept.split(/[\s,।/()\-]+/).filter((t) => t.length >= 2);
        const isMatch = (spec: string) => {
            const s = (spec || "").toLowerCase();
            if (!s) return false;
            if (s.includes(dept) || dept.includes(s)) return true;
            return tokens.some((t) => s.includes(t));
        };
        matched = all.filter((d) => isMatch(d.speciality || ""));
        rest = all.filter((d) => !isMatch(d.speciality || ""));
    } else {
        rest = all;
    }

    const ordered = [...shuffle(matched), ...shuffle(rest)].slice(0, limit);
    return { doctors: ordered.map(toDoctorWithChambers), totalInArea };
}

/** One-line chamber label for cards: "Hospital — thana, district" */
export function chamberLabel(c?: DoctorWithChambers["chambers"][number]): string {
    if (!c) return "ঠিকানা নেই";
    const hosp = c.hospital?.name || c.chamberName || "";
    const area = [c.thana, c.district].filter(Boolean).join(", ");
    return [hosp, area].filter(Boolean).join(" — ") || c.addressLine;
}

export function buildDoctorCard(
    index: number,
    d: DoctorWithChambers
): string {
    const c0 = d.chambers[0];
    const lines = [
        `*${index + 1}. 🩺 ${d.name}*`,
        `🎓 ${d.degree || "MBBS"}`,
        `⭐ ${d.speciality || "জেনারেল"}`,
        `🏥 ${chamberLabel(c0)}`,
        `📞 ${d.phone || "নম্বর নেই"}`,
    ];
    const fee = feeLine(c0?.newPatientFee, c0?.oldPatientFee);
    if (fee) lines.push(fee);
    lines.push("", "নিচের Connect বাটনে চাপ দিলে সরাসরি যুক্ত হয়ে যাবেন 👇");
    return lines.join("\n");
}

/** "💰 ফি — নতুন: ৭০০ টাকা | পুরনো: ৬০০ টাকা" (shown only when a fee exists). */
export function feeLine(newFee?: number | null, oldFee?: number | null): string {
    const parts: string[] = [];
    if (newFee != null && Number(newFee) > 0) parts.push(`নতুন: ${newFee} টাকা`);
    if (oldFee != null && Number(oldFee) > 0) parts.push(`পুরনো: ${oldFee} টাকা`);
    return parts.length ? `💰 ফি — ${parts.join(" | ")}` : "";
}
