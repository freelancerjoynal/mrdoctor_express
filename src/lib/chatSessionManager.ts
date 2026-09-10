import { prisma } from "./prisma.js";

export async function saveUserChatSession(
    phoneNumber: string, 
    targetType: "DOCTOR" | "HOSPITAL", 
    targetId: string, 
    targetName: string, 
    lastFlow: string, 
    lastStep: string
) {
    try {
        await prisma.chatSession.upsert({
            where: { phoneNumber },
            update: {
                targetType,
                targetId,
                targetName,
                lastFlow,
                lastStep,
            },
            create: {
                phoneNumber,
                targetType,
                targetId,
                targetName,
                lastFlow,
                lastStep,
            },
        });
        console.log(`✅ Chat session saved for ${phoneNumber} -> ${targetName}`);
    } catch (error) {
        console.error("❌ Failed to save chat session:", error);
    }
}