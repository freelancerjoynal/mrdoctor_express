// Thin public controllers for the review resource.
// POST is open (lands as PENDING); listings serve APPROVED only.
import type { Request, Response } from 'express';
import {
  submitReview,
  getDoctorReviews,
  getDoctorSpotlightReviews,
  getDoctorRatingSummary,
  getHospitalReviews,
  getHospitalRatingSummary,
} from '../services/reviewService.js';

function parsePaging(req: Request): { page: number; limit: number } {
  const rawPage = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
  const rawLimit = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
  const page = Math.max(1, parseInt(typeof rawPage === 'string' ? rawPage : '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(typeof rawLimit === 'string' ? rawLimit : '6', 10) || 6));
  return { page, limit };
}

export const postReview = async (req: Request, res: Response) => {
  try {
    const { doctorUsername, hospitalSlug, reviewerName, reviewerPhone, rating, title, comment } =
      req.body ?? {};
    const review = await submitReview({
      doctorUsername,
      hospitalSlug,
      reviewerName,
      reviewerPhone,
      rating,
      title,
      comment,
    });
    return res.status(201).json({
      backend: 'publicWebsite',
      data: review,
      message: 'মতামত পাঠানোর জন্য ধন্যবাদ! অনুমোদনের পর এটি দেখা যাবে।',
    });
  } catch (error: any) {
    const msg = error?.message ?? 'UNKNOWN';
    if (msg === 'INVALID_TARGET')
      return res.status(400).json({ error: 'Exactly one of doctorUsername / hospitalSlug is required' });
    if (msg === 'INVALID_RATING') return res.status(400).json({ error: 'Rating must be 1–5' });
    if (msg === 'INVALID_NAME')
      return res.status(400).json({ error: 'Please provide your name (2–60 characters)' });
    if (msg === 'INVALID_COMMENT')
      return res.status(400).json({ error: 'Please write a comment (5–1000 characters)' });
    if (msg === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'Doctor not found' });
    if (msg === 'HOSPITAL_NOT_FOUND') return res.status(404).json({ error: 'Hospital not found' });
    return res.status(500).json({ error: 'Failed to submit review' });
  }
};

export const listDoctorReviews = async (req: Request, res: Response) => {
  try {
    const result = await getDoctorReviews(req.params.username as string, parsePaging(req));
    if (!result) return res.status(404).json({ error: 'Doctor not found' });
    return res.json({ backend: 'publicWebsite', ...result });
  } catch {
    return res.status(500).json({ error: 'Failed to load reviews' });
  }
};

export const showDoctorSpotlight = async (req: Request, res: Response) => {
  try {
    const data = await getDoctorSpotlightReviews(req.params.username as string, 2, 10);
    if (!data) return res.status(404).json({ error: 'Doctor not found' });
    return res.json({ backend: 'publicWebsite', data });
  } catch {
    return res.status(500).json({ error: 'Failed to load spotlight reviews' });
  }
};

export const showDoctorRating = async (req: Request, res: Response) => {
  try {
    const rating = await getDoctorRatingSummary(req.params.username as string);
    if (!rating) return res.status(404).json({ error: 'Doctor not found' });
    return res.json({ backend: 'publicWebsite', data: rating });
  } catch {
    return res.status(500).json({ error: 'Failed to load rating' });
  }
};

export const listHospitalReviews = async (req: Request, res: Response) => {
  try {
    const result = await getHospitalReviews(req.params.slug as string, parsePaging(req));
    if (!result) return res.status(404).json({ error: 'Hospital not found' });
    return res.json({ backend: 'publicWebsite', ...result });
  } catch {
    return res.status(500).json({ error: 'Failed to load reviews' });
  }
};

export const showHospitalRating = async (req: Request, res: Response) => {
  try {
    const rating = await getHospitalRatingSummary(req.params.slug as string);
    if (!rating) return res.status(404).json({ error: 'Hospital not found' });
    return res.json({ backend: 'publicWebsite', data: rating });
  } catch {
    return res.status(500).json({ error: 'Failed to load rating' });
  }
};
