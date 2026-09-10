// Shared session types + small helpers for all chatbot flows.

export interface ChatbotSessionData {
    problem?: string;
    department?: string;
    departmentWhy?: string;
    location?: string;
    category?: string;
    candidates?: string[];
    hospitalCandidates?: string[];
    hospitalId?: string;
    hospitalName?: string;
    departments?: string[];
    doctorsInDept?: string[];
    confirmed?: boolean;
    confirmedChoice?: string;
    doctorId?: string;
    hospitalSlug?: string;
    name?: string;
    username?: string;
    [key: string]: any;
}

export interface ChatbotSession {
    flow: string;
    step: string;
    data: ChatbotSessionData;
}

export type UpdateFn = (flow: string, step: string, data: any) => void;
export type ResetFn = () => void;

export function getButtonId(msg: any): string {
    return (
        msg?.buttonId ||
        msg?.buttonReply?.id ||
        msg?.interactive?.button_reply?.id ||
        msg?.interactive?.button_reply?.button_id ||
        ""
    );
}

export function getLocationText(text: string, msg: any): string {
    if (msg?.location?.latitude && msg?.location?.longitude) {
        return `Lat:${msg.location.latitude},Lng:${msg.location.longitude}`;
    }
    return (text || "").trim();
}

export function isGpsLocation(location: string): boolean {
    return /lat\s*:/i.test(location || "");
}

/** Fisher-Yates shuffle (random pick helper). */
export function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j]!, a[i]!];
    }
    return a;
}

const ENTRY_WORDS = [
    "ডাক্তার", "doctor", "doc_btn", "find", "hospital", "হসপিটাল",
    "hosp", "menu", "মেনু", "hi", "hello", "start", "home",
];

/** Words that mean menu navigation — never a real problem/location. */
export function isEntryWord(text: string): boolean {
    const t = (text || "").toLowerCase().trim();
    if (!t) return true;
    return ENTRY_WORDS.some((w) => t === w || (t.length < 12 && t.includes(w)));
}

export function isValidProblem(text: string): boolean {
    return (text || "").trim().length >= 3;
}

export function isValidLocation(text: string): boolean {
    return (text || "").trim().length >= 2;
}

/** WhatsApp button titles are capped at 20 chars by Meta. */
export function shortTitle(s: string, max = 20): string {
    const t = (s || "").trim();
    return t.length > max ? t.slice(0, max - 1) + "…" : t;
}

/** Slug-ish short id for buttons (uuid-safe fallback = index based). */
export function safeId(prefix: string, value: string): string {
    return `${prefix}_${value}`.slice(0, 200);
}
