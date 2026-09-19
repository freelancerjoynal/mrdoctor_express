// Central entry for the authentication setup.
// All auth controllers / services / libs / middleware live under src/authentication/*
// Localized routing lives in src/authentication/routes/*.
// Fully isolated from src/whatsappChatbot/* and src/publicWebsite/*.

export { verifyOTP, login, refresh, logout, forgotPassword, resetPassword } from './controllers/authController.js';
export { getProfile } from './controllers/profileController.js';
export { generateTokens, generateOTP, getOTPExpiry } from './services/authService.js';
export { sendOTPEmail, sendNewPasswordEmail } from './lib/mailer.js';
export { protectedRoute } from './middleware/authMiddleware.js';
export type { AuthenticatedRequest, AuthRequest, UserRole } from './middleware/authMiddleware.js';
export { authRouter, profileRouter } from './routes/index.js';
