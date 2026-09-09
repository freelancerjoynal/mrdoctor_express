import { sendWhatsAppMessage, sendTypingIndicator } from "../../../../lib/sendWhatsAppMessage.js";
import { getLocationTemplate } from "../../../../lib/locationTemplate.js";
import { getOpenAIResponse } from "../../../AiService/deepseek.js";
import { prisma } from "../../../../lib/prisma.js";
import { buildDynamicPrompt } from "../../builders/promptBuilder.js";

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
                `${template.locationText}\n\n👉 এআই দিয়ে ডাক্তার খুঁজতে ঠিক থাকলে "yes" লিখুন।`
            );
        } else {
            data.location = text;
            session.step = "CONFIRM_AI_SEARCH";
            await sendWhatsAppMessage(phoneNumber, `লোকেশন: ${text}\n\n👉 এআই দিয়ে ডাক্তার খুঁজতে ঠিক থাকলে "yes" লিখুন।`);
        }
        return;
    }

    if (session.step === "CONFIRM_AI_SEARCH" && ["yes", "ok", "ঠিক"].includes(text)) {
        await sendTypingIndicator(phoneNumber);

        // অপ্টিমাইজেশন: ডাটাবেজ থেকে লক্ষাধিক না এনে শুধু শীর্ষ ১৫ জন টপ রেটেড ডাক্তার লোকালি কুয়েরি করা হলো
        const doctors = await prisma.doctor.findMany({
            orderBy: { rating: "desc" },
            take: 15,
        });

        if (!doctors.length) {
            await sendWhatsAppMessage(phoneNumber, "❌ কোনো ডাক্তার পাওয়া যায়নি।");
            resetSession();
            return;
        }

        const customTasks = [
            `Analyze the patient's problem: "${data.problem}"`,
            "Tell the user what kind of medical specialty is needed and why.",
            "Select top 3 doctors from the list matching the specialty.",
            "Give a 1-line reason in Bengali for each choice."
        ];

        const prompt = buildDynamicPrompt({
            title: "AI Symptom Checker & Doctor Recommendation",
            problem: data.problem,
            location: data.location,
            doctors: doctors,
            tasks: customTasks
        });

        const aiReply = await getOpenAIResponse(prompt);

        await sendWhatsAppMessage(phoneNumber, `🩺 আপনার সমস্যার জন্য সেরা ডাক্তার:\n\n${aiReply}`);
        resetSession();
    } else if (session.step === "CONFIRM_AI_SEARCH") {
        session.step = "ASK_LOCATION";
        await sendWhatsAppMessage(phoneNumber, "❌ আবার লোকেশন পাঠান বা এলাকার নাম লিখুন:");
    }
}