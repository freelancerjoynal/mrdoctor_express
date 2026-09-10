// Single Question-Answer file for FIND-DOCTOR flow.
// Mirrors doctorQA.ts: one place for all questions, answers, buttons & validators.
// The flow file (findDoctFlow.ts) only handles DB / session / sending logic.
//
// Flow: find doctor click -> ASK_PROBLEM -> ASK_LOCATION -> local area DB query
// -> AI ranks top 5 -> 5 separate messages each with a Connect button.
// Connect click sends the doctor's username and connects that doctor directly.

export const FIND_DOCTOR_TEXTS = {
    ASK_TYPE_TEXT: "আপনি কোন ধরনের সেবা চাচ্ছেন?",
    ASK_PROBLEM: "রোগীর কী সমস্যা বা কী লক্ষণ দেখা যাচ্ছে বিস্তারিত লিখুন:",
    ASK_LOCATION:
        "📍 আপনি কোন এলাকায় ডাক্তার খুঁজছেন?\n\nএলাকার নাম লিখুন (যেমন: নীলফামারী সদর, সৈয়দপুর, ডোমার) অথবা আপনার লোকেশন শেয়ার করুন:",
    PROCESSING: "⏳ আপনার তথ্য প্রসেস করা হচ্ছে, সেরা ডাক্তার খোঁজা হচ্ছে… একটু অপেক্ষা করুন।",
    INVALID_PROBLEM:
        "দয়া করে রোগীর সমস্যাটি একটু বিস্তারিত লিখুন (কমপক্ষে ৩ অক্ষর)। যেমন: ৩ দিন ধরে জ্বর ও কাশি।",
    INVALID_LOCATION:
        "দয়া করে এলাকার নামটি লিখুন (যেমন: সৈয়দপুর) অথবা লোকেশন শেয়ার করুন।",
    NO_AREA_DOCTOR: (location: string) =>
        `❌ দুঃখিত, "${location}" এলাকায় কোনো ডাক্তার পাওয়া যায়নি।\n\nঅন্য এলাকার নাম লিখুন অথবা 'menu' লিখে মূল মেনুতে যান।`,
    AREA_RESULT_HEADER: (location: string) =>
        `✅ "${location}" এলাকায় পাওয়া ডাক্তারগণ:\n`,
    ANALYSIS_HEADER: (specialty: string) => (specialty ? `🩺 *সম্ভাব্য বিভাগ: ${specialty}*\n\n` : ""),
    SELECT_PROMPT:
        "───────────────────\n👆 উপরের ৫ জন থেকে যেকোনো ডাক্তারের *Connect* বাটনে চাপ দিন — সরাসরি সেই ডাক্তারের সাথে যুক্ত হয়ে যাবেন।\n\nঅন্য কিছু লিখলে আবার খুঁজতে হবে, অথবা 'menu' লিখে মূল মেনুতে যান।",
    CONFIRM_QUESTION:
        "───────────────────\n✅ উপরের তালিকা থেকে কোনো ডাক্তারের সাথে যুক্ত হতে চান?\n\nডাক্তারের নাম লিখুন / সিরিয়াল লিখুন, অথবা নিচের বাটন থেকে বেছে নিন:",
    CONFIRMED: (summary: string) =>
        `✅ *কনফার্মেশন*\n\n${summary}\n\n🎯 আপনার অনুরোধটি ট্র্যাক করা হয়েছে। শীঘ্রই আমাদের টিম আপনার সাথে যোগাযোগ করবে ইনশাআল্লাহ। ✨\n\nমূল মেনুতে যেতে 'menu' লিখুন।`,
    CONNECTED: (doctorName: string) => `✅ *${doctorName}*-এর সাথে যুক্ত করা হচ্ছে…`,
    FALLBACK: "দুঃখিত, বুঝতে পারিনি। দয়া করে নিচের বাটন থেকে বেছে নিন অথবা 'menu' লিখুন।",
};

export interface FindDoctorButton {
    id: string;
    title: string;
}

export const FIND_DOCTOR_BUTTONS = {
    ASK_TYPE: [
        { id: "ai_search", title: "রোগ বলে এআই দিয়ে খুঁজি" },
        { id: "area_search", title: "এলাকার ডাক্তার" },
        { id: "home_btn", title: "🏠 মূল মেনু" },
    ] as FindDoctorButton[],
    AREA_FALLBACK: [
        { id: "ai_search", title: "রোগ বলে এআই দিয়ে খুঁজি" },
        { id: "home_btn", title: "🏠 মূল মেনু" },
    ] as FindDoctorButton[],
    CONFIRM: [
        { id: "confirm_doctor_yes", title: "হ্যাঁ, যোগাযোগ করতে চাই" },
        { id: "home_btn", title: "🏠 মূল মেনু" },
    ] as FindDoctorButton[],
};

// ---------- Connect-button helpers (one per doctor card) ----------

export const CONNECT_BUTTON_TITLE = "Connect করুন";

export function buildConnectButton(username: string): FindDoctorButton {
    return { id: `connect_${username}`, title: CONNECT_BUTTON_TITLE };
}

export function buildDoctorCard(
    index: number,
    doctor: { name: string; degree?: string | null; speciality?: string | null; workingPlace?: string | null; phone?: string | null; rating?: number },
    reason: string
): string {
    const lines = [
        `*${index + 1}. 🩺 ${doctor.name}*`,
        `🎓 ${doctor.degree || "MBBS"}`,
        `⭐ ${doctor.speciality || "জেনারেল"}`,
        `🏥 ${doctor.workingPlace || "ঠিকানা নেই"}`,
        `📞 ${doctor.phone || "নম্বর নেই"}`,
    ];
    if (reason) lines.push(`✅ ${reason}`);
    lines.push("", "নিচের Connect বাটনে চাপ দিলে সরাসরি যুক্ত হয়ে যাবেন 👇");
    return lines.join("\n");
}

// ---------- detectors (match BOTH button id and Bengali/English title) ----------

export function isAiSearchSelected(raw: string, buttonId: string): boolean {
    const t = (raw || "").toLowerCase();
    const id = (buttonId || "").toLowerCase();
    return (
        id === "ai_search" ||
        t.includes("এআই") ||
        t.includes("রোগ বলে") ||
        t === "ai" ||
        t.includes("ai_search") ||
        (t.includes("ai") && t.includes("খুঁজি"))
    );
}

export function isAreaSearchSelected(raw: string, buttonId: string): boolean {
    const t = (raw || "").toLowerCase();
    const id = (buttonId || "").toLowerCase();
    return (
        id === "area_search" ||
        t.includes("এলাকার ডাক্তার") ||
        t.includes("এলাকা") ||
        t.includes("area_search") ||
        (t.includes("area") && !t.includes("ai"))
    );
}

export function isConfirmYes(raw: string, buttonId: string): boolean {
    const t = (raw || "").toLowerCase();
    const id = (buttonId || "").toLowerCase();
    return (
        id === "confirm_doctor_yes" ||
        t.includes("যোগাযোগ করতে চাই") ||
        t.includes("হ্যাঁ") ||
        t.includes("yes") ||
        t.includes("confirm") ||
        t.includes("সিরিয়াল") ||
        t.includes("serial")
    );
}

export function isConnectClick(raw: string, buttonId: string): boolean {
    const t = (raw || "").toLowerCase().trim();
    const id = (buttonId || "").toLowerCase().trim();
    return id.startsWith("connect_") || t.startsWith("connect_");
}

/** Extracts the doctor username from a Connect click (id `connect_<username>` or same text). */
export function extractConnectUsername(raw: string, buttonId: string): string {
    const id = (buttonId || "").trim();
    if (id.toLowerCase().startsWith("connect_")) return id.slice("connect_".length).trim();
    const t = (raw || "").trim();
    if (t.toLowerCase().startsWith("connect_")) return t.slice("connect_".length).trim();
    return "";
}

export function isValidProblem(text: string): boolean {
    return (text || "").trim().length >= 3;
}

export function isValidLocation(text: string): boolean {
    return (text || "").trim().length >= 2;
}

/** Words that mean "entry / menu navigation", never a real problem or location. */
export function isEntryWord(text: string): boolean {
    const t = (text || "").toLowerCase().trim();
    if (!t) return true;
    const words = ["ডাক্তার", "doctor", "doc_btn", "find", "hospital", "হসপিটাল", "hosp", "menu", "মেনু", "hi", "hello", "start"];
    return words.some((w) => t === w || (t.length < 12 && t.includes(w)));
}

export function buildAreaResultMessage(
    doctors: { name: string; degree?: string | null; speciality?: string | null; workingPlace?: string | null; phone?: string | null }[]
): string {
    return doctors
        .map(
            (d, i) =>
                `${i + 1}. 🩺 *${d.name}*\n   🎓 ${d.degree || "MBBS"}\n   ⭐ ${d.speciality || "জেনারেল"}\n   🏥 ${d.workingPlace || "ঠিকানা নেই"}\n   📞 ${d.phone || "নম্বর নেই"}`
        )
        .join("\n\n");
}

export function buildTrackingSummary(data: {
    searchType?: string;
    problem?: string;
    location?: string;
    candidates?: string[];
}): string {
    const parts: string[] = ["🩺 *ডাক্তার খোঁজার অনুরোধ*"];
    if (data.searchType) parts.push(`🔍 ধরন: ${data.searchType === "ai" ? "রোগ বলে এআই দিয়ে" : "এলাকার ডাক্তার"}`);
    if (data.problem) parts.push(`🤒 সমস্যা: ${data.problem}`);
    if (data.location) parts.push(`📍 এলাকা: ${data.location}`);
    if (data.candidates?.length) parts.push(`👨‍⚕️ সাজেশন: ${data.candidates.length} জন`);
    return parts.join("\n");
}
