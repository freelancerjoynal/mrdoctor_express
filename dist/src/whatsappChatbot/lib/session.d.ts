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
    /** GPS nearest-area suggestions (Bengali names) offered as area_ buttons. */
    areaSuggestions?: string[];
    /** Closest detected area name (first of areaSuggestions). */
    detectedArea?: string;
    /** Step history for the Back button: {flow, step} pairs, oldest first. */
    _hist?: {
        flow: string;
        step: string;
    }[];
    [key: string]: any;
}
export interface ChatbotSession {
    flow: string;
    step: string;
    data: ChatbotSessionData;
}
export type UpdateFn = (flow: string, step: string, data: any) => void;
export type ResetFn = () => void;
export declare function getButtonId(msg: any): string;
export declare function getLocationText(text: string, msg: any): string;
/** Raw GPS coords from a shared device location (null when not shared). */
export declare function extractGps(msg: any): {
    lat: number;
    lng: number;
} | null;
/** Tapped one of the suggested nearby-area buttons (area_0, area_1, ...). */
export declare function isAreaClick(raw: string, buttonId: string): boolean;
/** Index of the tapped area button (-1 when invalid). */
export declare function extractAreaIdx(raw: string, buttonId: string): number;
export declare function isGpsLocation(location: string): boolean;
/** Fisher-Yates shuffle (random pick helper). */
export declare function shuffle<T>(arr: T[]): T[];
/** Words that mean menu navigation — never a real problem/location. */
export declare function isEntryWord(text: string): boolean;
export declare function isValidProblem(text: string): boolean;
export declare function isValidLocation(text: string): boolean;
/** WhatsApp button titles are capped at 20 chars by Meta. */
export declare function shortTitle(s: string, max?: number): string;
/** Slug-ish short id for buttons (uuid-safe fallback = index based). */
export declare function safeId(prefix: string, value: string): string;
//# sourceMappingURL=session.d.ts.map