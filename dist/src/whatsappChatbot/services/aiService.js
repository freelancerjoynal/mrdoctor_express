import OpenAI from "openai";
import { env } from "../../config/env.js";
const openai = new OpenAI({
    apiKey: env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
});
export async function getOpenAIResponse(prompt) {
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
    }
    catch (error) {
        console.error("AI Error:", error);
        return "দুঃখিত, এই মুহূর্তে এআই সার্ভিসের সাথে সংযোগ স্থাপন করতে সমস্যা হচ্ছে।";
    }
}
/**
 * Step 1 of doctor search: given the patient's problem (Bengali/English),
 * suggest which department/speciality of doctor they need + 1-2 line reason.
 * Returns JSON-parsed result with safe fallback.
 */
export async function suggestDepartment(problem) {
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
    }
    catch (e) {
        console.error("❌ suggestDepartment parse error:", e);
    }
    return { department: "মেডিসিন", why: "আপনার লক্ষণ অনুযায়ী প্রথমে মেডিসিন বিভাগের ডাক্তার দেখানো ভালো।" };
}
//# sourceMappingURL=aiService.js.map