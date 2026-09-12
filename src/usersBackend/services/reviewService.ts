// Service layer for moderating the reviews table.
// DOCTOR / HOSPITAL see and delete reviews on their own profile;
// status changes (APPROVED / REJECTED) are SUPER_ADMIN-only.
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface ReviewCaller {
  userId: string;
  role: UserRole;
}

async function ownershipFilter(caller: ReviewCaller): Promise<Record<string, unknown> | null> {
  if (caller.role === 'SUPER_ADMIN') return null;
  if (caller.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true } } },
    });
    const doctorId = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    return { doctorId };
  }
  if (caller.role === 'HOSPITAL') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { hospitalProfile: { select: { id: true } } },
    });
    const hospitalId = (own as { hospitalProfile?: { id: string } | null } | null)?.hospitalProfile?.id;
    if (!hospitalId) throw new Error('NO_HOSPITAL_PROFILE');
    return { hospitalId };
  }
  throw new Error('FORBIDDEN');
}

function assertOwned(filter: Record<string, unknown> | null, review: any) {
  if (!filter) return;
  const denied = Object.entries(filter).some(([key, value]) => review[key] !== value);
  if (denied) throw new Error('FORBIDDEN');
}

export async function listReviews(
  caller: ReviewCaller,
  opts: { status?: string; take?: number } = {},
) {
  const filter = await ownershipFilter(caller);
  const where: Record<string, unknown> = { ...(filter ?? {}) };
  if (opts.status === 'PENDING' || opts.status === 'APPROVED' || opts.status === 'REJECTED') {
    where.status = opts.status;
  }
  return prisma.review.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: Math.min(Math.max(opts.take ?? 20, 1), 50),
  });
}

export async function moderateReview(caller: ReviewCaller, id: string, status: string) {
  if (caller.role !== 'SUPER_ADMIN') throw new Error('FORBIDDEN');
  if (status !== 'APPROVED' && status !== 'REJECTED' && status !== 'PENDING') {
    throw new Error('INVALID_STATUS');
  }
  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing) throw new Error('REVIEW_NOT_FOUND');
  return prisma.review.update({ where: { id }, data: { status: status as any } });
}

export async function deleteReview(caller: ReviewCaller, id: string) {
  const filter = await ownershipFilter(caller);
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new Error('REVIEW_NOT_FOUND');
  assertOwned(filter, review);
  await prisma.review.delete({ where: { id } });
  return { id };
}
