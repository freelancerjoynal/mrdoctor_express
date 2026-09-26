import OpenAI from "openai";
import { env } from "../../config/env.js";

const openai = new OpenAI({
    apiKey: env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
});

export async function getOpenAIResponse(prompt: string): Promise<string> {
    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant. You must always reply in the Bengali language (বাংলায় উত্তর দিন).",
                },
                { role: "user", content: prompt },
            ],
        });

        return completion.choices[0]?.message?.content || "কোনো উত্তর পাওয়া যায়নি।";
    } catch (error) {
        console.error("AI Error:", error);
        return "দুঃখিত, এই মুহূর্তে এআই সার্ভিসের সাথে সংযোগ স্থাপন করতে সমস্যা হচ্ছে।";
    }
}

export interface DepartmentSuggestion {
    department: string;
    why: string;
}

export interface CategoryPick {
    bn: string;
    en: string;
}

/**
 * Accurate triage: pick ONE category from the FULL master speciality list
 * using DeepSeek, BEFORE any location filtering. The caller then fetches
 * the DB by (category + area). This fixes the old inaccurate behaviour
 * where the AI was forced to choose only from the tiny available list of
 * one thana (e.g. sneezing -> wrongly mapped to Physical Medicine).
 */
export async function suggestCategoryFromFullList(
    problem: string,
    masterList: { bn: string; en: string }[]
): Promise<CategoryPick | null> {
    const cleanList = [...new Map((masterList || []).map((s) => [s.bn, s])).values()].slice(0, 60);
    if (!cleanList.length) return null;
    const cleanProblem = (problem || "").trim().replace(/\s+/g, " ").slice(0, 300);
    if (cleanProblem.length < 3) return null;

    const prompt =
        `You are a Bangladesh medical symptom triage classifier.\n` +
        `Rules (follow strictly):\n` +
        `- Fever, cold, cough, sneezing, runny nose, headache, weakness, acidity, stomach pain, diarrhea, vomiting, flu -> the General Medicine entry (মেডিসিন বিশেষজ্ঞ).\n` +
        `- Pick a specialized entry ONLY when symptoms clearly match it: chest pain/pressure -> Cardiology, skin rash/itch/allergy -> Dermatology, pregnancy/menstrual/delivery -> Gynecology, child/baby patient -> Pediatrics, tooth pain -> Dentistry, eye problem -> Ophthalmology, ear/nose/throat pain -> ENT, bone/joint fracture -> Orthopedic, kidney/urine -> Nephrology/Urology, diabetes/thyroid -> Diabetes & Hormone, mental stress/sleep -> Psychiatry, breathing/asthma -> Pulmonology/Chest, back/body pain lasting weeks -> Physical Medicine.\n` +
        `- If unsure, pick the General Medicine entry.\n` +
        `- Never invent a name. Reply with ONE exact Bengali name from the allowed list.\n` +
        `Patient problem: ${cleanProblem}\n` +
        `Allowed specialities:\n${cleanList.map((s) => `- ${s.bn}`).join("\n")}\n` +
        `Reply with JSON ONLY, no other text: {"speciality":"<one exact name from the allowed list>"}`;

    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat",
            temperature: 0,
            max_tokens: 150,
            messages: [
                { role: "system", content: "You are a medical triage classifier. Reply with JSON only." },
                { role: "user", content: prompt },
            ],
        });
        const reply = completion.choices[0]?.message?.content || "";
        const start = reply.indexOf("{");
        const end = reply.lastIndexOf("}");
        if (start !== -1 && end !== -1 && end > start) {
            const obj = JSON.parse(reply.slice(start, end + 1)) as { speciality?: unknown };
            const pick = typeof obj.speciality === "string" ? obj.speciality.trim() : "";
            if (!pick) return null;
            const exact = cleanList.find((s) => s.bn === pick);
            if (exact) return { bn: exact.bn, en: exact.en };
            const fuzzy = cleanList.find((s) => pick.includes(s.bn) || s.bn.includes(pick));
            if (fuzzy) return { bn: fuzzy.bn, en: fuzzy.en };
        }
    } catch (e) {
        console.error("❌ suggestCategoryFromFullList error:", e);
    }
    return null;
}

/**
 * Token-lean triage: pick ONE speciality from the already-filtered
 * available list (chambers in this thana) for the patient's problem.
 * Only the bare minimum goes to the API — problem capped at 300 chars,
 * location label, and the short allowed-name list. No schedules, chambers,
 * history, or full 50-item master list. Returns the exact allowed Bengali
 * name, or null when the reply is unusable.
 */
export async function suggestAvailableSpeciality(
    problem: string,
    locationLabel: string,
    allowed: string[]
): Promise<string | null> {
    const cleanList = [...new Set((allowed || []).map((s) => (s || "").trim()).filter(Boolean))].slice(0, 50);
    if (!cleanList.length) return null;
    const cleanProblem = (problem || "").trim().replace(/\s+/g, " ").slice(0, 300);
    if (cleanProblem.length < 3) return null;

    const prompt =
        `Rules:\n` +
        `- Common problems (fever, cold, cough, sneezing, headache, weakness, stomach pain, diarrhea) go to the general-medicine entry in the allowed list.\n` +
        `- Pick a specialized entry only when symptoms clearly match it (chest pain -> cardiology entry, skin rash -> dermatology entry, pregnancy -> gynecology entry, child patient -> pediatrics entry).\n` +
        `- If unsure, pick the general-medicine entry.\n` +
        `Location: ${locationLabel}\n` +
        `Patient problem: ${cleanProblem}\n` +
        `Allowed specialities:\n${cleanList.map((s) => `- ${s}`).join("\n")}\n` +
        `Reply with JSON ONLY, no other text: {"speciality":"<one exact name from the allowed list>"}`;

    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat",
            temperature: 0,
            max_tokens: 150,
            messages: [
                { role: "system", content: "You are a medical triage classifier. Reply with JSON only." },
                { role: "user", content: prompt },
            ],
        });
        const reply = completion.choices[0]?.message?.content || "";
        const start = reply.indexOf("{");
        const end = reply.lastIndexOf("}");
        if (start !== -1 && end !== -1 && end > start) {
            const obj = JSON.parse(reply.slice(start, end + 1)) as { speciality?: unknown };
            const pick = typeof obj.speciality === "string" ? obj.speciality.trim() : "";
            if (pick && cleanList.includes(pick)) return pick;
            // Tolerate close variants (extra spaces / suffixes).
            const hit = cleanList.find((s) => pick.includes(s) || s.includes(pick));
            if (pick && hit) return hit;
        }
    } catch (e) {
        console.error("❌ suggestAvailableSpeciality error:", e);
    }
    return null;
}

/**
 * Step 1 of doctor search: given the patient's problem (Bengali/English),
 * suggest which department/speciality of doctor they need + 1-2 line reason.
 * Returns JSON-parsed result with safe fallback.
 */
export async function suggestDepartment(problem: string): Promise<DepartmentSuggestion> {
    const prompt = `
Context: Bangladesh medical symptom triage. A patient describes their problem in Bengali/English.

Patient problem:
${problem}

Task:
1. Decide which doctor department / speciality the patient should see (e.g. মেডিসিন, হৃদরোগ, চর্ম, শিশু, স্ত্রীরোগ, অর্থোপেডিক, নাক-কান-গলা, চক্ষু, ডায়াবেটিস, মানসিক, দন্ত, সার্জারি — use the closest Bengali department name).
2. Write 1-2 short lines in Bengali explaining briefly WHY this department fits.
3. Reply with JSON ONLY, no markdown, no extra text. Exact shape:
{"department":"<bengali department name>","why":"<1-2 line bengali reason>"}
    `.trim();

    try {
        const reply = await getOpenAIResponse(prompt);
        const start = reply.indexOf("{");
        const end = reply.lastIndexOf("}");
        if (start !== -1 && end !== -1 && end > start) {
            const obj = JSON.parse(reply.slice(start, end + 1));
            const department = typeof obj.department === "string" && obj.department.trim()
                ? obj.department.trim()
                : "মেডিসিন";
            const why = typeof obj.why === "string" && obj.why.trim()
                ? obj.why.trim()
                : "আপনার লক্ষণগুলো সাধারণ মেডিসিন বিভাগের আওতায় পড়ে।";
            return { department, why };
        }
    } catch (e) {
        console.error("❌ suggestDepartment parse error:", e);
    }
    return { department: "মেডিসিন", why: "আপনার লক্ষণ অনুযায়ী প্রথমে মেডিসিন বিভাগের ডাক্তার দেখানো ভালো।" };
}
