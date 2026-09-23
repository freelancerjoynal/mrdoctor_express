export declare const HOSPITAL_TEXTS: {
    ASK_AREA: string;
    PROCESSING: string;
    INVALID_LOCATION: string;
    NEARBY_HEADER: (detected: string) => string;
    NO_HOSPITAL: (location: string) => string;
    HOSPITAL_LIST_HEADER: (location: string) => string;
    ASK_DEPT: (hospitalName: string) => string;
    NO_DEPT: string;
    DEPT_DOCTORS_HEADER: (hospitalName: string, dept: string) => string;
    SELECT_DOCTOR_PROMPT: string;
    CONNECTED: (doctorName: string) => string;
    FALLBACK: string;
};
export interface HospitalFaqItem {
    /** Short label, e.g. "fee". Only for you to read — never shown to users. */
    id: string;
    /** If the user text contains ANY of these (case-insensitive), this answer wins. */
    keywords: string[];
    /** The answer. Keep it generic (no single-hospital data available here). */
    answer: string;
}
export declare const HOSPITAL_FAQ: HospitalFaqItem[];
/** Free-text lookup. Returns the answer or null. First keyword hit wins. */
export declare function getHospitalFaqAnswer(normText: string): string | null;
export declare function buildTrackingSummary(data: {
    location?: string;
    hospitalName?: string;
    department?: string;
}): string;
//# sourceMappingURL=hospitalQA.d.ts.map