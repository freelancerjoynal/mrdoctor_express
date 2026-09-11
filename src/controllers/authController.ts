import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { sendOTPEmail, sendNewPasswordEmail } from '../utils/mailer.js';
import { prisma } from '../lib/prisma.js';

// Helper function to generate access and refresh tokens (রোল সহ টোকেন জেনারেট করা হচ্ছে)
const generateTokens = (userId: string, role: string) => {
  const accessToken = jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId, role }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// 1. User Registration (Role সহ সাইনআপ হ্যান্ডেল করা)
export const signup = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // 2. Prisma Transaction (রোল পাঠানো না হলে ডিফল্ট BUSINESS_OWNER থাকবে)
    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: { 
          email, 
          password: hashedPassword, 
          role: role || 'DOCTOR', 
          otp, 
          otpExpiry 
        }
      });

      try {
        await sendOTPEmail(email, otp);
      } catch (emailError) {
        console.error("User creation aborted. Mail server error details:", emailError);
        throw new Error("OTP_SEND_FAILED");
      }
    });

    return res.status(201).json({ message: 'Signup successful! Verification OTP has been sent to your email.' });

  } catch (error: any) {
    if (error.message === "OTP_SEND_FAILED") {
      return res.status(500).json({ error: 'Failed to send verification email. Account creation rolled back.' });
    }

    console.error("Actual Signup Error:", error); 
    return res.status(500).json({ error: error.message || 'An unexpected error occurred during signup.' });
  }
};

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
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otp: newOtp, otpExpiry: otpExpiry }
    });

    await sendOTPEmail(email, newOtp);

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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiry }
    });

    await sendOTPEmail(email, otp);
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

    await sendNewPasswordEmail(email, newRawPassword);

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