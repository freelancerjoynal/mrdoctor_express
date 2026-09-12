// Service layer for listing pending_appointments with ownership scoping.
// DOCTOR sees rows for their own doctorId; HOSPITAL sees rows for their own
// hospitalId (derived from the booked chamber); SUPER_ADMIN sees everything
// and may narrow with doctorUsername / hospitalSlug / status filters.
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';

export interface AppointmentCaller {
  userId: string;
  role: UserRole;
}

export interface AppointmentFilters {
  status?: string;
  doctorUsername?: string;
  hospitalSlug?: string;
  page: number;
  limit: number;
}

async function ownershipFilter(caller: AppointmentCaller): Promise<Record<string, unknown>> {
  if (caller.role === 'SUPER_ADMIN') return {};
  if (caller.role === 'DOCTOR' || caller.role === 'DOCTOR_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true } } },
    });
    const doctorId = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    return { doctorId };
  }
  if (caller.role === 'HOSPITAL' || caller.role === 'HOSPITAL_STAFF') {
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

export async function listAppointments(caller: AppointmentCaller, filters: AppointmentFilters) {
  const owned = await ownershipFilter(caller);
  const where: Record<string, any> = { ...owned };

  if (filters.status === 'PENDING' || filters.status === 'CONFIRMED' || filters.status === 'CANCELLED') {
    where.status = filters.status;
  }
  // SUPER_ADMIN may narrow further; owners are already scoped so extra
  // filters only apply when they match the owned scope.
  if (filters.doctorUsername?.trim()) {
    const doctor = await prisma.doctor.findFirst({
      where: { username: filters.doctorUsername.trim() },
      select: { id: true },
    });
    if (!doctor) return { data: [], pagination: { ...pickPaging(filters), total: 0, totalPages: 0 } };
    if (owned.doctorId && owned.doctorId !== doctor.id) {
      return { data: [], pagination: { ...pickPaging(filters), total: 0, totalPages: 0 } };
    }
    where.doctorId = doctor.id;
  }
  if (filters.hospitalSlug?.trim()) {
    const hospital = await prisma.hospital.findFirst({
      where: { slug: filters.hospitalSlug.trim() },
      select: { id: true },
    });
    if (!hospital) return { data: [], pagination: { ...pickPaging(filters), total: 0, totalPages: 0 } };
    if (owned.hospitalId && owned.hospitalId !== hospital.id) {
      return { data: [], pagination: { ...pickPaging(filters), total: 0, totalPages: 0 } };
    }
    where.hospitalId = hospital.id;
  }

  const { page, limit } = pickPaging(filters);
  const [total, data] = await prisma.$transaction([
    prisma.pendingAppointment.count({ where }),
    prisma.pendingAppointment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        doctor: { select: { username: true, name: true, speciality: true } },
        hospital: { select: { slug: true, name: true } },
      },
    }),
  ]);
  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

function pickPaging(filters: AppointmentFilters) {
  const page = Math.max(1, filters.page || 1);
  const limit = Math.min(50, Math.max(1, filters.limit || 20));
  return { page, limit };
}

export async function updateAppointmentStatus(caller: AppointmentCaller, id: string, status: string) {
  if (status !== 'PENDING' && status !== 'CONFIRMED' && status !== 'CANCELLED') {
    throw new Error('INVALID_STATUS');
  }
  const owned = await ownershipFilter(caller);
  const existing = await prisma.pendingAppointment.findUnique({ where: { id } });
  if (!existing) throw new Error('APPOINTMENT_NOT_FOUND');
  const denied = Object.entries(owned).some(([key, value]) => (existing as any)[key] !== value);
  if (denied) throw new Error('FORBIDDEN');
  return prisma.pendingAppointment.update({ where: { id }, data: { status } });
}
