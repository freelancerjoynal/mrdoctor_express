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

// Public doctor card: identity + professional info + associated chambers/schedules.
const PUBLIC_DOCTOR_SELECT = {
  username: true,
  name: true,
  degree: true,
  speciality: true,
  tagline: true,
  bio: true,
  startedYear: true,
  profilePicture: true,
  gender: true,
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
} as const;

// Slim doctor reference nested inside hospital chambers (no schedules here).
const NESTED_DOCTOR_SELECT = {
  username: true,
  name: true,
  degree: true,
  speciality: true,
} as const;

// Public hospital card: identity + contact + associated chambers/doctors.
const PUBLIC_HOSPITAL_SELECT = {
  slug: true,
  name: true,
  address: true,
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
  return prisma.doctor.findFirst({
    where: { username, status: 'APPROVED' },
    select: PUBLIC_DOCTOR_SELECT,
  });
}

export async function getPublicHospitals(filters: HospitalFilters) {
  const { search, division, district, thana, page, limit } = filters;

  const where: any = { status: 'APPROVED' };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { address: { contains: search, mode: 'insensitive' } },
    ];
  }
  // Hospital itself has no location columns — locate via its chambers.
  const location = chamberLocationFilter({ division, district, thana });
  if (location) where.chambers = location;

  const [total, data] = await prisma.$transaction([
    prisma.hospital.count({ where }),
    prisma.hospital.findMany({
      where,
      select: PUBLIC_HOSPITAL_SELECT,
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function getPublicHospitalBySlug(slug: string) {
  return prisma.hospital.findFirst({
    where: { slug, status: 'APPROVED' },
    select: PUBLIC_HOSPITAL_SELECT,
  });
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
