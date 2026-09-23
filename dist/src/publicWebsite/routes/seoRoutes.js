// Public SEO routing for the publicWebsite module.
// Mounted by src/server.ts via ./publicWebsite/routes/index.js
import express from 'express';
import { getSeo } from '../controllers/seoController.js';
const seoRouter = express.Router();
// GET /api/website/seo?pageType=LOCATION&pageKey=nilphamari
seoRouter.get('/seo', getSeo);
export default seoRouter;
//# sourceMappingURL=seoRoutes.js.map