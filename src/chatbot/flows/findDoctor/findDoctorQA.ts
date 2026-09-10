// QA texts for FIND-DOCTOR flow (new schema).
// Flow: problem -> AI suggests department + why -> ask area ->
// DB Chamber search by area -> random 5 doctors -> Connect -> direct doctor bot.

export const FIND_DOCTOR_TEXTS = {
    ASK_PROBLEM: "রোগীর কী সমস্যা বা কী লক্ষণ দেখা যাচ্ছে বিস্তারিত লিখুন:",
    ASK_AREA: (department: string, why: string) =>
        `🩺 *সম্ভাব্য বিভাগ: ${department}*\n${why}\n\n───────────────────\n📍 *আপনি কোন এলাকায় ডাক্তার খুঁজছেন?*\n\nএলাকার নাম লিখুন (যেমন: নীলফামারী সদর, সৈয়দপুর, ডোমার) অথবা লোকেশন শেয়ার করুন:`,
    ASK_AREA_RETRY:
        "📍 আপনি কোন এলাকায় ডাক্তার খুঁজছেন?\n\nএলাকার নাম লিখুন (যেমন: নীলফামারী সদর, সৈয়দপুর, ডোমার) অথবা লোকেশন শেয়ার করুন:",
    PROCESSING: "⏳ আপনার তথ্য প্রসেস করা হচ্ছে, সেরা ডাক্তার খোঁজা হচ্ছে… একটু অপেক্ষা করুন।",
    ANALYZING: "⏳ আপনার সমস্যা বিশ্লেষণ করা হচ্ছে… একটু অপেক্ষা করুন।",
    INVALID_PROBLEM:
        "দয়া করে রোগীর সমস্যাটি একটু বিস্তারিত লিখুন (কমপক্ষে ৩ অক্ষর)। যেমন: ৩ দিন ধরে জ্বর ও কাশি।",
    INVALID_LOCATION:
        "দয়া করে এলাকার নামটি লিখুন (যেমন: সৈয়দপুর) অথবা লোকেশন শেয়ার করুন।",
    NO_AREA_DOCTOR: (location: string) =>
        `❌ দুঃখিত, "${location}" এলাকায় কোনো ডাক্তার পাওয়া যায়নি।\n\nঅন্য এলাকার নাম লিখুন অথবা 'menu' লিখে মূল মেনুতে যান।`,
    AREA_RESULT_HEADER: (location: string, department: string) =>
        `✅ "${location}" এলাকায় *${department}* বিভাগের জন্য বাছাইকৃত ৫ জন ডাক্তার:\n`,
    SELECT_PROMPT:
        "───────────────────\n👆 উপরের ৫ জন থেকে যেকোনো ডাক্তারের *Connect* বাটনে চাপ দিন — সরাসরি সেই ডাক্তারের সাথে যুক্ত হয়ে যাবেন।\n\nঅন্য কিছু লিখলে আবার খুঁজতে হবে, অথবা 'menu' লিখে মূল মেনুতে যান।",
    CONNECTED: (doctorName: string) => `✅ *${doctorName}*-এর সাথে যুক্ত করা হচ্ছে…`,
    FALLBACK: "দুঃখিত, বুঝতে পারিনি। দয়া করে Connect বাটনে চাপ দিন অথবা 'menu' লিখুন।",
};

export const CONNECT_BUTTON_TITLE = "Connect করুন";

export function buildConnectButton(username: string) {
    return { id: `connect_${username}`, title: CONNECT_BUTTON_TITLE };
}

export function isConnectClick(raw: string, buttonId: string): boolean {
    const t = (raw || "").toLowerCase().trim();
    const id = (buttonId || "").toLowerCase().trim();
    return id.startsWith("connect_") || t.startsWith("connect_");
}

export function extractConnectUsername(raw: string, buttonId: string): string {
    const id = (buttonId || "").trim();
    if (id.toLowerCase().startsWith("connect_")) return id.slice("connect_".length).trim();
    const t = (raw || "").trim();
    if (t.toLowerCase().startsWith("connect_")) return t.slice("connect_".length).trim();
    return "";
}

export function buildTrackingSummary(data: {
    problem?: string;
    department?: string;
    location?: string;
    candidates?: string[];
}): string {
    const parts: string[] = ["🩺 *ডাক্তার খোঁজার অনুরোধ*"];
    if (data.problem) parts.push(`🤒 সমস্যা: ${data.problem}`);
    if (data.department) parts.push(`🏷️ বিভাগ: ${data.department}`);
    if (data.location) parts.push(`📍 এলাকা: ${data.location}`);
    if (data.candidates?.length) parts.push(`👨‍⚕️ সাজেশন: ${data.candidates.length} জন`);
    return parts.join("\n");
}
