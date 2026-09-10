// ============================================================================
// doctorQA.ts — Q&A for the direct doctor bot (GET_DOCTOR_FLOW)
// ============================================================================
//
// HOW TO ADD A NEW QUESTION (takes 10 seconds):
//   1. Copy one block inside DOCTOR_QA below.
//   2. Paste it right before the `// ---- ADD NEW Q&A ABOVE THIS LINE ----` marker.
//   3. Change `id`, `keywords`, and `reply`. Done.
//
// HOW MATCHING WORKS (same as a switch statement):
//   - User text is lowercased, then checked top-to-bottom.
//   - FIRST entry whose keyword appears in the text wins (like the first
//     matching `case` in a switch). So put specific entries ABOVE general ones
//     (e.g. "visiting fee" must come before plain "fee"... actually "fee" is
//     inside "visiting fee", so order the longer phrase first).
//   - Nothing matches  ->  FALLBACK_QA answers.
//
// ============================================================================

export interface DoctorAnswer {
    message: string;
    buttons?: { id: string; title: string }[];
}

export interface DoctorCardData {
    doctorId: string;
    name: string;
    chambersText: string;
    phone: string | null;
    scheduleText: string;
    feeText: string;
}

// Static texts. Edit the Bengali wording here — logic lives in DOCTOR_QA.
export const DOCTOR_TEXTS = {
    WAITING_TEXT: "⏳ দয়া করে অপেক্ষা করুন, ডাক্তার সাহেব আপনার সাথে সংযুক্ত হচ্ছেন… ⏳",
    NOT_FOUND: "❌ দুঃখিত, এই ডাক্তারের কোনো তথ্য পাওয়া যায়নি। নিচের 🏠 মূল মেনু বাটনে চাপ দিন।",
    SESSION_RESET: "সেশন রিসেট হয়ে গেছে। দয়া করে আবার লিংক থেকে প্রবেশ করুন অথবা নিচের 🏠 মূল মেনু বাটনে চাপ দিন।",
    DB_ERROR: "❌ তথ্য লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",

    welcomeMessage: (doctorName: string) => `আসসালামু আলাইকুম, আমি ${doctorName} বলছি`,
    chamberLocation: (places: string) => `আমার চেম্বারের ঠিকানা:\n${places || "চেম্বার নির্ধারিত নেই"}`,
    mobileNumber: (phone: string | null) =>
        phone ? `আমার মোবাইল নম্বর: ${phone}` : "দুঃখিত, এই মুহূর্তে মোবাইল নম্বর দেওয়া নেই।",
    scheduleInfo: (lines: string) =>
        lines ? `🗓️ আমার চেম্বার সময়সূচি:\n${lines}` : "দুঃখিত, সময়সূচি এখনো দেওয়া হয়নি।",
    feeInfo: (lines: string) =>
        lines ? `💰 আমার ভিজিট ফি:\n${lines}` : "দুঃখিত, ভিজিট ফি এখনো নির্ধারণ করা হয়নি।",
    fallbackResponse: (doctorName: string) =>
        `আমি ${doctorName || "ডাক্তার"} বলছি। এই বিষয়ে আমি কোনো উত্তর দিতে পারব না।`,
};

// ----------------------------------------------------------------------------
// ONE QUESTION = ONE BLOCK. To add Q&A #1001, copy any block and edit it.
// ----------------------------------------------------------------------------
export interface DoctorQAItem {
    /** Short label, e.g. "fee". Only for you to read — never shown to users. */
    id: string;
    /** If the user text contains ANY of these (case-insensitive), this answer wins. */
    keywords: string[];
    /** The answer. Receives the current doctor's data. */
    reply: (doctor: DoctorCardData) => string;
    /** Optional buttons under the answer. Receives the current doctor's data. */
    buttons?: (doctor: DoctorCardData) => { id: string; title: string }[];
}

export const DOCTOR_QA: DoctorQAItem[] = [
    // Q: Where is the chamber / what is the address?
    {
        id: "chamber-location",
        keywords: ["location", "লোকেশন", "chamber", "চেম্বার", "ঠিকানা", "কোথায়", "কোথায়"],
        reply: (d) => DOCTOR_TEXTS.chamberLocation(d.chambersText),
        buttons: (d) => [{ id: `mobile_${d.doctorId}`, title: "মোবাইল নম্বর জানতে চাই" }],
    },

    // Q: What is the mobile / phone number?
    {
        id: "mobile-number",
        keywords: ["mobile", "মোবাইল", "নম্বর", "number", "phone"],
        reply: (d) => DOCTOR_TEXTS.mobileNumber(d.phone),
    },

    // Q: When does the doctor sit? (schedule / visiting hours)
    {
        id: "schedule",
        keywords: ["schedule", "সময়", "সময়", "কখন", "বার", "visiting hour"],
        reply: (d) => DOCTOR_TEXTS.scheduleInfo(d.scheduleText),
    },

    // Q: What is the visiting fee? (keep BEFORE any generic "fee" rival — n/a here,
    // but if you add a plain "fee" entry later, this longer phrase must stay on top)
    {
        id: "visiting-fee",
        keywords: ["visiting fee", "fee", "ভিজিট", "ফি", "টাকা", "খরচ"],
        reply: (d) => DOCTOR_TEXTS.feeInfo(d.feeText),
    },

    // Q: How to take a serial / appointment?
    {
        id: "serial",
        keywords: ["serial", "appointment", "সিরিয়াল", "অ্যাপয়েন্টমেন্ট"],
        reply: () => "সিরিয়াল নিতে চাইলে চেম্বারের নম্বরে যোগাযোগ করুন।",
    },

    // ---- ADD NEW Q&A ABOVE THIS LINE (copy any block above) ----
];

// A: shown when nothing above matches. Edit freely.
const FALLBACK_QA: DoctorQAItem = {
    id: "fallback",
    keywords: [],
    reply: (d) => DOCTOR_TEXTS.fallbackResponse(d.name),
    buttons: (d) => [
        { id: `location_${d.doctorId}`, title: "লোকেশন জানতে চাই" },
        { id: `mobile_${d.doctorId}`, title: "মোবাইল নম্বর জানতে চাই" },
    ],
};

/** One normalized user text in -> one answer out. First keyword hit wins. */
export function getDoctorAnswer(normText: string, doctor: DoctorCardData): DoctorAnswer {
    const text = (normText || "").toLowerCase().trim();

    // This loop IS the switch statement: each DOCTOR_QA entry = one `case`.
    for (const qa of DOCTOR_QA) {
        if (qa.keywords.some((k) => text.includes(k.toLowerCase()))) {
            return { message: qa.reply(doctor), buttons: qa.buttons?.(doctor) };
        }
    }

    return { message: FALLBACK_QA.reply(doctor), buttons: FALLBACK_QA.buttons?.(doctor) };
}
