import { sendWhatsAppMessage, sendInteractiveButtons, sendTypingIndicator, } from "../lib/sendWhatsAppMessage.js";
import { BACK_HINT, isBackClick, resendStepPrompt } from "../lib/navButtons.js";
import { isAreaClick } from "../lib/session.js";
import { findDoctorFlow } from "../flows/findDoctor/findDoctorFlow.js";
import { handleGetDoctorFlow } from "../flows/getDoctor/getDoctorFlow.js";
import { handleGetHospitalFlow } from "../flows/getHospital/getHospitalFlow.js";
import { findHospitalFlow } from "../flows/findHospital/findHospitalFlow.js";
import { userPendingDoctorMap } from "../lib/doctorRedirectManager.js";
import { saveConnectSession, clearChatSession } from "../lib/chatSession.js";
import { prisma } from "../../lib/prisma.js";
export const pendingRecoveryMap = new Map();
const userSessions = new Map();
// Chat history policy: ONLY a real doctor connect (GET_DOCTOR_FLOW via
// username, saved with saveConnectSession) is persisted to DB. FIND/search
// steps are in-memory only. This helper is a no-op that defensively clears
// any stale FIND history so a search never leaves DB history behind.
async function saveFindTracking(phoneNumber, _flow, _step, _data) {
    void _flow;
    void _step;
    void _data;
    await clearChatSession(phoneNumber).catch(() => { });
}
function setSession(phoneNumber, flow, step, data) {
    const prev = userSessions.get(phoneNumber);
    const d = data || {};
    if (flow === "MAIN_MENU") {
        // Main menu is a fresh start — Back from here repeats the menu.
        d._hist = [];
        userSessions.set(phoneNumber, { flow, step, data: d });
        return;
    }
    if (prev && (prev.flow !== flow || prev.step !== step)) {
        // New step -> remember where we came from so Back can return + resend.
        const hist = Array.isArray(d._hist)
            ? [...d._hist]
            : Array.isArray(prev.data?._hist)
                ? [...prev.data._hist]
                : [];
        const last = hist[hist.length - 1];
        if (!last || last.flow !== prev.flow || last.step !== prev.step) {
            hist.push({ flow: prev.flow, step: prev.step });
        }
        d._hist = hist.slice(-10);
    }
    else if (prev && !d._hist && Array.isArray(prev.data?._hist)) {
        d._hist = prev.data._hist;
    }
    userSessions.set(phoneNumber, { flow, step, data: d });
}
/** Back button: pop history, restore the previous step, send its message again. */
async function handleBackButton(phoneNumber, session) {
    const hist = Array.isArray(session.data?._hist) ? session.data._hist : [];
    const prev = hist[hist.length - 1];
    if (!prev) {
        // Nowhere to go back to -> repeat the current step's message.
        await resendStepPrompt(phoneNumber, session);
        return;
    }
    const nextData = { ...(session.data || {}), _hist: hist.slice(0, -1) };
    // Direct set: going back must NOT push the current step onto history.
    userSessions.set(phoneNumber, { flow: prev.flow, step: prev.step, data: nextData });
    await resendStepPrompt(phoneNumber, { flow: prev.flow, step: prev.step, data: nextData });
}
export async function handleIncomingMessage(msg) {
    const rawText = msg.text ||
        msg.buttonReply?.title ||
        msg.interactive?.button_reply?.title ||
        "";
    const buttonId = msg.buttonId ||
        msg.buttonReply?.id ||
        msg.interactive?.button_reply?.id ||
        "";
    const text = rawText.toLowerCase().trim();
    const buttonIdNorm = buttonId.toLowerCase().trim();
    const phoneNumber = msg.number;
    if (!text && !buttonIdNorm && !msg.location)
        return;
    // Show typing while we process (dismissed when we respond or after ~25s).
    void sendTypingIndicator(phoneNumber, msg.messageId);
    try {
        let session = userSessions.get(phoneNumber) || {
            flow: "MAIN_MENU",
            step: "WELCOME",
            data: {},
        };
        // ---------- Recovery (doctor-connect only) ----------
        // History exists ONLY after a real doctor connect via username
        // (GET_DOCTOR_FLOW). FIND/search steps are never persisted.
        if (text.includes("হ্যাঁ, যুক্ত হতে চাই") ||
            text.includes("yes_restore") ||
            text.includes("পুনরায় যুক্ত") ||
            text.includes("reconnect")) {
            const savedSession = pendingRecoveryMap.get(phoneNumber);
            if (savedSession?.flow === "GET_DOCTOR_FLOW" && savedSession?.data?.username) {
                setSession(phoneNumber, savedSession.flow, savedSession.step, savedSession.data);
                pendingRecoveryMap.delete(phoneNumber);
                const cb = (f, s, d) => {
                    setSession(phoneNumber, f, s, d);
                };
                await handleGetDoctorFlow(phoneNumber, `dr-${savedSession.data.username}`, msg, savedSession, cb);
                return;
            }
            pendingRecoveryMap.delete(phoneNumber);
            const dbSession = await prisma.chatSession.findUnique({ where: { phoneNumber } });
            if (dbSession?.targetType === "DOCTOR" && dbSession?.targetId) {
                const doc = await prisma.doctor.findUnique({ where: { id: dbSession.targetId } });
                if (doc) {
                    const restored = {
                        flow: "GET_DOCTOR_FLOW",
                        step: "ACTIVE_CHAT",
                        data: { doctorId: doc.id, username: doc.username, name: doc.name, phone: doc.phone },
                    };
                    setSession(phoneNumber, restored.flow, restored.step, restored.data);
                    await saveConnectSession(phoneNumber, "DOCTOR", doc.id, doc.name, "GET_DOCTOR_FLOW", "ACTIVE_CHAT");
                    await handleGetDoctorFlow(phoneNumber, `dr-${doc.username}`, msg, restored, (f, s, d) => {
                        setSession(phoneNumber, f, s, d);
                    });
                    return;
                }
            }
        }
        // ---------- Global Connect buttons (doctor cards from either flow) ----------
        // id: connect_<username> — works from any step.
        if (buttonIdNorm.startsWith("connect_") || text.startsWith("connect_")) {
            const rawId = buttonIdNorm.startsWith("connect_") ? buttonId : text;
            const m = rawId.match(/connect_(.+)/i);
            const usernameParam = m?.[1]?.trim() || "";
            if (usernameParam) {
                const doctor = await prisma.doctor.findUnique({ where: { username: usernameParam } });
                if (doctor) {
                    const newSession = {
                        flow: "GET_DOCTOR_FLOW",
                        step: "ACTIVE_CHAT",
                        data: { doctorId: doctor.id, username: doctor.username, name: doctor.name, phone: doctor.phone },
                    };
                    setSession(phoneNumber, newSession.flow, newSession.step, newSession.data);
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
        if ((buttonIdNorm.startsWith("hsel_") || text.startsWith("hsel_")) &&
            buttonIdNorm !== "hosp_btn") {
            if (session.flow !== "FIND_HOSPITAL_FLOW") {
                session = { flow: "FIND_HOSPITAL_FLOW", step: "SELECT_HOSPITAL", data: { ...(session.data || {}), category: "HOSPITAL" } };
                setSession(phoneNumber, session.flow, session.step, session.data);
            }
            await findHospitalFlow(phoneNumber, rawText, msg, session, (f, s, d) => { setSession(phoneNumber, f, s, d); saveFindTracking(phoneNumber, f, s, d); }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }
        // ---------- Global department buttons (hospital dept list) ----------
        if (buttonIdNorm.startsWith("hdept_") || text.startsWith("hdept_")) {
            if (session.flow !== "FIND_HOSPITAL_FLOW") {
                session = { flow: "FIND_HOSPITAL_FLOW", step: "SELECT_DEPT", data: session.data || {} };
                setSession(phoneNumber, session.flow, session.step, session.data);
            }
            await findHospitalFlow(phoneNumber, rawText, msg, session, (f, s, d) => { setSession(phoneNumber, f, s, d); saveFindTracking(phoneNumber, f, s, d); }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }
        // ---------- Direct doctor link (dr-username) ----------
        if (text.includes("dr-")) {
            const match = text.match(/(dr-[a-zA-Z0-9\-]+)/i);
            const usernameParam = match ? match[1].trim() : "";
            if (usernameParam) {
                const doctor = await prisma.doctor.findUnique({ where: { username: usernameParam } });
                if (doctor) {
                    const newSession = {
                        flow: "GET_DOCTOR_FLOW",
                        step: "ACTIVE_CHAT",
                        data: { doctorId: doctor.id, username: doctor.username, name: doctor.name, phone: doctor.phone },
                    };
                    setSession(phoneNumber, newSession.flow, newSession.step, newSession.data);
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
        // ---------- Greetings (hi / salam / hello...) -> main menu ----------
        // Pending deep-links and recovery prompts win first; any other
        // greeting always lands on the main menu, from any step.
        const isGreeting = text.includes("hi") ||
            text.includes("hello") ||
            text.includes("hey") ||
            text.includes("start") ||
            text.includes("salam") ||
            text.includes("salaam") ||
            text.includes("assalam") ||
            text.includes("alaikum") ||
            text.includes("আসসালামু") ||
            text.includes("আলাইকুম") ||
            text.includes("সালাম") ||
            text.includes("আদাব") ||
            text.includes("adab") ||
            text.includes("নমস্কার") ||
            text.includes("nomoshkar");
        if (isGreeting) {
            const pendingDoctorId = userPendingDoctorMap.get(phoneNumber);
            if (pendingDoctorId) {
                const doctor = await prisma.doctor.findUnique({ where: { id: pendingDoctorId } });
                if (doctor) {
                    const newSession = {
                        flow: "GET_DOCTOR_FLOW",
                        step: "ACTIVE_CHAT",
                        data: { doctorId: doctor.id, username: doctor.username, name: doctor.name, phone: doctor.phone },
                    };
                    setSession(phoneNumber, newSession.flow, newSession.step, newSession.data);
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
            // Only a connected doctor (username) is remembered. FIND/search
            // history is never saved, so there is nothing to resume there.
            if (dbSession?.targetType === "DOCTOR" && dbSession?.targetId) {
                const doc = await prisma.doctor.findUnique({ where: { id: dbSession.targetId } });
                if (doc) {
                    const restored = {
                        flow: "GET_DOCTOR_FLOW",
                        step: "ACTIVE_CHAT",
                        data: { doctorId: doc.id, username: doc.username, name: doc.name, phone: doc.phone },
                    };
                    pendingRecoveryMap.set(phoneNumber, restored);
                    const recall = `💬 এর আগে আপনি *${doc.name}*-এর সাথে কথা বলছিলেন।\n\n❓ আপনি কি উনার সাথেই পুনরায় যুক্ত হতে চান?`;
                    await sendInteractiveButtons(phoneNumber, `👋 আসসালামু আলাইকুম / নমস্কার! \n\n🌟 *মিস্টার ডক্টর (Mr. Doctor)*-এর পক্ষ থেকে আপনাকে জানাচ্ছি আন্তরিক শুভেচ্ছা ও স্বাগতম। 🩺✨\n\n───────────────────\n${recall}`, [
                        { id: "yes_restore", title: "হ্যাঁ, যুক্ত হতে চাই" },
                        { id: "menu_btn", title: "না, মূল মেনুতে যাই" },
                    ]);
                    return;
                }
            }
            // Plain greeting (no pending link / recovery) -> main menu.
            setSession(phoneNumber, "MAIN_MENU", "ASK_CATEGORY", {});
            await sendWhatsAppMessage(phoneNumber, "👋 আসসালামু আলাইকুম/নমস্কার!\n\nমিস্টার ডক্টর (Mr. Doctor)-এর পক্ষ থেকে আপনাকে স্বাগতম।");
            await sendInteractiveButtons(phoneNumber, "নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন:", [
                { id: "doc_btn", title: "ডাক্তার" },
                { id: "hosp_btn", title: "হসপিটাল" },
            ]);
            return;
        }
        if (text.startsWith("hospital_") || buttonIdNorm.startsWith("hospital_")) {
            const newSession = { flow: "FIND_HOSPITAL_FLOW", step: "ASK_AREA", data: { category: "HOSPITAL" } };
            setSession(phoneNumber, newSession.flow, newSession.step, newSession.data);
            await findHospitalFlow(phoneNumber, "hospital", msg, newSession, (f, s, d) => { setSession(phoneNumber, f, s, d); }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }
        // ---------- Main menu ----------
        if (buttonIdNorm === "home_btn" || buttonIdNorm === "menu_btn" || text.includes("home") || text.includes("মূল মেনু") || text.includes("মেনু") || text.includes("menu") || text.includes("না, মূল মেনুতে যাই")) {
            await clearChatSession(phoneNumber);
            setSession(phoneNumber, "MAIN_MENU", "ASK_CATEGORY", {});
            await sendWhatsAppMessage(phoneNumber, "👋 আসসালামু আলাইকুম/নমস্কার!\n\nমিস্টার ডক্টর (Mr. Doctor)-এর পক্ষ থেকে আপনাকে স্বাগতম।");
            await sendInteractiveButtons(phoneNumber, "নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন:", [
                { id: "doc_btn", title: "ডাক্তার" },
                { id: "hosp_btn", title: "হসপিটাল" },
            ]);
            return;
        }
        // ---------- Global Back button (every step) ----------
        // Pops step history and sends the previous step's message again.
        if (isBackClick(rawText, buttonId)) {
            await handleBackButton(phoneNumber, session);
            return;
        }
        // ---------- Global nearby-area buttons (area_0, area_1, ...) ----------
        // Tapped from GPS suggestions or no-result recovery — route into the
        // active find flow's ASK_AREA step; the flow resolves the name.
        if (isAreaClick(rawText, buttonId)) {
            if (session.flow === "FIND_HOSPITAL_FLOW") {
                const s = { ...session, step: "ASK_AREA" };
                await findHospitalFlow(phoneNumber, rawText, msg, s, (f, st, d) => { setSession(phoneNumber, f, st, d); }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
                return;
            }
            if (session.flow === "FIND_DOCTOR_FLOW" || session.flow === "AI_DOCTOR_FLOW") {
                const s = { ...session, step: "ASK_PROBLEM" };
                await findDoctorFlow(phoneNumber, rawText, msg, s, (f, st, d) => { setSession(phoneNumber, f, st, d); }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
                return;
            }
        }
        // ---------- Running sessions ----------
        if (session.flow === "MAIN_MENU") {
            if (session.step === "WELCOME") {
                setSession(phoneNumber, "MAIN_MENU", "ASK_CATEGORY", {});
                await sendWhatsAppMessage(phoneNumber, "👋 আসসালামু আলাইকুম/নমস্কার!\n\nমিস্টার ডক্টর (Mr. Doctor)-এর পক্ষ থেকে আপনাকে জানাচ্ছি আন্তরিক শুভেচ্ছা ও স্বাগতম। 🩺✨");
                await sendInteractiveButtons(phoneNumber, "নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন:", [
                    { id: "doc_btn", title: "ডাক্তার" },
                    { id: "hosp_btn", title: "হসপিটাল" },
                ]);
                return;
            }
            if (session.step === "ASK_CATEGORY") {
                if (text.includes("ডাক্তার") || text.includes("doc") || buttonIdNorm === "doc_btn") {
                    // Existing flow: division -> district -> thana -> category.
                    // Category list has "🤔 সমস্যা লিখুন" row -> problem ->
                    // DeepSeek (full list) -> DB by area. No DB history for
                    // search; only a doctor connect persists.
                    await clearChatSession(phoneNumber).catch(() => { });
                    const next = { flow: "FIND_DOCTOR_FLOW", step: "ASK_DIVISION", data: { category: "DOCTOR" } };
                    setSession(phoneNumber, next.flow, next.step, next.data);
                    await findDoctorFlow(phoneNumber, rawText, msg, next, (f, s, d) => { setSession(phoneNumber, f, s, d); }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
                    return;
                }
                else if (text.includes("হসপিটাল") || text.includes("hosp") || buttonIdNorm === "hosp_btn") {
                    await clearChatSession(phoneNumber).catch(() => { });
                    const next = { flow: "FIND_HOSPITAL_FLOW", step: "ASK_DIVISION", data: { category: "HOSPITAL" } };
                    setSession(phoneNumber, next.flow, next.step, next.data);
                    await findHospitalFlow(phoneNumber, rawText, msg, next, (f, s, d) => { setSession(phoneNumber, f, s, d); }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
                    return;
                }
                else {
                    await sendWhatsAppMessage(phoneNumber, "দয়া করে নিচের বাটন থেকে একটি অপশন সিলেক্ট করুন।");
                    return;
                }
            }
        }
        if (session.flow === "FIND_DOCTOR_FLOW" || session.flow === "AI_DOCTOR_FLOW") {
            await findDoctorFlow(phoneNumber, rawText, msg, session, (f, s, d) => { setSession(phoneNumber, f, s, d); }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }
        if (session.flow === "FIND_HOSPITAL_FLOW") {
            await findHospitalFlow(phoneNumber, rawText, msg, session, (f, s, d) => { setSession(phoneNumber, f, s, d); }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
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
            await handleGetHospitalFlow(phoneNumber, text, msg, session, (f, s, d) => {
                setSession(phoneNumber, f, s, d);
                // No DB history for hospital browsing — only a doctor
                // connect (username) is persisted.
            }, () => { setSession(phoneNumber, "MAIN_MENU", "WELCOME", {}); });
            return;
        }
        await sendWhatsAppMessage(phoneNumber, "দুঃখিত, বিষয়টি বুঝতে পারিনি। আবার লিখুন।" + BACK_HINT);
    }
    catch (error) {
        console.error("❌ WhatsApp Service Error:", error);
        await sendWhatsAppMessage(phoneNumber, "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
}
//# sourceMappingURL=whatsappService.js.map