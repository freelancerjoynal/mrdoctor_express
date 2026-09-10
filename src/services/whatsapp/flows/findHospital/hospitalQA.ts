// Single Question-Answer file for FIND-HOSPITAL flow.
// Mirrors doctorQA.ts: all questions, answers, buttons & validators live here.
// The flow file (findHospitalFlow.ts) only handles session / AI / sending logic.

export const HOSPITAL_TEXTS = {
    ASK_LOCATION:
        "📍 আপনি কোন এলাকায় হসপিটাল খুঁজছেন?\n\nএলাকার নাম লিখুন (যেমন: নীলফামারী, সৈয়দপুর, রংপুর, ঢাকা) অথবা আপনার লোকেশন শেয়ার করুন:",
    ASK_TYPE: "কোন ধরনের হসপিটাল চান? নিচে থেকে বেছে নিন:",
    ASK_SERVICE:
        "কোন সেবার জন্য হসপিটাল খুঁজছেন বিস্তারিত লিখুন:\n(যেমন: জরুরি চিকিৎসা, ভর্তি, টেস্ট, অপারেশন, গাইনি, শিশু)",
    PROCESSING: "⏳ আপনার তথ্য প্রসেস করা হচ্ছে, সেরা হসপিটাল খোঁজা হচ্ছে… একটু অপেক্ষা করুন।",
    INVALID_LOCATION:
        "দয়া করে এলাকার নামটি লিখুন (যেমন: সৈয়দপুর) অথবা লোকেশন শেয়ার করুন।",
    INVALID_SERVICE:
        "দয়া করে কী সেবা দরকার তা একটু বিস্তারিত লিখুন (কমপক্ষে ৩ অক্ষর)। যেমন: জরুরি ভর্তি দরকার।",
    CONFIRM_QUESTION:
        "───────────────────\n✅ উপরের তালিকা থেকে কোনো হসপিটালে যেতে চান?\n\nহসপিটালের নাম লিখুন অথবা নিচের বাটন থেকে বেছে নিন:",
    CONFIRMED: (summary: string) =>
        `✅ *কনফার্মেশন*\n\n${summary}\n\n🎯 আপনার অনুরোধটি ট্র্যাক করা হয়েছে। শীঘ্রই আমাদের টিম আপনার সাথে যোগাযোগ করবে ইনশাআল্লাহ। ✨\n\nমূল মেনুতে যেতে 'menu' লিখুন।`,
    FALLBACK: "দুঃখিত, বুঝতে পারিনি। দয়া করে নিচের বাটন থেকে বেছে নিন অথবা 'menu' লিখুন।",
};

export interface HospitalButton {
    id: string;
    title: string;
}

export const HOSPITAL_BUTTONS = {
    ASK_TYPE: [
        { id: "govt_hosp", title: "সরকারি হসপিটাল" },
        { id: "private_hosp", title: "প্রাইভেট হসপিটাল" },
        { id: "diagnostic_hosp", title: "ডায়াগনস্টিক সেন্টার" },
    ] as HospitalButton[],
    CONFIRM: [
        { id: "confirm_hosp_yes", title: "হ্যাঁ, যেতে চাই" },
        { id: "home_btn", title: "🏠 মূল মেনু" },
    ] as HospitalButton[],
};

// ---------- detectors (match BOTH button id and Bengali/English title) ----------

export function isGovtSelected(raw: string, buttonId: string): boolean {
    const t = (raw || "").toLowerCase();
    const id = (buttonId || "").toLowerCase();
    return id === "govt_hosp" || t.includes("সরকারি") || t.includes("govt") || t.includes("government");
}

export function isPrivateSelected(raw: string, buttonId: string): boolean {
    const t = (raw || "").toLowerCase();
    const id = (buttonId || "").toLowerCase();
    return id === "private_hosp" || t.includes("প্রাইভেট") || t.includes("private") || t.includes("বেসরকারি");
}

export function isDiagnosticSelected(raw: string, buttonId: string): boolean {
    const t = (raw || "").toLowerCase();
    const id = (buttonId || "").toLowerCase();
    return id === "diagnostic_hosp" || t.includes("ডায়াগনস্টিক") || t.includes("diagnostic") || t.includes("lab");
}

export function isHospitalTypeSelected(raw: string, buttonId: string): boolean {
    return (
        isGovtSelected(raw, buttonId) ||
        isPrivateSelected(raw, buttonId) ||
        isDiagnosticSelected(raw, buttonId)
    );
}

export function normalizeHospitalType(raw: string, buttonId: string): string {
    if (isGovtSelected(raw, buttonId)) return "সরকারি হসপিটাল";
    if (isPrivateSelected(raw, buttonId)) return "প্রাইভেট হসপিটাল";
    if (isDiagnosticSelected(raw, buttonId)) return "ডায়াগনস্টিক সেন্টার";
    return (raw || "").trim();
}

export function isConfirmYes(raw: string, buttonId: string): boolean {
    const t = (raw || "").toLowerCase();
    const id = (buttonId || "").toLowerCase();
    return (
        id === "confirm_hosp_yes" ||
        t.includes("যেতে চাই") ||
        t.includes("হ্যাঁ") ||
        t.includes("yes") ||
        t.includes("confirm")
    );
}

export function isValidLocation(text: string): boolean {
    return (text || "").trim().length >= 2;
}

export function isValidService(text: string): boolean {
    return (text || "").trim().length >= 3;
}

export function buildHospitalPrompt(location: string, hospType: string, service: string): string {
    return `
Context: Hospital Recommendation in Bangladesh
User wants a hospital in this area:
${location}

Preferred hospital type:
${hospType}

Needed service / problem:
${service}

Task / Instructions:
1. Suggest top 3 hospitals/diagnostic centers near the given area (use your general knowledge of Bangladesh hospitals).
2. Reply fully in Bengali.
3. For each hospital give: name, type (government/private), address, and 1-line reason why it fits.
4. If the area is outside major cities, suggest the nearest well-known hospitals plus the local upazila health complex.
    `.trim();
}

export function buildTrackingSummary(data: { location?: string; hospType?: string; service?: string }): string {
    const parts: string[] = ["🏥 *হসপিটাল খোঁজার অনুরোধ*"];
    if (data.location) parts.push(`📍 এলাকা: ${data.location}`);
    if (data.hospType) parts.push(`🏷️ ধরন: ${data.hospType}`);
    if (data.service) parts.push(`🩺 সেবা: ${data.service}`);
    return parts.join("\n");
}
