import { sendWhatsAppMessage } from "../../lib/sendWhatsAppMessage.js";
import { handleProblemStep } from "./steps/problemStep.js";
import { handleLocationStep } from "./steps/locationStep.js";
import { handleConfirmStep } from "./steps/confirmStep.js";

// Session store
const userSessions = new Map<
    string,
    { state: string; location?: string }
>();

export async function handleIncomingMessage(msg: any) {
    console.log("📥 Incoming:", JSON.stringify(msg, null, 2));

    const text =
        (msg.text ||
            msg.buttonReply?.title ||
            msg.interactive?.button_reply?.title ||
            "")
            .toLowerCase()
            .trim();

    const phoneNumber = msg.number;

    if (!text && !msg.location) return;

    try {
        let session = userSessions.get(phoneNumber) || { state: "WELCOME" };
        let state = session.state;

        /**
         * STEP 1: Welcome
         */
        if (state === "WELCOME" || ["hi", "hello", "start", "reset"].includes(text)) {
            userSessions.set(phoneNumber, { state: "ASK_PROBLEM" });
            await sendWhatsAppMessage(phoneNumber, "রোগীর কী সমস্যা?");
            return;
        }

        /**
         * STEP 2: Problem → Ask Location
         */
        if (state === "ASK_PROBLEM") {
            await handleProblemStep(phoneNumber, (newState) => {
                userSessions.set(phoneNumber, { state: newState });
            });
            return;
        }

        /**
         * STEP 3: Handle Location
         */
        if (state === "ASK_LOCATION") {
            await handleLocationStep(phoneNumber, text, msg, (newState, loc) => {
                userSessions.set(phoneNumber, { state: newState, location: loc });
            });
            return;
        }

        /**
         * STEP 4: Confirm Location
         */
        if (state === "CONFIRM_LOCATION") {
            await handleConfirmStep(
                phoneNumber,
                text,
                session.location || "Unknown",
                () => userSessions.set(phoneNumber, { state: "WELCOME" }),
                () => userSessions.set(phoneNumber, { state: "ASK_LOCATION" })
            );
            return;
        }

        /**
         * Default
         */
        userSessions.set(phoneNumber, { state: "ASK_PROBLEM" });
        await sendWhatsAppMessage(phoneNumber, "রোগীর কী সমস্যা?");
    } catch (error) {
        console.error("❌ ERROR:", error);
        await sendWhatsAppMessage(phoneNumber, "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন");
    }
}