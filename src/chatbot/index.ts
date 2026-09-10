// Central entry for the WhatsApp chatbot setup.
// All chatbot controllers / services / libs / flows live under src/chatbot/*
// so a new setup (new template / new flows) can be added here without
// touching the rest of the app.

export { handleIncomingMessage, pendingRecoveryMap } from "./services/whatsappService.js";
export { receiveMessage } from "./controllers/whatsappEventController.js";
export { verifyWebhook } from "./controllers/verifyWebhook.js";
export { findDoctorFlow } from "./flows/findDoctor/findDoctorFlow.js";
export { findHospitalFlow } from "./flows/findHospital/findHospitalFlow.js";
export { handleGetDoctorFlow } from "./flows/getDoctor/getDoctorFlow.js";
export { handleGetHospitalFlow } from "./flows/getHospital/getHospitalFlow.js";
export { findDoctorsByArea } from "./services/doctorSearch.js";
export { findHospitalsByArea, getHospitalById } from "./services/hospitalSearch.js";
export { suggestDepartment, getOpenAIResponse } from "./services/aiService.js";
export { default as doctorRedirectRouter, userPendingDoctorMap } from "./lib/doctorRedirectManager.js";
