// Isolated routing for the authentication module.
// Mounted by src/server.ts via ./authentication/routes/index.js
// Mirrors src/whatsappChatbot/routes/* and src/publicWebsite/routes/*.
import express from 'express';
import {
  signup,
  verifyOTP,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/verify', verifyOTP); // This now verifies and logs in instantly
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);

// Password Reset routes
authRouter.post('/forgot-password', forgotPassword); // Sends OTP
authRouter.post('/reset-password', resetPassword);   // Verifies OTP & sends new password

export default authRouter;
