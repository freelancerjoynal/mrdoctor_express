export interface ButtonItem {
    id: string;
    title: string;
}
/** Plain text message (shows typing first, like normal chat). */
export declare function sendWhatsAppMessage(to: string, message: string, messageId?: string): Promise<void>;
export declare function sendTypingIndicator(_to: string, messageId?: string): Promise<void>;
/**
 * Interactive reply-buttons (WhatsApp allows max 3 per message).
 * Longer lists are chunked into multiple messages by sendButtonsChunked.
 */
export declare function sendInteractiveButtons(to: string, bodyText: string, buttons: ButtonItem[], messageId?: string): Promise<void>;
/** Send N buttons in chunks of 3 (first chunk carries bodyText, rest carry continuation text). */
export declare function sendButtonsChunked(to: string, bodyText: string, buttons: ButtonItem[], continuationText?: string): Promise<void>;
//# sourceMappingURL=sendWhatsAppMessage.d.ts.map