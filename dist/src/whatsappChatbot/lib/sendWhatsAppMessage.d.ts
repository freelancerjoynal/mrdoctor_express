export interface ButtonItem {
    id: string;
    title: string;
}
/** Plain text message (shows typing first, like normal chat). */
export declare function sendWhatsAppMessage(to: string, message: string, messageId?: string): Promise<void>;
/**
 * Image message by URL (Cloud API `image.link`).
 * Used for business/banner cards — fails silently (logs only) so the
 * text flow always continues even when the image URL is bad.
 */
export declare function sendWhatsAppImage(to: string, imageUrl: string, caption?: string, messageId?: string): Promise<void>;
/**
 * Small human-like pause between messages (non-blocking sleep — no extra
 * server pressure, it just keeps the async handler alive a bit longer).
 * Pair with the typing indicator so the user sees "typing…" before each
 * message lands.
 */
export declare function chatDelay(ms?: number): Promise<void>;
export declare function sendTypingIndicator(_to: string, messageId?: string): Promise<void>;
/**
 * Interactive reply-buttons (WhatsApp allows max 3 per message).
 * Longer lists are chunked into multiple messages by sendButtonsChunked.
 */
export declare function sendInteractiveButtons(to: string, bodyText: string, buttons: ButtonItem[], messageId?: string): Promise<void>;
/**
 * Reply-buttons under an image header (doctor banner card + Contact button).
 * Falls back to a text button message when the image URL is missing/bad.
 */
export declare function sendImageButtons(to: string, imageUrl: string, bodyText: string, buttons: ButtonItem[], messageId?: string): Promise<void>;
/**
 * CTA URL button (opens a link, e.g. payment page).
 * WhatsApp allows exactly ONE url button per message.
 * Falls back to a plain text link when the API call fails.
 */
export declare function sendCtaUrlButton(to: string, bodyText: string, buttonText: string, url: string, messageId?: string): Promise<void>;
/** Send N buttons in chunks of 3 (first chunk carries bodyText, rest carry continuation text). */
export declare function sendButtonsChunked(to: string, bodyText: string, buttons: ButtonItem[], continuationText?: string): Promise<void>;
export interface ListRow {
    id: string;
    title: string;
    description?: string;
}
export interface ListSection {
    title: string;
    rows: ListRow[];
}
/** Row titles are capped at 24 chars by Meta. */
export declare function listRowTitle(s: string, max?: number): string;
/**
 * Interactive list-picker message (WhatsApp "menu" style).
 * The user taps one button, sees all rows, picks one — the list closes.
 * Limits: button ≤20 chars, body ≤1024, section title ≤24,
 * max 10 rows per message, row id ≤200, row title ≤24, description ≤72.
 */
export declare function sendInteractiveList(to: string, bodyText: string, buttonText: string, sections: ListSection[], options?: {
    headerText?: string;
    footerText?: string;
    messageId?: string;
}): Promise<void>;
/** Send N list rows in chunks of 10 per message (Meta cap). */
export declare function sendListChunked(to: string, bodyText: string, buttonText: string, rows: ListRow[], sectionTitle?: string, continuationText?: string): Promise<void>;
//# sourceMappingURL=sendWhatsAppMessage.d.ts.map