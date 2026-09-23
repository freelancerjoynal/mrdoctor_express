export { verifyOTP, login, refresh, logout, forgotPassword, resetPassword } from './controllers/authController.js';
export { getProfile } from './controllers/profileController.js';
export { generateTokens, generateOTP, getOTPExpiry } from './services/authService.js';
export { protectedRoute } from './middleware/authMiddleware.js';
export type { AuthenticatedRequest, AuthRequest, UserRole } from './middleware/authMiddleware.js';
export { authRouter, profileRouter } from './routes/index.js';
//# sourceMappingURL=index.d.ts.map