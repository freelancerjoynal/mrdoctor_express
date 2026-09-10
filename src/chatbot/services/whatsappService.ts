import {
    sendWhatsAppMessage,
    sendInteractiveButtons,
} from "../lib/sendWhatsAppMessage.js";
import { findDoctorFlow } from "../flows/findDoctor/findDoctorFlow.js";
import { handleGetDoctorFlow } from "../flows/getDoctor/getDoctorFlow.js";
import { handleGetHospitalFlow } from "../flows/getHospital/getHospitalFlow.js";
import { findHospitalFlow } from "../flows/findHospital/findHospitalFlow.js";
import { userPendingDoctorMap } from "../lib/doctorRedirectManager.js";
import { saveConnectSession, trackFlowStep, clearChatSession } from "../lib/chatSession.js";
import { prisma } from "../../lib/prisma.js";
import type { ChatbotSession } from "../lib/session.js";

export const pendingRecoveryMap = new Map<string, any>();

const userSessions = new Map<string, ChatbotSession>();

async function saveFindTracking(phoneNumber: string, flow: string, step: string, data: any) {
    const label =
        flow === "FIND_HOSPITAL_FLOW"
            ? [data?.location, data?.hospitalName, data?.department].filter(Boolean).join(" | ").slice(0, 200) || "hospital search"
            : [data?.problem, data?.department, data?.location].filter(Boolean).join(" | ").slice(0, 200) || "doctor search";
    await trackFlowStep(
        phoneNumber,
        flow === "FIND_HOSPITAL_FLOW" ? "FIND_HOSPITAL" : "FIND_DOCTOR",
        flow,
        step,
        label,
        data?.hospitalId || data?.doctorId || null
    );
}

function setSession(phoneNumber: string, flow: string, step: string, data: any) {
    userSessions.set(phoneNumber, { flow, step, data });
}

export async function handleIncomingMessage(msg: any) {
    console.log("📥 Incoming Message:", JSON.stringify(msg, null, 2));

    const rawText =
        msg.text ||
        msg.buttonReply?.title ||
        msg.interactive?.button_reply?.title ||
        "";

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
        let session: ChatbotSession = userSessions.get(phoneNumber) || {
            flow: "MAIN_MENU",
            step: "WELCOME",
            data: {},
        };

        // ---------- Recovery ----------
        if (
            text.includes("হ্যাঁ, যুক্ত হতে চাই") ||
            text.includes("yes_restore") ||
            text.includes("পুনরায় যুক্ত") ||
            text.includes("reconnect")
        ) {
            const savedSession = pendingRecoveryMap.get(phoneNumber);

            if (savedSession) {
                userSessions.set(phoneNumber, savedSession);
                pendingRecoveryMap.delete(phoneNumber);

                const cb = (f: string, s: string, d: any) => {
                    setSession(phoneNumber, f, s, d);
                    if (f === "FIND_DOCTOR_FLOW" || f === "FIND_HOSPITAL_FLOW") {
                        saveFindTracking(phoneNumber, f, s, d);
                    }
                };

                if (savedSession.flow === "GET_DOCTOR_FLOW" && savedSession.data.username) {
                    await handleGetDoctorFlow(phoneNumber, `dr-${savedSession.data.username}`, msg, savedSession, cb);
                    return;
                } else if (savedSession.flow === "GET_HOSPITAL_FLOW") {
                    await handleGetHospitalFlow(phoneNumber, "hospital_reload", msg, savedSession, cb, () => {});
                    return;
                } else if (savedSession.flow === "FIND_DOCTOR_FLOW") {
                    await findDoctorFlow(phoneNumber, rawText, msg, savedSession, cb, () => {
                        setSession(phoneNumber, "MAIN_MENU", "WELCOME", {});
                    });
                    return;
                } else if (savedSession.flow === "FIND_HOSPITAL_FLOW") {
                    await findHospitalFlow(phoneNumber, rawText, msg, savedSession, cb, () => {
                        setSession(phoneNumber, "MAIN_MENU", "WELCOME", {});
                    });
                    return;
                }
            }

            const dbSession = await prisma.chatSession.findUnique({ where: { phoneNumber } });

            if (dbSession?.targetId) {
                if (dbSession.targetType === "DOCTOR") {
                    const doc: any = await prisma.doctor.findUnique({ where: { id: dbSession.targetId } });
                    if (doc) {
                        const restored: ChatbotSession = {
                            flow: "GET_DOCTOR_FLOW",
                            step: "ACTIVE_CHAT",
                            data: { doctorId: doc.id, username: doc.username, name: doc.name, phone: doc.phone },
                        };
                        userSessions.set(phoneNumber, restored);
                        await handleGetDoctorFlow(phoneNumber, `dr-${doc.username}`, msg, restored, (f, s, d) => {
                            setSession(phoneNumber, f, s, d);
                        });
                        return;
                    }
                }
            }

            if (dbSession && (dbSession.lastFlow === "FIND_DOCTOR_FLOW" || dbSession.lastFlow === "FIND_HOSPITAL_FLOW")) {
                const restored: ChatbotSession = {
                    flow: dbSession.lastFlow,
                    step: dbSession.lastStep || (dbSession.lastFlow === "FIND_HOSPITAL_FLOW" ? "ASK_AREA" : "ASK_PROBLEM"),
                    data: {},
                };
                userSessions.set(phoneNumber, restored);
                pendingRecoveryMap.delete(phoneNumber);

                const cb = (f: string, s: string, d: any) => {
                    setSession(phoneNumber, f, s, d);
                    saveFindTracking(phoneNumber, f, s, d);
                };
                if (restored.flow === "FIND_DOCTOR_FLOW") {
                    await findDoctorFlow(phoneNumber, rawText, msg, restored, cb, () => {
                        setSession(phoneNumber, "MAIN_MENU", "WELCOME", {});
                    });
                } else {
                    await findHospitalFlow(phoneNumber, rawText, msg, restored, cb, () => {
                        setSession(phoneNumber, "MAIN_MENU", "WELCOME", {});
                    });
                }
                return;
            }
        }

        // ---------- Global Connect buttons (doctor cards from either flow) ----------
        // id: connect_<username> — works from any step.
        if (buttonIdNorm.startsWith("connect_") || text.startsWith("connect_")) {
            const rawId = buttonIdNorm.startsWith("connect_") ? buttonId : text;
            const m = rawId.match(/connect_(.+)/i);
            const usernameParam = m?.[1]?.trim() || "";

            if (usernameParam) {
                const doctor: any = await prisma.doctor.findUnique({ where: { username: usernameParam } });
                if (doctor) {
                    const newSession: ChatbotSession = {
                        flow: "GET_DOCTOR_FLOW",
                        step: "ACTIVE_CHAT",
                        data: { doctorId: doctor.id, username: doctor.username, name: doctor.name, phone: doctor.phone },
                    };
                    userSessions.set(phoneNumber, newSession);
                    await saveConnectSession(phoneNumber, "DOCTOR", doctor.id, doctor.name, "GET_DOCTOR_FLOW", "ACTIVE_CHAT");
                    await handleGetDoctorFlow(phoneNumber, doctor.username, msg, newSession, (f, s, d) => {
                        setSession(phoneNumber, f, s, d);
                        if (d.doctorId && d.name) {
                            saveConnectSession(phoneNumber, "DOCTOR", d.doctorId, d.name, f, s);
                        }
                    });
                    return;
                }
            }
        }

        // ---------- Global hospital buttons (hospital cards) ----------
        // id: hsel_<hospitalId> — route into the active FIND_HOSPITAL session's SELECT_HOSPITAL step.
        // (Prefix is `hsel_`, NOT `hosp_`, so the main-menu `hosp_btn` button never matches here.)
        if (
            (buttonIdNorm.startsWith("hsel_") || text.startsWith("hsel_")) &&
            buttonIdNorm !== "hosp_btn"
        ) {
            if (session.flow !== "FIND_HOSPITAL_FLOW") {
                session = { flow: "FIND_HOSPITAL_FLOW", step: "SELECT_HOSPITAL", data: { ...(session.data || {}), category: "HOSPITAL" } };
                userSessions.set(phoneNumber, session);
            }
            await findHospitalFlow(phoneNumber, rawText, msg, session,
                (f, s, d) => { setSession(phoneNumber, f, s, d); saveFindTracking(phoneNumber, f, s, d); },
                () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }

        // ---------- Global department buttons (hospital dept list) ----------
        if (buttonIdNorm.startsWith("hdept_") || text.startsWith("hdept_")) {
            if (session.flow !== "FIND_HOSPITAL_FLOW") {
                session = { flow: "FIND_HOSPITAL_FLOW", step: "SELECT_DEPT", data: session.data || {} };
                userSessions.set(phoneNumber, session);
            }
            await findHospitalFlow(phoneNumber, rawText, msg, session,
                (f, s, d) => { setSession(phoneNumber, f, s, d); saveFindTracking(phoneNumber, f, s, d); },
                () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }

        // ---------- Direct doctor link (dr-username) ----------
        if (text.includes("dr-")) {
            const match = text.match(/(dr-[a-zA-Z0-9\-]+)/i);
            const usernameParam = match ? match[1].trim() : "";

            if (usernameParam) {
                const doctor: any = await prisma.doctor.findUnique({ where: { username: usernameParam } });
                if (doctor) {
                    const newSession: ChatbotSession = {
                        flow: "GET_DOCTOR_FLOW",
                        step: "ACTIVE_CHAT",
                        data: { doctorId: doctor.id, username: doctor.username, name: doctor.name, phone: doctor.phone },
                    };
                    userSessions.set(phoneNumber, newSession);
                    await saveConnectSession(phoneNumber, "DOCTOR", doctor.id, doctor.name, "GET_DOCTOR_FLOW", "ACTIVE_CHAT");
                    await handleGetDoctorFlow(phoneNumber, usernameParam, msg, newSession, (f, s, d) => {
                        setSession(phoneNumber, f, s, d);
                        if (d.doctorId && d.name) {
                            saveConnectSession(phoneNumber, "DOCTOR", d.doctorId, d.name, f, s);
                        }
                    });
                    return;
                }
            }
        }

        // ---------- Hi / Hello (pending deep-link or recovery prompt) ----------
        if (text.includes("hi") || text.includes("hello") || text.includes("start")) {
            const pendingDoctorId = userPendingDoctorMap.get(phoneNumber);

            if (pendingDoctorId) {
                const doctor: any = await prisma.doctor.findUnique({ where: { id: pendingDoctorId } });
                if (doctor) {
                    const newSession: ChatbotSession = {
                        flow: "GET_DOCTOR_FLOW",
                        step: "ACTIVE_CHAT",
                        data: { doctorId: doctor.id, username: doctor.username, name: doctor.name, phone: doctor.phone },
                    };
                    userSessions.set(phoneNumber, newSession);
                    userPendingDoctorMap.delete(phoneNumber);
                    await saveConnectSession(phoneNumber, "DOCTOR", doctor.id, doctor.name, "GET_DOCTOR_FLOW", "ACTIVE_CHAT");
                    await handleGetDoctorFlow(phoneNumber, doctor.username, msg, newSession, (f, s, d) => {
                        setSession(phoneNumber, f, s, d);
                        if (d.doctorId && d.name) {
                            saveConnectSession(phoneNumber, "DOCTOR", d.doctorId, d.name, f, s);
                        }
                    });
                    return;
                }
            }

            const dbSession = await prisma.chatSession.findUnique({ where: { phoneNumber } });

            if (dbSession?.targetName) {
                let extraData: any = {};
                if (dbSession.targetType === "DOCTOR" && dbSession.targetId) {
                    const doc: any = await prisma.doctor.findUnique({ where: { id: dbSession.targetId } });
                    if (doc) {
                        extraData = { doctorId: doc.id, username: doc.username, name: doc.name, phone: doc.phone };
                    }
                }

                const restored: ChatbotSession = {
                    flow: dbSession.lastFlow || "MAIN_MENU",
                    step: dbSession.lastStep || "WELCOME",
                    data: extraData,
                };

                pendingRecoveryMap.set(phoneNumber, restored);

                await sendInteractiveButtons(
                    phoneNumber,
                    `👋 আসসালামু আলাইকুম / নমস্কার! \n\n🌟 *মিস্টার ডক্টর (Mr. Doctor)*-এর পক্ষ থেকে আপনাকে জানাচ্ছি আন্তরিক শুভেচ্ছা ও স্বাগতম। 🩺✨\n\n───────────────────\n💬 এর আগে আপনি *${dbSession.targetName}*-এর সাথে কথা বলছিলেন।\n\n❓ আপনি কি উনার সাথেই পুনরায় যুক্ত হতে চান?`,
                    [
                        { id: "yes_restore", title: "হ্যাঁ, যুক্ত হতে চাই" },
                        { id: "menu_btn", title: "না, মূল মেনুতে যাই" },
                    ]
                );
                return;
            }
        }

        if (text.startsWith("hospital_") || buttonIdNorm.startsWith("hospital_")) {
            const newSession: ChatbotSession = { flow: "FIND_HOSPITAL_FLOW", step: "ASK_AREA", data: { category: "HOSPITAL" } };
            userSessions.set(phoneNumber, newSession);
            await saveFindTracking(phoneNumber, "FIND_HOSPITAL_FLOW", "ASK_AREA", newSession.data);
            await findHospitalFlow(phoneNumber, "hospital", msg, newSession,
                (f, s, d) => { setSession(phoneNumber, f, s, d); saveFindTracking(phoneNumber, f, s, d); },
                () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }

        // ---------- Main menu ----------
        if (buttonIdNorm === "home_btn" || buttonIdNorm === "menu_btn" || text.includes("home") || text.includes("মূল মেনু") || text.includes("মেনু") || text.includes("menu") || text.includes("না, মূল মেনুতে যাই")) {
            await clearChatSession(phoneNumber);
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
                    { id: "hosp_btn", title: "হসপিটাল" },
                ]
            );
            return;
        }

        // ---------- Running sessions ----------
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
                        { id: "hosp_btn", title: "হসপিটাল" },
                    ]
                );
                return;
            }

            if (session.step === "ASK_CATEGORY") {
                if (text.includes("ডাক্তার") || text.includes("doc") || buttonIdNorm === "doc_btn") {
                    const next: ChatbotSession = { flow: "FIND_DOCTOR_FLOW", step: "ASK_PROBLEM", data: { category: "DOCTOR" } };
                    userSessions.set(phoneNumber, next);
                    await saveFindTracking(phoneNumber, "FIND_DOCTOR_FLOW", "ASK_PROBLEM", next.data);
                    await findDoctorFlow(phoneNumber, rawText, msg, next,
                        (f, s, d) => { setSession(phoneNumber, f, s, d); saveFindTracking(phoneNumber, f, s, d); },
                        () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
                    return;
                } else if (text.includes("হসপিটাল") || text.includes("hosp") || buttonIdNorm === "hosp_btn") {
                    const next: ChatbotSession = { flow: "FIND_HOSPITAL_FLOW", step: "ASK_AREA", data: { category: "HOSPITAL" } };
                    userSessions.set(phoneNumber, next);
                    await saveFindTracking(phoneNumber, "FIND_HOSPITAL_FLOW", "ASK_AREA", next.data);
                    await findHospitalFlow(phoneNumber, "hospital", msg, next,
                        (f, s, d) => { setSession(phoneNumber, f, s, d); saveFindTracking(phoneNumber, f, s, d); },
                        () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
                    return;
                } else {
                    await sendWhatsAppMessage(phoneNumber, "দয়া করে নিচের বাটন থেকে একটি অপশন সিলেক্ট করুন।");
                    return;
                }
            }
        }

        if (session.flow === "FIND_DOCTOR_FLOW" || session.flow === "AI_DOCTOR_FLOW") {
            await findDoctorFlow(phoneNumber, rawText, msg, session,
                (f, s, d) => { setSession(phoneNumber, f, s, d); saveFindTracking(phoneNumber, f, s, d); },
                () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }

        if (session.flow === "FIND_HOSPITAL_FLOW") {
            await findHospitalFlow(phoneNumber, rawText, msg, session,
                (f, s, d) => { setSession(phoneNumber, f, s, d); saveFindTracking(phoneNumber, f, s, d); },
                () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }

        if (session.flow === "GET_DOCTOR_FLOW") {
            await handleGetDoctorFlow(phoneNumber, rawText, msg, session, (f, s, d) => {
                setSession(phoneNumber, f, s, d);
                if (d.doctorId && d.name) {
                    saveConnectSession(phoneNumber, "DOCTOR", d.doctorId, d.name, f, s);
                }
            });
            return;
        }

        if (session.flow === "GET_HOSPITAL_FLOW") {
            await handleGetHospitalFlow(phoneNumber, text, msg, session,
                (f, s, d) => {
                    setSession(phoneNumber, f, s, d);
                    if (d.hospitalId && d.name) {
                        saveConnectSession(phoneNumber, "HOSPITAL", d.hospitalId, d.name, f, s);
                    }
                },
                () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }

        await sendWhatsAppMessage(phoneNumber, "দুঃখিত, বিষয়টি বুঝতে পারিনি। মূল মেনুতে যেতে 'menu' লিখুন।");
    } catch (error: any) {
        console.error("❌ WhatsApp Service Error:", error);
        await sendWhatsAppMessage(phoneNumber, "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
}
