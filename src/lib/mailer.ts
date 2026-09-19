import "dotenv/config";
import nodemailer from "nodemailer";

// ------------------------------------------------------------------
// Generic mail transport. No business logic / templates here.
// To switch providers (Mailtrap -> Gmail -> SES -> etc.) only edit
// the transporter below + env vars. Callers pass ready-made
// { to, subject, text, html } via sendMail().
// ------------------------------------------------------------------

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST ?? process.env.MAILTRAP_HOST,
  port: Number(process.env.MAIL_PORT ?? process.env.MAILTRAP_PORT ?? 2525),
  auth: {
    user: process.env.MAIL_USER ?? process.env.MAILTRAP_USER,
    pass: process.env.MAIL_PASS ?? process.env.MAILTRAP_PASS,
  },
});

const DEFAULT_FROM =
  process.env.MAIL_FROM ?? '"MrDoctor" <no-reply@mrdoctor.com>';

export interface SendMailInput {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

export async function sendMail(input: SendMailInput): Promise<void> {
  const { to, subject, text, html, from, cc, bcc, replyTo } = input;
  await transporter.sendMail({
    from: from ?? DEFAULT_FROM,
    to: Array.isArray(to) ? to.join(", ") : to,
    subject,
    text,
    html,
    cc,
    bcc,
    replyTo,
  });
}

export { transporter };
