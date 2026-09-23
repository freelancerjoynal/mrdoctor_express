/** Persist per-step tracking so a dropped session can resume later. */
export declare function trackFlowStep(phoneNumber: string, targetType: string, flow: string, step: string, targetName: string, targetId?: string | null): Promise<void>;
/** Direct doctor/hospital connect tracking (has a real target id). */
export declare function saveConnectSession(phoneNumber: string, targetType: "DOCTOR" | "HOSPITAL", targetId: string, targetName: string, lastFlow: string, lastStep: string): Promise<void>;
export declare function clearChatSession(phoneNumber: string): Promise<void>;
//# sourceMappingURL=chatSession.d.ts.map