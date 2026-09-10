import { findHospitalFlow } from "../findHospital/findHospitalFlow.js";
import type { UpdateFn, ResetFn } from "../../lib/session.js";

// Legacy direct-hospital entry (e.g. hospital_xxx deep links).
// Normalizes into FIND_HOSPITAL_FLOW so tracking + confirmation stay consistent.
export async function handleGetHospitalFlow(
    phoneNumber: string,
    text: string,
    msg: any,
    session: any,
    updateSession: UpdateFn,
    resetSession: ResetFn
) {
    const step = session?.step || "WELCOME";

    const normalizedSession = {
        ...session,
        flow: "FIND_HOSPITAL_FLOW",
        step: step === "WELCOME" ? "ASK_AREA" : step,
        data: { ...(session?.data || {}), category: "HOSPITAL" },
    };

    await findHospitalFlow(phoneNumber, text, msg, normalizedSession, updateSession, resetSession);
}
