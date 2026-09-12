// Service layer for the doctor_informations table (one-to-one with doctors).
// expertise: [{ icon, service, service_details }] → "আমি যেসব চিকিৎসা সক্রিয়ভাবে করি"
// timeline:  [{ year, title }] → "যোগ্যতা ও অভিজ্ঞতা / একটি দীর্ঘ পথের প্রতিফলন"
// Both columns are Json arrays — length is unbounded by design.
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
  input: { doctorId?: string; expertise?: unknown; timeline?: unknown },
) {
  if (caller.role !== 'DOCTOR' && caller.role !== 'SUPER_ADMIN') {
    throw new Error('FORBIDDEN');
  }
  const doctorId = await resolveTargetDoctorId(caller, input.doctorId);
  const expertise = normalizeExpertise(input.expertise ?? []);
  const timeline = normalizeTimeline(input.timeline ?? []);

  return prisma.doctorInformation.upsert({
    where: { doctorId },
    update: { expertise: expertise as any, timeline: timeline as any },
    create: { doctorId, expertise: expertise as any, timeline: timeline as any },
  });
}
