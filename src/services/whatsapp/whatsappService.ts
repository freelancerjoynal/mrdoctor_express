import { sendWhatsAppMessage } from "../../lib/sendWhatsAppMessage.js";
import { getOpenAIResponse } from "../AiService/deepseek.js"; 
import { prisma } from "../../lib/prisma.js";

export async function handleIncomingMessage(msg: any) {
    const text = msg.text?.toLowerCase()?.trim();
    const phoneNumber = msg.number;

    if (!text) return;

    try {
        if (text === "hi" || text === "hello" || text === "হাই" || text === "হ্যালো") {
            await sendWhatsAppMessage(
                phoneNumber,
                "রোগীর কী সমস্যা?"
            );
        } else {
            await sendWhatsAppMessage(
                phoneNumber,
                "আপনার সমস্যা নিয়ে আমরা গবেষণা করছি।"
            );

            const allDoctors = await prisma.doctor.findMany({
                orderBy: { rating: 'desc' }
            });

            if (!allDoctors || allDoctors.length === 0) {
                await sendWhatsAppMessage(
                    phoneNumber,
                    "এই মুহূর্তে ডাটাবেজে কোনো ডাক্তারের তথ্য পাওয়া যায়নি।"
                );
                return;
            }

            const doctorsListStr = allDoctors.map((doc: any) => 
                `ID: ${doc.id}, Name: ${doc.name}, Degree: ${doc.degree}, Speciality: ${doc.speciality}, Working Place: ${doc.workingPlace}, Phone: ${doc.phone || 'N/A'}, Rating: ${doc.rating}`
            ).join('\n');

            const prompt = `
            User's health problem/query: "${text}"

            Here is the list of available doctors in our database:
            ${doctorsListStr}

            Task:
            1. Analyze the user's problem and determine what medical speciality is needed.
            2. Select maximum 3 best matching doctors from the provided list based on their speciality and rating.
            3. For each selected doctor, provide a strict 1-line reason (in Bengali) explaining why this doctor is suitable for the user's specific problem.
            4. Format the output nicely in Bengali, showing Doctor Name, Degree, Speciality, Working Place, Phone, Rating, and the 1-line reason. Do not make up any doctor outside the list.
            `;

            const aiRecommendation = await getOpenAIResponse(prompt);

            await sendWhatsAppMessage(
                phoneNumber,
                `🩺 আপনার সমস্যার প্রেক্ষিতে সেরা চিকিৎসকদের পরামর্শ:\n\n${aiRecommendation}`
            );
        }
    } catch (error) {
        console.error("Error handling WhatsApp message:", error);
        await sendWhatsAppMessage(
            phoneNumber,
            "I'm sorry, something went wrong while processing your request."
        );
    }
}