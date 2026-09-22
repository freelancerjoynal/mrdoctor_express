// Thin public controller for the contact resource.
// POST is open (lands as NEW); there is no public listing by design.
import type { Request, Response } from 'express';
import { submitContactMessage, CONTACT_TOPICS } from '../services/contactService.js';

export const postContact = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, topic, subject, message } = req.body ?? {};
    const row = await submitContactMessage({ name, phone, email, topic, subject, message });
    return res.status(201).json({
      backend: 'publicWebsite',
      data: row,
      message: 'আপনার বার্তা পেয়েছি! আমাদের টিম শীঘ্রই যোগাযোগ করবে।',
    });
  } catch (error: any) {
    const msg = error?.message ?? 'UNKNOWN';
    if (msg === 'INVALID_NAME')
      return res.status(400).json({ error: 'আপনার নাম দিন (২–৮০ অক্ষর)।' });
    if (msg === 'INVALID_PHONE')
      return res.status(400).json({ error: 'সঠিক মোবাইল নম্বর দিন।' });
    if (msg === 'INVALID_EMAIL')
      return res.status(400).json({ error: 'সঠিক ইমেইল দিন।' });
    if (msg === 'INVALID_MESSAGE')
      return res.status(400).json({ error: 'আপনার মতামত লিখুন (কমপক্ষে ১০ অক্ষর)।' });
    return res.status(500).json({ error: 'বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।' });
  }
};

// GET /api/website/contact/topics — topic dropdown options for the form.
export const listContactTopics = async (_req: Request, res: Response) => {
  return res.json({ backend: 'publicWebsite', data: CONTACT_TOPICS });
};
