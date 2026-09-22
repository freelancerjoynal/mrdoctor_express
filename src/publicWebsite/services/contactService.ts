// Public contact-form submissions for the publicWebsite module.
// POST is open by design (lands as NEW); triage happens in /admin/messages.
import { prisma } from '../../lib/prisma.js';

export const CONTACT_TOPICS = [
  'GENERAL',
  'BOOKING',
  'REFUND',
  'SUPPORT',
  'DOCTOR_JOIN',
  'HOSPITAL_JOIN',
  'FEEDBACK',
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export interface SubmitContactInput {
  name: string;
  phone: string;
  email?: string;
  topic?: string;
  subject?: string;
  message: string;
}

function cleanName(value: unknown): string {
  if (typeof value !== 'string') throw new Error('INVALID_NAME');
  const name = value.trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 80) throw new Error('INVALID_NAME');
  return name;
}

function cleanPhone(value: unknown): string {
  if (typeof value !== 'string') throw new Error('INVALID_PHONE');
  const phone = value.trim().replace(/\s+/g, '');
  if (phone.length < 6 || phone.length > 20) throw new Error('INVALID_PHONE');
  return phone;
}

function cleanMessage(value: unknown): string {
  if (typeof value !== 'string') throw new Error('INVALID_MESSAGE');
  const message = value.trim();
  if (message.length < 10 || message.length > 2000) throw new Error('INVALID_MESSAGE');
  return message;
}

// Visitor submission — always stored with status NEW, source website.
export async function submitContactMessage(input: SubmitContactInput) {
  const name = cleanName(input.name);
  const phone = cleanPhone(input.phone);
  const message = cleanMessage(input.message);

  const email =
    typeof input.email === 'string' && input.email.trim()
      ? input.email.trim().slice(0, 120)
      : null;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('INVALID_EMAIL');

  const rawTopic =
    typeof input.topic === 'string' ? input.topic.trim().toUpperCase().slice(0, 30) : '';
  const topic = (CONTACT_TOPICS as readonly string[]).includes(rawTopic) ? rawTopic : 'GENERAL';

  const subject =
    typeof input.subject === 'string' && input.subject.trim()
      ? input.subject.trim().slice(0, 150)
      : null;

  return prisma.contactMessage.create({
    data: { name, phone, email, topic, subject, message, status: 'NEW', source: 'website' },
    select: { id: true, status: true, createdAt: true },
  });
}
