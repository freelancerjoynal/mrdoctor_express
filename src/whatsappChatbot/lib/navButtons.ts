// ============================================================================
// navButtons.ts — shared Menu / Back navigation for all chatbot flows.
// ============================================================================
//
// BUTTONS (shown ONLY on the last message of a flow):
export const MENU_BUTTON = { id: "menu_btn", title: "🏠 মূল মেনু" };
export const BACK_BUTTON = { id: "back_btn", title: "🔙 পেছনে যান" };
//
// NAV RULE:
//   - Intermediate messages carry NO Back / Menu buttons.
//   - Instead every prompt ends with BACK_HINT ("type back to go back").
//   - Typing "menu" anytime opens the main menu (handled globally).
//   - Only the FINAL message of a flow uses withNav([]) = Back + Menu buttons.
//
export { BACK_HINT } from "./session.js";
//
// BACK BEHAVIOUR:
//   - Every step pushes {flow, step} into data._hist (done in whatsappService).
//   - Tapping Back pops the history and calls resendStepPrompt(), which sends
//     the previous step's message AGAIN so the user can answer it fresh.
//
// USAGE in a flow:
//   import { MENU_BUTTON, BACK_BUTTON, withNav } from "../../lib/navButtons.js";
//   await sendInteractiveButtons(phoneNumber, PROMPT, withNav([{id:"x", title:"Y"}]));
//   await sendButtonsChunked(phoneNumber, PROMPT, withNav(deptButtons)); // chunked
// ============================================================================

import {
    sendWhatsAppMessage,
    sendInteractiveButtons,
    sendButtonsChunked,
    type ButtonItem,
} from "./sendWhatsAppMessage.js";
import { BACK_HINT, shortTitle } from "./session.js";
import { FIND_DOCTOR_TEXTS } from "../flows/findDoctor/findDoctorQA.js";
import { HOSPITAL_TEXTS } from "../flows/findHospital/hospitalQA.js";
import {
    DOCTOR_TEXTS,
    APPOINTMENT_TEXTS,
    APPT_USE_SENDER_NUMBER_ID,
    APPT_USE_SENDER_NUMBER_TITLE,
    getAppointmentDayOptions,
    buildDayPrompt,
    buildChamberListText,
    buildChamberButtons,
    schedulesForChamber,
} from "../flows/getDoctor/doctorQA.js";
import { getHospitalById, buildHospitalCard } from "../services/hospitalSearch.js";
import {
    findDivision,
    sendDivisionPrompt,
    sendDistrictPrompt,
    sendThanaPrompt,
    resendSpecialityPrompt,
    buildLocationDoneMessage,
    LOCATION_TEXTS,
} from "./locationSelect.js";
import {
    DOC_SCRIPT,
    docStep3,
    docGenderButtons,
    docHistoryButtons,
    docPaymentButtons,
} from "../flows/getDoctor/forDoctorScript.js";

/** Append Back + Menu to any button list. USE ONLY on a flow's final message. */
export function withNav(buttons: ButtonItem[], includeBack = true): ButtonItem[] {
    return [...buttons, ...(includeBack ? [BACK_BUTTON] : []), MENU_BUTTON];
}

/**
 * True on Back-button tap (legacy) OR typed "back" / "পেছনে" / "পিছনে".
 * Typing "menu" is handled separately (global main-menu handler).
 */
export function isBackClick(raw: string, buttonId: string): boolean {
    if ((buttonId || "").trim() === BACK_BUTTON.id) return true;
    const t = (raw || "").trim().toLowerCase();
    if (t === BACK_BUTTON.title) return true; // legacy tapped button title
    return t === "back" || t === "পেছনে" || t === "পিছনে" || t === "back koro";
}

/**
 * Re-send a previous step's message (used by the global Back handler).
 * Never throws — falls back to the main menu on any error.
 */
export async function resendStepPrompt(
    phoneNumber: string,
    session: { flow: string; step: string; data?: any }
): Promise<void> {
    const data = session?.data || {};
    try {
        // ---------- FIND-HOSPITAL ----------
        if (session.flow === "FIND_HOSPITAL_FLOW") {
            switch (session.step) {
                case "ASK_DIVISION":
                    await sendDivisionPrompt(phoneNumber, "HOSPITAL");
                    return;
                case "ASK_DISTRICT": {
                    const division = findDivision(String(data.division || ""));
                    if (!division) {
                        await sendDivisionPrompt(phoneNumber, "HOSPITAL");
                        return;
                    }
                    await sendDistrictPrompt(phoneNumber, "HOSPITAL", division);
                    return;
                }
                case "ASK_THANA": {
                    const division = findDivision(String(data.division || ""));
                    const district = division?.districts.find((d) => d.name === data.district) || null;
                    if (!district) {
                        await sendDivisionPrompt(phoneNumber, "HOSPITAL");
                        return;
                    }
                    await sendThanaPrompt(phoneNumber, district);
                    return;
                }
                case "ASK_SPECIALITY":
                    await resendSpecialityPrompt(phoneNumber, "HOSPITAL", data);
                    return;
                case "ASK_SUGGEST_PROBLEM":
                    await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.SUGGEST_ASK_PROBLEM + BACK_HINT);
                    return;
                case "LOCATION_DONE":
                    await sendWhatsAppMessage(phoneNumber, buildLocationDoneMessage(data));
                    await sendInteractiveButtons(
                        phoneNumber,
                        "আর কিছু করতে চাইলে নিচে থেকে বেছে নিন:",
                        withNav([])
                    );
                    return;
                case "ASK_AREA":
                    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.ASK_AREA + BACK_HINT);
                    return;
                case "SELECT_HOSPITAL": {
                    // Previous message = header + hospital cards. Re-fetch and re-send.
                    const ids: string[] = Array.isArray(data.hospitalCandidates)
                        ? data.hospitalCandidates.slice(0, 5)
                        : [];
                    await sendWhatsAppMessage(
                        phoneNumber,
                        HOSPITAL_TEXTS.HOSPITAL_LIST_HEADER(data.location || "আপনার এলাকা")
                    );
                    for (let i = 0; i < ids.length; i++) {
                        const h = await getHospitalById(ids[i]!);
                        if (!h) continue;
                        await sendInteractiveButtons(phoneNumber, buildHospitalCard(i, h), [
                            { id: `hsel_${h.id}`, title: "Select করুন" },
                        ]);
                    }
                    await sendWhatsAppMessage(phoneNumber, "উপরে থেকে হসপিটাল বেছে নিন অথবা:" + BACK_HINT);
                    return;
                }
                case "SELECT_DEPT": {
                    const departments: string[] = Array.isArray(data.departments) ? data.departments : [];
                    const buttons = departments
                        .slice(0, 10)
                        .map((d, i) => ({ id: `hdept_${i}`, title: shortTitle(d) }));
                    await sendButtonsChunked(
                        phoneNumber,
                        HOSPITAL_TEXTS.ASK_DEPT(data.hospitalName || "হসপিটাল") +
                            "\n" +
                            departments.map((d, i) => `${i + 1}. ${d}`).join("\n"),
                        buttons
                    );
                    return;
                }
                case "SELECT_DOCTOR":
                    await sendWhatsAppMessage(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT + BACK_HINT);
                    return;
                default:
                    break;
            }
        }

        // ---------- FIND-DOCTOR ----------
        if (session.flow === "FIND_DOCTOR_FLOW" || session.flow === "AI_DOCTOR_FLOW") {
            switch (session.step) {
                case "ASK_DIVISION":
                    await sendDivisionPrompt(phoneNumber, "DOCTOR");
                    return;
                case "ASK_DISTRICT": {
                    const division = findDivision(String(data.division || ""));
                    if (!division) {
                        await sendDivisionPrompt(phoneNumber, "DOCTOR");
                        return;
                    }
                    await sendDistrictPrompt(phoneNumber, "DOCTOR", division);
                    return;
                }
                case "ASK_THANA": {
                    const division = findDivision(String(data.division || ""));
                    const district = division?.districts.find((d) => d.name === data.district) || null;
                    if (!district) {
                        await sendDivisionPrompt(phoneNumber, "DOCTOR");
                        return;
                    }
                    await sendThanaPrompt(phoneNumber, district);
                    return;
                }
                case "ASK_SPECIALITY":
                    await resendSpecialityPrompt(phoneNumber, "DOCTOR", data);
                    return;
                case "ASK_SUGGEST_PROBLEM":
                    await sendWhatsAppMessage(phoneNumber, LOCATION_TEXTS.SUGGEST_ASK_PROBLEM + BACK_HINT);
                    return;
                case "LOCATION_DONE":
                    await sendWhatsAppMessage(phoneNumber, buildLocationDoneMessage(data));
                    await sendInteractiveButtons(
                        phoneNumber,
                        "আর কিছু করতে চাইলে নিচে থেকে বেছে নিন:",
                        withNav([])
                    );
                    return;
                case "ASK_PROBLEM":
                    await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM + BACK_HINT);
                    return;
                case "ASK_AREA": {
                    const dept = data.department || "ডাক্তার";
                    const why = data.departmentWhy || "";
                    await sendWhatsAppMessage(
                        phoneNumber,
                        (why ? FIND_DOCTOR_TEXTS.ASK_AREA(dept, why) : FIND_DOCTOR_TEXTS.ASK_AREA_RETRY) + BACK_HINT
                    );
                    return;
                }
                case "SELECT_DOCTOR":
                case "CONFIRM_RESULT":
                    await sendWhatsAppMessage(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT + BACK_HINT);
                    return;
                default:
                    break;
            }
        }

        // ---------- DIRECT DOCTOR CHAT (incl. appointment intake) ----------
        if (session.flow === "GET_DOCTOR_FLOW") {
            switch (session.step) {
                case "DOC_ASK_NAME":
                    await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step2);
                    return;
                case "DOC_ASK_GENDER":
                    await sendInteractiveButtons(
                        phoneNumber,
                        docStep3(String(data.patientName || "")),
                        docGenderButtons()
                    );
                    return;
                case "DOC_ASK_AGE":
                    await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step4);
                    return;
                case "DOC_ASK_WEIGHT":
                    await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step5);
                    return;
                case "DOC_ASK_HISTORY":
                    await sendInteractiveButtons(phoneNumber, DOC_SCRIPT.step6.message, docHistoryButtons());
                    return;
                case "DOC_ASK_PROBLEM":
                    await sendWhatsAppMessage(phoneNumber, DOC_SCRIPT.step7);
                    return;
                case "DOC_ASK_PHONE":
                    await sendInteractiveButtons(phoneNumber, APPOINTMENT_TEXTS.ASK_PHONE(phoneNumber), [
                        { id: APPT_USE_SENDER_NUMBER_ID, title: APPT_USE_SENDER_NUMBER_TITLE },
                    ]);
                    return;
                case "DOC_ASK_PAYMENT":
                    await sendInteractiveButtons(phoneNumber, DOC_SCRIPT.step9.message, docPaymentButtons());
                    return;
                case "APT_ASK_PROBLEM":
                    await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_PROBLEM + BACK_HINT);
                    return;
                case "APT_ASK_CHAMBER":
                case "DOC_ASK_CHAMBER": {
                    const chambers = Array.isArray(data.chambersList) ? data.chambersList : [];
                    if (!chambers.length) {
                        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_CHAMBER + BACK_HINT);
                        return;
                    }
                    const buttons = buildChamberButtons(chambers);
                    if (buttons.length <= 3) {
                        await sendInteractiveButtons(phoneNumber, buildChamberListText(chambers), buttons);
                    } else {
                        await sendWhatsAppMessage(phoneNumber, buildChamberListText(chambers));
                        await sendButtonsChunked(phoneNumber, "👇 নিচে থেকে চেম্বার বেছে নিন:", buttons);
                    }
                    return;
                }
                case "APT_ASK_DAY":
                case "DOC_ASK_DAY": {
                    const options = getAppointmentDayOptions(
                        schedulesForChamber(data.schedules || [], data.chamberId || "")
                    );
                    if (!options.length) {
                        await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.NO_SLOT + BACK_HINT);
                        return;
                    }
                    await sendInteractiveButtons(
                        phoneNumber,
                        buildDayPrompt(options),
                        options.map((o) => ({ id: o.buttonId, title: o.buttonTitle }))
                    );
                    return;
                }
                case "APT_ASK_NAME":
                    await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_NAME + BACK_HINT);
                    return;
                case "APT_ASK_AGE":
                    await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_AGE + BACK_HINT);
                    return;
                case "APT_ASK_WEIGHT":
                    await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_WEIGHT + BACK_HINT);
                    return;
                case "APT_ASK_AREA":
                    await sendWhatsAppMessage(phoneNumber, APPOINTMENT_TEXTS.ASK_AREA + BACK_HINT);
                    return;
                case "APT_ASK_PHONE":
                    await sendInteractiveButtons(phoneNumber, APPOINTMENT_TEXTS.ASK_PHONE(phoneNumber), withNav([
                        { id: APPT_USE_SENDER_NUMBER_ID, title: APPT_USE_SENDER_NUMBER_TITLE },
                    ]));
                    return;
                default:
                    break;
            }
            if (data.doctorId) {
                await sendButtonsChunked(
                    phoneNumber,
                    "আপনাকে কীভাবে সাহায্য করতে পারি নিচে থেকে বেছে নিন:",
                    [
                        { id: `location_${data.doctorId}`, title: "লোকেশন জানতে চাই" },
                        { id: `mobile_${data.doctorId}`, title: "মোবাইল নম্বর জানতে চাই" },
                    ]
                );
            } else {
                await sendWhatsAppMessage(phoneNumber, DOCTOR_TEXTS.SESSION_RESET);
            }
            return;
        }

        // ---------- MAIN MENU / anything else ----------
        await sendInteractiveButtons(phoneNumber, "নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন:", [
            { id: "doc_btn", title: "ডাক্তার" },
            { id: "hosp_btn", title: "হসপিটাল" },
        ]);
    } catch (err) {
        console.error("❌ Resend Step Error:", err);
        await sendInteractiveButtons(phoneNumber, "নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন:", [
            { id: "doc_btn", title: "ডাক্তার" },
            { id: "hosp_btn", title: "হসপিটাল" },
        ]);
    }
}
