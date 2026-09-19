// Isolated controllers for the authentication module.
// Mirrors src/whatsappChatbot/controllers/* and src/publicWebsite/controllers/*.
// No imports from whatsappChatbot or publicWebsite.
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { sendMail } from '../../lib/mailer.js';
import { generateTokens, generateOTP, getOTPExpiry } from '../services/authService.js';
import { prisma } from '../../lib/prisma.js';

// 1. [REMOVED] Public self-registration is disabled — doctors/hospitals
// apply via POST /api/applications/doctor|hospital and SUPER_ADMIN creates
// their accounts. POST /api/auth/signup now returns 410 (see authRoutes).

// 2. Verify OTP and Automatic Login
export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Validate OTP and Expiry
    if (!user || user.otp !== otp || !user.otpExpiry || new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    // Update user: Verify and save refresh token
    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otp: null,
        otpExpiry: null,
        refreshToken: refreshToken
      }
    });

    // Set HTTP-Only Cookies
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: 'Verified and logged in successfully!', accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 3. Standard Login (প্রতিবার লগইনের সময় ওটিপি জেনারেট করে পাঠানো হবে)
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // প্রতিবার লগইনের সময় নতুন ওটিপি জেনারেট করা হবে
    const newOtp = generateOTP();
    const otpExpiry = getOTPExpiry();

    await prisma.user.update({
      where: { email },
      data: { otp: newOtp, otpExpiry: otpExpiry }
    });

    await sendMail({
      to: email,
      subject: 'Verification Code',
      text: `Your OTP is ${newOtp}. It will expire in 10 minutes.`,
      html: `<b>Your OTP is: ${newOtp}</b><p>It will expire in 10 minutes.</p>`,
    });

    // ইউজারকে জানিয়ে দেওয়া হচ্ছে যে ইমেইলে ওটিপি পাঠানো হয়েছে, ভেরিফাই করলেই লগইন কমপ্লিট হবে
    return res.status(200).json({
      message: 'Credentials verified. OTP has been sent to your email for login verification.',
      requiresOTP: true,
      email: user.email
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 4. Forget Password - Send OTP
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiry }
    });

    await sendMail({
      to: email,
      subject: 'Verification Code',
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      html: `<b>Your OTP is: ${otp}</b><p>It will expire in 10 minutes.</p>`,
    });
    res.json({ message: 'Reset OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 5. Reset Password - Verify OTP and send new generated password
export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.otp !== otp || !user.otpExpiry || new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const newRawPassword = crypto.randomBytes(4).toString('hex'); // 8 characters
    const hashedNewPassword = await bcrypt.hash(newRawPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedNewPassword,
        otp: null,
        otpExpiry: null
      }
    });

    await sendMail({
      to: email,
      subject: 'Your New Password',
      text: `Your password has been reset. Your new temporary password is: ${newRawPassword}. Please login and change it immediately.`,
      html: `
      <h3>Password Reset Successful</h3>
      <p>Your new temporary password is: <b>${newRawPassword}</b></p>
      <p>Please login and change your password as soon as possible for security reasons.</p>
    `,
    });

    res.json({ message: 'A new password has been sent to your email.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 6. Refresh Access Token
export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  try {
    const user = await prisma.user.findFirst({ where: { refreshToken } });
    if (!user) return res.status(403).json({ error: 'Invalid refresh token' });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string; role: string };
    const newAccessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' });

    res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.json({ message: 'Token refreshed', accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Session expired' });
  }
};

// 7. Logout
export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await prisma.user.updateMany({
      where: { refreshToken },
      data: { refreshToken: null }
    });
  }
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};
