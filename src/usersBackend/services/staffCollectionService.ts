// Per-staff cash tracking for OFFLINE (walk-in/cash) bookings.
// Who took the booking (createdBy) + how much each user collected.
// Groups cover both ledgers so the card never drops on serve:
// - confirmed (still pending) + served (done) for the requested range.
import { prisma } from '../../lib/prisma.js';
import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
import { isAdminRole } from '../../authentication/middleware/authMiddleware.js';

export interface StaffCollectionCaller {
  userId: string;
  role: UserRole;
}

export type StaffCollectionRange = 'today' | 'tomorrow' | 'yesterday' | 'last30';

export const UNKNOWN_STAFF = 'unknown';

const DAY_MS = 86400000;

const BN_MONTH = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Parse an explicit calendar day (yyyy-mm-dd). Null when missing/invalid. */
function parseDay(value: unknown): Date | null {
  if (typeof value !== 'string' || !DATE_RE.test(value.trim())) return null;
  const [y, m, d] = value.trim().split('-').map(Number);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return null;
  if (y! < 2000 || y! > 2100 || m! < 1 || m! > 12 || d! < 1 || d! > 31) return null;
  const dt = new Date(y!, m! - 1, d!);
  if (Number.isNaN(dt.getTime())) return null;
  if (dt.getFullYear() !== y || dt.getMonth() !== m! - 1 || dt.getDate() !== d) return null;
  return dt;
}

function rangeBounds(range: StaffCollectionRange, date?: string): { gte: Date; lt: Date } {
  // Explicit calendar day wins over the named range (hospital dashboard date picker).
  const picked = parseDay(date);
  if (picked) {
    return { gte: picked, lt: new Date(picked.getTime() + DAY_MS) };
  }
  const today = startOfToday();
  if (range === 'tomorrow') {
    return { gte: new Date(today.getTime() + DAY_MS), lt: new Date(today.getTime() + 2 * DAY_MS) };
  }
  if (range === 'yesterday') {
    return { gte: new Date(today.getTime() - DAY_MS), lt: today };
  }
  if (range === 'last30') {
    return { gte: new Date(today.getTime() - 29 * DAY_MS), lt: new Date(today.getTime() + DAY_MS) };
  }
  return { gte: today, lt: new Date(today.getTime() + DAY_MS) };
}

async function resolveDoctorIds(
  caller: StaffCollectionCaller,
  doctorUsername?: string,
  doctorId?: string,
): Promise<string[]> {
  if (isAdminRole(caller.role)) {
    if (!doctorUsername?.trim()) throw new Error('DOCTOR_REQUIRED');
    const doctor = await prisma.doctor.findFirst({
      where: { username: doctorUsername.trim() },
      select: { id: true },
    });
    if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
    return [doctor.id];
  }
  if (caller.role === 'DOCTOR') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { doctorProfile: { select: { id: true } } },
    });
    const doctorId = (own as { doctorProfile?: { id: string } | null } | null)?.doctorProfile?.id;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    return [doctorId];
  }
  if (caller.role === 'DOCTOR_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { staffDoctorId: true },
    });
    const doctorId = (own as { staffDoctorId?: string | null } | null)?.staffDoctorId;
    if (!doctorId) throw new Error('NO_DOCTOR_PROFILE');
    return [doctorId];
  }
  if (caller.role === 'HOSPITAL' || caller.role === 'HOSPITAL_STAFF') {
    const own = await prisma.user.findUnique({
      where: { id: caller.userId },
      select: { hospitalProfile: { select: { id: true } }, staffHospitalId: true },
    });
    const hospitalId =
      caller.role === 'HOSPITAL'
        ? (own as { hospitalProfile?: { id: string } | null } | null)?.hospitalProfile?.id
        : (own as { staffHospitalId?: string | null } | null)?.staffHospitalId;
    if (!hospitalId) throw new Error('NO_HOSPITAL_PROFILE');
    const [chambers, schedules] = await Promise.all([
      prisma.chamber.findMany({ where: { hospitalId }, select: { doctorId: true } }),
      prisma.doctorSchedule.findMany({ where: { hospitalId }, select: { doctorId: true } }),
    ]);
    const ids = new Set<string>();
    for (const c of chambers) if (c.doctorId) ids.add(c.doctorId);
    for (const s of schedules) if ((s as { doctorId?: string | null }).doctorId) {
      ids.add((s as { doctorId: string }).doctorId);
    }
    // Single-doctor view: validate membership, then narrow.
    const narrow = doctorId?.trim();
    if (narrow) {
      if (!ids.has(narrow)) {
        const doctor = await prisma.doctor.findUnique({ where: { id: narrow }, select: { id: true } });
        if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
        throw new Error('DOCTOR_NOT_IN_HOSPITAL');
      }
      return [narrow];
    }
    return [...ids];
  }
  throw new Error('FORBIDDEN');
}

function amountOf(r: { collectionAmount?: unknown; paymentAmount?: unknown }): number {
  const c = r.collectionAmount as number | null | undefined;
  const p = r.paymentAmount as number | null | undefined;
  return Number(c ?? p ?? 0) || 0;
}

export interface StaffBucket {
  userId: string;
  name: string;
  count: number;
  total: number;
  confirmedCount: number;
  confirmedTotal: number;
  servedCount: number;
  servedTotal: number;
}

/** Per-taker OFFLINE totals for the range (confirmed + served combined).
 * `date` (yyyy-mm-dd) narrows to one explicit calendar day and wins over `range`. */
export async function getStaffCollections(
  caller: StaffCollectionCaller,
  opts: { range: StaffCollectionRange; date?: string; doctorUsername?: string; doctorId?: string },
): Promise<StaffBucket[]> {
  const doctorIds = await resolveDoctorIds(caller, opts.doctorUsername, opts.doctorId);
  if (doctorIds.length === 0) return [];
  const { gte, lt } = rangeBounds(opts.range, opts.date);
  const base = { doctorId: { in: doctorIds }, bookingType: 'OFFLINE' as const, appointmentDate: { gte, lt } };

  const [confirmed, served] = await Promise.all([
    prisma.confirmedAppointment.findMany({
      where: base,
      select: { createdBy: true, createdByName: true, collectionAmount: true, paymentAmount: true },
    }),
    prisma.servedAppointment.findMany({
      where: base,
      select: { createdBy: true, createdByName: true, collectionAmount: true, paymentAmount: true },
    }),
  ]);

  const map = new Map<string, StaffBucket & { known: boolean }>();
  const touch = (userId: string | null, name: string | null) => {
    const key = userId?.trim() ? userId.trim() : UNKNOWN_STAFF;
    let b = map.get(key);
    if (!b) {
      b = {
        userId: key,
        name: name?.trim() || '',
        count: 0,
        total: 0,
        confirmedCount: 0,
        confirmedTotal: 0,
        servedCount: 0,
        servedTotal: 0,
        known: key !== UNKNOWN_STAFF,
      };
      map.set(key, b);
    } else if (!b.name && name?.trim()) {
      b.name = name.trim();
    }
    return b;
  };
  for (const r of confirmed) {
    const b = touch(r.createdBy, r.createdByName);
    const a = amountOf(r);
    b.count += 1;
    b.total += a;
    b.confirmedCount += 1;
    b.confirmedTotal += a;
  }
  for (const r of served) {
    const b = touch(r.createdBy, r.createdByName);
    const a = amountOf(r);
    b.count += 1;
    b.total += a;
    b.servedCount += 1;
    b.servedTotal += a;
  }

  // Backfill display names for takers whose snapshot is empty.
  const missing = [...map.values()].filter((b) => b.known && !b.name).map((b) => b.userId);
  if (missing.length > 0) {
    const users = await prisma.user.findMany({
      where: { id: { in: missing } },
      select: { id: true, name: true, email: true },
    });
    for (const u of users) {
      const b = map.get(u.id);
      if (b) b.name = u.name?.trim() || u.email.split('@')[0] || 'স্টাফ';
    }
  }

  let rows = [...map.values()].map(({ known: _known, ...b }) => ({
    ...b,
    name: b.name || (b.userId === UNKNOWN_STAFF ? 'অজানা / আগের রেকর্ড' : 'স্টাফ'),
  }));

  // Doctor panel: hospital-collected cash must not show individual staff
  // names — combine every HOSPITAL / HOSPITAL_STAFF taker into one card
  // named by the hospital.
  if (caller.role === 'DOCTOR' || caller.role === 'DOCTOR_STAFF') {
    const knownIds = rows.filter((b) => b.userId !== UNKNOWN_STAFF).map((b) => b.userId);
    if (knownIds.length > 0) {
      const takers = await prisma.user.findMany({
        where: { id: { in: knownIds } },
        select: {
          id: true,
          role: true,
          staffHospitalId: true,
          hospitalProfile: { select: { id: true, name: true } },
          staffHospital: { select: { id: true, name: true } },
        },
      });
      const takerById = new Map(takers.map((t) => [t.id, t]));
      const hospitalIds = new Set<string>();
      for (const t of takers) {
        if (t.role !== 'HOSPITAL' && t.role !== 'HOSPITAL_STAFF') continue;
        const hid =
          t.role === 'HOSPITAL'
            ? (t.hospitalProfile as { id: string } | null)?.id
            : (t.staffHospitalId as string | null);
        if (hid) hospitalIds.add(hid);
      }
      const hospitalNameById = new Map<string, string>();
      if (hospitalIds.size > 0) {
        const hospitals = await prisma.hospital.findMany({
          where: { id: { in: [...hospitalIds] } },
          select: { id: true, name: true },
        });
        for (const h of hospitals) hospitalNameById.set(h.id, h.name);
        // Fallback to profile snapshots when the hospital row is missing.
        for (const t of takers) {
          if (t.role === 'HOSPITAL') {
            const hid = (t.hospitalProfile as { id: string; name: string } | null)?.id;
            const hname = (t.hospitalProfile as { id: string; name: string } | null)?.name;
            if (hid && !hospitalNameById.get(hid) && hname) hospitalNameById.set(hid, hname);
          } else if (t.role === 'HOSPITAL_STAFF') {
            const hid = t.staffHospitalId as string | null;
            const hname = (t.staffHospital as { id: string; name: string } | null)?.name;
            if (hid && !hospitalNameById.get(hid) && hname) hospitalNameById.set(hid, hname);
          }
        }
      }
      const merged = new Map<string, StaffBucket>();
      const keep: StaffBucket[] = [];
      for (const b of rows) {
        const t = takerById.get(b.userId);
        if (!t || (t.role !== 'HOSPITAL' && t.role !== 'HOSPITAL_STAFF')) {
          keep.push(b);
          continue;
        }
        const hid =
          t.role === 'HOSPITAL'
            ? (t.hospitalProfile as { id: string } | null)?.id
            : (t.staffHospitalId as string | null);
        if (!hid) {
          keep.push(b);
          continue;
        }
        const key = `hospital:${hid}`;
        let m = merged.get(key);
        if (!m) {
          m = {
            userId: key,
            name: hospitalNameById.get(hid) || 'হাসপাতাল',
            count: 0,
            total: 0,
            confirmedCount: 0,
            confirmedTotal: 0,
            servedCount: 0,
            servedTotal: 0,
          };
          merged.set(key, m);
        }
        m.count += b.count;
        m.total += b.total;
        m.confirmedCount += b.confirmedCount;
        m.confirmedTotal += b.confirmedTotal;
        m.servedCount += b.servedCount;
        m.servedTotal += b.servedTotal;
      }
      rows = [...keep, ...merged.values()];
    }
  }

  return rows.sort((x, y) => y.total - x.total || y.count - x.count);
}

export interface MonthlyLocalCount {
  year: number;
  month: number;
  name: string;
  /** Locally booked patients that month (confirmed pending + served done). */
  count: number;
}

/**
 * Last 12 calendar months (oldest → newest) of LOCAL booking patient counts.
 * Number only — no amounts. Both ledgers are counted so a booking never
 * drops when it is marked served. 24 tiny indexed COUNTs in parallel, no
 * rows transferred.
 */
export async function getLocalMonthlyCounts(
  caller: StaffCollectionCaller,
  opts: { doctorUsername?: string; doctorId?: string } = {},
): Promise<{ months: MonthlyLocalCount[]; thisMonth: MonthlyLocalCount }> {
  const doctorIds = await resolveDoctorIds(caller, opts.doctorUsername, opts.doctorId);
  const now = new Date();
  const bounds: { gte: Date; lt: Date; year: number; month: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const gte = new Date(now.getFullYear(), now.getMonth() - i, 1);
    bounds.push({ gte, lt: new Date(gte.getFullYear(), gte.getMonth() + 1, 1), year: gte.getFullYear(), month: gte.getMonth() + 1 });
  }
  if (doctorIds.length === 0) {
    const months = bounds.map((b) => ({ year: b.year, month: b.month, name: `${BN_MONTH[b.month - 1]} ${b.year}`, count: 0 }));
    return { months, thisMonth: months[months.length - 1] as MonthlyLocalCount };
  }
  const base = { doctorId: { in: doctorIds }, bookingType: 'OFFLINE' as const };
  const counts = await Promise.all(
    bounds.map(async (b) => {
      const where = { ...base, appointmentDate: { gte: b.gte, lt: b.lt } };
      const [c, s] = await Promise.all([
        prisma.confirmedAppointment.count({ where }),
        prisma.servedAppointment.count({ where }),
      ]);
      return c + s;
    }),
  );
  const months = bounds.map((b, i) => ({
    year: b.year,
    month: b.month,
    name: `${BN_MONTH[b.month - 1]} ${b.year}`,
    count: counts[i] ?? 0,
  }));
  return { months, thisMonth: months[months.length - 1] as MonthlyLocalCount };
}

export interface StaffRow {
  id: string;
  serial: number;
  patientName: string;
  contactPhone: string;
  problem: string;
  appointmentDate: Date;
  served: boolean;
  servedAt?: Date | string | null;
  createdBy?: string | null;
  createdByName?: string | null;
  amount: number;
  doctorId: string;
  doctorName: string;
  doctorSpeciality?: string | null;
}

export interface StaffDoctorBreakdown {
  doctorId: string;
  doctorName: string;
  doctorSpeciality?: string | null;
  count: number;
  total: number;
  confirmedCount: number;
  confirmedTotal: number;
  servedCount: number;
  servedTotal: number;
}

/** OFFLINE rows taken by one staff in the range (confirmed + served).
 * Each row carries its doctor so hospital desks can answer
 * "এই স্টাফ আজ কোন ডাক্তারের জন্য কত নিয়েছে" without extra round trips.
 * Response also includes a per-doctor breakdown (byDoctor) for that taker. */
export async function listStaffRows(
  caller: StaffCollectionCaller,
  opts: { range: StaffCollectionRange; userId: string; date?: string; doctorUsername?: string; doctorId?: string; limit?: unknown },
): Promise<{ name: string; confirmed: StaffRow[]; served: StaffRow[]; byDoctor: StaffDoctorBreakdown[] }> {
  const doctorIds = await resolveDoctorIds(caller, opts.doctorUsername, opts.doctorId);
  const { gte, lt } = rangeBounds(opts.range, opts.date);
  const key = opts.userId?.trim() || UNKNOWN_STAFF;
  // Combined hospital card (doctor panel): userId is `hospital:<hospitalId>` —
  // match every taker of that hospital (owner + staff) instead of one user.
  let hospitalName: string | null = null;
  let createdByFilter: string | null | { in: string[] };
  if (key.startsWith('hospital:')) {
    const hospitalId = key.slice('hospital:'.length).trim();
    const [hospital, staffMembers] = await Promise.all([
      prisma.hospital.findUnique({ where: { id: hospitalId }, select: { userId: true, name: true } }),
      prisma.user.findMany({ where: { staffHospitalId: hospitalId }, select: { id: true } }),
    ]);
    if (!hospital) throw new Error('DOCTOR_NOT_FOUND');
    hospitalName = hospital.name?.trim() || 'হাসপাতাল';
    const memberIds = [
      ...staffMembers.map((s) => s.id),
      ...(hospital.userId ? [hospital.userId] : []),
    ];
    if (memberIds.length === 0) {
      return { name: hospitalName, confirmed: [], served: [], byDoctor: [] };
    }
    createdByFilter = { in: memberIds };
  } else {
    createdByFilter = key === UNKNOWN_STAFF ? null : key;
  }
  const base: {
    doctorId: string | { in: string[] };
    bookingType: 'OFFLINE';
    appointmentDate: { gte: Date; lt: Date };
    createdBy: string | null | { in: string[] };
  } = {
    doctorId: doctorIds.length === 1 ? (doctorIds[0] as string) : { in: doctorIds },
    bookingType: 'OFFLINE',
    appointmentDate: { gte, lt },
    createdBy: createdByFilter,
  };
  const limit = Math.min(100, Math.max(1, Number(opts.limit) || 50));

  const [confirmed, served] = await Promise.all([
    prisma.confirmedAppointment.findMany({
      where: base,
      orderBy: [{ appointmentDate: 'asc' }, { serial: 'asc' }],
      take: limit,
      include: { doctor: { select: { id: true, name: true, speciality: true } } },
    }),
    // Served rows keep only a doctorName snapshot (no doctor relation) —
    // names/specialities are backfilled from the doctors table below.
    prisma.servedAppointment.findMany({
      where: base,
      orderBy: [{ appointmentDate: 'asc' }, { serial: 'asc' }],
      take: limit,
    }),
  ]);

  // Backfill doctor display info for served rows (snapshot may be stale).
  const servedDoctorIds = [...new Set(served.map((r) => r.doctorId).filter(Boolean))];
  const servedDoctors =
    servedDoctorIds.length > 0
      ? await prisma.doctor.findMany({
          where: { id: { in: servedDoctorIds } },
          select: { id: true, name: true, speciality: true },
        })
      : [];
  const servedDoctorMap = new Map(servedDoctors.map((d) => [d.id, d]));

  const name =
    hospitalName ??
    ((confirmed[0] as { createdByName?: string | null } | undefined)?.createdByName?.trim() ||
      (served[0] as { createdByName?: string | null } | undefined)?.createdByName?.trim() ||
      (key === UNKNOWN_STAFF ? 'অজানা / আগের রেকর্ড' : 'স্টাফ'));

  const toRow = (
    r: {
      id: string;
      serial: number;
      patientName: string;
      contactPhone: string;
      appointmentDate: Date;
      createdBy?: string | null;
      createdByName?: string | null;
      collectionAmount?: number | null;
      paymentAmount?: number | null;
      problem?: string | null;
      servedAt?: Date | null;
      doctorId: string;
      doctorName?: string | null;
      doctor?: { id: string; name: string; speciality: string } | null;
    },
    isServed: boolean,
  ): StaffRow => ({
    id: r.id,
    serial: r.serial,
    patientName: r.patientName,
    contactPhone: r.contactPhone,
    problem: r.problem ?? '',
    appointmentDate: r.appointmentDate,
    served: isServed,
    servedAt: r.servedAt ?? null,
    createdBy: r.createdBy,
    createdByName: r.createdByName,
    amount: amountOf(r),
    doctorId: r.doctorId,
    doctorName: r.doctor?.name?.trim() || r.doctorName?.trim() || 'ডাক্তার',
    doctorSpeciality: r.doctor?.speciality ?? null,
  });
  const confirmedRows = confirmed.map((r) => toRow(r as never, false));
  const servedRows = served.map((r) => {
    const info = servedDoctorMap.get(r.doctorId) as
      | { id: string; name: string; speciality: string }
      | undefined;
    return toRow(
      {
        ...(r as object),
        doctor: info ?? null,
      } as never,
      true,
    );
  });

  // Per-doctor breakdown for this taker (confirmed + served combined).
  const byMap = new Map<string, StaffDoctorBreakdown>();
  const touchDoctor = (row: StaffRow) => {
    let b = byMap.get(row.doctorId);
    if (!b) {
      b = {
        doctorId: row.doctorId,
        doctorName: row.doctorName,
        doctorSpeciality: row.doctorSpeciality ?? null,
        count: 0,
        total: 0,
        confirmedCount: 0,
        confirmedTotal: 0,
        servedCount: 0,
        servedTotal: 0,
      };
      byMap.set(row.doctorId, b);
    }
    return b;
  };
  for (const row of confirmedRows) {
    const b = touchDoctor(row);
    b.count += 1;
    b.total += row.amount;
    b.confirmedCount += 1;
    b.confirmedTotal += row.amount;
  }
  for (const row of servedRows) {
    const b = touchDoctor(row);
    b.count += 1;
    b.total += row.amount;
    b.servedCount += 1;
    b.servedTotal += row.amount;
  }
  const byDoctor = [...byMap.values()].sort((x, y) => y.total - x.total || y.count - x.count);
  return { name, confirmed: confirmedRows, served: servedRows, byDoctor };
}
