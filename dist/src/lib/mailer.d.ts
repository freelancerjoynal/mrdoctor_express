import "dotenv/config";
import nodemailer from "nodemailer";
declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo, import("nodemailer/lib/smtp-transport/index.js").Options>;
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
export declare function sendMail(input: SendMailInput): Promise<void>;
export { transporter };
//# sourceMappingURL=mailer.d.ts.map