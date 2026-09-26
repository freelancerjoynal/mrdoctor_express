// Public thana-portal AI suggest: problem + age + weight -> DeepSeek
// category -> doctors with a chamber in this thana. Unauthenticated by
// design — everything returned is already public-safe.
import type { Request, Response } from 'express';
import { suggestDoctorsForPortal } from '../services/aiSuggestService.js';

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function num(v: unknown): number | null {
  const n = typeof v === 'string' ? Number(v.trim()) : typeof v === 'number' ? v : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const postAiSuggest = async (req: Request, res: Response) => {
  try {
    const problem = str(req.body?.problem);
    if (problem.length < 3) {
      return res.status(400).json({ error: 'সমস্যাটি সংক্ষেপে লিখুন (কমপক্ষে ৩ অক্ষর)।' });
    }
    const rawGender = str(req.body?.gender).toLowerCase();
    const gender = rawGender === 'female' || rawGender === 'মহিলা' || rawGender === 'নারী' ? 'female' as const : 'male' as const;
    const result = await suggestDoctorsForPortal({
      problem,
      age: num(req.body?.age),
      weight: num(req.body?.weight),
      gender,
      division: str(req.body?.division) || undefined,
      district: str(req.body?.district) || undefined,
      thana: str(req.body?.thana) || undefined,
      limit: num(req.body?.limit) ?? undefined,
    });
    if (!result) {
      return res.status(422).json({ error: 'দুঃখিত, সমস্যাটি বুঝতে পারিনি। অন্য ভাষায় লিখে আবার চেষ্টা করুন।' });
    }
    return res.json({ backend: 'publicWebsite', data: result });
  } catch {
    return res.status(500).json({ error: 'AI সাজেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।' });
  }
};
