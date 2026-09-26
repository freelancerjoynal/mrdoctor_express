// Shared session types + small helpers for all chatbot flows.
export function getButtonId(msg) {
    return (msg?.buttonId ||
        msg?.buttonReply?.id ||
        msg?.interactive?.button_reply?.id ||
        msg?.interactive?.button_reply?.button_id ||
        "");
}
export function getLocationText(text, msg) {
    if (msg?.location?.latitude && msg?.location?.longitude) {
        return `Lat:${msg.location.latitude},Lng:${msg.location.longitude}`;
    }
    return (text || "").trim();
}
/** Raw GPS coords from a shared device location (null when not shared). */
export function extractGps(msg) {
    const lat = Number(msg?.location?.latitude);
    const lng = Number(msg?.location?.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng))
        return null;
    return { lat, lng };
}
/** Tapped one of the suggested nearby-area buttons (area_0, area_1, ...). */
export function isAreaClick(raw, buttonId) {
    const id = (buttonId || "").toLowerCase().trim();
    if (/^area_\d+$/.test(id))
        return true;
    return /^area_\d+$/.test((raw || "").toLowerCase().trim());
}
/** Index of the tapped area button (-1 when invalid). */
export function extractAreaIdx(raw, buttonId) {
    const src = (buttonId || raw || "").trim();
    const m = src.match(/area_(\d+)/i);
    if (!m)
        return -1;
    const n = parseInt(m[1], 10);
    return Number.isNaN(n) ? -1 : n;
}
export function isGpsLocation(location) {
    return /lat\s*:/i.test(location || "");
}
/** Fisher-Yates shuffle (random pick helper). */
export function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
const ENTRY_WORDS = [
    "ডাক্তার", "doctor", "doc_btn", "find", "hospital", "হসপিটাল",
    "hosp", "menu", "মেনু", "hi", "hello", "start", "home",
];
/** Words that mean menu navigation — never a real problem/location. */
export function isEntryWord(text) {
    const t = (text || "").toLowerCase().trim();
    if (!t)
        return true;
    return ENTRY_WORDS.some((w) => t === w || (t.length < 12 && t.includes(w)));
}
export function isValidProblem(text) {
    return (text || "").trim().length >= 3;
}
export function isValidLocation(text) {
    return (text || "").trim().length >= 2;
}
/** Appended to prompts so users know to type back (no Back button mid-flow). */
export const BACK_HINT = "\n\n↩️ পেছনে যেতে back লিখুন";
/** WhatsApp button titles are capped at 20 chars by Meta. */
export function shortTitle(s, max = 20) {
    const t = (s || "").trim();
    return t.length > max ? t.slice(0, max - 1) + "…" : t;
}
/** Slug-ish short id for buttons (uuid-safe fallback = index based). */
export function safeId(prefix, value) {
    return `${prefix}_${value}`.slice(0, 200);
}
//# sourceMappingURL=session.js.map