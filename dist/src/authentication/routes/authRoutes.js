// Isolated routing for the authentication module.
// Mounted by src/server.ts via ./authentication/routes/index.js
// Mirrors src/whatsappChatbot/routes/* and src/publicWebsite/routes/*.
import express from 'express';
import { verifyOTP, login, refresh, logout, forgotPassword, resetPassword } from '../controllers/authController.js';
const authRouter = express.Router();
// NOTE: public self-registration is removed. Doctors/hospitals apply via
// POST /api/applications/doctor|hospital and SUPER_ADMIN creates their
// accounts (or approves the application). This endpoint stays as a 410 so
// old clients get an explicit message instead of a silent 404.
authRouter.post('/signup', (_req, res) => {
    return res.status(410).json({
        error: 'Registration is closed. Please apply from the website — the admin will create your account after approval.',
    });
});
authRouter.post('/verify', verifyOTP); // This now verifies and logs in instantly
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);
// Password Reset routes
authRouter.post('/forgot-password', forgotPassword); // Sends OTP
authRouter.post('/reset-password', resetPassword); // Verifies OTP & sends new password
export default authRouter;
//# sourceMappingURL=authRoutes.js.map