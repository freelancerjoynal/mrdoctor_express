import "dotenv/config";
import nodemailer from "nodemailer";

// ------------------------------------------------------------------
// Generic mail transport. No business logic / templates here.
// To switch providers (Mailtrap -> Gmail -> SES -> etc.) only edit
// the transporter below + env vars. Callers pass ready-made
// { to, subject, text, html } via sendMail().
//
// Mailtrap LIVE SMTP (verified domain):
//   MAILTRAP_HOST="live.smtp.mailtrap.io"  MAILTRAP_PORT=587
//   MAILTRAP_HOST_USER="api"  MAILTRAP_HOST_PASS=<API_TOKEN>
//   MAILTRAP_HOST_FROM='"MrDoctor" <hello@mrdoctor.com.bd>'
// MAILTRAP_ACCESS_TOKEN is accepted as the password fallback.
// Legacy names (MAIL_HOST/MAIL_PORT/MAIL_USER/MAIL_PASS/MAIL_FROM and
// MAILTRAP_HOST/MAILTRAP_PORT/MAILTRAP_USER/MAILTRAP_PASS) still work.
// ------------------------------------------------------------------

const host =
  process.env.MAILTRAP_HOST ??
  process.env.MAIL_HOST ??
  "live.smtp.mailtrap.io";
const port = Number(
  process.env.MAILTRAP_PORT ?? process.env.MAIL_PORT ?? 587
);
// Live SMTP logs in as user "api" with the API token as password.
const user =
  process.env.MAILTRAP_HOST_USER ??
  process.env.MAIL_USER ??
  process.env.MAILTRAP_USER ??
  "api";
const pass =
  process.env.MAILTRAP_HOST_PASS ??
  process.env.MAILTRAP_ACCESS_TOKEN ??
  process.env.MAIL_PASS ??
  process.env.MAILTRAP_PASS;

const transporter = nodemailer.createTransport({
  host,
  port,
  // Port 465 = implicit TLS; 587/2525/25 = STARTTLS (required by Mailtrap).
  secure: port === 465,
  requireTLS: port !== 465,
  auth: { user, pass },
});

const DEFAULT_FROM =
  process.env.MAILTRAP_HOST_FROM ??
  process.env.MAIL_FROM ??
  '"MrDoctor" <hello@mrdoctor.com.bd>';

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
