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

export const HOSPITAL_TEXTS = {
    // Q: flow asks — which area? User can share device GPS or type the name.
    ASK_AREA:
        "📍 আপনি কোন এলাকায় হসপিটাল খুঁজছেন?\n\n👇 সবচেয়ে ভালো উপায় — মোবাইলের লোকেশন পাঠান:\n1️⃣ চ্যাটে 📎 (Attach / ➕) বাটনে চাপ দিন\n2️⃣ Location বেছে নিন\n3️⃣ Send your current location পাঠান\n→ তাহলে আপনার কাছের এলাকা (যেমন: জলঢাকা, ডোমার, নীলফামারী) সাজেস্ট করবো।\n\nঅথবা এলাকার নাম লিখুন (যেমন: নীলফামারী, সৈয়দপুর, রংপুর, ঢাকা)।",

    // A: shown while searching the DB.
    PROCESSING: "⏳ আপনার এলাকায় সেরা হসপিটাল খোঁজা হচ্ছে… একটু অপেক্ষা করুন।",

    // A: shown when the area text is not usable.
    INVALID_LOCATION:
        "দয়া করে এলাকার নামটি লিখুন (যেমন: সৈয়দপুর) অথবা লোকেশন শেয়ার করুন।",

    // A: header above the GPS-based nearby-area suggestion buttons.
    NEARBY_HEADER: (detected: string) =>
        `📍 আপনার অবস্থান পেয়েছি! সবচেয়ে কাছের এলাকা: *${detected}*\n\nনিচে থেকে আপনার এলাকা বেছে নিন 👇\n(অথবা এলাকার নাম লিখে পাঠান)`,

    // A: shown when no hospital is found for the area.
    NO_HOSPITAL: (location: string) =>
        `❌ দুঃখিত, "${location}" এলাকায় কোনো হসপিটাল পাওয়া যায়নি।\n\nঅন্য এলাকার নাম লিখুন অথবা নিচের 🏠 মূল মেনু বাটনে চাপ দিন।`,

    // A: header above the 5 hospital cards.
    HOSPITAL_LIST_HEADER: (location: string) =>
        `✅ "${location}" এলাকায় পাওয়া ৫টি হসপিটাল:\n\nনিচে থেকে যেকোনো হসপিটালের *Select* বাটনে চাপ দিন 👇`,

    // Q: flow asks — which department of this hospital?
    ASK_DEPT: (hospitalName: string) =>
        `🏥 *${hospitalName}*\n\nনিচে থেকে বিভাগ বেছে নিন — সেই বিভাগের ডাক্তার দেখানো হবে:`,

    // A: shown when the chosen hospital has no departments.
    NO_DEPT: "❌ এই হসপিটালে কোনো বিভাগ পাওয়া যায়নি। অন্য হসপিটাল বেছে নিন।",

    // A: header above the doctors of one department.
    DEPT_DOCTORS_HEADER: (hospitalName: string, dept: string) =>
        `👨‍⚕️ *${hospitalName}* — *${dept}* বিভাগের ডাক্তারগণ:\n`,

    // Q: flow asks — press Connect on a doctor.
    SELECT_DOCTOR_PROMPT:
        "───────────────────\n👆 উপরের ডাক্তারদের থেকে *Connect* বাটনে চাপ দিন — সরাসরি সেই ডাক্তারের সাথে যুক্ত হয়ে যাবেন।\n\nঅথবা নিচের 🏠 মূল মেনু বাটনে চাপ দিন।",

    // A: shown after Connect is pressed.
    CONNECTED: (doctorName: string) => `✅ *${doctorName}*-এর সাথে যুক্ত করা হচ্ছে…`,

    // A: shown when input matches nothing.
    FALLBACK: "দুঃখিত, বুঝতে পারিনি। দয়া করে নিচের বাটন থেকে বেছে নিন।",
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
