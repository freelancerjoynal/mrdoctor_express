export declare const generateTokens: (userId: string, role: string) => {
    accessToken: string;
    refreshToken: string;
};
export declare const generateOTP: () => string;
export declare const getOTPExpiry: (minutes?: number) => Date;
//# sourceMappingURL=authService.d.ts.map