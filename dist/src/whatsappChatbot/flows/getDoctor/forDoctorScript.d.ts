export declare const DOC_MALE_ID = "doc_male";
export declare const DOC_FEMALE_ID = "doc_female";
export declare const DOC_SEEN_YES_ID = "doc_seen_yes";
export declare const DOC_SEEN_NO_ID = "doc_seen_no";
export declare const DOC_PAY_YES_ID = "doc_pay_yes";
export declare const DOC_PAY_NO_ID = "doc_pay_no";
export declare const DUMMY_TERMS_LINK = "https://mrdoctor.com.bd/terms";
export declare const DUMMY_PAYMENT_LINK = "https://mrdoctor.com.bd/pay";
export declare const DOC_ONTIME_NOTE = "\u23F0 \u09A6\u09AF\u09BC\u09BE \u0995\u09B0\u09C7 \u09B8\u09A0\u09BF\u0995 \u09B8\u09AE\u09AF\u09BC\u09C7 \u099A\u09C7\u09AE\u09CD\u09AC\u09BE\u09B0\u09C7 \u09AA\u09CC\u0981\u099B\u09C7 \u09AF\u09BE\u09AC\u09C7\u09A8\u0964";
export interface DocScript {
    /** One-time back instruction sent after the greeting (back itself always works). */
    backInfo: string;
    step1: string;
    step2: string;
    step3: {
        message: string;
        male: string;
        female: string;
    };
    step4: string;
    step5: string;
    step6: {
        message: string;
        yes: string;
        no: string;
    };
    step7: string;
    step8: string;
    step9: {
        message: string;
        yes: string;
        no: string;
    };
    step10yes1: string;
    step10yes2: string;
    step10no: string;
    backTitle: string;
}
/** The active script — JSON when loadable, DEFAULTS otherwise. */
export declare const DOC_SCRIPT: DocScript;
/** step_1 greeting with the doctor's dynamic name filled in. */
export declare function docStep1(doctorName: string): string;
/** step_3 message with the patient's name filled in. */
export declare function docStep3(name: string): string;
/** Visible Back button (uses the global back_btn id so history-back works). */
export declare function docBackButton(): {
    id: string;
    title: string;
};
export declare function docGenderButtons(): {
    id: string;
    title: string;
}[];
export declare function docHistoryButtons(): {
    id: string;
    title: string;
}[];
export declare function docPaymentButtons(): {
    id: string;
    title: string;
}[];
//# sourceMappingURL=forDoctorScript.d.ts.map