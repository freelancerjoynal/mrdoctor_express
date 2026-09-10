import { sendWhatsAppMessage, sendInteractiveButtons } from "../../lib/sendWhatsAppMessage.js";
import { findDoctFlow } from "./flows/findDoctor/findDoctFlow.js";
import { handleGetDoctorFlow } from "./flows/getDoctor/getDoctorFlow.js";
import { handleGetHospitalFlow } from "./flows/getHospital/getHospitalFlow.js";
import { userPendingDoctorMap } from "../../lib/doctorRedirectManager.js";
import { prisma } from "../../lib/prisma.js";

interface SessionData {
    flow: string;
    step: string;
    data: {
        problem?: string;
        location?: string;
        category?: string;
        doctorId?: string;
    };
}

const userSessions = new Map<string, SessionData>();

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

        // 🚀 ১. টেক্সটে যদি 'dr-' থাকে তবে সরাসরি ইউজারনেম ধরে ডাটাবেজে খোঁজা হবে
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
                        step: "DIRECT_SEARCH", 
                        data: { doctorId: doctor.id } 
                    };
                    userSessions.set(phoneNumber, newSession);
                    
                    await handleGetDoctorFlow(phoneNumber, usernameParam, msg, newSession);
                    return;
                }
            }
        }

        // 🚀 ২. ক্লিন শর্ট লিংক থেকে আসা পেন্ডিং 'Hi' বা ওয়েলকাম মেসেজ হ্যান্ডলার
        if (text.includes("hi") || text.includes("hello") || text.includes("start")) {
            const pendingDoctorId = userPendingDoctorMap.get(phoneNumber);

            if (pendingDoctorId) {
                const doctor = await prisma.doctor.findUnique({
                    where: { id: pendingDoctorId }
                });

                if (doctor) {
                    const newSession: SessionData = { 
                        flow: "GET_DOCTOR_FLOW", 
                        step: "DIRECT_SEARCH", 
                        data: { doctorId: doctor.id } 
                    };
                    userSessions.set(phoneNumber, newSession);
                    userPendingDoctorMap.delete(phoneNumber);

                    await handleGetDoctorFlow(phoneNumber, doctor.username, msg, newSession);
                    return;
                }
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
                },
                () => {
                    userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                }
            );
            return;
        }

        if (text.includes("home") || text.includes("মূল মেনু") || text.includes("মেনু") || text.includes("menu")) {
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
                },
                () => {
                    userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                }
            );
            return;
        }

        if (session.flow === "GET_DOCTOR_FLOW") {
            await handleGetDoctorFlow(phoneNumber, rawText, msg, session);
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