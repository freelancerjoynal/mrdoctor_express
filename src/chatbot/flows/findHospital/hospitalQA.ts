// QA texts for FIND-HOSPITAL flow (new schema).
// Flow: ask area -> random 5 hospitals (DB) -> hospital buttons ->
// departments of that hospital -> doctors of dept -> Connect (username -> doctor bot).

export const HOSPITAL_TEXTS = {
    ASK_AREA:
        "📍 আপনি কোন এলাকায় হসপিটাল খুঁজছেন?\n\nএলাকার নাম লিখুন (যেমন: নীলফামারী, সৈয়দপুর, রংপুর, ঢাকা) অথবা লোকেশন শেয়ার করুন:",
    PROCESSING: "⏳ আপনার এলাকায় সেরা হসপিটাল খোঁজা হচ্ছে… একটু অপেক্ষা করুন।",
    INVALID_LOCATION:
        "দয়া করে এলাকার নামটি লিখুন (যেমন: সৈয়দপুর) অথবা লোকেশন শেয়ার করুন।",
    NO_HOSPITAL: (location: string) =>
        `❌ দুঃখিত, "${location}" এলাকায় কোনো হসপিটাল পাওয়া যায়নি।\n\nঅন্য এলাকার নাম লিখুন অথবা 'menu' লিখে মূল মেনুতে যান।`,
    HOSPITAL_LIST_HEADER: (location: string) =>
        `✅ "${location}" এলাকায় পাওয়া ৫টি হসপিটাল:\n\nনিচে থেকে যেকোনো হসপিটালের *Select* বাটনে চাপ দিন 👇`,
    ASK_DEPT: (hospitalName: string) =>
        `🏥 *${hospitalName}*\n\nনিচে থেকে বিভাগ বেছে নিন — সেই বিভাগের ডাক্তার দেখানো হবে:`,
    NO_DEPT: "❌ এই হসপিটালে কোনো বিভাগ পাওয়া যায়নি। অন্য হসপিটাল বেছে নিন।",
    DEPT_DOCTORS_HEADER: (hospitalName: string, dept: string) =>
        `👨‍⚕️ *${hospitalName}* — *${dept}* বিভাগের ডাক্তারগণ:\n`,
    SELECT_DOCTOR_PROMPT:
        "───────────────────\n👆 উপরের ডাক্তারদের থেকে *Connect* বাটনে চাপ দিন — সরাসরি সেই ডাক্তারের সাথে যুক্ত হয়ে যাবেন।\n\nঅথবা 'menu' লিখে মূল মেনুতে যান।",
    CONNECTED: (doctorName: string) => `✅ *${doctorName}*-এর সাথে যুক্ত করা হচ্ছে…`,
    FALLBACK: "দুঃখিত, বুঝতে পারিনি। দয়া করে নিচের বাটন থেকে বেছে নিন অথবা 'menu' লিখুন।",
};

export function buildTrackingSummary(data: {
    location?: string;
    hospitalName?: string;
    department?: string;
}): string {
    const parts: string[] = ["🏥 *হসপিটাল খোঁজার অনুরোধ*"];
    if (data.location) parts.push(`📍 এলাকা: ${data.location}`);
    if (data.hospitalName) parts.push(`🏥 হসপিটাল: ${data.hospitalName}`);
    if (data.department) parts.push(`🏷️ বিভাগ: ${data.department}`);
    return parts.join("\n");
}
