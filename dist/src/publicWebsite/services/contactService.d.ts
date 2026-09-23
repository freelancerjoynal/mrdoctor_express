export declare const CONTACT_TOPICS: readonly ["GENERAL", "BOOKING", "REFUND", "SUPPORT", "DOCTOR_JOIN", "HOSPITAL_JOIN", "FEEDBACK"];
export type ContactTopic = (typeof CONTACT_TOPICS)[number];
export interface SubmitContactInput {
    name: string;
    phone: string;
    email?: string;
    topic?: string;
    subject?: string;
    message: string;
}
export declare function submitContactMessage(input: SubmitContactInput): Promise<{
    id: string;
    createdAt: Date;
    status: string;
}>;
//# sourceMappingURL=contactService.d.ts.map