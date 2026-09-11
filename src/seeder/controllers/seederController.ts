// Thin controller for the seeder module.
// Auth is enforced by protectedRoute on the route (SUPER_ADMIN only).
import type { Request, Response } from 'express';
import { runSeedAll } from '../services/seederService.js';

export const seedAll = async (_req: Request, res: Response) => {
  try {
    const { summary } = await runSeedAll();
    return res.status(201).json({
      success: true,
      message:
        'নীলফামারী জেলার ১০ হাসপাতাল, ১০০ ডাক্তার, চেম্বার (per-chamber ফি সহ) ও সিডিউল সফলভাবে সিড করা হয়েছে এবং ইউজার অ্যাকাউন্টের সাথে যুক্ত করা হয়েছে!',
      summary,
    });
  } catch (error: any) {
    console.error('❌ ERROR seeding:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to seed Nilphamari data',
      details: error.message,
    });
  }
};
