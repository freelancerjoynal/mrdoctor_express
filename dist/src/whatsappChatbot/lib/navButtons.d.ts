export declare const MENU_BUTTON: {
    id: string;
    title: string;
};
export declare const BACK_BUTTON: {
    id: string;
    title: string;
};
export { BACK_HINT } from "./session.js";
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