// ============================================================================
// findDoctorQA.ts — texts for the FIND-DOCTOR flow
// Flow: problem -> DeepSeek picks category from FULL master list ->
// division -> district -> thana -> DB fetch by (category + area) ->
// no-doctor ? try different location + availability lists -> Connect.
// ============================================================================
//
// THIS FILE HAS 2 SECTIONS:
//   SECTION 1 — FLOW_PROMPTS: fixed step-by-step messages the flow sends
//               (ASK_PROBLEM, ASK_AREA, ...). One prompt = one field.
//   SECTION 2 — FIND_DOCTOR_FAQ: free-text questions the user might type
//               mid-flow ("ফি কত?", "সিরিয়াল কিভাবে?"). One question = one block.
//               Copy-paste a block to add Q&A #1001.
//
// Q&A MATCHING = first keyword hit wins (same as a switch statement, top to
// bottom). Put specific entries ABOVE general ones.
//
// ============================================================================
// ----------------------------------------------------------------------------
// SECTION 1: flow prompts (used by findDoctorFlow.ts — do not rename keys)
// ----------------------------------------------------------------------------
export const FIND_DOCTOR_TEXTS = {
    // Q: flow asks — what is the patient's problem? (FIRST step: AI triage before location)
    ASK_PROBLEM: "🤔 কোন ডাক্তার দেখাবেন বুঝতে পারছেন না? আপনার সমস্যাটি সংক্ষেপে লিখুন (যেমন: ৩ দিন ধরে জ্বর ও কাশি) — আমরা সঠিক বিভাগ সাজেস্ট করছি।\n\n↩️ পেছনে যেতে back লিখুন",
    // A: while DeepSeek picks the category from the full master list.
    AI_THINKING: "🤔 একটু ভাবছি, আপনার জন্য সঠিক বিভাগ খুঁজছি…",
    // A: AI picked a category (shown before the division picker).
    AI_CATEGORY_OK: (department) => `✅ আপনার সমস্যা অনুযায়ী *${department}* বিভাগের ডাক্তার দেখানো হচ্ছে।\n\nএখন এলাকা বেছে নিন 👇`,
    // A: AI could not classify — user picks manually later.
    AI_CATEGORY_FAIL: "😔 সমস্যাটি ঠিক বুঝতে পারিনি। এলাকা বেছে নিন — পরে তালিকা থেকে বিভাগ বেছে নিতে পারবেন 👇",
    // Q: flow asks — which area? (after AI suggests a department)
    ASK_AREA: (department, why) => `🩺 *সম্ভাব্য বিভাগ: ${department}*\n${why}\n\n───────────────────\n📍 *আপনি কোন এলাকায় ডাক্তার খুঁজছেন?*\n\n👇 সবচেয়ে ভালো উপায় — মোবাইলের লোকেশন পাঠান:\n1️⃣ চ্যাটে 📎 (Attach / ➕) বাটনে চাপ দিন\n2️⃣ Location বেছে নিন\n3️⃣ Send your current location পাঠান\n→ তাহলে আপনার কাছের এলাকা (যেমন: জলঢাকা, ডোমার, নীলফামারী) সাজেস্ট করবো।\n\nঅথবা এলাকার নাম লিখুন (যেমন: নীলফামারী সদর, সৈয়দপুর, ডোমার)।`,
    // Q: flow re-asks the area (user sent something unusable).
    ASK_AREA_RETRY: "📍 আপনি কোন এলাকায় ডাক্তার খুঁজছেন?\n\nমোবাইলের 📎 → Location থেকে লোকেশন পাঠান, অথবা এলাকার নাম লিখুন (যেমন: নীলফামারী সদর, সৈয়দপুর, ডোমার)।",
    // A: shown while searching the DB.
    PROCESSING: "⏳ আপনার তথ্য প্রসেস করা হচ্ছে, সেরা ডাক্তার খোঁজা হচ্ছে… একটু অপেক্ষা করুন।",
    // A: shown while AI analyzes the problem.
    ANALYZING: "⏳ আপনার সমস্যা বিশ্লেষণ করা হচ্ছে… একটু অপেক্ষা করুন।",
    // A: shown when the problem text is too short.
    INVALID_PROBLEM: "দয়া করে রোগীর সমস্যাটি একটু বিস্তারিত লিখুন (কমপক্ষে ৩ অক্ষর)। যেমন: ৩ দিন ধরে জ্বর ও কাশি।",
    // A: shown when the area text is not usable.
    INVALID_LOCATION: "দয়া করে এলাকার নামটি লিখুন (যেমন: সৈয়দপুর) অথবা লোকেশন শেয়ার করুন।",
    // A: header above the GPS-based nearby-area suggestion buttons.
    NEARBY_HEADER: (detected) => `📍 আপনার অবস্থান পেয়েছি! সবচেয়ে কাছের এলাকা: *${detected}*\n\nনিচে থেকে আপনার এলাকা বেছে নিন 👇\n(অথবা এলাকার নাম লিখে পাঠান)`,
    // A: shown when no doctor is found for the area.
    NO_AREA_DOCTOR: (location) => `❌ দুঃখিত, "${location}" এলাকায় কোনো ডাক্তার পাওয়া যায়নি। অন্য লোকেশন চেষ্টা করুন অথবা নিচের 🏠 মূল মেনু বাটনে চাপ দিন।`,
    // A: header above the 5 doctor cards.
    AREA_RESULT_HEADER: (location, department) => `✅ "${location}" এলাকায় *${department}* বিভাগের জন্য বাছাইকৃত ৫ জন ডাক্তার:\n`,
    // Q: flow asks — press Connect on a doctor.
    SELECT_PROMPT: "───────────────────\n👆 উপরের ৫ জন থেকে যেকোনো ডাক্তারের *Connect* বাটনে চাপ দিন — সরাসরি সেই ডাক্তারের সাথে যুক্ত হয়ে যাবেন।\n\nঅন্য কিছু লিখলে আবার খুঁজতে হবে, অথবা নিচের 🏠 মূল মেনু বাটনে চাপ দিন।",
    // A: shown after Connect is pressed.
    CONNECTED: (doctorName) => `✅ *${doctorName}*-এর সাথে যুক্ত করা হচ্ছে…`,
    // A: shown when input matches nothing.
    FALLBACK: "দুঃখিত, বুঝতে পারিনি। দয়া করে Connect বাটনে চাপ দিন।",
};
export const FIND_DOCTOR_FAQ = [
    // Q: What is the visiting fee?
    {
        id: "fee",
        keywords: ["fee", "ভিজিট", "ফি", "টাকা", "খরচ"],
        answer: "ভিজিট ফি ডাক্তারভেদে আলাদা। এলাকার নাম লিখুন — প্রতিটি ডাক্তারের কার্ডে ফি দেখানো হবে।",
    },
    // Q: How to take a serial / appointment?
    {
        id: "serial",
        keywords: ["serial", "appointment", "সিরিয়াল", "অ্যাপয়েন্টমেন্ট"],
        answer: "সিরিয়াল নিতে: পছন্দের ডাক্তারের Connect বাটনে চাপ দিন, তারপর ডাক্তারকে সিরিয়ালের কথা লিখুন — চেম্বারের নম্বর দেওয়া হবে।",
    },
    // Q: How does the search work?
    {
        id: "how-it-works",
        keywords: ["কিভাবে কাজ", "how does", "কীভাবে খুঁজব", "কিভাবে খুঁজব"],
        answer: "প্রথমে আপনার সমস্যাটি লিখুন, তারপর এলাকার নাম লিখুন — আপনার এলাকার ৫ জন ডাক্তার দেখানো হবে। Connect চাপলেই ডাক্তারের সাথে যুক্ত হবেন।",
    },
    // ---- ADD NEW Q&A ABOVE THIS LINE (copy any block above) ----
];
/** Free-text lookup. Returns the answer or null. First keyword hit wins. */
export function getFindDoctorFaqAnswer(normText) {
    const text = (normText || "").toLowerCase().trim();
    if (!text)
        return null;
    // This loop IS the switch statement: each FIND_DOCTOR_FAQ entry = one `case`.
    for (const faq of FIND_DOCTOR_FAQ) {
        if (faq.keywords.some((k) => text.includes(k.toLowerCase()))) {
            return faq.answer;
        }
    }
    return null;
}
export const CONNECT_BUTTON_TITLE = "Connect করুন";
export function buildConnectButton(username) {
    return { id: `connect_${username}`, title: CONNECT_BUTTON_TITLE };
}
export function isConnectClick(raw, buttonId) {
    const t = (raw || "").toLowerCase().trim();
    const id = (buttonId || "").toLowerCase().trim();
    return id.startsWith("connect_") || t.startsWith("connect_");
}
export function extractConnectUsername(raw, buttonId) {
    const id = (buttonId || "").trim();
    if (id.toLowerCase().startsWith("connect_"))
        return id.slice("connect_".length).trim();
    const t = (raw || "").trim();
    if (t.toLowerCase().startsWith("connect_"))
        return t.slice("connect_".length).trim();
    return "";
}
export function buildTrackingSummary(data) {
    const parts = ["🩺 *ডাক্তার খোঁজার অনুরোধ*"];
    if (data.problem)
        parts.push(`🤒 সমস্যা: ${data.problem}`);
    if (data.department)
        parts.push(`🏷️ বিভাগ: ${data.department}`);
    if (data.location)
        parts.push(`📍 এলাকা: ${data.location}`);
    if (data.candidates?.length)
        parts.push(`👨‍⚕️ সাজেশন: ${data.candidates.length} জন`);
    return parts.join("\n");
}
//# sourceMappingURL=findDoctorQA.js.map