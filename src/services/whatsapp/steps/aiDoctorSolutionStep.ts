import { sendWhatsAppMessage, sendTypingIndicator } from "../../../lib/sendWhatsAppMessage.js";
import { getOpenAIResponse } from "../../AiService/deepseek.js";
import { prisma } from "../../../lib/prisma.js";

export async function aiDoctorSolutionStep(
    phoneNumber: string, 
    text: string, 
    savedLocation: string, 
    userProblem: string, 
    resetSession: () => void, 
    setLocationState: () => void
) {
    if (["yes", "ok", "ঠিক"].includes(text)) {
        await sendTypingIndicator(phoneNumber);

        const doctors = await prisma.doctor.findMany({
            orderBy: { rating: "desc" },
        });

        if (!doctors.length) {
            await sendWhatsAppMessage(phoneNumber, "❌ কোনো ডাক্তার পাওয়া যায়নি");
            resetSession();
            return;
        }

        const doctorList = doctors
            .map(
                (doc: any) =>
                    `ID:${doc.id}, Name:${doc.name}, Degree:${doc.degree}, Speciality:${doc.speciality}, Place:${doc.workingPlace}, Phone:${doc.phone}, Rating:${doc.rating}`
            )
            .join("\n");

        const prompt = `
        Patient's Problem / Symptoms:
        ${userProblem || "Not specified"}

        User Location:
        ${savedLocation}

        Doctors:
        ${doctorList}

        Task:
        - Analyze the patient's problem (${userProblem})
        - Tell user what kind of doctor is needed and why based on the problem
        - Find doctors matching or closely related to this specialty in/near the user's location
        - Select top 3 doctors
        - Give 1 line reason in Bengali for each
        - Format nicely
        `;

        const aiReply = await getOpenAIResponse(prompt);

        await sendWhatsAppMessage(
            phoneNumber,
            `🩺 আপনার সমস্যার জন্য সেরা ডাক্তার:\n\n${aiReply}`
        );

        resetSession();
    } else {
        setLocationState();
        await sendWhatsAppMessage(phoneNumber, "❌ আবার লোকেশন পাঠান বা এলাকার নাম লিখুন");
    }
}