import { prisma } from "../../lib/prisma.js";

/** Persist per-step tracking so a dropped session can resume later. */
export async function trackFlowStep(
    phoneNumber: string,
    targetType: string,
    flow: string,
    step: string,
    targetName: string,
    targetId?: string | null
) {
    try {
        await prisma.chatSession.upsert({
            where: { phoneNumber },
            update: {
                targetType,
                targetId: targetId || undefined,
                targetName: targetName.slice(0, 200),
                lastFlow: flow,
                lastStep: step,
            },
            create: {
                phoneNumber,
                targetType,
                targetId: targetId || null,
                targetName: targetName.slice(0, 200),
                lastFlow: flow,
                lastStep: step,
            },
        });
    } catch (e) {
        console.error("❌ Chat tracking error:", e);
    }
}

/** Direct doctor/hospital connect tracking (has a real target id). */
export async function saveConnectSession(
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
            update: { targetType, targetId, targetName, lastFlow, lastStep },
            create: { phoneNumber, targetType, targetId, targetName, lastFlow, lastStep },
        });
    } catch (e) {
        console.error("❌ Failed to save chat session:", e);
    }
}

export async function clearChatSession(phoneNumber: string) {
    await prisma.chatSession.delete({ where: { phoneNumber } }).catch(() => {});
}
