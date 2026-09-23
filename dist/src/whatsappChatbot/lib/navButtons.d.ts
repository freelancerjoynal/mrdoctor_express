export declare const MENU_BUTTON: {
    id: string;
    title: string;
};
export declare const BACK_BUTTON: {
    id: string;
    title: string;
};
/** Appended to prompts so users know to type back (no Back button mid-flow). */
export declare const BACK_HINT = "\n\n\u21A9\uFE0F \u09AA\u09C7\u099B\u09A8\u09C7 \u09AF\u09C7\u09A4\u09C7 back \u09B2\u09BF\u0996\u09C1\u09A8";
import { type ButtonItem } from "./sendWhatsAppMessage.js";
/** Append Back + Menu to any button list. USE ONLY on a flow's final message. */
export declare function withNav(buttons: ButtonItem[], includeBack?: boolean): ButtonItem[];
/**
 * True on Back-button tap (legacy) OR typed "back" / "পেছনে" / "পিছনে".
 * Typing "menu" is handled separately (global main-menu handler).
 */
export declare function isBackClick(raw: string, buttonId: string): boolean;
/**
 * Re-send a previous step's message (used by the global Back handler).
 * Never throws — falls back to the main menu on any error.
 */
export declare function resendStepPrompt(phoneNumber: string, session: {
    flow: string;
    step: string;
    data?: any;
}): Promise<void>;
//# sourceMappingURL=navButtons.d.ts.map