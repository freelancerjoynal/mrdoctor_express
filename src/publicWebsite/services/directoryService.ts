// Read-only directory queries for the publicWebsite module.
// PUBLIC-SAFE by construction: every query uses an explicit whitelisted select.
// Never exposed: email, phone (personal), whatsappNumber, whatsappAccessToken,
// whatsappId, userId, otp internals. Only APPROVED doctors/hospitals are listed.
import { prisma } from '../../lib/prisma.js';

export interface DirectoryPaging {
  page: number;
  limit: number;
}

export interface DoctorFilters extends DirectoryPaging {
  search?: string;
  speciality?: string;
  division?: string;
  district?: string;
  thana?: string;
}

export interface HospitalFilters extends DirectoryPaging {
  search?: string;
  division?: string;
  district?: string;
  thana?: string;
}

export interface ChamberFilters extends DirectoryPaging {
  search?: string;
  division?: string;
  district?: string;
  thana?: string;
}

export interface BlogFilters extends DirectoryPaging {
  search?: string;
  category?: string;
  authorType?: string;
  doctorUsername?: string;
  hospitalSlug?: string;
}

// Public blog card — safe subset of the blogs table (no authorUserId, no drafts).
const PUBLIC_BLOG_SELECT = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  content: true,
  coverImage: true,
  coverGradient: true,
  coverSymbol: true,
  category: true,
  tags: true,
  authorType: true,
  authorName: true,
  publishedAt: true,
  views: true,
  doctor: { select: { username: true, name: true, speciality: true } },
  hospital: { select: { slug: true, name: true } },
} as const;

// Public doctor card: identity + professional info + associated chambers/schedules.
const PUBLIC_DOCTOR_SELECT = {
  username: true,
  name: true,
  degree: true,
  speciality: true,
  tagline: true,
  bio: true,
  startedYear: true,
  bmdcNumber: true,
  profilePicture: true,
  gender: true,
  information: {
    select: {
      expertise: true,
      expertise_en: true,
      timeline: true,
      highlights: true,
      highlights_en: true,
      stats: true,
      stats_en: true,
      aboutImage: true,
      updatedAt: true,
    },
  },
  blogs: {
    where: { status: 'PUBLISHED' as const },
    orderBy: { publishedAt: 'desc' as const },
    take: 6,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      coverGradient: true,
      coverSymbol: true,
      category: true,
      tags: true,
      authorName: true,
      publishedAt: true,
      views: true,
    },
  },
  chambers: {
    select: {
      id: true,
      chamberName: true,
      addressLine: true,
      thana: true,
      district: true,
      division: true,
      newPatientFee: true,
      oldPatientFee: true,
      hospital: { select: { name: true, slug: true } },
    },
  },
  schedules: {
    select: {
      dayOfWeek: true,
      startTime: true,
      endTime: true,
      chamber: { select: { id: true, chamberName: true } },
    },
  },
  reviews: {
    where: { status: 'APPROVED' as const },
    orderBy: { createdAt: 'desc' as const },
    take: 3,
    select: {
      id: true,
      rating: true,
      reviewerName: true,
      title: true,
      comment: true,
      createdAt: true,
    },
  },
} as const;

// Slim doctor reference nested inside hospital chambers (no schedules here).
const NESTED_DOCTOR_SELECT = {
  username: true,
  name: true,
  degree: true,
  speciality: true,
  tagline: true,
  profilePicture: true,
  gender: true,
} as const;

// Public hospital card: identity + contact + associated chambers/doctors.
// NOTE: the Hospital table stores `addressLine` (no `address` column) —
// queries select it and alias to `address` so the public API shape stays
// stable for every frontend (portals, directory, location pages).
const PUBLIC_HOSPITAL_SELECT = {
  slug: true,
  name: true,
  addressLine: true,
  phone: true,
  establishedYear: true,
  chambers: {
    select: {
      id: true,
      chamberName: true,
      addressLine: true,
      thana: true,
      district: true,
      division: true,
      newPatientFee: true,
      oldPatientFee: true,
      doctor: { select: NESTED_DOCTOR_SELECT },
    },
  },
  reviews: {
    where: { status: 'APPROVED' as const },
    orderBy: { createdAt: 'desc' as const },
    take: 3,
    select: {
      id: true,
      rating: true,
      reviewerName: true,
      title: true,
      comment: true,
      createdAt: true,
    },
  },
  blogs: {
    where: { status: 'PUBLISHED' as const },
    orderBy: { publishedAt: 'desc' as const },
    take: 6,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      coverGradient: true,
      coverSymbol: true,
      category: true,
      tags: true,
      authorName: true,
      publishedAt: true,
      views: true,
    },
  },
} as const;

// Public chamber card: location + fees + slim doctor/hospital refs.
const PUBLIC_CHAMBER_SELECT = {
  id: true,
  chamberName: true,
  addressLine: true,
  thana: true,
  district: true,
  division: true,
  newPatientFee: true,
  oldPatientFee: true,
  doctor: { select: NESTED_DOCTOR_SELECT },
  hospital: { select: { slug: true, name: true } },
} as const;

// Shared 3-level location matcher for Doctor/Hospital (via nested chambers).
function chamberLocationFilter(filters: { division?: string; district?: string; thana?: string }) {
  const { division, district, thana } = filters;
  if (!division && !district && !thana) return undefined;
  return {
    some: {
      ...(division ? { division: { contains: division, mode: 'insensitive' as const } } : {}),
      ...(district ? { district: { contains: district, mode: 'insensitive' } } : {}),
      ...(thana ? { thana: { contains: thana, mode: 'insensitive' } } : {}),
    },
  };
}

export async function getPublicDoctors(filters: DoctorFilters) {
  const { search, speciality, division, district, thana, page, limit } = filters;

  const where: any = { status: 'APPROVED' };
  if (speciality) where.speciality = { contains: speciality, mode: 'insensitive' };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { speciality: { contains: search, mode: 'insensitive' } },
    ];
  }
  const location = chamberLocationFilter({ division, district, thana });
  if (location) where.chambers = location;

  const [total, data] = await prisma.$transaction([
    prisma.doctor.count({ where }),
    prisma.doctor.findMany({
      where,
      select: PUBLIC_DOCTOR_SELECT,
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function getPublicDoctorByUsername(username: string) {
  const doctor = await prisma.doctor.findFirst({
    where: { username, status: 'APPROVED' },
    select: PUBLIC_DOCTOR_SELECT,
  });
  if (!doctor) return null;
  const agg = await prisma.review.aggregate({
    where: { doctor: { username }, status: 'APPROVED' },
    _avg: { rating: true },
    _count: { rating: true },
  });
  return {
    ...doctor,
    rating: {
      average: agg._avg.rating ? Math.round(agg._avg.rating * 10) / 10 : 0,
      count: agg._count.rating,
    },
  };
}

export async function getPublicHospitals(filters: HospitalFilters) {
  const { search, division, district, thana, page, limit } = filters;

  const where: any = { status: 'APPROVED' };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { addressLine: { contains: search, mode: 'insensitive' } },
    ];
  }
  // Hospital itself has no location columns — locate via its chambers.
  const location = chamberLocationFilter({ division, district, thana });
  if (location) where.chambers = location;

  const [total, rows] = await prisma.$transaction([
    prisma.hospital.count({ where }),
    prisma.hospital.findMany({
      where,
      select: PUBLIC_HOSPITAL_SELECT,
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  // Alias addressLine → address (public API shape).
  const data = rows.map(({ addressLine, ...rest }) => ({ ...rest, address: addressLine ?? null }));

  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function getPublicHospitalBySlug(slug: string) {
  const row = await prisma.hospital.findFirst({
    where: { slug, status: 'APPROVED' },
    select: PUBLIC_HOSPITAL_SELECT,
  });
  if (!row) return null;
  const { addressLine, ...rest } = row;
  const hospital = { ...rest, address: addressLine ?? null };
  const agg = await prisma.review.aggregate({
    where: { hospital: { slug }, status: 'APPROVED' },
    _avg: { rating: true },
    _count: { rating: true },
  });
  return {
    ...hospital,
    rating: {
      average: agg._avg.rating ? Math.round(agg._avg.rating * 10) / 10 : 0,
      count: agg._count.rating,
    },
  };
}

export async function getPublicChambers(filters: ChamberFilters) {
  const { search, division, district, thana, page, limit } = filters;

  const where: any = {};
  if (division) where.division = { contains: division, mode: 'insensitive' };
  if (district) where.district = { contains: district, mode: 'insensitive' };
  if (thana) where.thana = { contains: thana, mode: 'insensitive' };
  if (search) {
    where.OR = [
      { chamberName: { contains: search, mode: 'insensitive' } },
      { addressLine: { contains: search, mode: 'insensitive' } },
      { thana: { contains: search, mode: 'insensitive' } },
      { district: { contains: search, mode: 'insensitive' } },
      { division: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [total, data] = await prisma.$transaction([
    prisma.chamber.count({ where }),
    prisma.chamber.findMany({
      where,
      select: PUBLIC_CHAMBER_SELECT,
      orderBy: [{ division: 'asc' }, { district: 'asc' }, { thana: 'asc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function getPublicChamberById(id: string) {
  return prisma.chamber.findUnique({
    where: { id },
    select: PUBLIC_CHAMBER_SELECT,
  });
}

// Only PUBLISHED blogs are ever public. Drafts/archived stay in usersBackend.
export async function getPublicBlogs(filters: BlogFilters) {
  const { search, category, authorType, doctorUsername, hospitalSlug, page, limit } = filters;

  const where: any = { status: 'PUBLISHED' };
  if (category) where.category = { contains: category, mode: 'insensitive' };
  if (authorType === 'DOCTOR' || authorType === 'HOSPITAL' || authorType === 'SUPER_ADMIN') {
    where.authorType = authorType;
  }
  if (doctorUsername) where.doctor = { username: doctorUsername };
  if (hospitalSlug) where.hospital = { slug: hospitalSlug };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [total, data] = await prisma.$transaction([
    prisma.blog.count({ where }),
    prisma.blog.findMany({
      where,
      select: PUBLIC_BLOG_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function getPublicBlogBySlug(slug: string) {
  const blog = await prisma.blog.findFirst({
    where: { slug, status: 'PUBLISHED' },
    select: PUBLIC_BLOG_SELECT,
  });
  if (blog) {
    // Best-effort view counter — never blocks the response.
    prisma.blog.update({ where: { slug }, data: { views: { increment: 1 } } }).catch(() => {});
  }
  return blog;
}

// Latest published posts of one hospital — powers the hospital portal blog section.
export async function getPublicHospitalBlogs(slug: string, take = 6) {
  const hospital = await prisma.hospital.findFirst({
    where: { slug, status: 'APPROVED' },
    select: { id: true },
  });
  if (!hospital) return null;
  return prisma.blog.findMany({
    where: { hospitalId: hospital.id, status: 'PUBLISHED' },
    select: PUBLIC_BLOG_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    take: Math.min(Math.max(take, 1), 12),
  });
}

// Latest published posts of one doctor — powers the profile-page blog section.
export async function getPublicDoctorBlogs(username: string, take = 6) {
  const doctor = await prisma.doctor.findFirst({
    where: { username, status: 'APPROVED' },
    select: { id: true },
  });
  if (!doctor) return null;
  return prisma.blog.findMany({
    where: { doctorId: doctor.id, status: 'PUBLISHED' },
    select: PUBLIC_BLOG_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    take: Math.min(Math.max(take, 1), 12),
  });
}
