import { sendWhatsAppMessage, sendInteractiveButtons } from "../../lib/sendWhatsAppMessage.js";
import { findDoctFlow } from "./flows/findDoctor/findDoctFlow.js";
import { handleGetDoctorFlow } from "./flows/getDoctor/getDoctorFlow.js";
import { handleGetHospitalFlow } from "./flows/getHospital/getHospitalFlow.js";

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

        // 🚀 ফোর্সেড ডিপ লিঙ্কিং হ্যান্ডলার (Forceful Deep Link Handler)
        // ইউজার আগে যে স্টেপেই থাকুক না কেন, টেক্সটে hospital_ বা doctor_ থাকলেই সেশন জোরপূর্বক ওভাররাইট হয়ে যাবে
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

        if (text.startsWith("doctor_")) {
            const doctorParam = text.replace("doctor_", "").trim();
            const newSession: SessionData = { 
                flow: "GET_DOCTOR_FLOW", 
                step: "DIRECT_SEARCH", 
                data: { doctorId: doctorParam } 
            };
            userSessions.set(phoneNumber, newSession);
            
            await handleGetDoctorFlow(phoneNumber, rawText, msg, newSession);
            return;
        }

        // গ্লোবাল হোম বা মূল মেনুতে ফিরে যাওয়ার চেক
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

        // ১. মেইন মেনু হ্যান্ডেলিং
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

        // ২. ফাইন্ড ডক্টর ফ্লো (ডাক্তার খোঁজার ক্যাটাগরি ও এআই সার্চ)
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

        // ৩. গেট ডক্টর ফ্লো (ডিপ লিংক বা স্পেসিফিক ডাক্তার ডিটেইলস)
        if (session.flow === "GET_DOCTOR_FLOW") {
            await handleGetDoctorFlow(phoneNumber, rawText, msg, session);
            return;
        }

        // ৪. গেট হসপিটাল ফ্লো (হসপিটাল সম্পর্কিত তথ্য ও নোটিশ)
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

        // ডিফল্ট ফলব্যাক
        userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
        await sendWhatsAppMessage(phoneNumber, "বট রিসেট করা হয়েছে। শুরু করতে 'Hi' বা 'Hello' লিখুন።");

    } catch (error: any) {
        console.error("❌ WhatsApp Service Error:", error);
        await sendWhatsAppMessage(phoneNumber, "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
}