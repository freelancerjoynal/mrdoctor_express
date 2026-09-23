// Public blog routing for the publicWebsite module.
// Deliberately NO protectedRoute here — only PUBLISHED posts are served.
// Mounted by websiteRoutes at /api/website.
import express from 'express';
import { listBlogs, showBlog, listDoctorBlogs, listHospitalBlogs } from '../controllers/blogController.js';
const blogRouter = express.Router();
// GET /api/website/blogs?search=&category=&authorType=&doctorUsername=&hospitalSlug=&page=&limit=
blogRouter.get('/blogs', listBlogs);
// GET /api/website/blogs/:slug
blogRouter.get('/blogs/:slug', showBlog);
// GET /api/website/doctors/:username/blogs?take=
blogRouter.get('/doctors/:username/blogs', listDoctorBlogs);
// GET /api/website/hospitals/:slug/blogs?take=
blogRouter.get('/hospitals/:slug/blogs', listHospitalBlogs);
export default blogRouter;
//# sourceMappingURL=blogRoutes.js.map