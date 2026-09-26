// ============================================================================
// forDoctorScript.ts — JSON-driven script for the doctor-only bot.
// Direct doctor entry (dr-username) replies follow ./for-doctor-only.json,
// so wording/buttons are managed in the JSON, not in code.
// Missing keys fall back to DEFAULTS so the bot never breaks.
// Dummy links are used until the payment method is set up.
// ============================================================================
import { createRequire } from "node:module";
import { BACK_BUTTON } from "../../lib/navButtons.js";

// Stable button ids (titles come from the JSON, ids stay fixed for matching).
export const DOC_MALE_ID = "doc_male";
export const DOC_FEMALE_ID = "doc_female";
export const DOC_SEEN_YES_ID = "doc_seen_yes";
export const DOC_SEEN_NO_ID = "doc_seen_no";
export const DOC_PAY_YES_ID = "doc_pay_yes";
export const DOC_PAY_NO_ID = "doc_pay_no";

// Dummy links until the payment method is set up.
export const DUMMY_TERMS_LINK = "https://mrdoctor.com.bd/terms";
export const DUMMY_PAYMENT_LINK = "https://mrdoctor.com.bd/pay";
// step_10_yes next_action: serial slip + reach on time (no slip infra yet,
// so an on-time reminder line is sent after the payment link).
export const DOC_ONTIME_NOTE = "⏰ দয়া করে সঠিক সময়ে চেম্বারে পৌঁছে যাবেন।";

export interface DocScript {
    /** One-time back instruction sent after the greeting (back itself always works). */
    backInfo: string;
    step1: string;
    step2: string;
    step3: { message: string; male: string; female: string };
    step4: string;
    step5: string;
    step6: { message: string; yes: string; no: string };
    step7: string;
    step8: string;
    step9: { message: string; yes: string; no: string };
    step10yes1: string;
    step10yes2: string;
    step10no: string;
    backTitle: string;
}

const DEFAULTS: DocScript = {
    backInfo: "💡 মনে রাখবেন: যেকোনো ধাপে পেছনে যেতে চাইলে back লিখে পাঠান অথবা ↩️ ব্যাক বাটনে চাপ দিন।",
    step1: "আসসালামু আলাইকুম! 🙏 আমাদের সাথে যোগাযোগের জন্য ধন্যবাদ। আমি ডাক্তার {doctor_name}-এর অ্যাসিস্ট্যান্ট। চেম্বার বুকিং ও সিরিয়ালের বিষয়ে আপনাকে সাহায্য করছি।",
    step2: "📝 প্রথমে আপনার নামটি একটু জানাবেন কি?",
    step3: { message: "😊 ধন্যবাদ {patient_name}। আপনি কি পুরুষ নাকি নারী?", male: "🟢 পুরুষ", female: "🩷 নারী" },
    step4: "🎂 আপনার বয়স কত বছর?",
    step5: "⚖️ আপনার বর্তমান ওজন কত কেজি?",
    step6: { message: "🗂️ এর আগে কি কখনো আপনি এই ডাক্তারকে দেখিয়েছেন?", yes: "✅ হ্যাঁ, আগে দেখিয়েছি", no: "❌ না, প্রথমবার" },
    step7: "🩺 এবার সংক্ষেপে আপনার সমস্যাটি একটু জানান, কত দিন ধরে এই সমস্যা হচ্ছে?",
    step8: "📅 আপনি কবে চেম্বারে দেখাতে চান?",
    step9: { message: "💳 অনলাইন বুকিংয়ে সিরিয়াল সবার আগে নিশ্চিত হয়। এজন্য ডাক্তারের ভিজিটিং ফি অগ্রিম পেমেন্ট করতে হয়। অনলাইন ও অফলাইন উভয় সিরিয়াল একই সফটওয়্যারে সংযুক্ত থাকে। পেমেন্ট কনফার্ম করার পর আপনাকে আপনার সিরিয়াল নম্বর জানিয়ে দেওয়া হবে।\n\nআপনি কি পেমেন্ট করে বুকিং কনফার্ম করতে চান?", yes: "✅ হ্যাঁ", no: "❌ না" },
    step10yes1: "আমাদের কিছু সাধারণ নিয়মাবলী ও শর্ত রয়েছে, একনজর দেখে নিতে পারেন:\n🔗 [শর্তাবলীর লিংক]",
    step10yes2: "পেমেন্ট সম্পন্ন করতে নিচের লিংকে ক্লিক করুন:",
    step10no: "ঠিক আছে, সমস্যা নেই। পরবর্তীতে সরাসরি চেম্বারে যোগাযোগ করতে পারেন। শুধু এখানে একটি মেসেজ পাঠালেই আমরা যোগাযোগ করব। ভালো থাকবেন!",
    backTitle: "↩️ ব্যাক",
};

function str(v: unknown, fallback: string): string {
    if (typeof v !== "string") return fallback;
    const t = v.trim();
    return t || fallback;
}

function loadScript(): DocScript {
    try {
        const require = createRequire(import.meta.url);
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const raw = require("./for-doctor-only.json") as Record<string, any>;
        const btn = (arr: unknown, i: number, fallback: string): string => {
            if (!Array.isArray(arr)) return fallback;
            return str(arr[i], fallback);
        };
        return {
            backInfo: str(raw?.back_info, DEFAULTS.backInfo),
            step1: str(raw?.step_1?.bot_message, DEFAULTS.step1),
            step2: str(raw?.step_2?.bot_message, DEFAULTS.step2),
            step3: {
                message: str(raw?.step_3?.bot_message, DEFAULTS.step3.message),
                male: btn(raw?.step_3?.buttons, 0, DEFAULTS.step3.male),
                female: btn(raw?.step_3?.buttons, 1, DEFAULTS.step3.female),
            },
            step4: str(raw?.step_4?.bot_message, DEFAULTS.step4),
            step5: str(raw?.step_5?.bot_message, DEFAULTS.step5),
            step6: {
                message: str(raw?.step_6?.bot_message, DEFAULTS.step6.message),
                yes: btn(raw?.step_6?.buttons, 0, DEFAULTS.step6.yes),
                no: btn(raw?.step_6?.buttons, 1, DEFAULTS.step6.no),
            },
            step7: str(raw?.step_7?.bot_message, DEFAULTS.step7),
            step8: str(raw?.step_8?.bot_message, DEFAULTS.step8),
            step9: {
                // The JSON uses a literal " new line " where a break is wanted.
                message: str(raw?.step_9?.bot_message, DEFAULTS.step9.message).replace(/\s+new line\s+/gi, "\n\n"),
                yes: btn(raw?.step_9?.buttons, 0, DEFAULTS.step9.yes),
                no: btn(raw?.step_9?.buttons, 1, DEFAULTS.step9.no),
            },
            step10yes1: str(raw?.step_10_yes?.bot_message_part_1, DEFAULTS.step10yes1),
            // A stray trailing "paymen" means "payment link goes here" — the
            // dummy link is appended by the flow, so the token is dropped.
            step10yes2: str(raw?.step_10_yes?.bot_message_part_2, DEFAULTS.step10yes2).replace(/\s*paymen\s*$/i, ""),
            step10no: str(raw?.step_10_no?.bot_message, DEFAULTS.step10no),
            backTitle: btn(raw?.step_3?.buttons, 2, DEFAULTS.backTitle),
        };
    } catch {
        return DEFAULTS;
    }
}

/** The active script — JSON when loadable, DEFAULTS otherwise. */
export const DOC_SCRIPT: DocScript = loadScript();

/** step_1 greeting with the doctor's dynamic name filled in. */
export function docStep1(doctorName: string): string {
    const name = (doctorName || "").trim() || "ডক্টর";
    return DOC_SCRIPT.step1
        .replace("{doctor_name}", name)
        .replace("(ডক্টরে dynamic name)", name)
        .replace("[ডাক্তারের নাম]", name);
}

/** step_3 message with the patient's name filled in. */
export function docStep3(name: string): string {
    const who = (name || "").trim() || "আপনাকে";
    return DOC_SCRIPT.step3.message
        .replace("{patient_name}", who)
        .replace("[রোগীর নাম]", who);
}

/** Visible Back button (uses the global back_btn id so history-back works). */
export function docBackButton(): { id: string; title: string } {
    return { id: BACK_BUTTON.id, title: DOC_SCRIPT.backTitle };
}

export function docGenderButtons(): { id: string; title: string }[] {
    return [
        { id: DOC_MALE_ID, title: DOC_SCRIPT.step3.male },
        { id: DOC_FEMALE_ID, title: DOC_SCRIPT.step3.female },
        docBackButton(),
    ];
}

export function docHistoryButtons(): { id: string; title: string }[] {
    return [
        { id: DOC_SEEN_YES_ID, title: DOC_SCRIPT.step6.yes },
        { id: DOC_SEEN_NO_ID, title: DOC_SCRIPT.step6.no },
        docBackButton(),
    ];
}

export function docPaymentButtons(): { id: string; title: string }[] {
    return [
        { id: DOC_PAY_YES_ID, title: DOC_SCRIPT.step9.yes },
        { id: DOC_PAY_NO_ID, title: DOC_SCRIPT.step9.no },
        docBackButton(),
    ];
}
