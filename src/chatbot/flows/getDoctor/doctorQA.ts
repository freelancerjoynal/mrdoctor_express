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

    // Q: Which day is off / when is the chamber closed?
    {
        id: "offday",
        keywords: ["offday", "off day", "ছুটি", "বন্ধ কবে", "কোন দিন বন্ধ", "weekly off"],
        reply: (d) => DOCTOR_TEXTS.scheduleInfo(d.scheduleText),
    },

    // Q: How long does the doctor sit / till what time?
    {
        id: "chamber-till",
        keywords: ["কয়টা পর্যন্ত", "কটা পর্যন্ত", "কতক্ষণ", "শেষ কখন", "closing", "কখন পর্যন্ত বসেন"],
        reply: (d) => DOCTOR_TEXTS.scheduleInfo(d.scheduleText),
    },

    // Q: Can I show old reports / prescriptions?
    {
        id: "report",
        keywords: ["report", "রিপোর্ট", "টেস্ট", "এক্স-রে", "x-ray", "prescription", "প্রেসক্রিপশন"],
        reply: () => "পুরনো রিপোর্ট, টেস্ট ও প্রেসক্রিপশন থাকলে দেখানোর সময় সাথে নিয়ে আসুন।",
    },

    // Q: Does the doctor consult online / video call?
    {
        id: "online",
        keywords: ["online", "অনলাইন", "ভিডিও কল", "video call", "telemedicine", "ফোনে দেখেন"],
        reply: (d) => d.phone
            ? `অনলাইন/ভিডিও কলে দেখাতে চাইলে এই নম্বরে যোগাযোগ করুন: ${d.phone}`
            : "অনলাইনে দেখানোর বিষয়ে চেম্বারের নম্বরে যোগাযোগ করুন।",
    },

    // Q: Emergency — what to do?
    {
        id: "emergency",
        keywords: ["emergency", "জরুরি", "ইমার্জেন্সি", "সিরিয়াস", "ব্যথা বেশি", "urgent"],
        reply: (d) => d.phone
            ? `জরুরি হলে দেরি না করে এই নম্বরে কল করুন: ${d.phone}`
            : "জরুরি হলে দেরি না করে নিকটস্থ হাসপাতালে যান।",
    },

    // Q: What to bring for the first visit?
    {
        id: "first-visit",
        keywords: ["প্রথমবার", "first visit", "কী নিয়ে আসব", "কি নিয়ে আসব", "সাথে কী আনব"],
        reply: () => "প্রথমবার এলে পুরনো প্রেসক্রিপশন, টেস্ট রিপোর্ট ও জাতীয় পরিচয়পত্র/জন্ম সনদের ফটোকপি সাথে আনুন।",
    },

    // Q: New vs old patient fee difference?
    {
        id: "new-old-fee",
        keywords: ["নতুন পুরনো", "নতুন-পুরনো", "revisit", "রিভিজিট", "পুরনো রোগী"],
        reply: (d) => DOCTOR_TEXTS.feeInfo(d.feeText),
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

// ============================================================================
// APPOINTMENT INTAKE (pendingAppointment — NOT the appointment table)
// Flow after greeting: problem -> chamber -> day -> name -> age -> weight ->
// area -> phone -> save + show price. No location/mobile questions at the end.
// Day rule: only a running day, max one day advance (today + tomorrow only).
// ============================================================================

export const APPT_TODAY_ID = "appt_today";
export const APPT_TOMORROW_ID = "appt_tomorrow";
export const APPT_TODAY_TITLE = "আজকে";
export const APPT_TOMORROW_TITLE = "আগামীকাল";
export const APPT_USE_SENDER_NUMBER_ID = "use_sender_number";
export const APPT_USE_SENDER_NUMBER_TITLE = "এই নম্বরটি ইউজ করুন";
/** Chamber select buttons: chsel_<chamberId> (never collides with hsel_/hsel hospital ids). */
export const APPT_CHAMBER_PREFIX = "chsel_";

export interface AppointmentChamber {
    id: string;
    name: string;
    area: string;
    newFee: number;
    oldFee: number;
}

export const APPOINTMENT_TEXTS = {
    // Q: greeting follow-up — what is the problem? (saved to memory)
    ASK_PROBLEM: "আপনার সমস্যা কী? বিস্তারিত লিখুন (যেমন: ৩ দিন ধরে জ্বর ও কাশি):",
    INVALID_PROBLEM: "দয়া করে সমস্যাটি একটু বিস্তারিত লিখুন (কমপক্ষে ৩ অক্ষর)।",

    // Q: which chamber? (list text is built by buildChamberListText)
    ASK_CHAMBER_HEADER: "কোন চেম্বারে দেখাতে চান? নিচে থেকে বেছে নিন 👇",
    INVALID_CHAMBER: "দয়া করে নিচের বাটন থেকে চেম্বার বেছে নিন 👇",
    NO_CHAMBER:
        "দুঃখিত, এই ডাক্তারের কোনো চেম্বার পাওয়া যায়নি। দয়া করে পরে আবার চেষ্টা করুন অথবা নিচের 🏠 মূল মেনু বাটনে চাপ দিন।",

    // Q: which day? (options text is built by buildDayPrompt)
    ASK_DAY_HEADER: "আপনি কোন দিন দেখা করতে চাইছেন? 👇",

    // A: neither today nor tomorrow is a running day.
    NO_SLOT:
        "দুঃখিত, আজ ও আগামীকাল চেম্বার বন্ধ আছে। দয়া করে পরে আবার চেষ্টা করুন অথবা নিচের 🏠 মূল মেনু বাটনে চাপ দিন।",
    INVALID_DAY: "দয়া করে নিচের বাটন থেকে দিন বেছে নিন 👇 (আজকে / আগামীকাল)",

    // Q: patient name?
    ASK_NAME: "রোগীর নাম কী?",
    INVALID_NAME: "দয়া করে রোগীর নামটি লিখুন (কমপক্ষে ৩ অক্ষর)।",

    // Q: patient age?
    ASK_AGE: "রোগীর বয়স কত? (শুধু সংখ্যায় লিখুন, যেমন: ৩৫)",
    INVALID_AGE: "দয়া করে বয়সটি শুধু সংখ্যায় লিখুন (যেমন: ৩৫)।",

    // Q: patient weight?
    ASK_WEIGHT: "রোগীর ওজন কত কেজি? (শুধু সংখ্যায় লিখুন, যেমন: ৬৫)",
    INVALID_WEIGHT: "দয়া করে ওজনটি শুধু সংখ্যায় লিখুন (যেমন: ৬৫)।",

    // Q: user area?
    ASK_AREA: "আপনি কোন এলাকায় থাকেন? এলাকার নাম লিখুন (যেমন: সৈয়দপুর):",
    INVALID_AREA: "দয়া করে এলাকার নামটি লিখুন (যেমন: সৈয়দপুর)।",

    // Q: patient phone? (button re-uses the sender's WhatsApp number)
    ASK_PHONE: (senderNumber: string) =>
        `রোগীর ফোন নম্বর কী?\nনিচের বাটনে চাপ দিলে এই নম্বরটিই (${senderNumber}) ব্যবহার হবে, অথবা অন্য নম্বর লিখে পাঠান:`,
    INVALID_PHONE: "দয়া করে সঠিক মোবাইল নম্বরটি লিখুন (যেমন: 01XXXXXXXXX)।",

    // A: saved to pendingAppointment — full details + price, no more questions.
    SUCCESS: (d: {
        patientName: string;
        chamberName: string;
        dayLabel: string;
        feeLine: string;
    }) =>
        `✅ ধন্যবাদ, ${d.patientName}! আপনার অনুরোধটি পেয়েছি।\n\n🏥 চেম্বার: ${d.chamberName}\n📅 ${d.dayLabel}\n💰 ভিজিট ফি: ${d.feeLine}\n\nআমরা শীঘ্রই আপনাকে কল করব। 📞`,
};

const BN_DIGITS: Record<string, string> = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
};

/** Convert Bengali digits to English digits. */
export function bnToEn(s: string): string {
    return (s || "").replace(/[০-৯]/g, (d) => BN_DIGITS[d] ?? d);
}

const BN_DAY: Record<string, string> = {
    SATURDAY: "শনিবার",
    SUNDAY: "রবিবার",
    MONDAY: "সোমবার",
    TUESDAY: "মঙ্গলবার",
    WEDNESDAY: "বুধবার",
    THURSDAY: "বৃহস্পতিবার",
    FRIDAY: "শুক্রবার",
};

const BN_MONTH = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

/** JS Date.getDay() (0=Sunday) -> DayOfWeek enum used by DoctorSchedule. */
export function jsDayToEnum(d: Date): string {
    return ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"][d.getDay()]!;
}

export interface AppointmentDayOption {
    key: "today" | "tomorrow";
    buttonId: string;
    buttonTitle: string;
    date: Date;
    dayOfWeek: string;
    /** e.g. "আজকে — বৃহস্পতিবার, ১১ সেপ্টেম্বর" */
    label: string;
}

function formatBnDate(d: Date): string {
    const day = bnToEn(String(d.getDate())).replace(/[0-9]/g, (x) => "০১২৩৪৫৬৭৮৯"[Number(x)]!);
    return `${day} ${BN_MONTH[d.getMonth()]}`;
}

/**
 * Today + tomorrow only, keeping ONLY running days (doctor has a schedule).
 * Max one day advance — never offers anything beyond tomorrow.
 */
export function getAppointmentDayOptions(schedules: Array<{ dayOfWeek: string }>): AppointmentDayOption[] {
    const running = new Set((schedules || []).map((s) => String(s.dayOfWeek).toUpperCase()));
    const out: AppointmentDayOption[] = [];
    const now = new Date();
    for (const [offset, key, buttonId, buttonTitle, prefix] of [
        [0, "today", APPT_TODAY_ID, APPT_TODAY_TITLE, "আজকে"],
        [1, "tomorrow", APPT_TOMORROW_ID, APPT_TOMORROW_TITLE, "আগামীকাল"],
    ] as const) {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
        const dayOfWeek = jsDayToEnum(date);
        if (!running.has(dayOfWeek)) continue;
        out.push({
            key,
            buttonId,
            buttonTitle,
            date,
            dayOfWeek,
            label: `${prefix} — ${BN_DAY[dayOfWeek]}, ${formatBnDate(date)}`,
        });
    }
    return out;
}

/** "আপনি কোন দিন দেখা করতে চাইছেন?" + day name & date lines. Buttons stay আজকে/আগামীকাল. */
export function buildDayPrompt(options: AppointmentDayOption[]): string {
    const lines = options.map((o) => `📅 ${o.label}`);
    return `${APPOINTMENT_TEXTS.ASK_DAY_HEADER}\n\n${lines.join("\n")}`;
}

/** Age: digits only (Bengali digits accepted), 0–130. */
export function parseAge(raw: string): number | null {
    const n = Number(bnToEn(raw).replace(/[^0-9]/g, ""));
    if (!Number.isFinite(n) || n <= 0 || n > 130) return null;
    return Math.floor(n);
}

/** Weight in kg: digits (+ optional decimal), 1–500. */
export function parseWeight(raw: string): number | null {
    const cleaned = bnToEn(raw).replace(/[^0-9.]/g, "");
    if (!cleaned) return null;
    const n = Number(cleaned);
    if (!Number.isFinite(n) || n < 1 || n > 500) return null;
    return n;
}

/** Phone: keeps digits (incl. +880), needs 10–14 digits starting sensibly. */
export function parsePhone(raw: string): string | null {
    const digits = bnToEn(raw).replace(/[^0-9]/g, "");
    const d = digits.startsWith("880") ? digits.slice(3) : digits.startsWith("0") ? digits.slice(1) : digits;
    if (d.length !== 10) return null;
    if (!/^[0-9]{10}$/.test(d)) return null;
    return digits.startsWith("880") ? `+${digits}` : digits.startsWith("0") ? digits : `0${d}`;
}

// ----------------------------------------------------------------------------
// Chamber select (shown BEFORE the date — price is shown only at the end)
// ----------------------------------------------------------------------------

/** Numbered chamber list text, e.g. "1. Popular Hospital — সৈয়দপুর, নীলফামারী". */
export function buildChamberListText(chambers: AppointmentChamber[]): string {
    const lines = chambers.map(
        (c, i) => `${i + 1}. ${c.name}${c.area ? ` — ${c.area}` : ""}`
    );
    return `${APPOINTMENT_TEXTS.ASK_CHAMBER_HEADER}\n\n${lines.join("\n")}`;
}

/** Buttons for each available chamber: chsel_<chamberId>. */
export function buildChamberButtons(chambers: AppointmentChamber[]): Array<{ id: string; title: string }> {
    return chambers.map((c) => ({
        id: `${APPT_CHAMBER_PREFIX}${c.id}`,
        title: c.name.slice(0, 20),
    }));
}

/** True when the user tapped a chamber button (chsel_<id>). */
export function isChamberClick(raw: string, buttonId: string): boolean {
    const id = (buttonId || "").toLowerCase().trim();
    if (id.startsWith(APPT_CHAMBER_PREFIX)) return true;
    return (raw || "").toLowerCase().trim().startsWith(APPT_CHAMBER_PREFIX);
}

/** Chamber id from a chsel_<id> click ("" when not a click). */
export function extractChamberId(raw: string, buttonId: string): string {
    const src = (buttonId || raw || "").trim();
    const m = src.match(new RegExp(`^${APPT_CHAMBER_PREFIX}(.+)$`, "i"));
    return m?.[1]?.trim() || "";
}

/**
 * Match a chamber from button click, typed number ("2"), or typed name.
 * Returns null when nothing matches.
 */
export function matchChamber(
    chambers: AppointmentChamber[],
    rawText: string,
    buttonId: string
): AppointmentChamber | null {
    const clicked = extractChamberId(rawText, buttonId);
    if (clicked) {
        const hit = chambers.find((c) => c.id.toLowerCase() === clicked.toLowerCase());
        if (hit) return hit;
    }
    const t = bnToEn(rawText).trim();
    const num = Number(t.replace(/[^0-9]/g, ""));
    if (t && /^\d+$/.test(t.replace(/\s/g, "")) && num >= 1 && num <= chambers.length) {
        return chambers[num - 1]!;
    }
    const low = t.toLowerCase();
    if (low.length >= 2) {
        const hit = chambers.find(
            (c) => c.name.toLowerCase().includes(low) || low.includes(c.name.toLowerCase())
        );
        if (hit) return hit;
    }
    return null;
}

/**
 * Day availability for ONE chamber: schedules tied to it win; when the
 * chamber has no own schedules, fall back to the doctor's full roster.
 */
export function schedulesForChamber(
    schedules: Array<{ dayOfWeek: string; chamberId?: string | null }>,
    chamberId: string
): Array<{ dayOfWeek: string }> {
    const own = (schedules || []).filter(
        (s) => (s.chamberId || "").toLowerCase() === chamberId.toLowerCase()
    );
    return own.length ? own : schedules || [];
}

/** Price line for the selected chamber, e.g. "নতুন: ৭০০ টাকা | পুরনো: ৬০০ টাকা". */
export function buildFeeLine(c: { newFee: number; oldFee: number }): string {
    const parts: string[] = [];
    if (Number(c.newFee) > 0) parts.push(`নতুন: ${c.newFee} টাকা`);
    if (Number(c.oldFee) > 0) parts.push(`পুরনো: ${c.oldFee} টাকা`);
    return parts.length ? parts.join(" | ") : "চেম্বারে জেনে নিন";
}
