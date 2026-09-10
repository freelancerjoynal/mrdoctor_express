// Single Question-Answer file for GetDoctor flow.
// One question -> one answer, handled one-by-one with a sync switch.
// To add a new Q&A, just add a new `case` below.

export const DOCTOR_TEXTS = {
    WAITING_TEXT: "⏳ দয়া করে অপেক্ষা করুন, ডাক্তার সাহেদ আপনার সাথে সংযুক্ত হচ্ছেন… ⏳",
    NOT_FOUND: "❌ দুঃখিত, এই ডাক্তারের কোনো তথ্য পাওয়া যায়নি। মূল মেনুতে যেতে 'menu' লিখুন।",
    SESSION_RESET: "সেশন রিসেট হয়ে গেছে। দয়া করে আবার লিংক থেকে প্রবেশ করুন অথবা 'menu' লিখুন।",
    DB_ERROR: "❌ তথ্য লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",

    welcomeMessage: (doctorName: string) => `Hi, ami ${doctorName} bolchi, apnake kivabe help korte pari?`,
    chamberLocation: (workingPlace: string) => `আমার চেম্বারের ঠিকানা: ${workingPlace || "চেম্বার নির্ধারিত নেই"}`,
    mobileNumber: (phone: string | null) =>
        phone ? `আমার মোবাইল নম্বর: ${phone}` : "দুঃখিত, এই মুহূর্তে মোবাইল নম্বর দেওয়া নেই।",
    fallbackResponse: (doctorName: string) =>
        `আমি ${doctorName || "ডাক্তার"} বলছি। এই বিষয়ে আমি কোনো উত্তর দিতে পারব না।`,
};

export interface DoctorAnswer {
    message: string;
    buttons?: { id: string; title: string }[];
}

interface DoctorData {
    doctorId: string;
    name: string;
    workingPlace: string;
    phone: string | null;
}

// Sync switch: one normalized user text in, one answer out.
export function getDoctorAnswer(normText: string, doctor: DoctorData): DoctorAnswer {
    const text = (normText || "").toLowerCase().trim();

    switch (true) {
        // Q1: Location / Chamber / Address
        case text.includes("location"):
        case text.includes("লোকেশন"):
        case text.includes("chamber"):
        case text.includes("চেম্বার"):
        case text.includes("ঠিকানা"):
            return {
                message: DOCTOR_TEXTS.chamberLocation(doctor.workingPlace),
                buttons: [{ id: `mobile_${doctor.doctorId}`, title: "হ্যাঁ, মোবাইল নম্বর জানতে চাই" }],
            };

        // Q2: Mobile / Phone number
        case text.includes("mobile"):
        case text.includes("মোবাইল"):
        case text.includes("নম্বর"):
        case text.includes("number"):
        case text.includes("phone"):
            return {
                message: DOCTOR_TEXTS.mobileNumber(doctor.phone),
            };

        // Q3: Visiting fee
        case text.includes("visiting fee"):
        case text.includes("fee"):
        case text.includes("ভিজিট"):
        case text.includes("ফি"):
            return {
                message: "আমার ভিজিট ৫০০ টাকা।",
            };

        // Q4: Serial / Appointment
        case text.includes("serial"):
        case text.includes("appointment"):
        case text.includes("সিরিয়াল"):
        case text.includes("অ্যাপয়েন্টমেন্ট"):
            return {
                message: "সিরিয়াল নিতে চাইলে চেম্বারের নম্বরে যোগাযোগ করুন।",
            };

        //Problem analysis
        case text.includes("problem"):
        case text.includes("problem analysis"):
            return {
                message: "We will analyze your problem analysis.",
            };




        // Default: fallback + both option buttons
        default:
            return {
                message: DOCTOR_TEXTS.fallbackResponse(doctor.name),
                buttons: [
                    { id: `location_${doctor.doctorId}`, title: "হ্যাঁ, লোকেশন জানতে চাই" },
                    { id: `mobile_${doctor.doctorId}`, title: "হ্যাঁ, মোবাইল নম্বর জানতে চাই" },
                ],
            };
    }
}
