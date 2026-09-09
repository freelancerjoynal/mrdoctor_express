import { getOpenAIResponse } from "../../../AiService/deepseek.js";
import { prisma } from "../../../../lib/prisma.js";
export async function processAiDoctorRecommendation(problem: string, location: string) {
    try {
        // ১. ডাটাবেজ থেকে ডাক্তার কুয়েরি করা
        const doctors = await prisma.doctor.findMany({
            orderBy: { rating: "desc" },
            take: 15,
        });

        if (!doctors.length) {
            return "❌ দুঃখিত, বর্তমানে সিস্টেমে কোনো ডাক্তার পাওয়া যায়নি।";
        }

        // ২. ডাক্তার লিস্ট ফরম্যাট করা
        const doctorList = doctors
            .map(
                (d: any) =>
                    `ID:${d.id}, Name:${d.name}, Degree:${d.degree || "N/A"}, Speciality:${d.speciality}, Place:${d.workingPlace}, Rating:${d.rating}`
            )
            .join("\n");

        // ৩. আপনার পছন্দমতো সুনির্দিষ্ট প্রম্পট ও টাস্ক স্ট্রাকচার
        const prompt = `
Context: AI Symptom Checker & Doctor Recommendation
Patient's Problem / Symptoms:
${problem}

User Location / Area:
${location}

Available Doctors:
${doctorList}

Task / Instructions:
1. Analyze the patient's problem.
2. Tell the user what kind of medical specialty is needed and why in Bengali.
3. Select top 3 doctors from the list matching the specialty.
4. Give a 1-line reason in Bengali for each choice along with their chamber address.
        `.trim();

        // ৪. এআই সার্ভিস কল করে রপ্লাই রিটার্ন করা
        const aiReply = await getOpenAIResponse(prompt);
        return aiReply;

    } catch (error) {
        console.error("❌ AI Doctor Step Error:", error);
        return "❌ এআই প্রসেসিংয়ে সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।";
    }
}