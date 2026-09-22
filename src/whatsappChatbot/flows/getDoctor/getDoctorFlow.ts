import {
    sendWhatsAppMessage,
    sendInteractiveButtons,
    sendButtonsChunked,
    sendTypingIndicator,
} from "../../lib/sendWhatsAppMessage.js";
import { BACK_HINT, MENU_BUTTON, withNav } from "../../lib/navButtons.js";
import { saveConnectSession } from "../../lib/chatSession.js";
import { prisma } from "../../../lib/prisma.js";
import { notifyAppointments } from "../../../realtime/notify.js";
import { spendAppointmentCredit, voidSpend, linkCreditRef } from "../../../lib/creditService.js";
import { getButtonId } from "../../lib/session.js";
import {
    DOCTOR_TEXTS,
    getDoctorAnswer,
    APPOINTMENT_TEXTS,
    APPT_TODAY_ID,
    APPT_TOMORROW_ID,
    APPT_TODAY_TITLE,
    APPT_TOMORROW_TITLE,
    APPT_USE_SENDER_NUMBER_ID,
    APPT_USE_SENDER_NUMBER_TITLE,
    getAppointmentDayOptions,
    buildDayPrompt,
    buildChamberListText,
    buildChamberButtons,
    buildFeeLine,
    matchChamber,
    schedulesForChamber,
    parseAge,
    parseWeight,
    parsePhone,
    type AppointmentChamber,
    type AppointmentDayOption,
} from "./doctorQA.js";
import type { UpdateFn } from "../../lib/session.js";

const DAY_LABEL: Record<string, string> = {
    SATURDAY: "শনিবার",
    SUNDAY: "রবিবার",
    MONDAY: "সোমবার",
    TUESDAY: "মঙ্গলবার",
    WEDNESDAY: "বুধবার",
    THURSDAY: "বৃহস্পতিবার",
    FRIDAY: "শুক্রবার",
};

/** Day buttons for the prompt — only running days (today/tomorrow max). No nav mid-flow. */
function dayButtons(options: Array<{ buttonId: string; buttonTitle: string }>) {
    return options.map((o) => ({ id: o.buttonId, title: o.buttonTitle }));
}

/** Day availability for the SELECTED chamber (run chamber step first). */
function dayOptionsFor(data: any): AppointmentDayOption[] {
    return getAppointmentDayOptions(
        schedulesForChamber(data?.schedules || [], data?.chamberId || "")
    );
}

/** Chamber list text + selectable buttons (chunked when many). No nav mid-flow. */
async function sendChamberStep(phoneNumber: string, chambers: AppointmentChamber[]) {
    const buttons = buildChamberButtons(chambers);
    if (buttons.length <= 3) {
        await sendInteractiveButtons(phoneNumber, buildChamberListText(chambers), buttons);
    } else {
        await sendWhatsAppMessage(phoneNumber, buildChamberListText(chambers));
        await sendButtonsChunked(phoneNumber, "👇 নিচে থেকে চেম্বার বেছে নিন:", buttons);
    }
}

/** Day prompt for the selected chamber, or NO_SLOT when it is closed. */
async function sendDayStep(
    phoneNumber: string,
    data: any,
    go: (step: string, patch: any) => any
): Promise<boolean> {
    const options = dayOptionsFor(data);
    if (!options.length) {
        go("APT_NO_SLOT", {});
        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_SLOT + BACK_HINT);
        return false;
    }
    await sendInteractiveButtons(phoneNumber, buildDayPrompt(options), dayButtons(options));
    return true;
}

/** Persist the intake answers to pendingAppointment (NOT the appointment table). */
async function savePendingAppointment(phoneNumber: string, data: any) {
    const appointmentDate: Date = data.appointmentDate instanceof Date
        ? data.appointmentDate
        : new Date(data.appointmentDate);
    // 1 appointment = 1 credit from the DOCTOR wallet (patient-side booking).
    const charge = await spendAppointmentCredit({
        ownerType: 'DOCTOR',
        ownerId: data.doctorId,
        refType: 'PendingAppointment',
        createdBy: null,
        note: `WhatsApp: ${data.patientName || ''}`.slice(0, 120),
    });
    let created;
    try {
        created = await prisma.pendingAppointment.create({
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
    } catch (err) {
        await voidSpend(charge.ledgerId);
        throw err;
    }
    await linkCreditRef(charge.ledgerId, created.id);
    notifyAppointments({ doctorId: data.doctorId ?? null, chamberId: data.chamberId ?? null });
    return created;
}

export async function handleGetDoctorFlow(
    phoneNumber: string,
    text: string,
    msg: any,
    session: any,
    updateSession?: UpdateFn
) {
    const norm = (text || "").toLowerCase().trim();
    const buttonId = getButtonId(msg);
    const buttonNorm = (buttonId || "").toLowerCase().trim();

    // Direct entry: username (dr-xxx) or DIRECT_SEARCH step.
    if (session.step === "DIRECT_SEARCH" || norm.startsWith("dr-")) {
        const usernameParam = ((session.data?.username || text) as string).trim();

        console.log("🔍 Fetching Doctor by Username:", usernameParam);
        await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.WAITING_TEXT);
        void sendTypingIndicator(phoneNumber, msg?.messageId);

        try {
            const doctor: any = await prisma.doctor.findUnique({
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

            const chambersList: AppointmentChamber[] = (doctor.chambers || []).map((c: any) => ({
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
                .map(
                    (s: any) =>
                        `• ${DAY_LABEL[s.dayOfWeek] || s.dayOfWeek}: ${s.startTime}–${s.endTime}` +
                        (s.hospital?.name ? ` (${s.hospital.name})` : "")
                )
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
                schedules: (doctor.schedules || []).map((s: any) => ({
                    dayOfWeek: s.dayOfWeek,
                    chamberId: s.chamberId || null,
                })),
            };

            session.flow = "GET_DOCTOR_FLOW";
            session.step = "APT_ASK_PROBLEM";
            session.data = sessionData;
            if (updateSession) updateSession("GET_DOCTOR_FLOW", "APT_ASK_PROBLEM", sessionData);
            await saveConnectSession(
                phoneNumber,
                "DOCTOR",
                doctor.id,
                doctor.name,
                "GET_DOCTOR_FLOW",
                "APT_ASK_PROBLEM"
            );

            await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.welcomeMessage(doctor.name));

            // Price is shown only at the end (after all details) — not here.
            const businessCardText =
                `🩺 *ডাক্তারের তথ্য ও বিবরণী*\n\n` +
                `নাম: ${doctor.name}\n` +
                `🎓 ডিগ্রি: ${doctor.degree || "এমবিবিএস"}\n` +
                `⭐ বিশেষজ্ঞতা: ${doctor.speciality || "মেডিসিন বিশেষজ্ঞ"}\n` +
                `🏥 চেম্বার:\n${chambersText || "নির্ধারিত নেই"}\n` +
                `\nসিরিয়ালের জন্য নিচের তথ্যগুলো দিন।`;

            await sendWhatsAppMessage(phoneNumber, businessCardText);
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_PROBLEM + BACK_HINT);
        } catch (error) {
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

    const go = (step: string, patch: any) => {
        const next = { ...doctorData, ...patch };
        if (updateSession) updateSession("GET_DOCTOR_FLOW", step, next);
        else {
            session.step = step;
            session.data = next;
        }
        return next;
    };

    const rawText = (text || "").trim();

    // ---------- STEP 1: problem (saved to memory) -> chamber select ----------
    if (session.step === "APT_ASK_PROBLEM") {
        if (rawText.trim().length < 3) {
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.INVALID_PROBLEM + BACK_HINT);
            return;
        }
        const chambers: AppointmentChamber[] = Array.isArray(doctorData.chambersList)
            ? doctorData.chambersList
            : [];
        if (!chambers.length) {
            go("APT_NO_CHAMBER", { problem: rawText.trim() });
            await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_CHAMBER + BACK_HINT);
            return;
        }
        // Single chamber -> auto-select, straight to the day step.
        if (chambers.length === 1) {
            const only = chambers[0]!;
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
        const chambers: AppointmentChamber[] = Array.isArray(doctorData.chambersList)
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
        const picked =
            options.find(
                (o) =>
                    buttonNorm === o.buttonId.toLowerCase() ||
                    norm === o.buttonId.toLowerCase() ||
                    rawText.trim() === o.buttonTitle
            ) ||
            options.find((o) =>
                o.key === "today"
                    ? rawText.includes(APPT_TODAY_TITLE) || buttonNorm.includes(APPT_TODAY_ID)
                    : rawText.includes(APPT_TOMORROW_TITLE) || buttonNorm.includes(APPT_TOMORROW_ID)
            );
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
        let contactPhone: string | null = null;
        if (buttonNorm === APPT_USE_SENDER_NUMBER_ID || rawText.trim() === APPT_USE_SENDER_NUMBER_TITLE) {
            contactPhone = phoneNumber;
        } else {
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
        } catch (error: any) {
            console.error("❌ PendingAppointment save error:", error);
            if (error?.message === 'INSUFFICIENT_CREDIT') {
                await sendWhatsAppMessage(phoneNumber, "❌ দুঃখিত, এই মুহূর্তে বুকিং নেওয়া যাচ্ছে না — দয়া করে চেম্বারে ফোন করে সিরিয়াল নিন।");
                go("APT_ASK_PHONE", {});
                return;
            }
            await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.DB_ERROR);
            go("APT_ASK_PHONE", {});
            return;
        }
        // All details collected -> show the price. No more questions after this.
        await sendWhatsAppMessage(
            phoneNumber,
            APPOINTMENT_TEXTS.SUCCESS({
                patientName: finalData.patientName,
                chamberName: finalData.chamberName || "চেম্বার",
                dayLabel: finalData.dayLabel || "",
                feeLine: buildFeeLine({
                    newFee: Number(finalData.chamberNewFee) || 0,
                    oldFee: Number(finalData.chamberOldFee) || 0,
                }),
            })
        );
        await sendInteractiveButtons(phoneNumber, "ধন্যবাদ! ☺️", withNav([]));
        return;
    }

    const answer = getDoctorAnswer(norm, doctorData);

    // Option buttons only (no nav mid-chat). Text-only when no buttons.
    const buttons = answer.buttons ?? [];
    if (!buttons.length) {
        await sendWhatsAppMessage(phoneNumber, answer.message);
    } else if (buttons.length <= 3) {
        await sendInteractiveButtons(phoneNumber, answer.message, buttons);
    } else {
        await sendButtonsChunked(phoneNumber, answer.message, buttons);
    }
}
