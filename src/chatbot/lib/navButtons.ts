// ============================================================================
// navButtons.ts — shared Menu / Back navigation for all chatbot flows.
// ============================================================================
//
// BUTTONS (always Bangla, never ask the user to type "menu"):
export const MENU_BUTTON = { id: "menu_btn", title: "🏠 মূল মেনু" };
export const BACK_BUTTON = { id: "back_btn", title: "🔙 পেছনে যান" };
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
import { shortTitle } from "./session.js";
import { FIND_DOCTOR_TEXTS } from "../flows/findDoctor/findDoctorQA.js";
import { HOSPITAL_TEXTS } from "../flows/findHospital/hospitalQA.js";
import { DOCTOR_TEXTS } from "../flows/getDoctor/doctorQA.js";
import { getHospitalById, buildHospitalCard } from "../services/hospitalSearch.js";

/** Append Back + Menu to any button list. */
export function withNav(buttons: ButtonItem[], includeBack = true): ButtonItem[] {
    return [...buttons, ...(includeBack ? [BACK_BUTTON] : []), MENU_BUTTON];
}

/** True when the user tapped the Back button (by id or by its Bangla title). */
export function isBackClick(raw: string, buttonId: string): boolean {
    if ((buttonId || "").trim() === BACK_BUTTON.id) return true;
    return (raw || "").trim() === BACK_BUTTON.title;
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
                case "ASK_AREA":
                    await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.ASK_AREA, withNav([]));
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
                    await sendInteractiveButtons(phoneNumber, "উপরে থেকে হসপিটাল বেছে নিন অথবা:", withNav([]));
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
                        withNav(buttons)
                    );
                    return;
                }
                case "SELECT_DOCTOR":
                    await sendInteractiveButtons(phoneNumber, HOSPITAL_TEXTS.SELECT_DOCTOR_PROMPT, withNav([]));
                    return;
                default:
                    break;
            }
        }

        // ---------- FIND-DOCTOR ----------
        if (session.flow === "FIND_DOCTOR_FLOW" || session.flow === "AI_DOCTOR_FLOW") {
            switch (session.step) {
                case "ASK_PROBLEM":
                    await sendInteractiveButtons(phoneNumber, FIND_DOCTOR_TEXTS.ASK_PROBLEM, withNav([]));
                    return;
                case "ASK_AREA": {
                    const dept = data.department || "ডাক্তার";
                    const why = data.departmentWhy || "";
                    await sendInteractiveButtons(
                        phoneNumber,
                        why ? FIND_DOCTOR_TEXTS.ASK_AREA(dept, why) : FIND_DOCTOR_TEXTS.ASK_AREA_RETRY,
                        withNav([])
                    );
                    return;
                }
                case "SELECT_DOCTOR":
                case "CONFIRM_RESULT":
                    await sendInteractiveButtons(phoneNumber, FIND_DOCTOR_TEXTS.SELECT_PROMPT, withNav([]));
                    return;
                default:
                    break;
            }
        }

        // ---------- DIRECT DOCTOR CHAT ----------
        if (session.flow === "GET_DOCTOR_FLOW") {
            if (data.doctorId) {
                await sendButtonsChunked(
                    phoneNumber,
                    "আপনাকে কীভাবে সাহায্য করতে পারি নিচে থেকে বেছে নিন:",
                    withNav([
                        { id: `location_${data.doctorId}`, title: "লোকেশন জানতে চাই" },
                        { id: `mobile_${data.doctorId}`, title: "মোবাইল নম্বর জানতে চাই" },
                    ])
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
