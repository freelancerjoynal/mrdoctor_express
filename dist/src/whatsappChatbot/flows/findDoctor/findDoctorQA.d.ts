export declare const FIND_DOCTOR_TEXTS: {
    ASK_PROBLEM: string;
    AI_THINKING: string;
    AI_CATEGORY_OK: (department: string) => string;
    AI_CATEGORY_FAIL: string;
    ASK_AREA: (department: string, why: string) => string;
    ASK_AREA_RETRY: string;
    PROCESSING: string;
    ANALYZING: string;
    INVALID_PROBLEM: string;
    INVALID_LOCATION: string;
    NEARBY_HEADER: (detected: string) => string;
    NO_AREA_DOCTOR: (location: string) => string;
    AREA_RESULT_HEADER: (location: string, department: string) => string;
    SELECT_PROMPT: string;
    CONNECTED: (doctorName: string) => string;
    FALLBACK: string;
};
export interface FindDoctorFaqItem {
    /** Short label, e.g. "fee". Only for you to read — never shown to users. */
    id: string;
    /** If the user text contains ANY of these (case-insensitive), this answer wins. */
    keywords: string[];
    /** The answer. Keep it generic (no single-doctor data available here). */
    answer: string;
}
export declare const FIND_DOCTOR_FAQ: FindDoctorFaqItem[];
/** Free-text lookup. Returns the answer or null. First keyword hit wins. */
export declare function getFindDoctorFaqAnswer(normText: string): string | null;
export declare const CONNECT_BUTTON_TITLE = "Connect \u0995\u09B0\u09C1\u09A8";
export declare function buildConnectButton(username: string): {
    id: string;
    title: string;
};
export declare function isConnectClick(raw: string, buttonId: string): boolean;
export declare function extractConnectUsername(raw: string, buttonId: string): string;
export declare function buildTrackingSummary(data: {
    problem?: string;
    department?: string;
    location?: string;
    candidates?: string[];
}): string;
//# sourceMappingURL=findDoctorQA.d.ts.map