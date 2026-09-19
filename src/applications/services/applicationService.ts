// Service layer for public join-request forms + admin review.
// Self-registration is disabled — doctors/hospitals apply from the website
// (no account needed) and SUPER_ADMIN / ADMIN_MANAGER approves (creating
// User + profile on their behalf) or rejects. Admins may also create
// accounts directly without any join request.
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '../../lib/prisma.js';
import { sendMail } from '../../lib/mailer.js';

function cleanEmail(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_EMAIL');
  const email = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160) throw new Error('INVALID_EMAIL');
  return email;
}

function cleanPhone(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_PHONE');
  const phone = raw.trim().replace(/[\s-]/g, '');
  if (!/^\+?[0-9]{6,16}$/.test(phone)) throw new Error('INVALID_PHONE');
  return phone;
}

function required(raw: unknown, code: string, min = 2, max = 120): string {
  if (typeof raw !== 'string') throw new Error(code);
  const v = raw.trim().replace(/\s+/g, ' ');
  if (v.length < min || v.length > max) throw new Error(code);
  return v;
}

function optional(raw: unknown, max = 500): string | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== 'string') throw new Error('INVALID_INPUT');
  const v = raw.trim().replace(/\s+/g, ' ');
  if (!v) return null;
  if (v.length > max) throw new Error('INVALID_INPUT');
  return v;
}

/** Optional long text (bio): keeps newlines, collapses blank lines. */
function optionalLong(raw: unknown, max = 5000): string | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== 'string') throw new Error('INVALID_INPUT');
  const v = raw.trim().replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  if (!v) return null;
  if (v.length > max) throw new Error('INVALID_INPUT');
  return v;
}

/** Optional phone: undefined/null/'' = null, else validated like cleanPhone. */
function optionalPhone(raw: unknown): string | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== 'string') throw new Error('INVALID_INPUT');
  const v = raw.trim().replace(/[\s-]/g, '');
  if (!v) return null;
  if (!/^\+?[0-9]{6,16}$/.test(v)) throw new Error('INVALID_PHONE');
  return v;
}

/** Optional gender: ''/null = null, else MALE | FEMALE. */
function parseGender(raw: unknown): 'MALE' | 'FEMALE' | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== 'string') throw new Error('INVALID_INPUT');
  const g = raw.trim().toUpperCase();
  if (!g) return null;
  if (g !== 'MALE' && g !== 'FEMALE') throw new Error('INVALID_INPUT');
  return g;
}

/** Optional year: ''/null = null, else integer within range. */
function parseYear(raw: unknown, min = 1950): number | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw === 'number' && Number.isInteger(raw)) {
    const y = raw;
    const cur = new Date().getFullYear();
    if (y < min || y > cur) throw new Error('INVALID_INPUT');
    return y;
  }
  if (typeof raw !== 'string') throw new Error('INVALID_INPUT');
  const v = raw.trim();
  if (!v) return null;
  const y = Number(v);
  const cur = new Date().getFullYear();
  if (!Number.isInteger(y) || y < min || y > cur) throw new Error('INVALID_INPUT');
  return y;
}

/** URL-safe handle: lowercase latin/digits + hyphens. */
export function slugify(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/** 10-char alphanumeric temporary password (shown once + emailed). */
function makeTempPassword(): string {
  return crypto.randomBytes(8).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).padEnd(10, '7');
}

async function assertNoPendingDuplicate(email: string, type: 'DOCTOR' | 'HOSPITAL') {
  const dup = await prisma.joinRequest.findFirst({
    where: { email, type: type as never, status: 'PENDING' as never },
    select: { id: true },
  });
  if (dup) throw new Error('ALREADY_APPLIED');
}

async function assertEmailFree(email: string) {
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) throw new Error('EMAIL_TAKEN');
}

// ------------------------------------------------------------------
// Public: submit applications (no auth)
// ------------------------------------------------------------------

export async function submitDoctorApplication(input: {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  degree?: unknown;
  speciality?: unknown;
  username?: unknown;
  division?: unknown;
  district?: unknown;
  thana?: unknown;
  addressLine?: unknown;
  foundUs?: unknown;
  joinReason?: unknown;
  note?: unknown;
}) {
  const name = required(input.name, 'INVALID_NAME');
  const email = cleanEmail(input.email);
  const phone = cleanPhone(input.phone);
  const degree = required(input.degree, 'INVALID_DEGREE', 2, 200);
  const speciality = required(input.speciality, 'INVALID_SPECIALITY', 2, 120);
  const usernameRaw = optional(input.username, 60);
  const username = usernameRaw ? slugify(usernameRaw) : null;
  if (usernameRaw && username!.length < 3) throw new Error('INVALID_USERNAME');
  // Location is optional for doctors (required for hospitals).
  const division = optional(input.division, 120);
  const district = optional(input.district, 120);
  const thana = optional(input.thana, 120);
  const addressLine = optional(input.addressLine, 300);
  const foundUs = optional(input.foundUs, 200);
  const joinReason = optional(input.joinReason, 1000);
  const note = optional(input.note, 1000);

  await assertNoPendingDuplicate(email, 'DOCTOR');
  // A registered account never needs to apply again.
  const account = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (account) throw new Error('EMAIL_TAKEN');

  if (username) {
    const taken = await prisma.doctor.findUnique({ where: { username }, select: { id: true } });
    if (taken) throw new Error('USERNAME_TAKEN');
  }

  return prisma.joinRequest.create({
    data: {
      type: 'DOCTOR' as never,
      email, phone, name, degree, speciality, username,
      division, district, thana, addressLine, foundUs, joinReason, note,
    },
  });
}

export async function submitHospitalApplication(input: {
  hospitalName?: unknown;
  email?: unknown;
  phone?: unknown;
  slug?: unknown;
  division?: unknown;
  district?: unknown;
  thana?: unknown;
  addressLine?: unknown;
  foundUs?: unknown;
  joinReason?: unknown;
  note?: unknown;
}) {
  const hospitalName = required(input.hospitalName, 'INVALID_NAME');
  const email = cleanEmail(input.email);
  const phone = cleanPhone(input.phone);
  const division = required(input.division, 'INVALID_DIVISION');
  const district = required(input.district, 'INVALID_DISTRICT');
  const thana = required(input.thana, 'INVALID_THANA');
  const slugRaw = optional(input.slug, 60);
  const slug = slugRaw ? slugify(slugRaw) : null;
  if (slugRaw && slug!.length < 3) throw new Error('INVALID_SLUG');
  const addressLine = optional(input.addressLine, 300);
  const foundUs = optional(input.foundUs, 200);
  const joinReason = optional(input.joinReason, 1000);
  const note = optional(input.note, 1000);

  await assertNoPendingDuplicate(email, 'HOSPITAL');
  const account = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (account) throw new Error('EMAIL_TAKEN');

  if (slug) {
    const taken = await prisma.hospital.findUnique({ where: { slug }, select: { id: true } });
    if (taken) throw new Error('SLUG_TAKEN');
  }

  return prisma.joinRequest.create({
    data: {
      type: 'HOSPITAL' as never,
      email, phone, hospitalName, slug, division, district, thana, addressLine,
      foundUs, joinReason, note,
    },
  });
}

// ------------------------------------------------------------------
// SUPER_ADMIN: review queue
// ------------------------------------------------------------------

export async function listApplications(filter: { status?: unknown; type?: unknown }) {
  const status = typeof filter.status === 'string' && ['PENDING', 'APPROVED', 'REJECTED'].includes(filter.status)
    ? filter.status
    : undefined;
  const type = typeof filter.type === 'string' && ['DOCTOR', 'HOSPITAL'].includes(filter.type)
    ? filter.type
    : undefined;
  return prisma.joinRequest.findMany({
    where: {
      ...(status ? { status: status as never } : {}),
      ...(type ? { type: type as never } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
}

export async function countPendingApplications() {
  const [doctors, hospitals] = await Promise.all([
    prisma.joinRequest.count({ where: { type: 'DOCTOR' as never, status: 'PENDING' as never } }),
    prisma.joinRequest.count({ where: { type: 'HOSPITAL' as never, status: 'PENDING' as never } }),
  ]);
  return { doctors, hospitals, total: doctors + hospitals };
}

async function createDoctorAccountFromData(data: {
  name: string;
  email: string;
  phone: string;
  degree: string;
  speciality: string;
  username: string;
  tempPassword: string;
  // Full Doctor-table mirrors (all optional — admin can fill at creation time)
  name_en?: string | null;
  degree_en?: string | null;
  speciality_en?: string | null;
  tagline?: string | null;
  tagline_en?: string | null;
  bio?: string | null;
  bio_en?: string | null;
  whatsappNumber?: string | null;
  whatsappAccessToken?: string | null;
  whatsappId?: string | null;
  templateName?: string;
  profilePicture?: string | null;
  gender?: 'MALE' | 'FEMALE' | null;
  religion?: string | null;
  startedYear?: number | null;
  bmdcNumber?: string | null;
}) {
  await assertEmailFree(data.email);
  const hashedPassword = await bcrypt.hash(data.tempPassword, 10);
  const user = await prisma.user.create({
    data: { email: data.email, password: hashedPassword, role: 'DOCTOR' as never, isVerified: true },
  });
  const doctor = await prisma.doctor.create({
    data: {
      userId: user.id,
      name: data.name,
      name_en: data.name_en ?? undefined,
      username: data.username,
      email: data.email,
      phone: data.phone,
      degree: data.degree,
      degree_en: data.degree_en ?? undefined,
      speciality: data.speciality,
      speciality_en: data.speciality_en ?? undefined,
      tagline: data.tagline ?? data.speciality,
      tagline_en: data.tagline_en ?? undefined,
      bio: data.bio ?? undefined,
      bio_en: data.bio_en ?? undefined,
      whatsappNumber: data.whatsappNumber ?? undefined,
      whatsappAccessToken: data.whatsappAccessToken ?? undefined,
      whatsappId: data.whatsappId ?? undefined,
      profilePicture: data.profilePicture ?? undefined,
      gender: (data.gender ?? undefined) as never,
      religion: data.religion ?? undefined,
      startedYear: data.startedYear ?? undefined,
      bmdcNumber: data.bmdcNumber ?? undefined,
      status: 'APPROVED',
      templateName: data.templateName || 'template_a',
    },
  });
  return { user, doctor };
}

async function createHospitalAccountFromData(data: {
  hospitalName: string;
  email: string;
  phone: string;
  slug: string;
  division: string;
  district: string;
  thana: string;
  addressLine: string | null;
  tempPassword: string;
  // Full Hospital-table mirrors (all optional)
  name_en?: string | null;
  templateName?: string;
  division_en?: string | null;
  district_en?: string | null;
  thana_en?: string | null;
  addressLine_en?: string | null;
  establishedYear?: number | null;
}) {
  await assertEmailFree(data.email);
  const hashedPassword = await bcrypt.hash(data.tempPassword, 10);
  const user = await prisma.user.create({
    data: { email: data.email, password: hashedPassword, role: 'HOSPITAL' as never, isVerified: true },
  });
  const hospital = await prisma.hospital.create({
    data: {
      userId: user.id,
      name: data.hospitalName,
      name_en: data.name_en ?? undefined,
      slug: data.slug,
      division: data.division,
      division_en: data.division_en ?? undefined,
      district: data.district,
      district_en: data.district_en ?? undefined,
      thana: data.thana,
      thana_en: data.thana_en ?? undefined,
      addressLine: data.addressLine,
      addressLine_en: data.addressLine_en ?? undefined,
      phone: data.phone,
      establishedYear: data.establishedYear ?? undefined,
      status: 'APPROVED',
      templateName: data.templateName || 'template_a',
    },
  });
  return { user, hospital };
}

function safeUser(user: Record<string, unknown>) {
  const { password: _pw, refreshToken: _rt, otp: _otp, otpExpiry: _oe, ...safe } = user;
  return safe;
}

async function notifyCredentials(email: string, tempPassword: string, orgName: string): Promise<boolean> {
  try {
    await sendMail({
      to: email,
      subject: 'আপনার MrDoctor লগইন তথ্য',
      text: `${orgName} — আপনার অ্যাকাউন্ট তৈরি হয়েছে।\n\nইমেইল: ${email}\nপাসওয়ার্ড: ${tempPassword}\n\nএই তথ্য দিয়ে লগইন করুন। লগইনের পর ইমেইলে পাঠানো ওটিপি দিয়ে ভেরিফাই করুন।`,
      html: `
      <h3>${orgName} — আপনার অ্যাকাউন্ট তৈরি হয়েছে</h3>
      <p>ইমেইল: <b>${email}</b></p>
      <p>পাসওয়ার্ড: <b>${tempPassword}</b></p>
      <p>এই তথ্য দিয়ে লগইন করুন। লগইনের পর ইমেইলে পাঠানো ওটিপি দিয়ে ভেরিফাই করুন।</p>
    `,
    });
    return true;
  } catch (error) {
    console.error('Account credentials email failed:', error);
    return false;
  }
}

export async function approveApplication(id: string, reviewerId: string) {
  const app = await prisma.joinRequest.findUnique({ where: { id } });
  if (!app || (app as { status: string }).status !== 'PENDING') throw new Error('APPLICATION_NOT_FOUND');
  const a = app as unknown as {
    type: string; email: string; phone: string;
    name: string | null; degree: string | null; speciality: string | null; username: string | null;
    hospitalName: string | null; slug: string | null;
    division: string | null; district: string | null; thana: string | null; addressLine: string | null;
  };

  const tempPassword = makeTempPassword();
  let created: { user: { id: string } };
  let emailSent: boolean;

  if (a.type === 'DOCTOR') {
    if (!a.name || !a.degree || !a.speciality) throw new Error('APPLICATION_INCOMPLETE');
    const base = a.username && a.username.length >= 3 ? a.username : slugify(a.name);
    let username = base.length >= 3 ? base : `dr-${Date.now().toString(36)}`;
    const clash = await prisma.doctor.findUnique({ where: { username }, select: { id: true } });
    if (clash) username = `${username}-${Date.now().toString(36).slice(-4)}`;
    created = await createDoctorAccountFromData({
      name: a.name, email: a.email, phone: a.phone,
      degree: a.degree, speciality: a.speciality, username, tempPassword,
    });
    emailSent = await notifyCredentials(a.email, tempPassword, 'MrDoctor');
  } else {
    if (!a.hospitalName || !a.division || !a.district || !a.thana) throw new Error('APPLICATION_INCOMPLETE');
    const base = a.slug && a.slug.length >= 3 ? a.slug : slugify(a.hospitalName);
    let slug = base.length >= 3 ? base : `hospital-${Date.now().toString(36)}`;
    const clash = await prisma.hospital.findUnique({ where: { slug }, select: { id: true } });
    if (clash) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
    created = await createHospitalAccountFromData({
      hospitalName: a.hospitalName, email: a.email, phone: a.phone, slug,
      division: a.division, district: a.district, thana: a.thana,
      addressLine: a.addressLine, tempPassword,
    });
    emailSent = await notifyCredentials(a.email, tempPassword, a.hospitalName);
  }

  await prisma.joinRequest.update({
    where: { id },
    data: { status: 'APPROVED' as never, reviewedBy: reviewerId, reviewedAt: new Date() },
  });
  // tempPassword is returned once (email may have failed) — never stored.
  return { id, userId: created.user.id, tempPassword, emailSent };
}

export async function rejectApplication(id: string, reviewerId: string) {
  const app = await prisma.joinRequest.findUnique({ where: { id } });
  if (!app || (app as { status: string }).status !== 'PENDING') throw new Error('APPLICATION_NOT_FOUND');
  await prisma.joinRequest.update({
    where: { id },
    data: { status: 'REJECTED' as never, reviewedBy: reviewerId, reviewedAt: new Date() },
  });
  return { id };
}

// ------------------------------------------------------------------
// SUPER_ADMIN: create accounts directly (no application needed)
// ------------------------------------------------------------------

export async function createDoctor(input: {
  name?: unknown; email?: unknown; password?: unknown; phone?: unknown;
  degree?: unknown; speciality?: unknown; username?: unknown;
  // Full Doctor-table mirrors (all optional)
  name_en?: unknown; degree_en?: unknown; speciality_en?: unknown;
  tagline?: unknown; tagline_en?: unknown; bio?: unknown; bio_en?: unknown;
  whatsappNumber?: unknown; whatsappAccessToken?: unknown; whatsappId?: unknown;
  templateName?: unknown; profilePicture?: unknown; gender?: unknown;
  religion?: unknown; startedYear?: unknown; bmdcNumber?: unknown;
}) {
  const name = required(input.name, 'INVALID_NAME');
  const email = cleanEmail(input.email);
  const phone = cleanPhone(input.phone);
  const degree = required(input.degree, 'INVALID_DEGREE', 2, 200);
  const speciality = required(input.speciality, 'INVALID_SPECIALITY', 2, 120);
  const usernameRaw = required(input.username, 'INVALID_USERNAME', 3, 60);
  const username = slugify(usernameRaw);
  if (username.length < 3) throw new Error('INVALID_USERNAME');

  const name_en = optional(input.name_en, 80);
  const degree_en = optional(input.degree_en, 200);
  const speciality_en = optional(input.speciality_en, 120);
  const tagline = optional(input.tagline, 200);
  const tagline_en = optional(input.tagline_en, 200);
  const bio = optionalLong(input.bio, 5000);
  const bio_en = optionalLong(input.bio_en, 5000);
  const whatsappNumber = optionalPhone(input.whatsappNumber);
  const whatsappId = optional(input.whatsappId, 100);
  const whatsappAccessToken = optional(input.whatsappAccessToken, 1000);
  const profilePicture = optional(input.profilePicture, 500);
  const religion = optional(input.religion, 50);
  const bmdcNumber = optional(input.bmdcNumber, 50);
  const templateName = optional(input.templateName, 50) ?? 'template_a';
  const gender = parseGender(input.gender);
  const startedYear = parseYear(input.startedYear);

  let tempPassword: string;
  if (input.password === undefined || input.password === null || input.password === '') {
    tempPassword = makeTempPassword();
  } else {
    if (typeof input.password !== 'string' || input.password.length < 8) throw new Error('PASSWORD_TOO_SHORT');
    tempPassword = input.password;
  }

  const clash = await prisma.doctor.findUnique({ where: { username }, select: { id: true } });
  if (clash) throw new Error('USERNAME_TAKEN');

  const { user, doctor } = await createDoctorAccountFromData({
    name, email, phone, degree, speciality, username, tempPassword,
    name_en, degree_en, speciality_en, tagline, tagline_en, bio, bio_en,
    whatsappNumber, whatsappId, whatsappAccessToken, profilePicture,
    religion, templateName, gender, startedYear, bmdcNumber,
  });
  const emailSent = input.password ? true : await notifyCredentials(email, tempPassword, 'MrDoctor');
  return { user: safeUser(user as unknown as Record<string, unknown>), doctor, tempPassword: input.password ? undefined : tempPassword, emailSent };
}

export async function createHospital(input: {
  hospitalName?: unknown; email?: unknown; password?: unknown; phone?: unknown;
  slug?: unknown; division?: unknown; district?: unknown; thana?: unknown; addressLine?: unknown;
  // Full Hospital-table mirrors (all optional)
  name_en?: unknown; templateName?: unknown;
  division_en?: unknown; district_en?: unknown; thana_en?: unknown;
  addressLine_en?: unknown; establishedYear?: unknown;
}) {
  const hospitalName = required(input.hospitalName, 'INVALID_NAME');
  const email = cleanEmail(input.email);
  const phone = cleanPhone(input.phone);
  const division = required(input.division, 'INVALID_DIVISION');
  const district = required(input.district, 'INVALID_DISTRICT');
  const thana = required(input.thana, 'INVALID_THANA');
  const slugRaw = required(input.slug, 'INVALID_SLUG', 3, 60);
  const slug = slugify(slugRaw);
  if (slug.length < 3) throw new Error('INVALID_SLUG');
  const addressLine = optional(input.addressLine, 300);

  const name_en = optional(input.name_en, 120);
  const templateName = optional(input.templateName, 50) ?? 'template_a';
  const division_en = optional(input.division_en, 120);
  const district_en = optional(input.district_en, 120);
  const thana_en = optional(input.thana_en, 120);
  const addressLine_en = optional(input.addressLine_en, 300);
  const establishedYear = parseYear(input.establishedYear, 1800);

  let tempPassword: string;
  if (input.password === undefined || input.password === null || input.password === '') {
    tempPassword = makeTempPassword();
  } else {
    if (typeof input.password !== 'string' || input.password.length < 8) throw new Error('PASSWORD_TOO_SHORT');
    tempPassword = input.password;
  }

  const clash = await prisma.hospital.findUnique({ where: { slug }, select: { id: true } });
  if (clash) throw new Error('SLUG_TAKEN');

  const { user, hospital } = await createHospitalAccountFromData({
    hospitalName, email, phone, slug, division, district, thana, addressLine, tempPassword,
    name_en, templateName, division_en, district_en, thana_en, addressLine_en, establishedYear,
  });
  const emailSent = input.password ? true : await notifyCredentials(email, tempPassword, hospitalName);
  return { user: safeUser(user as unknown as Record<string, unknown>), hospital, tempPassword: input.password ? undefined : tempPassword, emailSent };
}
