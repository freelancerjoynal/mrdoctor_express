// Service layer for a doctor's chambers + weekly schedules (timing / date availability).
// - DOCTOR: always their own doctorProfile.
// - DOCTOR_STAFF: their staffDoctor, only when users.canManageChambers is true
//   (doctor enables it per staff from StaffPanel / Chambers page).
// - SUPER_ADMIN: may pass an explicit doctorId, otherwise their own (if any).
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface ChamberCaller {
  userId: string;
  role: UserRole;
}

const DAY_RE = /^(SATURDAY|SUNDAY|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY)$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const MAX_SHORT = 100;
const MAX_NAME = 120;
const MAX_ADDR = 300;
const MAX_FEE = 100000;

function optText(raw: unknown, max: number): string | null | undefined {
  if (raw === undefined) return undefined;
  if (raw === null) return null;
  if (typeof raw !== 'string') throw new Error('INVALID_CHAMBER_FIELD');
  const v = raw.trim().replace(/\s+/g, ' ');
  if (!v) return null;
  if (v.length > max) throw new Error('INVALID_CHAMBER_FIELD');
  return v;
}

function optFee(raw: unknown): number | undefined {
  if (raw === undefined) return undefined;
  if (raw === null || raw === '') return 0;
  const n = typeof raw === 'number' ? raw : Number(String(raw).trim());
  if (!Number.isFinite(n) || n < 0 || n > MAX_FEE) throw new Error('INVALID_CHAMBER_FIELD');
  return Math.round(n);
}

function optCoord(raw: unknown, min: number, max: number): number | null | undefined {
  if (raw === undefined) return undefined;
  if (raw === null || raw === '') return null;
  const n = typeof raw === 'number' ? raw : Number(String(raw).trim());
  if (!Number.isFinite(n) || n < min || n > max) throw new Error('INVALID_CHAMBER_FIELD');
  return n;
}

function cleanTime(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_SCHEDULE_FIELD');
  const v = raw.trim();
  if (!TIME_RE.test(v)) throw new Error('INVALID_SCHEDULE_FIELD');
  return v;
}

function cleanDay(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_SCHEDULE_FIELD');
  const v = raw.trim().toUpperCase();
  if (!DAY_RE.test(v)) throw new Error('INVALID_SCHEDULE_FIELD');
  return v;
}

async function resolveDoctorId(caller: ChamberCaller, explicitDoctorId?: string): Promise<string> {
  if (caller.role === 'SUPER_ADMIN') {
    if (explicitDoctorId?.trim()) {
      const target = await prisma.doctor.findUnique({
        where: { id: explicitDoctorId.trim() },
        select: { id: true },
      });
      if (!target) throw new Error('DOCTOR_NOT_FOUND');
      return target.id;
    }
  }
  if (caller.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true } } },
    });
    const id = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    if (!id) throw new Error('NO_DOCTOR_PROFILE');
    return id;
  }
  if (caller.role === 'DOCTOR_STAFF') {
    const staff = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffDoctorId: true, canManageChambers: true },
    });
    if (!staff?.staffDoctorId) throw new Error('NO_DOCTOR_PROFILE');
    if (!staff.canManageChambers) throw new Error('FORBIDDEN');
    return staff.staffDoctorId;
  }
  throw new Error('FORBIDDEN');
}

export interface ChamberInput {
  chamberName?: unknown;
  chamberName_en?: unknown;
  addressLine?: unknown;
  addressLine_en?: unknown;
  thana?: unknown;
  thana_en?: unknown;
  district?: unknown;
  district_en?: unknown;
  division?: unknown;
  division_en?: unknown;
  newPatientFee?: unknown;
  oldPatientFee?: unknown;
  latitude?: unknown;
  longitude?: unknown;
  hospitalId?: unknown;
}

function buildChamberData(input: ChamberInput, forCreate: boolean): Record<string, string | number | null> {
  const data: Record<string, string | number | null> = {};
  const name = optText(input.chamberName, MAX_NAME);
  const addr = optText(input.addressLine, MAX_ADDR);
  if (name !== undefined) data.chamberName = name;
  if (addr !== undefined) data.addressLine = addr;
  if (forCreate && (data.chamberName ?? null) === null && (data.addressLine ?? null) === null) {
    throw new Error('INVALID_CHAMBER_FIELD');
  }
  const pairs: Array<[keyof ChamberInput, string, number]> = [
    ['chamberName_en', 'chamberName_en', MAX_NAME],
    ['addressLine_en', 'addressLine_en', MAX_ADDR],
    ['thana', 'thana', MAX_SHORT],
    ['thana_en', 'thana_en', MAX_SHORT],
    ['district', 'district', MAX_SHORT],
    ['district_en', 'district_en', MAX_SHORT],
    ['division', 'division', MAX_SHORT],
    ['division_en', 'division_en', MAX_SHORT],
  ];
  for (const [key, col, max] of pairs) {
    const v = optText(input[key], max);
    if (v !== undefined) data[col] = v;
  }
  const nf = optFee(input.newPatientFee);
  const of = optFee(input.oldPatientFee);
  if (nf !== undefined) data.newPatientFee = nf;
  if (of !== undefined) data.oldPatientFee = of;
  const lat = optCoord(input.latitude, -90, 90);
  const lng = optCoord(input.longitude, -180, 180);
  if (lat !== undefined) data.latitude = lat;
  if (lng !== undefined) data.longitude = lng;
  return data;
}

async function resolveHospitalId(raw: unknown): Promise<string | null | undefined> {
  if (raw === undefined) return undefined;
  if (raw === null) return null;
  if (typeof raw !== 'string') throw new Error('INVALID_CHAMBER_FIELD');
  const v = raw.trim();
  if (!v) return null;
  const hospital = await prisma.hospital.findUnique({ where: { id: v }, select: { id: true } });
  if (!hospital) throw new Error('HOSPITAL_NOT_FOUND');
  return hospital.id;
}

const CHAMBER_WITH_RELATIONS = {
  schedules: { orderBy: [{ dayOfWeek: 'asc' as const }, { startTime: 'asc' as const }] },
  hospital: { select: { id: true, name: true, name_en: true } },
};

export async function listChambers(caller: ChamberCaller, explicitDoctorId?: string) {
  const doctorId = await resolveDoctorId(caller, explicitDoctorId);
  return prisma.chamber.findMany({
    where: { doctorId },
    include: CHAMBER_WITH_RELATIONS,
    orderBy: { createdAt: 'asc' },
  });
}

export interface HospitalOptionFilters {
  search?: string;
  division?: string;
  district?: string;
  thana?: string;
}

// Hospital dropdown for the add/edit-chamber form: cascading
// division > district > thana + free search across name + name_en
// (Bangla + English). Returns matching hospitals + location facets.
export async function listHospitalOptions(caller: ChamberCaller, filters: HospitalOptionFilters) {
  await resolveDoctorId(caller);
  const search = filters.search?.trim();
  const division = filters.division?.trim();
  const district = filters.district?.trim();
  const thana = filters.thana?.trim();

  const where: Record<string, unknown> = {};
  if (division) where.division = division;
  if (district) where.district = district;
  if (thana) where.thana = thana;
  if (search) {
    (where as Record<string, unknown>).OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { name_en: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [data, locations] = await Promise.all([
    prisma.hospital.findMany({
      where: where as never,
      select: {
        id: true,
        name: true,
        name_en: true,
        division: true,
        division_en: true,
        district: true,
        district_en: true,
        thana: true,
        thana_en: true,
      },
      orderBy: { name: 'asc' },
      take: 100,
    }),
    prisma.hospital.findMany({
      select: { division: true, district: true, thana: true },
      take: 500,
    }),
  ]);

  const uniq = (vals: Array<string | null>): string[] => [...new Set(vals.filter((v): v is string => !!v?.trim()))].sort();
  return {
    data,
    facets: {
      divisions: uniq(locations.map((l) => l.division)),
      districts: uniq(locations.map((l) => (division && l.division !== division ? null : l.district))),
      thanas: uniq(
        locations.map((l) =>
          (division && l.division !== division) || (district && l.district !== district) ? null : l.thana,
        ),
      ),
    },
  };
}

export async function createChamber(caller: ChamberCaller, input: ChamberInput & { doctorId?: unknown }) {
  const doctorId = await resolveDoctorId(
    caller,
    typeof input.doctorId === 'string' ? input.doctorId : undefined,
  );
  const data = buildChamberData(input, true);
  const hospitalId = await resolveHospitalId(input.hospitalId);
  return prisma.chamber.create({
    data: { ...data, doctorId, ...(hospitalId !== undefined ? { hospitalId } : {}) } as never,
    include: CHAMBER_WITH_RELATIONS,
  });
}

export async function updateChamber(caller: ChamberCaller, id: string, input: ChamberInput) {
  const doctorId = await resolveDoctorId(caller);
  const existing = await prisma.chamber.findUnique({ where: { id }, select: { id: true, doctorId: true } });
  if (!existing || existing.doctorId !== doctorId) throw new Error('CHAMBER_NOT_FOUND');
  const data = buildChamberData(input, false);
  const hospitalId = await resolveHospitalId(input.hospitalId);
  if (hospitalId !== undefined) (data as Record<string, unknown>).hospitalId = hospitalId;
  if (Object.keys(data).length === 0) throw new Error('NOTHING_TO_UPDATE');
  return prisma.chamber.update({
    where: { id },
    data: data as never,
    include: CHAMBER_WITH_RELATIONS,
  });
}

export async function deleteChamber(caller: ChamberCaller, id: string) {
  const doctorId = await resolveDoctorId(caller);
  const existing = await prisma.chamber.findUnique({ where: { id }, select: { id: true, doctorId: true } });
  if (!existing || existing.doctorId !== doctorId) throw new Error('CHAMBER_NOT_FOUND');
  await prisma.$transaction(async (tx) => {
    await tx.doctorSchedule.deleteMany({ where: { chamberId: id, doctorId } });
    await tx.chamber.delete({ where: { id } });
  });
  return { id };
}

export interface ScheduleInput {
  chamberId?: unknown;
  dayOfWeek?: unknown;
  startTime?: unknown;
  endTime?: unknown;
}

async function assertChamberBelongs(doctorId: string, chamberId: string) {
  const chamber = await prisma.chamber.findUnique({
    where: { id: chamberId },
    select: { id: true, doctorId: true },
  });
  if (!chamber || chamber.doctorId !== doctorId) throw new Error('CHAMBER_NOT_FOUND');
}

// One weekday belongs to at most one chamber: reject when another schedule
// of the same doctor already holds `dayOfWeek` under a different chamber
// (null chamber = general pool, its own group).
async function assertDayFree(
  doctorId: string,
  dayOfWeek: string,
  chamberKey: string | null,
  excludeScheduleId?: string,
) {
  const existing = await prisma.doctorSchedule.findMany({
    where: {
      doctorId,
      dayOfWeek: dayOfWeek as never,
      ...(excludeScheduleId ? { NOT: { id: excludeScheduleId } } : {}),
    },
    select: { id: true, chamberId: true },
  });
  if (existing.some((s) => (s.chamberId ?? null) !== chamberKey)) throw new Error('DAY_TAKEN');
}

export async function listSchedules(caller: ChamberCaller, explicitDoctorId?: string) {
  const doctorId = await resolveDoctorId(caller, explicitDoctorId);
  return prisma.doctorSchedule.findMany({
    where: { doctorId },
    include: { chamber: { select: { id: true, chamberName: true, addressLine: true } } },
    orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
  });
}

export async function createSchedule(caller: ChamberCaller, input: ScheduleInput & { doctorId?: unknown }) {
  const doctorId = await resolveDoctorId(
    caller,
    typeof input.doctorId === 'string' ? input.doctorId : undefined,
  );
  const dayOfWeek = cleanDay(input.dayOfWeek);
  const startTime = cleanTime(input.startTime);
  const endTime = cleanTime(input.endTime);
  if (startTime >= endTime) throw new Error('INVALID_SCHEDULE_FIELD');
  let chamberId: string | null = null;
  if (input.chamberId !== undefined && input.chamberId !== null && String(input.chamberId).trim()) {
    chamberId = String(input.chamberId).trim();
    await assertChamberBelongs(doctorId, chamberId);
  }
  await assertDayFree(doctorId, dayOfWeek, chamberId);
  const hospitalId = chamberId
    ? (await prisma.chamber.findUnique({ where: { id: chamberId }, select: { hospitalId: true } }))?.hospitalId ?? null
    : null;
  return prisma.doctorSchedule.create({
    data: { doctorId, chamberId, hospitalId, dayOfWeek: dayOfWeek as never, startTime, endTime },
  });
}

export async function updateSchedule(caller: ChamberCaller, id: string, input: ScheduleInput) {
  const doctorId = await resolveDoctorId(caller);
  const existing = await prisma.doctorSchedule.findUnique({
    where: { id },
    select: { id: true, doctorId: true, dayOfWeek: true, startTime: true, endTime: true, chamberId: true },
  });
  if (!existing || existing.doctorId !== doctorId) throw new Error('SCHEDULE_NOT_FOUND');
  const data: Record<string, unknown> = {};
  if (input.dayOfWeek !== undefined) data.dayOfWeek = cleanDay(input.dayOfWeek);
  if (input.startTime !== undefined) data.startTime = cleanTime(input.startTime);
  if (input.endTime !== undefined) data.endTime = cleanTime(input.endTime);
  if (input.chamberId !== undefined) {
    if (input.chamberId === null || !String(input.chamberId).trim()) {
      data.chamberId = null;
      data.hospitalId = null;
    } else {
      const chamberId = String(input.chamberId).trim();
      await assertChamberBelongs(doctorId, chamberId);
      data.chamberId = chamberId;
      data.hospitalId =
        (await prisma.chamber.findUnique({ where: { id: chamberId }, select: { hospitalId: true } }))?.hospitalId ??
        null;
    }
  }
  if (Object.keys(data).length === 0) throw new Error('NOTHING_TO_UPDATE');
  const start = (data.startTime as string | undefined) ?? existing.startTime;
  const end = (data.endTime as string | undefined) ?? existing.endTime;
  if (start >= end) throw new Error('INVALID_SCHEDULE_FIELD');
  const finalDay = ((data.dayOfWeek as string | undefined) ?? existing.dayOfWeek) as string;
  const finalChamber = (
    data.chamberId !== undefined ? (data.chamberId as string | null) : (existing.chamberId as string | null)
  ) as string | null;
  await assertDayFree(doctorId, finalDay, finalChamber ?? null, id);
  return prisma.doctorSchedule.update({ where: { id }, data: data as never });
}

export async function deleteSchedule(caller: ChamberCaller, id: string) {
  const doctorId = await resolveDoctorId(caller);
  const existing = await prisma.doctorSchedule.findUnique({
    where: { id },
    select: { id: true, doctorId: true },
  });
  if (!existing || existing.doctorId !== doctorId) throw new Error('SCHEDULE_NOT_FOUND');
  await prisma.doctorSchedule.delete({ where: { id } });
  return { id };
}
