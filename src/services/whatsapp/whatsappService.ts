import { sendWhatsAppMessage, sendInteractiveButtons } from "../../lib/sendWhatsAppMessage.js";
import { findDoctFlow } from "./flows/findDoctor/findDoctFlow.js";
import { handleGetDoctorFlow } from "./flows/getDoctor/getDoctorFlow.js";
import { handleGetHospitalFlow } from "./flows/getHospital/getHospitalFlow.js";
import { findHospitalFlow } from "./flows/findHospital/findHospitalFlow.js";
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
        searchType?: string;
        specialty?: string;
        candidates?: string[];
        confirmed?: boolean;
        confirmedChoice?: string;
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

// Per-step tracking for FIND flows: persists flow/step all the way to CONFIRMED,
// even when there is no doctorId/hospitalId yet (unlike direct GET flows).
async function saveFindTracking(phoneNumber: string, flow: string, step: string, data: any) {
    try {
        const label =
            flow === "FIND_HOSPITAL_FLOW"
                ? [data?.location, data?.hospType, data?.service].filter(Boolean).join(" | ").slice(0, 200) || "hospital search"
                : [data?.searchType, data?.problem, data?.location].filter(Boolean).join(" | ").slice(0, 200) || "doctor search";
        await prisma.chatSession.upsert({
            where: { phoneNumber },
            update: { targetType: flow === "FIND_HOSPITAL_FLOW" ? "FIND_HOSPITAL" : "FIND_DOCTOR", targetName: label, lastFlow: flow, lastStep: step },
            create: { phoneNumber, targetType: flow === "FIND_HOSPITAL_FLOW" ? "FIND_HOSPITAL" : "FIND_DOCTOR", targetName: label, lastFlow: flow, lastStep: step },
        });
    } catch (error) {
        console.error("❌ Failed to save find tracking:", error);
    }
}

export async function handleIncomingMessage(msg: any) {
    console.log("📥 Incoming Message:", JSON.stringify(msg, null, 2));

    const rawText =
        msg.text ||
        msg.buttonReply?.title ||
        msg.interactive?.button_reply?.title ||
        "";

    // Button ids are separate from titles (parser now forwards buttonId).
    const buttonId: string =
        msg.buttonId ||
        msg.buttonReply?.id ||
        msg.interactive?.button_reply?.id ||
        "";

    const text = rawText.toLowerCase().trim();
    const buttonIdNorm = buttonId.toLowerCase().trim();
    const phoneNumber = msg.number;

    if (!text && !buttonIdNorm && !msg.location) return;

    try {
        let session: SessionData = userSessions.get(phoneNumber) || {
            flow: "MAIN_MENU",
            step: "WELCOME",
            data: {}
        };

        // ১. রিকভারি বাটনে ক্লিক করলে আগের সেশনে ফিরিয়ে নিয়ে যাওয়া
        if (
            text.includes("হ্যাঁ, যুক্ত হতে চাই") ||
            text.includes("yes_restore") ||
            text.includes("পুনরায় যুক্ত") ||
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
                        () => { }
                    );
                    return;
                } else if (savedSession.flow === "FIND_DOCTOR_FLOW") {
                    await findDoctFlow(
                        phoneNumber,
                        rawText,
                        msg,
                        savedSession,
                        (newFlow, newStep, updatedData) => {
                            userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                            saveFindTracking(phoneNumber, newFlow, newStep, updatedData);
                        },
                        () => {
                            userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                        }
                    );
                    return;
                } else if (savedSession.flow === "FIND_HOSPITAL_FLOW") {
                    await findHospitalFlow(
                        phoneNumber,
                        rawText,
                        msg,
                        savedSession,
                        (newFlow, newStep, updatedData) => {
                            userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                            saveFindTracking(phoneNumber, newFlow, newStep, updatedData);
                        },
                        () => {
                            userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                        }
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

            // Restore in-progress FIND flows (tracked every step, may have no targetId yet).
            if (dbSession && (dbSession.lastFlow === "FIND_DOCTOR_FLOW" || dbSession.lastFlow === "FIND_HOSPITAL_FLOW")) {
                const restoredSession: SessionData = {
                    flow: dbSession.lastFlow,
                    step: dbSession.lastStep || (dbSession.lastFlow === "FIND_HOSPITAL_FLOW" ? "ASK_LOCATION" : "ASK_PROBLEM"),
                    data: {}
                };
                userSessions.set(phoneNumber, restoredSession);
                pendingRecoveryMap.delete(phoneNumber);

                if (restoredSession.flow === "FIND_DOCTOR_FLOW") {
                    await findDoctFlow(
                        phoneNumber, rawText, msg, restoredSession,
                        (newFlow, newStep, updatedData) => {
                            userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                            saveFindTracking(phoneNumber, newFlow, newStep, updatedData);
                        },
                        () => { userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} }); }
                    );
                } else {
                    await findHospitalFlow(
                        phoneNumber, rawText, msg, restoredSession,
                        (newFlow, newStep, updatedData) => {
                            userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                            saveFindTracking(phoneNumber, newFlow, newStep, updatedData);
                        },
                        () => { userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} }); }
                    );
                }
                return;
            }
        }

        // ২. Connect বাটনে ক্লিক করলে username চ্যাটে পাঠিয়ে সরাসরি ডাক্তারের সাথে যুক্ত করা
        // (5 doctor cards -> each Connect button id is `connect_<username>`)
        if (buttonIdNorm.startsWith("connect_") || text.startsWith("connect_")) {
            const rawId = buttonIdNorm.startsWith("connect_") ? buttonIdNorm : text;
            const usernameParam = rawId.slice("connect_".length).trim();

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

                    await handleGetDoctorFlow(phoneNumber, doctor.username, msg, newSession, (f, s, d) => {
                        userSessions.set(phoneNumber, { flow: f, step: s, data: d });
                        if (d.doctorId && d.name) {
                            saveGlobalChatSession(phoneNumber, "DOCTOR", d.doctorId, d.name, f, s);
                        }
                    });
                    return;
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
                    `👋 আসসালামু আলাইকুম / নমস্কার! \n\n🌟 *মিস্টার ডক্টর (Mr. Doctor)*-এর পক্ষ থেকে আপনাকে জানাচ্ছি আন্তরিক শুভেচ্ছা ও স্বাগতম। 🩺✨\n\n───────────────────\n💬 এর আগে আপনি *${dbSession.targetName}*-এর সাথে কথা বলছিলেন।\n\n❓ আপনি কি উনার সাথেই পুনরায় যুক্ত হতে চান?`,
                    [
                        { id: "yes_restore", title: "হ্যাঁ, যুক্ত হতে চাই" },
                        { id: "menu_btn", title: "না, মূল মেনুতে যাই" }
                    ]
                );
                return;
            }
        }

        if (text.startsWith("hospital_") || buttonIdNorm.startsWith("hospital_")) {
            const newSession: SessionData = { flow: "FIND_HOSPITAL_FLOW", step: "ASK_LOCATION", data: { category: "HOSPITAL" } };
            userSessions.set(phoneNumber, newSession);
            await saveFindTracking(phoneNumber, "FIND_HOSPITAL_FLOW", "ASK_LOCATION", newSession.data);

            await findHospitalFlow(
                phoneNumber,
                "hospital",
                msg,
                newSession,
                (newFlow, newStep, updatedData) => {
                    userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                    saveFindTracking(phoneNumber, newFlow, newStep, updatedData);
                },
                () => {
                    userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                }
            );
            return;
        }

        // যদি ইউজার মেনুতে ফিরে যেতে চায় (button id সহ)
        if (buttonIdNorm === "home_btn" || buttonIdNorm === "menu_btn" || text.includes("home") || text.includes("মূল মেনু") || text.includes("মেনু") || text.includes("menu") || text.includes("না, মূল মেনুতে যাই")) {
            await prisma.chatSession.delete({ where: { phoneNumber } }).catch(() => { });

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

        // ৪. রানিং সেশন হ্যান্ডলিং (Active Flows)
        if (session.flow === "MAIN_MENU") {
            if (session.step === "WELCOME") {
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
                if (text.includes("ডাক্তার") || text.includes("doc") || buttonIdNorm === "doc_btn") {
                    // Problem-first: click find-doctor -> ask problem -> ask location -> 5 cards.
                    const newSessionData: SessionData = { flow: "FIND_DOCTOR_FLOW", step: "ASK_PROBLEM", data: { category: "DOCTOR" } };
                    userSessions.set(phoneNumber, newSessionData);
                    await saveFindTracking(phoneNumber, "FIND_DOCTOR_FLOW", "ASK_PROBLEM", newSessionData.data);

                    await findDoctFlow(
                        phoneNumber,
                        rawText,
                        msg,
                        newSessionData,
                        (newFlow, newStep, updatedData) => {
                            userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                            saveFindTracking(phoneNumber, newFlow, newStep, updatedData);
                        },
                        () => {
                            userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                        }
                    );
                    return;
                } else if (text.includes("হসপিটাল") || text.includes("hosp") || buttonIdNorm === "hosp_btn") {
                    const newSessionData: SessionData = { flow: "FIND_HOSPITAL_FLOW", step: "ASK_LOCATION", data: { category: "HOSPITAL" } };
                    userSessions.set(phoneNumber, newSessionData);
                    await saveFindTracking(phoneNumber, "FIND_HOSPITAL_FLOW", "ASK_LOCATION", newSessionData.data);

                    await findHospitalFlow(
                        phoneNumber,
                        "hospital",
                        msg,
                        newSessionData,
                        (newFlow, newStep, updatedData) => {
                            userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                            saveFindTracking(phoneNumber, newFlow, newStep, updatedData);
                        },
                        () => {
                            userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                        }
                    );
                    return;
                } else {
                    await sendWhatsAppMessage(phoneNumber, "দয়া করে নিচের বাটন থেকে একটি অপশন সিলেক্ট করুন।");
                    return;
                }
            }
        }

        if (session.flow === "FIND_DOCTOR_FLOW" || session.flow === "AI_DOCTOR_FLOW") {
            await findDoctFlow(
                phoneNumber,
                rawText,
                msg,
                session,
                (newFlow, newStep, updatedData) => {
                    userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                    saveFindTracking(phoneNumber, newFlow, newStep, updatedData);
                },
                () => {
                    userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                }
            );
            return;
        }

        if (session.flow === "FIND_HOSPITAL_FLOW") {
            await findHospitalFlow(
                phoneNumber,
                rawText,
                msg,
                session,
                (newFlow, newStep, updatedData) => {
                    userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                    saveFindTracking(phoneNumber, newFlow, newStep, updatedData);
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

        // যদি কোনো ফ্লোর সাথে ম্যাচ না করে, তবে সরাসরি রিসেট না করে مین মেনুতে যাওয়ার জন্য বলুন
        await sendWhatsAppMessage(phoneNumber, "দুঃখিত, বিষয়টি বুঝতে পারিনি। মূল মেনুতে যেতে 'menu' লিখুন।");

    } catch (error: any) {
        console.error("❌ WhatsApp Service Error:", error);
        await sendWhatsAppMessage(phoneNumber, "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
}