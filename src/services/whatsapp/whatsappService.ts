import { sendWhatsAppMessage, sendInteractiveButtons } from "../../lib/sendWhatsAppMessage.js";
import { findDoctFlow } from "./flows/findDoctor/findDoctFlow.js";
import { handleGetDoctorFlow } from "./flows/getDoctor/getDoctorFlow.js";
import { handleGetHospitalFlow } from "./flows/getHospital/getHospitalFlow.js";
import { userPendingDoctorMap } from "../../lib/doctorRedirectManager.js";
import { prisma } from "../../lib/prisma.js";

export const pendingRecoveryMap = new Map<string, any>();

interface SessionData {
    flow: string;
    step: string;
    data: {
        problem?: string;
        location?: string;
        category?: string;
        doctorId?: string;
        hospitalId?: string;
        name?: string;
        username?: string;
        workingPlace?: string;
        phone?: string;
    };
}

const userSessions = new Map<string, SessionData>();

// গ্লোবাল ফাংশন: চ্যাট সেশন ডাটাবেজে সেভ বা আপডেট করার জন্য
async function saveGlobalChatSession(
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
        console.log(`✅ Global chat session saved for ${phoneNumber} -> ${targetName}`);
    } catch (error) {
        console.error("❌ Failed to save global chat session:", error);
    }
}

export async function handleIncomingMessage(msg: any) {
    console.log("📥 Incoming Message:", JSON.stringify(msg, null, 2));

    const rawText =
        msg.text ||
        msg.buttonReply?.title ||
        msg.interactive?.button_reply?.title ||
        "";

    const text = rawText.toLowerCase().trim();
    const phoneNumber = msg.number;

    if (!text && !msg.location) return;

    try {
        let session: SessionData = userSessions.get(phoneNumber) || { 
            flow: "MAIN_MENU", 
            step: "WELCOME", 
            data: {} 
        };

        // ১. রিকভারি বাটনে ক্লিক করলে আগের সেশনে ফিরিয়ে নিয়ে যাওয়া
        if (
            text.includes("হ্যাঁ, যুক্ত হতে চাই") || 
            text.includes("yes_restore") || 
            text.includes("পুনরায় যুক্ত") || 
            text.includes("reconnect")
        ) {
            let savedSession = pendingRecoveryMap.get(phoneNumber);

            if (savedSession) {
                userSessions.set(phoneNumber, savedSession);
                pendingRecoveryMap.delete(phoneNumber);

                if (savedSession.flow === "GET_DOCTOR_FLOW" && savedSession.data.username) {
                    await handleGetDoctorFlow(
                        phoneNumber, 
                        `dr-${savedSession.data.username}`, 
                        msg, 
                        savedSession, 
                        (f, s, d) => {
                            userSessions.set(phoneNumber, { flow: f, step: s, data: d });
                        }
                    );
                    return;
                } else if (savedSession.flow === "GET_HOSPITAL_FLOW") {
                    await handleGetHospitalFlow(
                        phoneNumber, 
                        "hospital_reload", 
                        msg, 
                        savedSession, 
                        (f, s, d) => {
                            userSessions.set(phoneNumber, { flow: f, step: s, data: d });
                        }, 
                        () => {}
                    );
                    return;
                }
            }

            const dbSession = await prisma.chatSession.findUnique({
                where: { phoneNumber }
            });

            if (dbSession && dbSession.targetId) {
                if (dbSession.targetType === "DOCTOR") {
                    const doc = await prisma.doctor.findUnique({ where: { id: dbSession.targetId } });
                    if (doc) {
                        const restoredSession: SessionData = {
                            flow: "GET_DOCTOR_FLOW",
                            step: "ACTIVE_CHAT",
                            data: { doctorId: doc.id, username: doc.username, name: doc.name, workingPlace: doc.workingPlace, phone: doc.phone }
                        };
                        userSessions.set(phoneNumber, restoredSession);

                        await handleGetDoctorFlow(
                            phoneNumber, 
                            `dr-${doc.username}`, 
                            msg, 
                            restoredSession, 
                            (f, s, d) => {
                                userSessions.set(phoneNumber, { flow: f, step: s, data: d });
                            }
                        );
                        return;
                    }
                }
            }
        }

        // ২. টেক্সটে যদি 'dr-' থাকে (ডিরেক্ট লিংক)
        if (text.includes("dr-")) {
            const match = text.match(/(dr-[a-zA-Z0-9\-]+)/i);
            const usernameParam = match ? match[1].trim() : "";
            
            if (usernameParam) {
                const doctor = await prisma.doctor.findUnique({
                    where: { username: usernameParam }
                });

                if (doctor) {
                    const newSession: SessionData = { 
                        flow: "GET_DOCTOR_FLOW", 
                        step: "ACTIVE_CHAT", 
                        data: { doctorId: doctor.id, username: doctor.username, name: doctor.name, workingPlace: doctor.workingPlace, phone: doctor.phone } 
                    };
                    userSessions.set(phoneNumber, newSession);
                    
                    await saveGlobalChatSession(phoneNumber, "DOCTOR", doctor.id, doctor.name, "GET_DOCTOR_FLOW", "ACTIVE_CHAT");

                    await handleGetDoctorFlow(phoneNumber, usernameParam, msg, newSession, (f, s, d) => {
                        userSessions.set(phoneNumber, { flow: f, step: s, data: d });
                        if (d.doctorId && d.name) {
                            saveGlobalChatSession(phoneNumber, "DOCTOR", d.doctorId, d.name, f, s);
                        }
                    });
                    return;
                }
            }
        }

        // ৩. 'Hi' বা 'Hello' আসলে চেক করা
        if (text.includes("hi") || text.includes("hello") || text.includes("start")) {
            const pendingDoctorId = userPendingDoctorMap.get(phoneNumber);

            if (pendingDoctorId) {
                const doctor = await prisma.doctor.findUnique({
                    where: { id: pendingDoctorId }
                });

                if (doctor) {
                    const newSession: SessionData = { 
                        flow: "GET_DOCTOR_FLOW", 
                        step: "ACTIVE_CHAT", 
                        data: { doctorId: doctor.id, username: doctor.username, name: doctor.name, workingPlace: doctor.workingPlace, phone: doctor.phone } 
                    };
                    userSessions.set(phoneNumber, newSession);
                    userPendingDoctorMap.delete(phoneNumber);

                    await saveGlobalChatSession(phoneNumber, "DOCTOR", doctor.id, doctor.name, "GET_DOCTOR_FLOW", "ACTIVE_CHAT");

                    await handleGetDoctorFlow(phoneNumber, doctor.username, msg, newSession, (f, s, d) => {
                        userSessions.set(phoneNumber, { flow: f, step: s, data: d });
                        if (d.doctorId && d.name) {
                            saveGlobalChatSession(phoneNumber, "DOCTOR", d.doctorId, d.name, f, s);
                        }
                    });
                    return;
                }
            }

            const dbSession = await prisma.chatSession.findUnique({
                where: { phoneNumber }
            });

            if (dbSession && dbSession.targetName) {
                let extraData: any = {};
                if (dbSession.targetType === "DOCTOR") {
                    const doc = await prisma.doctor.findUnique({ where: { id: dbSession.targetId! } });
                    if (doc) {
                        extraData = { doctorId: doc.id, username: doc.username, name: doc.name, workingPlace: doc.workingPlace, phone: doc.phone };
                    }
                }

                const restoredSession: SessionData = {
                    flow: dbSession.lastFlow || "MAIN_MENU",
                    step: dbSession.lastStep || "WELCOME",
                    data: extraData
                };
                
                pendingRecoveryMap.set(phoneNumber, restoredSession);

                await sendInteractiveButtons(
                    phoneNumber,
                    `👋 হ্যালো! এর আগে আপনি ${dbSession.targetName}-এর সাথে কথা বলছিলেন। আপনি কি উনার সাথেই পুনরায় যুক্ত হতে চান?`,
                    [
                        { id: "yes_restore", title: "হ্যাঁ, যুক্ত হতে চাই" },
                        { id: "menu_btn", title: "না, মূল মেনুতে যাই" }
                    ]
                );
                return;
            }
        }

        if (text.startsWith("hospital_")) {
            const newSession: SessionData = { flow: "GET_HOSPITAL_FLOW", step: "WELCOME", data: {} };
            userSessions.set(phoneNumber, newSession);
            
            await handleGetHospitalFlow(
                phoneNumber, 
                text, 
                msg, 
                newSession, 
                (newFlow, newStep, updatedData) => {
                    userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                    if (updatedData.hospitalId && updatedData.name) {
                        saveGlobalChatSession(phoneNumber, "HOSPITAL", updatedData.hospitalId, updatedData.name, newFlow, newStep);
                    }
                },
                () => {
                    userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                }
            );
            return;
        }

        // যদি ইউজার মেনুতে ফিরে যেতে চায়
        if (text.includes("home") || text.includes("মূল মেনু") || text.includes("মেনু") || text.includes("menu") || text.includes("না, মূল মেনুতে যাই")) {
            // মেনুতে গেলে ডাটাবেজ থেকে সেশন ডিলিট করে দেওয়া ভালো যাতে পরবর্তীতে আর আগের ডাক্তারের প্রম্পট না আসে (অথবা রাখতে চাইলে রাখতে পারেন)
            await prisma.chatSession.delete({ where: { phoneNumber } }).catch(() => {});

            userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "ASK_CATEGORY", data: {} });
            
            await sendWhatsAppMessage(
                phoneNumber,
                "👋 আসসালামু আলাইকুম/নমস্কার!\n\nমিস্টার ডক্টর (Mr. Doctor)-এর পক্ষ থেকে আপনাকে স্বাগতম।"
            );

            await sendInteractiveButtons(
                phoneNumber,
                "নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন:",
                [
                    { id: "doc_btn", title: "ডাক্তার" },
                    { id: "hosp_btn", title: "হসপিটাল" }
                ]
            );
            return;
        }

        if (session.flow === "MAIN_MENU") {
            if (session.step === "WELCOME" || ["hi", "hello", "start", "reset"].includes(text)) {
                userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "ASK_CATEGORY", data: {} });
                
                await sendWhatsAppMessage(
                    phoneNumber,
                    "👋 আসসালামু আলাইকুম/নমস্কার!\n\nমিস্টার ডক্টর (Mr. Doctor)-এর পক্ষ থেকে আপনাকে জানাচ্ছি আন্তরিক শুভেচ্ছা ও স্বাগতম। 🩺✨"
                );

                await sendInteractiveButtons(
                    phoneNumber,
                    "নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন:",
                    [
                        { id: "doc_btn", title: "ডাক্তার" },
                        { id: "hosp_btn", title: "হসপিটাল" }
                    ]
                );
                return;
            }

            if (session.step === "ASK_CATEGORY") {
                if (text.includes("ডাক্তার") || text.includes("doc")) {
                    const newSessionData: SessionData = { flow: "FIND_DOCTOR_FLOW", step: "ASK_DOCTOR_TYPE", data: { category: "DOCTOR" } };
                    userSessions.set(phoneNumber, newSessionData);
                    
                    await findDoctFlow(
                        phoneNumber, 
                        rawText, 
                        msg, 
                        newSessionData,
                        (newFlow, newStep, updatedData) => {
                            userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                        },
                        () => {
                            userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                        }
                    );
                } else if (text.includes("হসপিটাল") || text.includes("hosp")) {
                    const newSessionData: SessionData = { flow: "GET_HOSPITAL_FLOW", step: "WELCOME", data: { category: "HOSPITAL" } };
                    userSessions.set(phoneNumber, newSessionData);
                    
                    await handleGetHospitalFlow(
                        phoneNumber, 
                        text, 
                        msg, 
                        newSessionData, 
                        (newFlow, newStep, updatedData) => {
                            userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                            if (updatedData.hospitalId && updatedData.name) {
                                saveGlobalChatSession(phoneNumber, "HOSPITAL", updatedData.hospitalId, updatedData.name, newFlow, newStep);
                            }
                        },
                        () => {
                            userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                        }
                    );
                } else {
                    await sendWhatsAppMessage(phoneNumber, "দয়া করে নিচের বাটন থেকে একটি অপশন সিলেক্ট করুন।");
                }
                return;
            }
        }

        if (session.flow === "FIND_DOCTOR_FLOW") {
            await findDoctFlow(
                phoneNumber, 
                rawText, 
                msg, 
                session,
                (newFlow, newStep, updatedData) => {
                    userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                    if (updatedData.doctorId && updatedData.name) {
                        saveGlobalChatSession(phoneNumber, "DOCTOR", updatedData.doctorId, updatedData.name, newFlow, newStep);
                    }
                },
                () => {
                    userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                }
            );
            return;
        }

        if (session.flow === "GET_DOCTOR_FLOW") {
            await handleGetDoctorFlow(phoneNumber, rawText, msg, session, (f, s, d) => {
                userSessions.set(phoneNumber, { flow: f, step: s, data: d });
                if (d.doctorId && d.name) {
                    saveGlobalChatSession(phoneNumber, "DOCTOR", d.doctorId, d.name, f, s);
                }
            });
            return;
        }

        if (session.flow === "GET_HOSPITAL_FLOW") {
            await handleGetHospitalFlow(
                phoneNumber, 
                text, 
                msg, 
                session, 
                (newFlow, newStep, updatedData) => {
                    userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                    if (updatedData.hospitalId && updatedData.name) {
                        saveGlobalChatSession(phoneNumber, "HOSPITAL", updatedData.hospitalId, updatedData.name, newFlow, newStep);
                    }
                },
                () => {
                    userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                }
            );
            return;
        }

        userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
        await sendWhatsAppMessage(phoneNumber, "বট রিসেট করা হয়েছে। শুরু করতে 'Hi' বা 'Hello' লিখুন।");

    } catch (error: any) {
        console.error("❌ WhatsApp Service Error:", error);
        await sendWhatsAppMessage(phoneNumber, "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
}