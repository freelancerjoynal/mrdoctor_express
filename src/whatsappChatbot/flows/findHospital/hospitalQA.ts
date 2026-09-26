// ============================================================================
// hospitalQA.ts — texts for the FIND-HOSPITAL flow
// Flow: ask area -> random 5 hospitals (DB) -> hospital buttons ->
// departments of that hospital -> doctors of dept -> Connect (doctor bot).
// ============================================================================
//
// THIS FILE HAS 2 SECTIONS:
//   SECTION 1 — FLOW_PROMPTS: fixed step-by-step messages the flow sends
//               (ASK_AREA, PROCESSING, ...). One prompt = one field.
//   SECTION 2 — HOSPITAL_FAQ: free-text questions the user might type mid-flow
//               ("ফি কত?", "সিরিয়াল কিভাবে?"). One question = one block.
//               Copy-paste a block to add Q&A #1001.
//
// Q&A MATCHING = first keyword hit wins (same as a switch statement, top to
// bottom). Put specific entries ABOVE general ones.
//
// ============================================================================

// ----------------------------------------------------------------------------
// SECTION 1: flow prompts (used by findHospitalFlow.ts — do not rename keys)
// ----------------------------------------------------------------------------
import { formatLocationPath } from "../../lib/locationSelect.js";
export const HOSPITAL_TEXTS = {
    // Q: flow asks — which area? User can share device GPS or type the name.
    ASK_AREA:
        "আপনি কোন এলাকার হসপিটাল খুঁজছেন?\n\nআর যদি আপনি চান আমি সাজেস্ট করি, তাহলে আপনার মোবাইলের attach (📎) এ ক্লিক করে লোকেশন পাঠিয়ে দিন।\n\nঅথবা সরাসরি এলাকার নাম লিখে দিন (যেমন: জলঢাকা, ডোমার, নীলফামারী, রংপুর)।",

    // A: shown while searching the DB.
    PROCESSING: "⏳ একটু অপেক্ষা করুন, আপনার এলাকার হসপিটাল খোঁজা হচ্ছে...",

    // A: shown when the area text is not usable.
    INVALID_LOCATION:
        "দয়া করে ঠিকভাবে এলাকার নামটি লিখুন অথবা লোকেশন শেয়ার করুন।",

    // A: header above the GPS-based nearby-area suggestion buttons.
    NEARBY_HEADER: (detected: string) =>
        `📍 আপনার লোকেশন পেয়েছি! আপনার সবচেয়ে কাছের এলাকা: *${detected}*\n\nনিচে থেকে আপনার এলাকাটি বেছে নিন 👇`,

    // A: shown when no hospital is found for the area.
    NO_HOSPITAL: (location: string) =>
        `❌ দুঃখিত, "${location}" এলাকায় কোনো হসপিটাল পাওয়া যায়নি।\n\nঅন্য কোনো এলাকার নাম লিখে পাঠান অথবা মূল মেনুতে যান।`,

    // A: shown when no hospital is found in this thana (division -> district -> thana order).
    NO_HOSPITAL_THANA: (thana: string, district?: string, division?: string) =>
        `😔 দুঃখিত, "${formatLocationPath(division, district, thana)}" লোকেশনে কোনো হসপিটাল পাওয়া যায়নি।\nঅন্য লোকেশন চেষ্টা করুন 👇`,

    // Q: thana picked — which hospital? (selectable list of hospitals here)
    HOSPITAL_LIST_PROMPT: (thana: string, district?: string, division?: string) =>
        `✅ "${formatLocationPath(division, district, thana)}" এলাকার হসপিটাল — তালিকা থেকে বেছে নিন 👇`,

    // A: header above the 5 hospital cards.
    HOSPITAL_LIST_HEADER: (location: string) =>
        `✅ "${location}" এলাকার সেরা হসপিটালগুলো:\n\nপছন্দের হসপিটালের *Select* বাটনে চাপ দিন 👇`,

    // Q: flow asks — which department of this hospital?
    ASK_DEPT: (hospitalName: string) =>
        `🏥 *${hospitalName}*\n\nকোন বিভাগের ডাক্তার দেখাতে চান, নিচে থেকে বেছে নিন:`,

    // A: shown when the chosen hospital has no departments.
    NO_DEPT: "❌ এই হসপিটালে কোনো বিভাগ পাওয়া যায়নি। অন্য হসপিটাল বেছে নিন।",

    // A: header above the doctors of one department.
    DEPT_DOCTORS_HEADER: (hospitalName: string, dept: string) =>
        `👨‍⚕️ *${hospitalName}* — *${dept}* বিভাগের ডাক্তারগণ:\n`,

    // Q: flow asks — press Connect on a doctor.
    SELECT_DOCTOR_PROMPT:
        "───────────────────\n👆 ডাক্তারের সাথে কথা বলতে চাইলে *Connect* বাটনে চাপ দিন।",

    // A: shown after Connect is pressed.
    CONNECTED: (doctorName: string) => `✅ *${doctorName}*-এর সাথে যুক্ত করা হচ্ছে...`,

    // A: shown when input matches nothing.
    FALLBACK: "দুঃখিত, বিষয়টি বুঝতে পারিনি। নিচের বাটন থেকে একটি বেছে নিন।",
};


// ----------------------------------------------------------------------------
// SECTION 2: free-text FAQ — ONE QUESTION = ONE BLOCK.
// To add a new Q&A: copy any block, paste before the marker line, edit it.
// Use in the flow's fallback branch like:
//   const faq = getHospitalFaqAnswer(rawText);
//   if (faq) { await sendWhatsAppMessage(phoneNumber, faq); return; }
// ----------------------------------------------------------------------------

export interface HospitalFaqItem {
    /** Short label, e.g. "fee". Only for you to read — never shown to users. */
    id: string;
    /** If the user text contains ANY of these (case-insensitive), this answer wins. */
    keywords: string[];
    /** The answer. Keep it generic (no single-hospital data available here). */
    answer: string;
}

export const HOSPITAL_FAQ: HospitalFaqItem[] = [
    // Q: What is the visiting fee?
    {
        id: "fee",
        keywords: ["fee", "ভিজিট", "ফি", "টাকা", "খরচ"],
        answer: "ভিজিট ফি হসপিটাল ও ডাক্তারভেদে আলাদা। পছন্দের হসপিটাল Select করে বিভাগ বেছে নিন — প্রতিটি ডাক্তারের কার্ডে ফি দেখানো হবে।",
    },

    // Q: How to take a serial / appointment?
    {
        id: "serial",
        keywords: ["serial", "appointment", "সিরিয়াল", "অ্যাপয়েন্টমেন্ট"],
        answer: "সিরিয়াল নিতে: পছন্দের ডাক্তারের Connect বাটনে চাপ দিন, তারপর ডাক্তারকে সিরিয়ালের কথা লিখুন — চেম্বারের নম্বর দেওয়া হবে।",
    },

    // Q: Which department do I need?
    {
        id: "which-department",
        keywords: ["কোন বিভাগ", "which department", "কোন ডাক্তার"],
        answer: "আপনার সমস্যাটি লিখুন (যেমন: ৩ দিন ধরে জ্বর ও কাশি)। 'ডাক্তার খুঁজুন' মেনু থেকে লিখলে সঠিক বিভাগ সাজেস্ট করা হবে।",
    },

    // ---- ADD NEW Q&A ABOVE THIS LINE (copy any block above) ----
];

/** Free-text lookup. Returns the answer or null. First keyword hit wins. */
export function getHospitalFaqAnswer(normText: string): string | null {
    const text = (normText || "").toLowerCase().trim();
    if (!text) return null;

    // This loop IS the switch statement: each HOSPITAL_FAQ entry = one `case`.
    for (const faq of HOSPITAL_FAQ) {
        if (faq.keywords.some((k) => text.includes(k.toLowerCase()))) {
            return faq.answer;
        }
    }
    return null;
}

export function buildTrackingSummary(data: {
    location?: string;
    hospitalName?: string;
    department?: string;
}): string {
    const parts: string[] = ["🏥 *হসপিটাল খোঁজার অনুরোধ*"];
    if (data.location) parts.push(`📍 এলাকা: ${data.location}`);
    if (data.hospitalName) parts.push(`🏥 হসপিটাল: ${data.hospitalName}`);
    if (data.department) parts.push(`🏷️ বিভাগ: ${data.department}`);
    return parts.join("\n");
}
