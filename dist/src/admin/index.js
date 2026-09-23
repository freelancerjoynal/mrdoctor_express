// Central entry for the admin module.
// Self-contained module: routes + controllers + services all live under src/admin/*
// (same pattern as src/applications/*, src/seeder/*).
export { showAdminOverview, showLocationOptions, showDirectory, showDoctorOverview, showHospitalOverview } from './controllers/adminController.js';
export { getAdminOverview, getLocationOptions, listDirectory, getDoctorOverview, getHospitalOverview } from './services/adminService.js';
export { adminRouter } from './routes/index.js';
//# sourceMappingURL=index.js.map