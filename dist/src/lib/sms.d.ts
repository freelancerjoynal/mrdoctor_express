/**
 * OTP SMS text in the gateway's REQUIRED template:
 * "Your {Brand/Company Name} OTP is XXXX" (BulkSMSBD docs).
 * Operator/BTRC filters drop OTP-type SMS in any other format or script —
 * so this stays pure ASCII with English digits. Brand via SMS_OTP_BRAND.
 */
export declare function otpSmsText(otp: string): string;
export declare function singleMessage(number: string, message: string): Promise<any>;
//# sourceMappingURL=sms.d.ts.map