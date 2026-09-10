// QA for direct doctor bot (GET_DOCTOR_FLOW) — new schema (chambers + hospital).

export const DOCTOR_TEXTS = {
    WAITING_TEXT: "⏳ দয়া করে অপেক্ষা করুন, ডাক্তার সাহেব আপনার সাথে সংযুক্ত হচ্ছেন… ⏳",
    NOT_FOUND: "❌ দুঃখিত, এই ডাক্তারের কোনো তথ্য পাওয়া যায়নি। মূল মেনুতে যেতে 'menu' লিখুন।",
    SESSION_RESET: "সেশন রিসেট হয়ে গেছে। দয়া করে আবার লিংক থেকে প্রবেশ করুন অথবা 'menu' লিখুন।",
    DB_ERROR: "❌ তথ্য লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",

    welcomeMessage: (doctorName: string) => `Hi, ami ${doctorName} বলছি`,
    chamberLocation: (places: string) => `আমার চেম্বারের ঠিকানা:\n${places || "চেম্বার নির্ধারিত নেই"}`,
    mobileNumber: (phone: string | null) =>
        phone ? `আমার মোবাইল নম্বর: ${phone}` : "দুঃখিত, এই মুহূর্তে মোবাইল নম্বর দেওয়া নেই।",
    scheduleInfo: (lines: string) =>
        lines ? `🗓️ আমার চেম্বার সময়সূচি:\n${lines}` : "দুঃখিত, সময়সূচি এখনো দেওয়া হয়নি।",
    feeInfo: (lines: string) =>
        lines ? `💰 আমার ভিজিট ফি:\n${lines}` : "দুঃখিত, ভিজিট ফি এখনো নির্ধারণ করা হয়নি।",
    fallbackResponse: (doctorName: string) =>
        `আমি ${doctorName || "ডাক্তার"} বলছি। এই বিষয়ে আমি কোনো উত্তর দিতে পারব না।`,
};

export interface DoctorAnswer {
    message: string;
    buttons?: { id: string; title: string }[];
}

export interface DoctorCardData {
    doctorId: string;
    name: string;
    chambersText: string;
    phone: string | null;
    scheduleText: string;
    feeText: string;
}

/** One normalized user text in -> one answer out. */
export function getDoctorAnswer(normText: string, doctor: DoctorCardData): DoctorAnswer {
    const text = (normText || "").toLowerCase().trim();

    switch (true) {
        case text.includes("location"):
        case text.includes("লোকেশন"):
        case text.includes("chamber"):
        case text.includes("চেম্বার"):
        case text.includes("ঠিকানা"):
        case text.includes("কোথায়"):
        case text.includes("কোথায়"):
            return {
                message: DOCTOR_TEXTS.chamberLocation(doctor.chambersText),
                buttons: [{ id: `mobile_${doctor.doctorId}`, title: "মোবাইল নম্বর জানতে চাই" }],
            };

        case text.includes("mobile"):
        case text.includes("মোবাইল"):
        case text.includes("নম্বর"):
        case text.includes("number"):
        case text.includes("phone"):
            return { message: DOCTOR_TEXTS.mobileNumber(doctor.phone) };

        case text.includes("schedule"):
        case text.includes("সময়"):
        case text.includes("সময়"):
        case text.includes("কখন"):
        case text.includes("বার"):
        case text.includes("visiting hour"):
            return { message: DOCTOR_TEXTS.scheduleInfo(doctor.scheduleText) };

        case text.includes("visiting fee"):
        case text.includes("fee"):
        case text.includes("ভিজিট"):
        case text.includes("ফি"):
        case text.includes("টাকা"):
        case text.includes("খরচ"):
            return { message: DOCTOR_TEXTS.feeInfo(doctor.feeText) };

        case text.includes("serial"):
        case text.includes("appointment"):
        case text.includes("সিরিয়াল"):
        case text.includes("অ্যাপয়েন্টমেন্ট"):
            return { message: "সিরিয়াল নিতে চাইলে চেম্বারের নম্বরে যোগাযোগ করুন।" };

        default:
            return {
                message: DOCTOR_TEXTS.fallbackResponse(doctor.name),
                buttons: [
                    { id: `location_${doctor.doctorId}`, title: "লোকেশন জানতে চাই" },
                    { id: `mobile_${doctor.doctorId}`, title: "মোবাইল নম্বর জানতে চাই" },
                ],
            };
    }
}
