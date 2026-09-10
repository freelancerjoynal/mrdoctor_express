import { getOpenAIResponse } from "../../../AiService/deepseek.js";
import { prisma } from "../../../../lib/prisma.js";

export interface RecommendedDoctor {
    id: string;
    name: string;
    username: string;
    degree: string | null;
    speciality: string | null;
    workingPlace: string | null;
    phone: string | null;
    rating: number;
    reason: string;
}

export interface AreaRecommendation {
    analysis: string;
    specialty: string;
    doctors: RecommendedDoctor[];
    areaMatched: boolean;
}

function isGpsLocation(location: string): boolean {
    return /lat\s*:/i.test(location || "");
}

function cleanLocation(location: string): string {
    return (location || "").trim();
}

/**
 * Local-first recommendation:
 * 1. Query DB locally for doctors in the user's area (workingPlace contains location).
 * 2. Top-up with highest-rated doctors so AI always has a pool to choose from.
 * 3. Send that pool + the patient's problem to the AI.
 * 4. AI returns top 5 as JSON -> mapped back to real DB rows (with username for Connect).
 */
export async function recommendAreaDoctors(problem: string, location: string): Promise<AreaRecommendation> {
    const loc = cleanLocation(location);

    // ১. Local area query first.
    let areaDoctors: any[] = [];
    if (loc && !isGpsLocation(loc)) {
        try {
            areaDoctors = await prisma.doctor.findMany({
                where: { workingPlace: { contains: loc, mode: "insensitive" } },
                orderBy: { rating: "desc" },
                take: 20,
            });
        } catch (e) {
            console.error("❌ Local area doctor query error:", e);
        }
    }

    // ২. Top-up pool so AI has enough candidates (exclude already-picked ids).
    let pool: any[] = [...areaDoctors];
    try {
        if (pool.length < 15) {
            const extra = await prisma.doctor.findMany({
                where: pool.length ? { id: { notIn: pool.map((d) => d.id) } } : undefined,
                orderBy: { rating: "desc" },
                take: 15 - pool.length,
            });
            pool = [...pool, ...extra];
        }
    } catch (e) {
        console.error("❌ Doctor pool top-up error:", e);
    }

    if (!pool.length) {
        return { analysis: "", specialty: "", doctors: [], areaMatched: false };
    }

    const areaMatched = areaDoctors.length > 0;

    // ৩. Doctor list for AI (username included so we can map picks back to DB rows).
    const doctorList = pool
        .map(
            (d: any) =>
                `Username:${d.username} | Name:${d.name} | Degree:${d.degree || "N/A"} | Speciality:${d.speciality || "N/A"} | Place:${d.workingPlace || "N/A"} | Rating:${d.rating ?? "N/A"}`
        )
        .join("\n");

    const prompt = `
Context: AI Symptom Checker & Local Doctor Recommendation (Bangladesh)
Patient's Problem / Symptoms:
${problem}

User Location / Area:
${loc}${areaMatched ? "" : " (no exact local match found, pool includes nearby/top-rated doctors)"}

Available Doctors (local-first pool):
${doctorList}

Task / Instructions:
1. Analyze the patient's problem and tell which medical specialty is needed and why (in Bengali, 2-3 lines).
2. Select the TOP 5 doctors from ONLY the list above that best match the specialty. Prefer doctors whose Place matches the user area.
3. Reply with JSON ONLY, no markdown, no extra text. Exact shape:
{"analysis":"<bengali analysis 2-3 lines>","specialty":"<specialty name>","picks":[{"username":"<exact Username from list>","reason":"<1-line bengali reason with chamber address>"}]}
    `.trim();

    try {
        const aiReply = await getOpenAIResponse(prompt);
        const parsed = parseAiPicks(aiReply);
        if (parsed) {
            const byUsername = new Map(pool.map((d: any) => [String(d.username).toLowerCase(), d]));
            const doctors: RecommendedDoctor[] = [];
            for (const pick of parsed.picks.slice(0, 5)) {
                const db = byUsername.get(String(pick.username || "").toLowerCase());
                if (db) {
                    doctors.push({
                        id: db.id,
                        name: db.name,
                        username: db.username,
                        degree: db.degree ?? null,
                        speciality: db.speciality ?? null,
                        workingPlace: db.workingPlace ?? null,
                        phone: db.phone ?? null,
                        rating: db.rating ?? 0,
                        reason: pick.reason || "",
                    });
                }
            }
            // Fill up to 5 with top-rated pool doctors if AI returned fewer valid picks.
            if (doctors.length < 5) {
                const used = new Set(doctors.map((d) => d.id));
                for (const d of pool) {
                    if (doctors.length >= 5) break;
                    if (used.has(d.id)) continue;
                    doctors.push({
                        id: d.id,
                        name: d.name,
                        username: d.username,
                        degree: d.degree ?? null,
                        speciality: d.speciality ?? null,
                        workingPlace: d.workingPlace ?? null,
                        phone: d.phone ?? null,
                        rating: d.rating ?? 0,
                        reason: "",
                    });
                }
            }
            return { analysis: parsed.analysis || "", specialty: parsed.specialty || "", doctors: doctors.slice(0, 5), areaMatched };
        }
    } catch (error) {
        console.error("❌ AI Doctor Step Error:", error);
    }

    // ৪. Fallback: top 5 by rating (area doctors first since pool is ordered that way).
    return {
        analysis: "",
        specialty: "",
        doctors: pool.slice(0, 5).map((d: any) => ({
            id: d.id,
            name: d.name,
            username: d.username,
            degree: d.degree ?? null,
            speciality: d.speciality ?? null,
            workingPlace: d.workingPlace ?? null,
            phone: d.phone ?? null,
            rating: d.rating ?? 0,
            reason: "",
        })),
        areaMatched,
    };
}

function parseAiPicks(aiReply: string): { analysis: string; specialty: string; picks: { username: string; reason: string }[] } | null {
    try {
        const start = aiReply.indexOf("{");
        const end = aiReply.lastIndexOf("}");
        if (start === -1 || end === -1 || end <= start) return null;
        const obj = JSON.parse(aiReply.slice(start, end + 1));
        if (!obj || !Array.isArray(obj.picks)) return null;
        return {
            analysis: typeof obj.analysis === "string" ? obj.analysis : "",
            specialty: typeof obj.specialty === "string" ? obj.specialty : "",
            picks: obj.picks
                .filter((p: any) => p && typeof p.username === "string")
                .map((p: any) => ({ username: p.username, reason: typeof p.reason === "string" ? p.reason : "" })),
        };
    } catch {
        return null;
    }
}

// Legacy entry kept for backward compatibility (now routes through the local-first recommender).
export async function processAiDoctorRecommendation(problem: string, location: string) {
    const rec = await recommendAreaDoctors(problem, location);
    if (!rec.doctors.length) {
        return "❌ দুঃখিত, বর্তমানে সিস্টেমে কোনো ডাক্তার পাওয়া যায়নি।";
    }
    const header = rec.analysis ? `${rec.analysis}\n\n` : "";
    const list = rec.doctors
        .map((d, i) => `${i + 1}. 🩺 *${d.name}*\n   ⭐ ${d.speciality || "জেনারেল"}\n   🏥 ${d.workingPlace || "ঠিকানা নেই"}${d.reason ? `\n   ✅ ${d.reason}` : ""}`)
        .join("\n\n");
    return `${header}${list}`;
}
