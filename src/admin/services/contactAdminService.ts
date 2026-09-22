// Admin triage queries for contact-form messages.
// Restricted to SUPER_ADMIN + ADMIN_MANAGER by protectedRoute on the route.
import { prisma } from '../../lib/prisma.js';

export const CONTACT_STATUSES = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'] as const;

export interface ContactListFilter {
  status?: unknown;
  topic?: unknown;
  q?: unknown;
  page?: unknown;
  limit?: unknown;
}

function parsePaging(filter: ContactListFilter): { page: number; limit: number } {
  const page = Math.max(1, parseInt(String(filter.page ?? '1'), 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(String(filter.limit ?? '20'), 10) || 20));
  return { page, limit };
}

export async function listContactMessages(filter: ContactListFilter) {
  const { page, limit } = parsePaging(filter);
  const where: Record<string, unknown> = {};

  const status = typeof filter.status === 'string' ? filter.status.trim().toUpperCase() : '';
  if (status && (CONTACT_STATUSES as readonly string[]).includes(status)) where.status = status;

  const topic = typeof filter.topic === 'string' ? filter.topic.trim().toUpperCase() : '';
  if (topic) where.topic = topic;

  const q = typeof filter.q === 'string' ? filter.q.trim() : '';
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q } },
      { message: { contains: q, mode: 'insensitive' } },
      { subject: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [total, data, counts] = await Promise.all([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.contactMessage.groupBy({ by: ['status'], _count: { status: true } }),
  ]);

  return {
    data,
    counts: Object.fromEntries(counts.map((c) => [c.status, c._count.status])),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function updateContactStatus(id: string, status: unknown) {
  const next = typeof status === 'string' ? status.trim().toUpperCase() : '';
  if (!(CONTACT_STATUSES as readonly string[]).includes(next)) throw new Error('INVALID_STATUS');
  try {
    return await prisma.contactMessage.update({ where: { id }, data: { status: next } });
  } catch {
    throw new Error('NOT_FOUND');
  }
}
