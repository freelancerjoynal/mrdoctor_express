// Public review routing for the publicWebsite module.
// POST is deliberately open (creates PENDING rows); listings serve APPROVED only.
// Mounted by websiteRoutes at /api/website.
import express from 'express';
import {
  postReview,
  listDoctorReviews,
  showDoctorSpotlight,
  showDoctorRating,
  listHospitalReviews,
  showHospitalRating,
} from '../controllers/reviewController.js';

const reviewRouter = express.Router();

// POST /api/website/reviews — { doctorUsername | hospitalSlug, reviewerName, rating 1-5, title?, comment }
reviewRouter.post('/reviews', postReview);
// GET /api/website/doctors/:username/reviews?page=&limit=
reviewRouter.get('/doctors/:username/reviews', listDoctorReviews);
// GET /api/website/doctors/:username/reviews/spotlight — 2 random picks from the latest 10 APPROVED reviews
reviewRouter.get('/doctors/:username/reviews/spotlight', showDoctorSpotlight);
// GET /api/website/doctors/:username/rating
reviewRouter.get('/doctors/:username/rating', showDoctorRating);
// GET /api/website/hospitals/:slug/reviews?page=&limit=
reviewRouter.get('/hospitals/:slug/reviews', listHospitalReviews);
// GET /api/website/hospitals/:slug/rating
reviewRouter.get('/hospitals/:slug/rating', showHospitalRating);

export default reviewRouter;
