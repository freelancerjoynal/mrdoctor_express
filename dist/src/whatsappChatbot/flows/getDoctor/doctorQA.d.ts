export interface DoctorAnswer {
    message: string;
    buttons?: {
        id: string;
        title: string;
    }[];
}
export interface DoctorCardData {
    doctorId: string;
    name: string;
    chambersText: string;
    phone: string | null;
    scheduleText: string;
    feeText: string;
}
export declare const DOCTOR_TEXTS: {
    WAITING_TEXT: string;
    NOT_FOUND: string;
    SESSION_RESET: string;
    DB_ERROR: string;
    welcomeMessage: (doctorName: string) => string;
    chamberLocation: (places: string) => string;
    mobileNumber: (phone: string | null) => string;
    scheduleInfo: (lines: string) => string;
    feeInfo: (lines: string) => string;
    fallbackResponse: (doctorName: string) => string;
};
export interface DoctorQAItem {
    /** Short label, e.g. "fee". Only for you to read — never shown to users. */
    id: string;
    /** If the user text contains ANY of these (case-insensitive), this answer wins. */
    keywords: string[];
    /** The answer. Receives the current doctor's data. */
    reply: (doctor: DoctorCardData) => string;
    /** Optional buttons under the answer. Receives the current doctor's data. */
    buttons?: (doctor: DoctorCardData) => {
        id: string;
        title: string;
    }[];
}
export declare const DOCTOR_QA: DoctorQAItem[];
/** One normalized user text in -> one answer out. First keyword hit wins. */
export declare function getDoctorAnswer(normText: string, doctor: DoctorCardData): DoctorAnswer;
export declare const APPT_TODAY_ID = "appt_today";
export declare const APPT_TOMORROW_ID = "appt_tomorrow";
export declare const APPT_TODAY_TITLE = "\u0986\u099C\u0995\u09C7";
export declare const APPT_TOMORROW_TITLE = "\u0986\u0997\u09BE\u09AE\u09C0\u0995\u09BE\u09B2";
export declare const APPT_USE_SENDER_NUMBER_ID = "use_sender_number";
export declare const APPT_USE_SENDER_NUMBER_TITLE = "\u098F\u0987 \u09A8\u09AE\u09CD\u09AC\u09B0\u099F\u09BF \u0987\u0989\u099C \u0995\u09B0\u09C1\u09A8";
/** Chamber select buttons: chsel_<chamberId> (never collides with hsel_/hsel hospital ids). */
export declare const APPT_CHAMBER_PREFIX = "chsel_";
export interface AppointmentChamber {
    id: string;
    name: string;
    area: string;
    newFee: number;
    oldFee: number;
}
export declare const APPOINTMENT_TEXTS: {
    ASK_PROBLEM: string;
    INVALID_PROBLEM: string;
    ASK_CHAMBER_HEADER: string;
    INVALID_CHAMBER: string;
    NO_CHAMBER: string;
    ASK_DAY_HEADER: string;
    NO_SLOT: string;
    INVALID_DAY: string;
    ASK_NAME: string;
    INVALID_NAME: string;
    ASK_AGE: string;
    INVALID_AGE: string;
    ASK_WEIGHT: string;
    INVALID_WEIGHT: string;
    ASK_AREA: string;
    INVALID_AREA: string;
    ASK_PHONE: (senderNumber: string) => string;
    INVALID_PHONE: string;
    SUCCESS: (d: {
        patientName: string;
        chamberName: string;
        dayLabel: string;
        feeLine: string;
    }) => string;
};
/** Convert Bengali digits to English digits. */
export declare function bnToEn(s: string): string;
/** JS Date.getDay() (0=Sunday) -> DayOfWeek enum used by DoctorSchedule. */
export declare function jsDayToEnum(d: Date): string;
export interface AppointmentDayOption {
    key: "today" | "tomorrow";
    buttonId: string;
    buttonTitle: string;
    date: Date;
    dayOfWeek: string;
    /** e.g. "আজকে — বৃহস্পতিবার, ১১ সেপ্টেম্বর" */
    label: string;
}
/**
 * Today + tomorrow only, keeping ONLY running days (doctor has a schedule).
 * Max one day advance — never offers anything beyond tomorrow.
 */
export declare function getAppointmentDayOptions(schedules: Array<{
    dayOfWeek: string;
}>): AppointmentDayOption[];
/** "আপনি কোন দিন দেখা করতে চাইছেন?" + day name & date lines. Buttons stay আজকে/আগামীকাল. */
export declare function buildDayPrompt(options: AppointmentDayOption[]): string;
/** Age: digits only (Bengali digits accepted), 0–130. */
export declare function parseAge(raw: string): number | null;
/** Weight in kg: digits (+ optional decimal), 1–500. */
export declare function parseWeight(raw: string): number | null;
/** Phone: keeps digits (incl. +880), needs 10–14 digits starting sensibly. */
export declare function parsePhone(raw: string): string | null;
/** Numbered chamber list text, e.g. "1. Popular Hospital — সৈয়দপুর, নীলফামারী". */
export declare function buildChamberListText(chambers: AppointmentChamber[]): string;
/** Buttons for each available chamber: chsel_<chamberId>. */
export declare function buildChamberButtons(chambers: AppointmentChamber[]): Array<{
    id: string;
    title: string;
}>;
/** True when the user tapped a chamber button (chsel_<id>). */
export declare function isChamberClick(raw: string, buttonId: string): boolean;
/** Chamber id from a chsel_<id> click ("" when not a click). */
export declare function extractChamberId(raw: string, buttonId: string): string;
/**
 * Match a chamber from button click, typed number ("2"), or typed name.
 * Returns null when nothing matches.
 */
export declare function matchChamber(chambers: AppointmentChamber[], rawText: string, buttonId: string): AppointmentChamber | null;
/**
 * Day availability for ONE chamber: schedules tied to it win; when the
 * chamber has no own schedules, fall back to the doctor's full roster.
 */
export declare function schedulesForChamber(schedules: Array<{
    dayOfWeek: string;
    chamberId?: string | null;
}>, chamberId: string): Array<{
    dayOfWeek: string;
}>;
/** Price line for the selected chamber, e.g. "নতুন: ৭০০ টাকা | পুরনো: ৬০০ টাকা". */
export declare function buildFeeLine(c: {
    newFee: number;
    oldFee: number;
}): string;
//# sourceMappingURL=doctorQA.d.ts.map