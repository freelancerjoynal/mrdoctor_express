export declare function getOpenAIResponse(prompt: string): Promise<string>;
export interface DepartmentSuggestion {
    department: string;
    why: string;
}
/**
 * Step 1 of doctor search: given the patient's problem (Bengali/English),
 * suggest which department/speciality of doctor they need + 1-2 line reason.
 * Returns JSON-parsed result with safe fallback.
 */
export declare function suggestDepartment(problem: string): Promise<DepartmentSuggestion>;
//# sourceMappingURL=aiService.d.ts.map