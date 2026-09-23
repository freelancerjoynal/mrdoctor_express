// Admin dashboard routing for the admin module.
// Mounted by src/server.ts at /api/admin via ./admin/routes/index.js
// Restricted to SUPER_ADMIN + ADMIN_MANAGER — platform-wide stats.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import { showAdminOverview, showLocationOptions, showDirectory, showDoctorOverview, showHospitalOverview, listLocationSettings, showLocationSetting, saveLocationSetting, } from '../controllers/adminController.js';
import { listSeo, showSeo, saveSeo, removeSeo } from '../controllers/seoController.js';
import { showCredit, runTopup } from '../controllers/creditController.js';
import { showContactMessages, runContactStatus, } from '../controllers/contactAdminController.js';
const adminRouter = express.Router();
const admins = protectedRoute('SUPER_ADMIN', 'ADMIN_MANAGER');
adminRouter.get('/overview', admins, showAdminOverview);
// Location-filtered directory: filter by division/district/thana, then drill in.
adminRouter.get('/locations', admins, showLocationOptions);
adminRouter.get('/directory', admins, showDirectory);
adminRouter.get('/doctors/:id/overview', admins, showDoctorOverview);
adminRouter.get('/hospitals/:id/overview', admins, showHospitalOverview);
// Thana portal customization (hero image + texts per location slug).
adminRouter.get('/location-settings', admins, listLocationSettings);
adminRouter.get('/location-settings/:slug', admins, showLocationSetting);
adminRouter.put('/location-settings/:slug', admins, saveLocationSetting);
// Credit wallets — balance + ledger view, admin top-ups.
adminRouter.get('/credits', admins, showCredit);
adminRouter.post('/credits/topup', admins, runTopup);
// Per-page SEO (titles, descriptions, OG, canonical per location/doctor/hospital).
adminRouter.get('/seo', admins, listSeo);
adminRouter.get('/seo/:pageType/:pageKey', admins, showSeo);
adminRouter.put('/seo/:pageType/:pageKey', admins, saveSeo);
adminRouter.delete('/seo/:pageType/:pageKey', admins, removeSeo);
// Contact-form inbox (/contact submissions — NEW → READ → REPLIED → ARCHIVED).
adminRouter.get('/contact-messages', admins, showContactMessages);
adminRouter.patch('/contact-messages/:id', admins, runContactStatus);
export default adminRouter;
//# sourceMappingURL=adminRoutes.js.map