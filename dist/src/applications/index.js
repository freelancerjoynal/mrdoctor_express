// Central entry for the applications setup.
// Self-contained module: routes + controllers + services all live under src/applications/*
export { submitDoctor, submitHospital, listAll, pendingCount, approve, reject, createDoctorDirect, createHospitalDirect, } from './controllers/applicationController.js';
export { submitDoctorApplication, submitHospitalApplication, listApplications, countPendingApplications, approveApplication, rejectApplication, createDoctor, createHospital, } from './services/applicationService.js';
export { applicationRouter } from './routes/index.js';
//# sourceMappingURL=index.js.map