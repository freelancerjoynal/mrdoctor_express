import { sendWhatsAppMessage, sendTypingIndicator } from "../../../../lib/sendWhatsAppMessage.js";
import { getLocationTemplate } from "../../../../lib/locationTemplate.js";
import { getOpenAIResponse } from "../../../AiService/deepseek.js";
import { prisma } from "../../../../lib/prisma.js";

export async function handleAiDoctorFlow(
    phoneNumber: string, 
    text: string, 
    msg: any, 
    session: any, 
    resetSession: () => void
) {
    let data = session.data;

    if (session.step === "ASK_PROBLEM") {
        data.problem = text;
        session.step = "ASK_LOCATION";
        await sendWhatsAppMessage(phoneNumber, "📍 আপনার লোকেশন বা জিপিএস পিন পাঠান (অথবা এলাকার নাম লিখুন):");
        return;
    }

    if (session.step === "ASK_LOCATION") {
        if (msg.location) {
            const template = await getLocationTemplate(msg.location.latitude, msg.location.longitude);
            data.location = template.locationText;
            session.step = "CONFIRM_AI_SEARCH";

            await sendWhatsAppMessage(
                phoneNumber,
                `${template.locationText}\n\n👉 এআই দিয়ে ডাক্তার খুঁজতে ঠিক থাকলে "yes" লিখুন।`
            );
        } else {
            data.location = text;
            session.step = "CONFIRM_AI_SEARCH";
            await sendWhatsAppMessage(phoneNumber, `লোকেশন: ${text}\n\n👉 এআই দিয়ে ডাক্তার খুঁজতে ঠিক থাকলে "yes" লিখুন।`);
        }
        return;
    }

    if (session.step === "CONFIRM_AI_SEARCH" && ["yes", "ok", "ঠিক"].includes(text)) {
        await sendTypingIndicator(phoneNumber);

        // ১. এই ফ্লোর নিজস্ব ডাটাবেজ কুয়েরি (অপ্টিমাইজড লিমিট)
        const doctors = await prisma.doctor.findMany({
            orderBy: { rating: "desc" },
            take: 15,
        });

        if (!doctors.length) {
            await sendWhatsAppMessage(phoneNumber, "❌ কোনো ডাক্তার পাওয়া যায়নি।");
            resetSession();
            return;
        }

        // ২. ডাক্তার লিস্ট ফরম্যাট করা
        const doctorList = doctors
            .map(
                (d: any) =>
                    `ID:${d.id}, Name:${d.name}, Degree:${d.degree || "N/A"}, Speciality:${d.speciality}, Place:${d.workingPlace}, Rating:${d.rating}`
            )
            .join("\n");

        // ৩. এই ফ্লোর নিজস্ব সুনির্দিষ্ট টাস্ক ও প্রম্পট স্ট্রাকচার
        const prompt = `
Context: AI Symptom Checker & Doctor Recommendation
Patient's Problem / Symptoms:
${data.problem}

User Location / Area:
${data.location}

Available Doctors:
${doctorList}

Task / Instructions:
1. Analyze the patient's problem.
2. Tell the user what kind of medical specialty is needed and why in Bengali.
3. Select top 3 doctors from the list matching the specialty.
4. Give a 1-line reason in Bengali for each choice along with their chamber address.
        `.trim();

        // ৪. সরাসরি এআই সার্ভিস কল করা
        const aiReply = await getOpenAIResponse(prompt);

        await sendWhatsAppMessage(phoneNumber, `🩺 আপনার সমস্যার জন্য সেরা ডাক্তার:\n\n${aiReply}`);
        resetSession();
    } else if (session.step === "CONFIRM_AI_SEARCH") {
        session.step = "ASK_LOCATION";
        await sendWhatsAppMessage(phoneNumber, "❌ আবার লোকেশন পাঠান বা এলাকার নাম লিখুন:");
    }
}