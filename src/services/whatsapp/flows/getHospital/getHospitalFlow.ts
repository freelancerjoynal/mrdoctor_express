import { findHospitalFlow } from "../findHospital/findHospitalFlow.js";

// Legacy direct-hospital entry (e.g. hospital_xxx deep links).
// Delegates to the full FIND_HOSPITAL_FLOW so tracking + confirmation stay consistent.
// Kept as a separate file so existing imports (whatsappService recovery) don't break.
export async function handleGetHospitalFlow(
    phoneNumber: string,
    text: string,
    msg: any,
    session: any,
    updateSession: (flow: string, step: string, data: any) => void,
    resetSession: () => void
) {
    const step = session?.step || "WELCOME";

    // Normalize legacy GET_HOSPITAL_FLOW session into FIND_HOSPITAL_FLOW,
    // then run the shared location-first flow (location -> type -> service -> confirm).
    const normalizedSession = {
        ...session,
        flow: "FIND_HOSPITAL_FLOW",
        step: step === "WELCOME" ? "ASK_LOCATION" : step,
        data: { ...(session?.data || {}), category: "HOSPITAL" },
    };

    await findHospitalFlow(phoneNumber, text, msg, normalizedSession, updateSession, resetSession);
}
