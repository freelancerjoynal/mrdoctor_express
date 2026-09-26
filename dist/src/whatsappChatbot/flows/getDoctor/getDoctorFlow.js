import { sendWhatsAppMessage, sendWhatsAppImage, sendInteractiveButtons, sendButtonsChunked, sendCtaUrlButton, sendTypingIndicator, } from "../../lib/sendWhatsAppMessage.js";
import { BACK_HINT, MENU_BUTTON, withNav } from "../../lib/navButtons.js";
import { saveConnectSession } from "../../lib/chatSession.js";
import { prisma } from "../../../lib/prisma.js";
import { notifyAppointments } from "../../../realtime/notify.js";
import { getButtonId } from "../../lib/session.js";
import { DOCTOR_TEXTS, getDoctorAnswer, APPOINTMENT_TEXTS, APPT_TODAY_ID, APPT_TOMORROW_ID, APPT_TODAY_TITLE, APPT_TOMORROW_TITLE, APPT_USE_SENDER_NUMBER_ID, APPT_USE_SENDER_NUMBER_TITLE, getAppointmentDayOptions, buildDayPrompt, buildChamberListText, buildChamberButtons, buildFeeLine, matchChamber, schedulesForChamber, parseAge, parseWeight, parsePhone, } from "./doctorQA.js";
import { DOC_SCRIPT, docStep1, docStep3, docGenderButtons, docHistoryButtons, docPaymentButtons, DOC_MALE_ID, DOC_FEMALE_ID, DOC_SEEN_YES_ID, DOC_SEEN_NO_ID, DOC_PAY_YES_ID, DOC_PAY_NO_ID, DUMMY_TERMS_LINK, DUMMY_PAYMENT_LINK, DOC_ONTIME_NOTE, } from "./forDoctorScript.js";
const DAY_LABEL = {
    SATURDAY: "শনিবার",
    SUNDAY: "রবিবার",
    MONDAY: "সোমবার",
    TUESDAY: "মঙ্গলবার",
    WEDNESDAY: "বুধবার",
    THURSDAY: "বৃহস্পতিবার",
    FRIDAY: "শুক্রবার",
};
/** Day buttons for the prompt — only running days (today/tomorrow max). No nav mid-flow. */
function dayButtons(options) {
    return options.map((o) => ({ id: o.buttonId, title: o.buttonTitle }));
}
/** Day availability for the SELECTED chamber (run chamber step first). */
function dayOptionsFor(data) {
    return getAppointmentDayOptions(schedulesForChamber(data?.schedules || [], data?.chamberId || ""));
}
/** Chamber list text + selectable buttons (chunked when many). No nav mid-flow. */
async function sendChamberStep(phoneNumber, chambers) {
    const buttons = buildChamberButtons(chambers);
    if (buttons.length <= 3) {
        await sendInteractiveButtons(phoneNumber, buildChamberListText(chambers), buttons);
    }
    else {
        await sendWhatsAppMessage(phoneNumber, buildChamberListText(chambers));
        await sendButtonsChunked(phoneNumber, "👇 নিচে থেকে চেম্বার বেছে নিন:", buttons);
    }
}
/** Day prompt for the selected chamber, or NO_SLOT when it is closed. */
async function sendDayStep(phoneNumber, data, go) {
    const options = dayOptionsFor(data);
    if (!options.length) {
        go("APT_NO_SLOT", {});
        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_SLOT + BACK_HINT);
        return false;
    }
    await sendInteractiveButtons(phoneNumber, buildDayPrompt(options), dayButtons(options));
    return true;
}
/** Doctor-script day prompt (for-doctor-only.json step_8) for the selected chamber. */
async function sendDocDayStep(phoneNumber, data, go) {
    const options = dayOptionsFor(data);
    if (!options.length) {
        go("DOC_NO_SLOT", {});
        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_SLOT);
        return false;
    }
    const lines = options.map((o) => `📅 ${o.label}`);
    await sendInteractiveButtons(phoneNumber, `${DOC_SCRIPT.step8}\n\n${lines.join("\n")}`, dayButtons(options));
    return true;
}
/** Persist the intake answers to pendingAppointment (NOT the appointment table). */
async function savePendingAppointment(phoneNumber, data) {
    const appointmentDate = data.appointmentDate instanceof Date
        ? data.appointmentDate
        : new Date(data.appointmentDate);
    // Online bookings are FREE — credits apply to offline bookings only.
    const created = await prisma.pendingAppointment.create({
        data: {
            phoneNumber,
            doctorId: data.doctorId,
            doctorName: data.name || null,
            problem: data.problem,
            appointmentDate,
            dayLabel: data.dayLabel || null,
            chamberId: data.chamberId || null,
            chamberName: data.chamberName || null,
            patientName: data.patientName,
            patientAge: data.patientAge ?? null,
            patientWeight: data.patientWeight ?? null,
            patientArea: data.patientArea || null,
            contactPhone: data.contactPhone,
            status: "PENDING",
        },
    });
    notifyAppointments({ doctorId: data.doctorId ?? null, chamberId: data.chamberId ?? null });
    return created;
}
export async function handleGetDoctorFlow(phoneNumber, text, msg, session, updateSession) {
    const norm = (text || "").toLowerCase().trim();
    const buttonId = getButtonId(msg);
    const buttonNorm = (buttonId || "").toLowerCase().trim();
    // Direct entry: username (dr-xxx) or DIRECT_SEARCH step.
    if (session.step === "DIRECT_SEARCH" || norm.startsWith("dr-")) {
        const usernameParam = (session.data?.username || text).trim();
        void sendTypingIndicator(phoneNumber, msg?.messageId);
        try {
            const doctor = await prisma.doctor.findUnique({
                where: { username: usernameParam },
                include: {
                    chambers: { include: { hospital: true } },
                    schedules: { include: { chamber: true, hospital: true } },
                },
            });
            if (!doctor) {
                await sendInteractiveButtons(phoneNumber, DOCTOR_TEXTS.NOT_FOUND, [MENU_BUTTON]);
                return;
            }
            const chambersList = (doctor.chambers || []).map((c) => ({
                id: c.id,
                name: c.hospital?.name || c.chamberName || c.addressLine || "চেম্বার",
                area: [c.thana, c.district].filter(Boolean).join(", "),
                newFee: Number(c.newPatientFee) || 0,
                oldFee: Number(c.oldPatientFee) || 0,
            }));
            const chambersText = chambersList
                .slice(0, 3)
                .map((c) => `• ${[c.name, c.area].filter(Boolean).join(" — ")}`)
                .join("\n");
            const scheduleText = (doctor.schedules || [])
                .slice(0, 7)
                .map((s) => `• ${DAY_LABEL[s.dayOfWeek] || s.dayOfWeek}: ${s.startTime}–${s.endTime}` +
                (s.hospital?.name ? ` (${s.hospital.name})` : ""))
                .join("\n");
            const sessionData = {
                doctorId: doctor.id,
                name: doctor.name,
                username: doctor.username,
                degree: doctor.degree || "",
                specialty: doctor.speciality || "",
                chambersText,
                chambersList,
                scheduleText,
                phone: doctor.phone || "",
                schedules: (doctor.schedules || []).map((s) => ({
                    dayOfWeek: s.dayOfWeek,
                    chamberId: s.chamberId || null,
                })),
            };
            session.flow = "GET_DOCTOR_FLOW";
            session.step = "DOC_ASK_NAME";
            session.data = sessionData;
            if (updateSession)
                updateSession("GET_DOCTOR_FLOW", "DOC_ASK_NAME", sessionData);
            await saveConnectSession(phoneNumber, "DOCTOR", doctor.id, doctor.name, "GET_DOCTOR_FLOW", "DOC_ASK_NAME");
            // Doctor-only script (for-doctor-only.json):
            // connecting -> step_0 banner only -> step_1 greeting -> step_2 ask name.
            // Sent back-to-back with no artificial delay (each send already
            // flashes a typing indicator on its way out).
            await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.WAITING_TEXT);
            if (doctor.bannerCardImage) {
                await sendWhatsAppImage(phoneNumber, doctor.bannerCardImage, `🩺 ${doctor.name}`);
            }
            await sendWhatsAppMessage(phoneNumber, docStep1(doctor.name));
            // Back how-to is told ONCE here — every prompt after this stays
            // clean, but typed back / ↩️ Back button keeps working always.
            await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.backInfo);
            await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step2);
        }
        catch (error) {
            console.error("❌ DB Error:", error);
            await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.DB_ERROR);
        }
        return;
    }
    const doctorData = session.data || {};
    const doctorId = doctorData.doctorId;
    if (!doctorId) {
        await sendInteractiveButtons(phoneNumber, DOCTOR_TEXTS.SESSION_RESET, [MENU_BUTTON]);
        return;
    }
    const go = (step, patch) => {
        const next = { ...doctorData, ...patch };
        if (updateSession)
            updateSession("GET_DOCTOR_FLOW", step, next);
        else {
            session.step = step;
            session.data = next;
        }
        return next;
    };
    const rawText = (text || "").trim();
    // ========================================================================
    // Doctor-only script (for-doctor-only.json): name -> gender -> age ->
    // weight -> history -> problem -> [chamber] -> day -> payment -> done.
    // ========================================================================
    // ---------- DOC step_2: name -> gender ----------
    if (session.step === "DOC_ASK_NAME") {
        if (rawText.trim().length < 3) {
            await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step2);
            return;
        }
        const patientName = rawText.trim();
        go("DOC_ASK_GENDER", { patientName });
        await sendInteractiveButtons(phoneNumber, docStep3(patientName), docGenderButtons());
        return;
    }
    // ---------- DOC step_3: gender -> age ----------
    if (session.step === "DOC_ASK_GENDER") {
        const id = buttonNorm;
        let gender = null;
        if (id === DOC_MALE_ID || norm.includes("পুরুষ") || norm.includes("ছেলে") || norm.includes("male")) {
            gender = "MALE";
        }
        else if (id === DOC_FEMALE_ID || norm.includes("নারী") || norm.includes("মেয়ে") || norm.includes("মহিলা") || norm.includes("female")) {
            gender = "FEMALE";
        }
        if (!gender) {
            await sendInteractiveButtons(phoneNumber, docStep3(String(doctorData.patientName || "")), docGenderButtons());
            return;
        }
        go("DOC_ASK_AGE", { patientGender: gender });
        await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step4);
        return;
    }
    // ---------- DOC step_4: age -> weight ----------
    if (session.step === "DOC_ASK_AGE") {
        const age = parseAge(rawText);
        if (age === null) {
            await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step4);
            return;
        }
        go("DOC_ASK_WEIGHT", { patientAge: age });
        await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step5);
        return;
    }
    // ---------- DOC step_5: weight -> history ----------
    if (session.step === "DOC_ASK_WEIGHT") {
        const weight = parseWeight(rawText);
        if (weight === null) {
            await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step5);
            return;
        }
        go("DOC_ASK_HISTORY", { patientWeight: weight });
        await sendInteractiveButtons(phoneNumber, DOC_SCRIPT.step6.message, docHistoryButtons());
        return;
    }
    // ---------- DOC step_6: history (old/new) -> problem ----------
    if (session.step === "DOC_ASK_HISTORY") {
        const id = buttonNorm;
        let patientType = null;
        if (id === DOC_SEEN_YES_ID || norm.includes("আগে") || norm.includes("দেখিয়েছি")) {
            patientType = "RENEW";
        }
        else if (id === DOC_SEEN_NO_ID || norm.includes("প্রথম")) {
            patientType = "NEW";
        }
        if (!patientType) {
            await sendInteractiveButtons(phoneNumber, DOC_SCRIPT.step6.message, docHistoryButtons());
            return;
        }
        go("DOC_ASK_PROBLEM", { patientType });
        await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step7);
        return;
    }
    // ---------- DOC step_7: problem -> chamber (multi only) / day ----------
    if (session.step === "DOC_ASK_PROBLEM") {
        if (rawText.trim().length < 3) {
            await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step7);
            return;
        }
        const chambers = Array.isArray(doctorData.chambersList)
            ? doctorData.chambersList
            : [];
        if (!chambers.length) {
            go("DOC_NO_CHAMBER", { problem: rawText.trim() });
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_CHAMBER);
            return;
        }
        // Single chamber -> auto-select, straight to the day step.
        if (chambers.length === 1) {
            const only = chambers[0];
            const next = go("DOC_ASK_DAY", {
                problem: rawText.trim(),
                chamberId: only.id,
                chamberName: [only.name, only.area].filter(Boolean).join(" — "),
                chamberNewFee: only.newFee,
                chamberOldFee: only.oldFee,
            });
            await sendDocDayStep(phoneNumber, next, go);
            return;
        }
        go("DOC_ASK_CHAMBER", { problem: rawText.trim() });
        await sendChamberStep(phoneNumber, chambers);
        return;
    }
    // ---------- DOC chamber (2+ chambers only) -> day ----------
    if (session.step === "DOC_ASK_CHAMBER") {
        const chambers = Array.isArray(doctorData.chambersList)
            ? doctorData.chambersList
            : [];
        if (!chambers.length) {
            go("DOC_NO_CHAMBER", {});
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_CHAMBER);
            return;
        }
        const picked = matchChamber(chambers, rawText, buttonId);
        if (!picked) {
            await sendChamberStep(phoneNumber, chambers);
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.INVALID_CHAMBER);
            return;
        }
        const next = go("DOC_ASK_DAY", {
            chamberId: picked.id,
            chamberName: [picked.name, picked.area].filter(Boolean).join(" — "),
            chamberNewFee: picked.newFee,
            chamberOldFee: picked.oldFee,
        });
        await sendDocDayStep(phoneNumber, next, go);
        return;
    }
    // ---------- DOC step_8: day -> ask phone number (saved to pending table next) ----------
    if (session.step === "DOC_ASK_DAY") {
        const options = dayOptionsFor(doctorData);
        if (!options.length) {
            go("DOC_NO_SLOT", {});
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_SLOT + BACK_HINT);
            return;
        }
        const picked = options.find((o) => buttonNorm === o.buttonId.toLowerCase() ||
            norm === o.buttonId.toLowerCase() ||
            rawText.trim() === o.buttonTitle) ||
            options.find((o) => o.key === "today"
                ? rawText.includes(APPT_TODAY_TITLE) || buttonNorm.includes(APPT_TODAY_ID)
                : rawText.includes(APPT_TOMORROW_TITLE) || buttonNorm.includes(APPT_TOMORROW_ID));
        if (!picked) {
            await sendDocDayStep(phoneNumber, doctorData, go);
            return;
        }
        go("DOC_ASK_PHONE", {
            appointmentDate: picked.date,
            appointmentDay: picked.key,
            appointmentDayOfWeek: picked.dayOfWeek,
            dayLabel: picked.label,
        });
        await sendInteractiveButtons(phoneNumber, APPOINTMENT_TEXTS.ASK_PHONE(phoneNumber), [
            { id: APPT_USE_SENDER_NUMBER_ID, title: APPT_USE_SENDER_NUMBER_TITLE },
        ]);
        return;
    }
    // ---------- DOC phone -> save pending_appointments -> payment question ----------
    if (session.step === "DOC_ASK_PHONE") {
        let contactPhone = null;
        if (buttonNorm === APPT_USE_SENDER_NUMBER_ID || rawText.trim() === APPT_USE_SENDER_NUMBER_TITLE) {
            contactPhone = phoneNumber;
        }
        else {
            contactPhone = parsePhone(rawText);
        }
        if (!contactPhone) {
            await sendInteractiveButtons(phoneNumber, APPOINTMENT_TEXTS.INVALID_PHONE, [
                { id: APPT_USE_SENDER_NUMBER_ID, title: APPT_USE_SENDER_NUMBER_TITLE },
            ]);
            return;
        }
        const finalData = go("DOC_ASK_PAYMENT", { contactPhone });
        try {
            await savePendingAppointment(phoneNumber, finalData);
        }
        catch (error) {
            console.error("❌ PendingAppointment save error:", error);
            await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.DB_ERROR);
            go("DOC_ASK_PHONE", {});
            return;
        }
        await sendInteractiveButtons(phoneNumber, DOC_SCRIPT.step9.message, docPaymentButtons());
        return;
    }
    // ---------- DOC step_9: payment yes/no -> close ----------
    if (session.step === "DOC_ASK_PAYMENT") {
        const id = buttonNorm;
        const yes = id === DOC_PAY_YES_ID || norm.includes("হ্যাঁ");
        const no = id === DOC_PAY_NO_ID || norm.includes("না");
        if (yes) {
            go("DOC_DONE", { payChoice: "YES" });
            // Fee depends on chamber + old/new patient type (step_6).
            const newFee = Number(doctorData.chamberNewFee) || 0;
            const oldFee = Number(doctorData.chamberOldFee) || 0;
            const isRenew = String(doctorData.patientType || "") === "RENEW";
            const fee = isRenew ? oldFee || newFee : newFee || oldFee;
            const feeLabel = isRenew ? "পুরনো রোগী" : "নতুন রোগী";
            const chamberName = String(doctorData.chamberName || "চেম্বার");
            const patientName = String(doctorData.patientName || "রোগী");
            const doctorName = String(doctorData.name || "ডাক্তার");
            const dayLabel = String(doctorData.dayLabel || "");
            const contactPhone = String(doctorData.contactPhone || phoneNumber);
            const feeText = fee > 0
                ? `${fee} টাকা (${feeLabel})`
                : buildFeeLine({ newFee, oldFee });
            await sendWhatsAppMessage(phoneNumber, `${DOC_SCRIPT.step10yes1}\n${DUMMY_TERMS_LINK}`);
            // Confirmation message with serial name + fee, payment opens via button.
            const confirmMsg = `✅ বুকিং কনফার্ম, ${patientName}! 🎉\n\n` +
                `👤 রোগী: ${patientName}\n` +
                `🩺 ডাক্তার: ${doctorName}\n` +
                `🏥 চেম্বার: ${chamberName}\n` +
                (dayLabel ? `📅 ${dayLabel}\n` : "") +
                `💰 ভিজিট ফি: ${feeText}\n` +
                `📞 ফোন: ${contactPhone}\n\n` +
                `পেমেন্ট সম্পন্ন করুন — পেমেন্ট কনফার্ম হলে আপনার সিরিয়াল নম্বর এখানেই জানিয়ে দেওয়া হবে।`;
            await sendCtaUrlButton(phoneNumber, confirmMsg, "💳 পেমেন্ট করুন", DUMMY_PAYMENT_LINK);
            await sendWhatsAppMessage(phoneNumber, DOC_ONTIME_NOTE);
            await sendInteractiveButtons(phoneNumber, "ধন্যবাদ! ☺️", withNav([]));
            return;
        }
        if (no) {
            go("DOC_DONE", { payChoice: "NO" });
            await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step10no);
            await sendInteractiveButtons(phoneNumber, "ধন্যবাদ! ☺️", withNav([]));
            return;
        }
        await sendInteractiveButtons(phoneNumber, DOC_SCRIPT.step9.message, docPaymentButtons());
        return;
    }
    // ---------- STEP 1: problem (saved to memory) -> chamber select ----------
    if (session.step === "APT_ASK_PROBLEM") {
        if (rawText.trim().length < 3) {
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.INVALID_PROBLEM + BACK_HINT);
            return;
        }
        const chambers = Array.isArray(doctorData.chambersList)
            ? doctorData.chambersList
            : [];
        if (!chambers.length) {
            go("APT_NO_CHAMBER", { problem: rawText.trim() });
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_CHAMBER + BACK_HINT);
            return;
        }
        // Single chamber -> auto-select, straight to the day step.
        if (chambers.length === 1) {
            const only = chambers[0];
            const next = go("APT_ASK_DAY", {
                problem: rawText.trim(),
                chamberId: only.id,
                chamberName: [only.name, only.area].filter(Boolean).join(" — "),
                chamberNewFee: only.newFee,
                chamberOldFee: only.oldFee,
            });
            await sendDayStep(phoneNumber, next, go);
            return;
        }
        go("APT_ASK_CHAMBER", { problem: rawText.trim() });
        await sendChamberStep(phoneNumber, chambers);
        return;
    }
    // ---------- STEP 2: chamber (selectable buttons of available chambers) ----------
    if (session.step === "APT_ASK_CHAMBER") {
        const chambers = Array.isArray(doctorData.chambersList)
            ? doctorData.chambersList
            : [];
        if (!chambers.length) {
            go("APT_NO_CHAMBER", {});
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_CHAMBER + BACK_HINT);
            return;
        }
        const picked = matchChamber(chambers, rawText, buttonId);
        if (!picked) {
            await sendChamberStep(phoneNumber, chambers);
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.INVALID_CHAMBER + BACK_HINT);
            return;
        }
        const next = go("APT_ASK_DAY", {
            chamberId: picked.id,
            chamberName: [picked.name, picked.area].filter(Boolean).join(" — "),
            chamberNewFee: picked.newFee,
            chamberOldFee: picked.oldFee,
        });
        await sendDayStep(phoneNumber, next, go);
        return;
    }
    // ---------- STEP 3: day (আজকে / আগামীকাল buttons only, running days) ----------
    if (session.step === "APT_ASK_DAY") {
        const options = dayOptionsFor(doctorData);
        if (!options.length) {
            go("APT_NO_SLOT", {});
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_SLOT + BACK_HINT);
            return;
        }
        const picked = options.find((o) => buttonNorm === o.buttonId.toLowerCase() ||
            norm === o.buttonId.toLowerCase() ||
            rawText.trim() === o.buttonTitle) ||
            options.find((o) => o.key === "today"
                ? rawText.includes(APPT_TODAY_TITLE) || buttonNorm.includes(APPT_TODAY_ID)
                : rawText.includes(APPT_TOMORROW_TITLE) || buttonNorm.includes(APPT_TOMORROW_ID));
        if (!picked) {
            await sendInteractiveButtons(phoneNumber, APPOINTMENT_TEXTS.INVALID_DAY, dayButtons(options));
            return;
        }
        go("APT_ASK_NAME", {
            appointmentDate: picked.date,
            appointmentDay: picked.key,
            appointmentDayOfWeek: picked.dayOfWeek,
            dayLabel: picked.label,
        });
        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_NAME + BACK_HINT);
        return;
    }
    // ---------- STEP 4: patient name ----------
    if (session.step === "APT_ASK_NAME") {
        if (rawText.trim().length < 3) {
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.INVALID_NAME + BACK_HINT);
            return;
        }
        go("APT_ASK_AGE", { patientName: rawText.trim() });
        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_AGE + BACK_HINT);
        return;
    }
    // ---------- STEP 5: patient age ----------
    if (session.step === "APT_ASK_AGE") {
        const age = parseAge(rawText);
        if (age === null) {
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.INVALID_AGE + BACK_HINT);
            return;
        }
        go("APT_ASK_WEIGHT", { patientAge: age });
        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_WEIGHT + BACK_HINT);
        return;
    }
    // ---------- STEP 6: patient weight -> user area ----------
    if (session.step === "APT_ASK_WEIGHT") {
        const weight = parseWeight(rawText);
        if (weight === null) {
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.INVALID_WEIGHT + BACK_HINT);
            return;
        }
        go("APT_ASK_AREA", { patientWeight: weight });
        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_AREA + BACK_HINT);
        return;
    }
    // ---------- STEP 7: user area -> phone ----------
    if (session.step === "APT_ASK_AREA") {
        if (rawText.trim().length < 2) {
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.INVALID_AREA + BACK_HINT);
            return;
        }
        go("APT_ASK_PHONE", { patientArea: rawText.trim() });
        await sendInteractiveButtons(phoneNumber, APPOINTMENT_TEXTS.ASK_PHONE(phoneNumber), [
            { id: APPT_USE_SENDER_NUMBER_ID, title: APPT_USE_SENDER_NUMBER_TITLE },
        ]);
        return;
    }
    // ---------- STEP 8: phone (button re-uses sender number, or typed) -> save + price ----------
    if (session.step === "APT_ASK_PHONE") {
        let contactPhone = null;
        if (buttonNorm === APPT_USE_SENDER_NUMBER_ID || rawText.trim() === APPT_USE_SENDER_NUMBER_TITLE) {
            contactPhone = phoneNumber;
        }
        else {
            contactPhone = parsePhone(rawText);
        }
        if (!contactPhone) {
            await sendInteractiveButtons(phoneNumber, APPOINTMENT_TEXTS.INVALID_PHONE, [
                { id: APPT_USE_SENDER_NUMBER_ID, title: APPT_USE_SENDER_NUMBER_TITLE },
            ]);
            return;
        }
        const finalData = go("APT_DONE", { contactPhone });
        try {
            await savePendingAppointment(phoneNumber, finalData);
        }
        catch (error) {
            console.error("❌ PendingAppointment save error:", error);
            await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.DB_ERROR);
            go("APT_ASK_PHONE", {});
            return;
        }
        // All details collected -> show the price. No more questions after this.
        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.SUCCESS({
            patientName: finalData.patientName,
            chamberName: finalData.chamberName || "চেম্বার",
            dayLabel: finalData.dayLabel || "",
            feeLine: buildFeeLine({
                newFee: Number(finalData.chamberNewFee) || 0,
                oldFee: Number(finalData.chamberOldFee) || 0,
            }),
        }));
        await sendInteractiveButtons(phoneNumber, "ধন্যবাদ! ☺️", withNav([]));
        return;
    }
    const answer = getDoctorAnswer(norm, doctorData);
    // Option buttons only (no nav mid-chat). Text-only when no buttons.
    const buttons = answer.buttons ?? [];
    if (!buttons.length) {
        await sendWhatsAppMessage(phoneNumber, answer.message);
    }
    else if (buttons.length <= 3) {
        await sendInteractiveButtons(phoneNumber, answer.message, buttons);
    }
    else {
        await sendButtonsChunked(phoneNumber, answer.message, buttons);
    }
}
//# sourceMappingURL=getDoctorFlow.js.map