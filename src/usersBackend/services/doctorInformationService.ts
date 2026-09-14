// Service layer for the doctor_informations table (one-to-one with doctors).
// expertise: [{ icon, service, service_details }] → "আমি যেসব চিকিৎসা সক্রিয়ভাবে করি"
// timeline:  [{ year, title }] → "যোগ্যতা ও অভিজ্ঞতা / একটি দীর্ঘ পথের প্রতিফলন"
// highlights: [{ icon, text }] → পরিচিতি সেকশনের ✓ তালিকা
// stats: [{ value, label }] → হিরো পরিসংখ্যান (১২ হাজার+ / সুস্থ রোগী)
// aboutImage: পরিচিতি সেকশনের ছবি
// Json columns are arrays — length is unbounded by design. *_en mirrors
// accept the same shape in English.
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
import { PROFILE_VISIBILITY } from '../policies/profilePolicy.js';

export interface ProfileCaller {
  userId: string;
  role: UserRole;
}

export interface ExpertiseItem {
  icon: string;
  service: string;
  service_details: string;
}

export interface TimelineItem {
  year: string;
  title: string;
}

export interface HighlightItem {
  icon: string;
  text: string;
}

export interface StatItem {
  value: string;
  label: string;
}

const MAX_ITEMS = 50;
const MAX_SHORT = 20; // icon, year
const MAX_MEDIUM = 200; // service title, timeline title
const MAX_LONG = 1000; // service_details

function cleanShort(value: unknown, max: number): string {
  if (typeof value !== 'string') throw new Error('INVALID_PAYLOAD');
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (!trimmed) throw new Error('INVALID_PAYLOAD');
  return trimmed.slice(0, max);
}

function cleanLong(value: unknown, max: number): string {
  if (typeof value !== 'string') throw new Error('INVALID_PAYLOAD');
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (!trimmed) throw new Error('INVALID_PAYLOAD');
  return trimmed.slice(0, max);
}

export function normalizeExpertise(input: unknown): ExpertiseItem[] {
  if (input === undefined) return [];
  if (!Array.isArray(input)) throw new Error('INVALID_PAYLOAD');
  if (input.length > MAX_ITEMS) throw new Error('INVALID_PAYLOAD');
  return input.map((row: any) => ({
    icon: cleanShort(row?.icon, MAX_SHORT),
    service: cleanLong(row?.service, MAX_MEDIUM),
    service_details: cleanLong(row?.service_details, MAX_LONG),
  }));
}

export function normalizeTimeline(input: unknown): TimelineItem[] {
  if (input === undefined) return [];
  if (!Array.isArray(input)) throw new Error('INVALID_PAYLOAD');
  if (input.length > MAX_ITEMS) throw new Error('INVALID_PAYLOAD');
  return input.map((row: any) => ({
    year: cleanShort(row?.year, MAX_SHORT),
    title: cleanLong(row?.title, MAX_MEDIUM),
  }));
}

export function normalizeHighlights(input: unknown): HighlightItem[] {
  if (input === undefined) return [];
  if (!Array.isArray(input)) throw new Error('INVALID_PAYLOAD');
  if (input.length > MAX_ITEMS) throw new Error('INVALID_PAYLOAD');
  return input.map((row: any) => ({
    icon: typeof row?.icon === 'string' && row.icon.trim() ? row.icon.trim().slice(0, MAX_SHORT) : '✓',
    text: cleanLong(row?.text, MAX_MEDIUM),
  }));
}

export function normalizeStats(input: unknown): StatItem[] {
  if (input === undefined) return [];
  if (!Array.isArray(input)) throw new Error('INVALID_PAYLOAD');
  if (input.length > MAX_ITEMS) throw new Error('INVALID_PAYLOAD');
  return input.map((row: any) => ({
    value: cleanShort(row?.value, MAX_SHORT),
    label: cleanLong(row?.label, MAX_MEDIUM),
  }));
}

function normalizeAboutImage(input: unknown): string | null | undefined {
  if (input === undefined) return undefined;
  if (input === null) return null;
  if (typeof input !== 'string') throw new Error('INVALID_PAYLOAD');
  const v = input.trim();
  if (!v) return null;
  if (v.length > 500) throw new Error('INVALID_PAYLOAD');
  return v;
}

// Resolve which doctor row the caller may act on.
// - DOCTOR: always their own doctorProfile (explicit doctorId is ignored).
// - SUPER_ADMIN: may pass an explicit doctorId, otherwise their own (if any).
async function resolveTargetDoctorId(caller: ProfileCaller, explicitDoctorId?: string): Promise<string> {
  const canViewOthers = PROFILE_VISIBILITY[caller.role]?.canViewOthers ?? false;

  if (explicitDoctorId?.trim() && canViewOthers) {
    const target = await prisma.doctor.findUnique({
      where: { id: explicitDoctorId.trim() },
      select: { id: true },
    });
    if (!target) throw new Error('DOCTOR_NOT_FOUND');
    return target.id;
  }

  const own = await prisma.user.findUnique({
    where: { id: caller.userId },
    select: { doctorProfile: { select: { id: true } } },
  });
  const ownDoctorId = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
  if (!ownDoctorId) throw new Error('NO_DOCTOR_PROFILE');
  return ownDoctorId;
}

export async function getDoctorInformation(caller: ProfileCaller, explicitDoctorId?: string) {
  const doctorId = await resolveTargetDoctorId(caller, explicitDoctorId);
  return prisma.doctorInformation.findUnique({ where: { doctorId } });
}

export async function upsertDoctorInformation(
  caller: ProfileCaller,
  input: {
    doctorId?: string;
    expertise?: unknown;
    expertise_en?: unknown;
    timeline?: unknown;
    highlights?: unknown;
    highlights_en?: unknown;
    stats?: unknown;
    stats_en?: unknown;
    aboutImage?: unknown;
  },
) {
  if (caller.role !== 'DOCTOR' && caller.role !== 'SUPER_ADMIN') {
    throw new Error('FORBIDDEN');
  }
  const doctorId = await resolveTargetDoctorId(caller, input.doctorId);

  // Partial-update semantics: only provided keys are written, so editing
  // highlights never wipes expertise and vice versa.
  const data: Record<string, unknown> = {};
  if (input.expertise !== undefined) data.expertise = normalizeExpertise(input.expertise);
  if (input.expertise_en !== undefined) data.expertise_en = normalizeExpertise(input.expertise_en);
  if (input.timeline !== undefined) data.timeline = normalizeTimeline(input.timeline);
  if (input.highlights !== undefined) data.highlights = normalizeHighlights(input.highlights);
  if (input.highlights_en !== undefined) data.highlights_en = normalizeHighlights(input.highlights_en);
  if (input.stats !== undefined) data.stats = normalizeStats(input.stats);
  if (input.stats_en !== undefined) data.stats_en = normalizeStats(input.stats_en);
  if (input.aboutImage !== undefined) data.aboutImage = normalizeAboutImage(input.aboutImage);
  if (Object.keys(data).length === 0) throw new Error('NOTHING_TO_UPDATE');

  const existing = await prisma.doctorInformation.findUnique({
    where: { doctorId },
    select: { id: true },
  });
  if (!existing) {
    // First write: missing groups default to empty (schema defaults apply).
    return prisma.doctorInformation.create({
      data: { doctorId, ...data } as never,
    });
  }
  return prisma.doctorInformation.update({
    where: { doctorId },
    data: data as never,
  });
}
