// Isolated service layer for the authentication module.
// Mirrors src/whatsappChatbot/services/* and src/publicWebsite/services/*.
// Holds token generation + OTP helpers so controllers stay thin.
import jwt from 'jsonwebtoken';
export const generateTokens = (userId, role) => {
    const accessToken = jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
export const getOTPExpiry = (minutes = 10) => {
    return new Date(Date.now() + minutes * 60 * 1000);
};
//# sourceMappingURL=authService.js.map