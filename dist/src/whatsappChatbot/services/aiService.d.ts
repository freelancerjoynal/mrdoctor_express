export declare function getOpenAIResponse(prompt: string): Promise<string>;
export interface DepartmentSuggestion {
    department: string;
    why: string;
}
export interface CategoryPick {
    bn: string;
    en: string;
}
/**
 * Accurate triage: pick ONE category from the FULL master speciality list
 * using DeepSeek, BEFORE any location filtering. The caller then fetches
 * the DB by (category + area). This fixes the old inaccurate behaviour
 * where the AI was forced to choose only from the tiny available list of
 * one thana (e.g. sneezing -> wrongly mapped to Physical Medicine).
 */
export declare function suggestCategoryFromFullList(problem: string, masterList: {
    bn: string;
    en: string;
}[]): Promise<CategoryPick | null>;
/**
 * Token-lean triage: pick ONE speciality from the already-filtered
 * available list (chambers in this thana) for the patient's problem.
 * Only the bare minimum goes to the API — problem capped at 300 chars,
 * location label, and the short allowed-name list. No schedules, chambers,
 * history, or full 50-item master list. Returns the exact allowed Bengali
 * name, or null when the reply is unusable.
 */
export declare function suggestAvailableSpeciality(problem: string, locationLabel: string, allowed: string[]): Promise<string | null>;
/**
 * Step 1 of doctor search: given the patient's problem (Bengali/English),
 * suggest which department/speciality of doctor they need + 1-2 line reason.
 * Returns JSON-parsed result with safe fallback.
 */
export declare function suggestDepartment(problem: string): Promise<DepartmentSuggestion>;
//# sourceMappingURL=aiService.d.ts.map