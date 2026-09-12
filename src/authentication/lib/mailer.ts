import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// create the mail transporter using mailtrap credentials
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

// function to send verification otp during signup or login
export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  await transporter.sendMail({
    from: '"Auth System" <no-reply@example.com>',
    to: email,
    subject: "Verification Code",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    html: `<b>Your OTP is: ${otp}</b><p>It will expire in 10 minutes.</p>`
  });
};

// function to send staff login credentials when a doctor invites staff
export const sendStaffCredentialsEmail = async (email: string, tempPassword: string, doctorName: string): Promise<void> => {
  await transporter.sendMail({
    from: '"MrDoctor" <no-reply@mrdoctor.com>',
    to: email,
    subject: "আপনার স্টাফ লগইন তথ্য — MrDoctor",
    text: `${doctorName} আপনাকে স্টাফ হিসেবে যোগ করেছেন।\n\nইমেইল: ${email}\nপাসওয়ার্ড: ${tempPassword}\n\nএই তথ্য দিয়ে লগইন করুন। লগইনের পর ইমেইলে পাঠানো ওটিপি দিয়ে ভেরিফাই করুন।`,
    html: `
      <h3>${doctorName} আপনাকে স্টাফ হিসেবে যোগ করেছেন</h3>
      <p>ইমেইল: <b>${email}</b></p>
      <p>পাসওয়ার্ড: <b>${tempPassword}</b></p>
      <p>এই তথ্য দিয়ে লগইন করুন। লগইনের পর ইমেইলে পাঠানো ওটিপি দিয়ে ভেরিফাই করুন।</p>
    `
  });
};

// function to send newly generated password to the user
export const sendNewPasswordEmail = async (email: string, newPassword: string): Promise<void> => {
  await transporter.sendMail({
    from: '"Auth System" <no-reply@example.com>',
    to: email,
    subject: "Your New Password",
    text: `Your password has been reset. Your new temporary password is: ${newPassword}. Please login and change it immediately.`,
    html: `
      <h3>Password Reset Successful</h3>
      <p>Your new temporary password is: <b>${newPassword}</b></p>
      <p>Please login and change your password as soon as possible for security reasons.</p>
    `
  });
};
