// Central entry for the usersBackend setup.
// Canonical permission-based user/profile lookup for every role.
// All user controllers / services / policies / routes live under src/usersBackend/*
// Localized routing lives in src/usersBackend/routes/*.
// Fully isolated from authentication, whatsappChatbot and publicWebsite (untouched).

export { getUserProfile } from './controllers/profileController.js';
export { getProfileData } from './services/profileService.js';
export type { ProfileCaller } from './services/profileService.js';
export { PROFILE_VISIBILITY } from './policies/profilePolicy.js';
export type { RoleVisibility } from './policies/profilePolicy.js';
export { showDoctorInformation, saveDoctorInformation } from './controllers/doctorInformationController.js';
export { getDoctorInformation, upsertDoctorInformation } from './services/doctorInformationService.js';
export type { ExpertiseItem, TimelineItem } from './services/doctorInformationService.js';
export { usersRouter } from './routes/index.js';
