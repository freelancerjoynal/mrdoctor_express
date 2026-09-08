import { sendWhatsAppMessage } from "../../lib/sendWhatsAppMessage.js";
import { handleProblemStep } from "./steps/problemStep.js";
import { handleLocationStep } from "./steps/locationStep.js";
import { aiDoctorSolutionStep } from "./steps/aiDoctorSolutionStep.js";

// Session store (state, location, এবং problem সেভ রাখার জন্য)
const userSessions = new Map<
    string,
    { state: string; location?: string; problem?: string }
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
            await handleProblemStep(phoneNumber, text, (newState, savedProblem) => {
                userSessions.set(phoneNumber, { 
                    state: newState, 
                    problem: savedProblem 
                });
            });
            return;
        }

        /**
         * STEP 3: Handle Location
         */
        if (state === "ASK_LOCATION") {
            await handleLocationStep(phoneNumber, text, msg, (newState, loc) => {
                userSessions.set(phoneNumber, { 
                    ...session, 
                    state: newState, 
                    location: loc 
                });
            });
            return;
        }

        /**
         * STEP 4: Confirm Location & AI Solution
         */
        if (state === "CONFIRM_LOCATION") {
            await aiDoctorSolutionStep(
                phoneNumber,
                text,
                session.location || "Unknown",
                session.problem || "",
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