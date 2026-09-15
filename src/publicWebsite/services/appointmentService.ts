// Public appointment intake for the website (doctor portal + hospital popup share it).
// POST lands as PENDING in pending_appointments — same table the WhatsApp bot writes.
// hospitalId is derived from the selected chamber (chamber.hospitalId) so every row
// stays filterable by doctor AND by hospital.
import { prisma } from '../../lib/prisma.js';

export const DAY_BN: Record<string, string> = {
  SATURDAY: 'শনিবার',
  SUNDAY: 'রবিবার',
  MONDAY: 'সোমবার',
  TUESDAY: 'মঙ্গলবার',
  WEDNESDAY: 'বুধবার',
  THURSDAY: 'বৃহস্পতিবার',
  FRIDAY: 'শুক্রবার',
};

const BN_MONTH = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
];

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBnDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]!);
}

function jsDayToEnum(d: Date): string {
  return ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][d.getDay()]!;
}

function formatBnDate(d: Date): string {
  return `${toBnDigits(d.getDate())} ${BN_MONTH[d.getMonth()]}`;
}

/** "শনিবার, ১৩ সেপ্টেম্বর" (+ আজকে/আগামীকাল prefix when applicable). */
export function buildDayLabel(date: Date): string {
  const now = new Date();
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((startOf(date) - startOf(now)) / 86400000);
  const prefix = diff === 0 ? 'আজকে — ' : diff === 1 ? 'আগামীকাল — ' : '';
  return `${prefix}${DAY_BN[jsDayToEnum(date)]}${diff > 1 ? '' : ''}, ${formatBnDate(date)}`;
}

function bnToEn(s: string): string {
  const map: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
  };
  return (s || '').replace(/[০-৯]/g, (d) => map[d] ?? d);
}

/** Bangladeshi mobile: 10 digits after stripping 0/+880 prefix. */
function cleanPhone(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_PHONE');
  const digits = bnToEn(raw).replace(/[^0-9]/g, '');
  const core = digits.startsWith('880') ? digits.slice(3) : digits.startsWith('0') ? digits.slice(1) : digits;
  if (!/^[0-9]{10}$/.test(core)) throw new Error('INVALID_PHONE');
  return digits.startsWith('880') ? `+${digits}` : `0${core}`;
}

function cleanName(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_NAME');
  const name = raw.trim().replace(/\s+/g, ' ');
  if (name.length < 3 || name.length > 80) throw new Error('INVALID_NAME');
  return name;
}

function cleanProblem(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_PROBLEM');
  const problem = raw.trim();
  if (problem.length < 3 || problem.length > 1000) throw new Error('INVALID_PROBLEM');
  return problem;
}

export interface CreateAppointmentInput {
  doctorUsername?: string;
  hospitalSlug?: string;
  chamberId?: string;
  appointmentDate?: string;
  patientName?: string;
  patientType?: string;
  contactPhone?: string;
  phoneNumber?: string;
  problem?: string;
  patientAge?: number | string;
  patientWeight?: number | string;
  patientArea?: string;
}

/** Booking options for the form: chambers + schedules + next running days. */
export async function getAppointmentOptions(username: string) {
  const key = (username || '').trim();
  if (!key) throw new Error('DOCTOR_NOT_FOUND');
  const doctor = await prisma.doctor.findFirst({
    where: { username: key, status: 'APPROVED' },
    select: {
      id: true,
      username: true,
      name: true,
      speciality: true,
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
          hospitalId: true,
          hospital: { select: { slug: true, name: true } },
        },
        orderBy: { createdAt: 'asc' },
      },
      schedules: {
        select: { dayOfWeek: true, chamberId: true, startTime: true, endTime: true },
      },
    },
  });
  if (!doctor) throw new Error('DOCTOR_NOT_FOUND');

  // Today + the very next running days (up to 30 days out): the patient picks
  // today or the next available date — tomorrow, day after, whenever it runs.
  // Each day carries its owning chamber (one weekday = one chamber) so the
  // public form shows the chamber for the chosen date with no dropdown.
  const roster = (doctor.schedules || []).map((s) => String(s.dayOfWeek).toUpperCase());
  const ownerOf = (dayOfWeek: string): string | null =>
    doctor.schedules.find((s) => s.chamberId && String(s.dayOfWeek).toUpperCase() === dayOfWeek)?.chamberId ?? null;
  const days: Array<{ date: string; dayOfWeek: string; dayBn: string; label: string; chamberId: string | null }> = [];
  const now = new Date();
  for (let offset = 0; offset < 30 && days.length < 2; offset++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const dayOfWeek = jsDayToEnum(date);
    if (!roster.includes(dayOfWeek)) continue;
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    days.push({ date: iso, dayOfWeek, dayBn: DAY_BN[dayOfWeek]!, label: buildDayLabel(date), chamberId: ownerOf(dayOfWeek) });
  }

  return {
    doctor: { username: doctor.username, name: doctor.name, speciality: doctor.speciality },
    chambers: doctor.chambers.map((c) => ({
      id: c.id,
      name: c.hospital?.name || c.chamberName || c.addressLine || 'চেম্বার',
      area: [c.thana, c.district].filter(Boolean).join(', '),
      newFee: Number(c.newPatientFee) || 0,
      oldFee: Number(c.oldPatientFee) || 0,
      hospital: c.hospital ? { slug: c.hospital.slug, name: c.hospital.name } : null,
    })),
    schedules: doctor.schedules.map((s) => ({
      dayOfWeek: s.dayOfWeek,
      dayBn: DAY_BN[String(s.dayOfWeek).toUpperCase()] || String(s.dayOfWeek),
      chamberId: s.chamberId,
      startTime: s.startTime,
      endTime: s.endTime,
    })),
    days,
  };
}

// Skip-clock parser (mirrors usersBackend serialLiveService.parseSkipMap — kept
// local so the public module never imports the operator backend).
function parseSkipMap(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const now = new Date();
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!/^\d+$/.test(k) || typeof v !== 'string') continue;
    const t = new Date(v);
    if (Number.isNaN(t.getTime())) continue;
    if (t.getFullYear() !== now.getFullYear() || t.getMonth() !== now.getMonth() || t.getDate() !== now.getDate())
      continue;
    out[k] = v;
  }
  return out;
}

// Live serial scoreboard board data (public — polled by /live/<username>).
// When the board is off, only the flag + doctor identity are returned.
export async function getSerialLiveBoard(username: string) {
  const key = (username || '').trim();
  if (!key) throw new Error('DOCTOR_NOT_FOUND');
  const doctor = await prisma.doctor.findFirst({
    where: { username: key, status: 'APPROVED' },
    select: {
      id: true,
      username: true,
      name: true,
      speciality: true,
      profilePicture: true,
      serialLive: true,
      liveCurrentSerial: true,
      liveUpdatedAt: true,
      liveSkippedAt: true,
    },
  });
  if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
  const base = {
    live: doctor.serialLive,
    doctor: {
      username: doctor.username,
      name: doctor.name,
      speciality: doctor.speciality,
      profilePicture: doctor.profilePicture,
    },
    liveUpdatedAt: doctor.liveUpdatedAt,
  };
  if (!doctor.serialLive) return { ...base, current: null, next: null, upcoming: [], missed: [], waitingCount: 0, totalToday: 0 };

  const now = new Date();
  const gte = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [rows, chambers] = await Promise.all([
    prisma.confirmedAppointment.findMany({
      where: { doctorId: doctor.id, appointmentDate: { gte, lt: new Date(gte.getTime() + 86400000) }, status: { not: 'CANCELLED' } },
      select: { serial: true, patientName: true, chamberId: true, chamberName: true, bookingType: true },
      orderBy: { serial: 'asc' },
    }),
    prisma.chamber.findMany({
      where: { doctorId: doctor.id },
      select: { id: true, hospital: { select: { name: true } } },
    }),
  ]);
  const hospitalOf = new Map(chambers.map((c) => [c.id, c.hospital?.name ?? null]));
  const queue = rows.map((r) => ({
    serial: r.serial,
    patientName: r.patientName,
    chamberName: r.chamberName,
    hospitalName: (r.chamberId && hospitalOf.get(r.chamberId)) || null,
    bookingType: r.bookingType as 'ONLINE' | 'OFFLINE',
  }));
  const pinned =
    doctor.liveCurrentSerial != null
      ? (queue.find((q) => q.serial === doctor.liveCurrentSerial) ?? null)
      : null;
  const current = pinned ?? queue[0] ?? null;
  const next = current ? (queue.find((q) => q.serial > current.serial) ?? null) : null;
  const skipMap = parseSkipMap(doctor.liveSkippedAt);
  const seen = new Set<number>();
  const missed = [...queue.filter((q) => !!current && q.serial < current.serial), ...queue.filter((q) => skipMap[String(q.serial)] != null)]
    .filter((q) => (seen.has(q.serial) ? false : (seen.add(q.serial), true)))
    .sort((a, b) => a.serial - b.serial)
    .map((q) => ({ ...q, skippedAt: skipMap[String(q.serial)] ?? null }));
  // Few-left release (mirrors usersBackend serialLiveService): while live and
  // at most 2 active bookings remain, outstanding skip clocks are wiped —
  // no matter how much punishment is left — so missed rejoin the flow.
  let liveMissed = missed;
  if (doctor.serialLive && missed.length > 0 && queue.length - missed.length <= 2) {
    const inQueue = new Set(queue.map((q) => String(q.serial)));
    const pruned: Record<string, string> = {};
    for (const [k, v] of Object.entries(skipMap)) {
      if (!inQueue.has(k)) pruned[k] = v;
    }
    if (Object.keys(pruned).length !== Object.keys(skipMap).length) {
      await prisma.doctor.update({ where: { id: doctor.id }, data: { liveSkippedAt: pruned } });
      const seen2 = new Set<number>();
      liveMissed = [...queue.filter((q) => !!current && q.serial < current.serial), ...queue.filter((q) => pruned[String(q.serial)] != null)]
        .filter((q) => (seen2.has(q.serial) ? false : (seen2.add(q.serial), true)))
        .sort((a, b) => a.serial - b.serial)
        .map((q) => ({ ...q, skippedAt: pruned[String(q.serial)] ?? null }));
    }
  }
  // Board reached the tail (≤2 serials ahead) but missed patients are still
  // waiting: bring them onto the waiting (upcoming) list automatically so the
  // flow continues instead of stalling at the end.
  const ahead = current ? queue.filter((q) => q.serial > current.serial) : [];
  const upcoming = [
    ...ahead.slice(0, 8),
    ...(current && ahead.length <= 2
      ? liveMissed.filter((q) => q.serial !== current.serial).slice(0, Math.max(0, 8 - ahead.length))
      : []),
  ];
  return {
    ...base,
    current,
    next,
    upcoming,
    // Skipped ("not present") serials — asked to wait, served when they return.
    missed: liveMissed,
    // Whoever is inside is NOT counted as waiting — everyone else (ahead + missed) is.
    waitingCount: current ? queue.length - 1 : queue.length,
    totalToday: queue.length,
  };
}

// Website submission — validates like the WhatsApp intake, then saves PENDING.
export async function createAppointment(input: CreateAppointmentInput) {
  const doctorKey = (input.doctorUsername || '').trim();
  if (!doctorKey) throw new Error('DOCTOR_NOT_FOUND');
  const doctor = await prisma.doctor.findFirst({
    where: { username: doctorKey, status: 'APPROVED' },
    select: {
      id: true,
      name: true,
      chambers: { select: { id: true, chamberName: true, addressLine: true, thana: true, district: true, hospitalId: true, hospital: { select: { id: true, slug: true, name: true } } } },
      schedules: { select: { dayOfWeek: true, chamberId: true } },
    },
  });
  if (!doctor) throw new Error('DOCTOR_NOT_FOUND');

  const patientName = cleanName(input.patientName);
  const contactPhone = cleanPhone(input.contactPhone ?? input.phoneNumber);
  const problem = cleanProblem(input.problem);

  // Patient type: NEW (নতুন রোগী) or RENEW (পুরনো রোগী) — decides the fee.
  const rawType = typeof input.patientType === 'string' ? input.patientType.trim().toUpperCase() : '';
  if (rawType !== 'NEW' && rawType !== 'RENEW') throw new Error('INVALID_PATIENT_TYPE');
  const patientType = rawType;

  let patientAge: number | null = null;
  if (input.patientAge !== undefined && input.patientAge !== null && String(input.patientAge).trim() !== '') {
    const n = Number(bnToEn(String(input.patientAge)).replace(/[^0-9]/g, ''));
    if (!Number.isFinite(n) || n <= 0 || n > 130) throw new Error('INVALID_AGE');
    patientAge = Math.floor(n);
  }
  let patientWeight: number | null = null;
  if (input.patientWeight !== undefined && input.patientWeight !== null && String(input.patientWeight).trim() !== '') {
    const n = Number(bnToEn(String(input.patientWeight)).replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(n) || n < 1 || n > 500) throw new Error('INVALID_WEIGHT');
    patientWeight = n;
  }
  const patientArea =
    typeof input.patientArea === 'string' && input.patientArea.trim()
      ? input.patientArea.trim().slice(0, 120)
      : null;

  // Date: today or the next running days (up to 30 days out) — tomorrow,
  // day after, whenever the doctor runs.
  if (typeof input.appointmentDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(input.appointmentDate.trim())) {
    throw new Error('INVALID_DATE');
  }
  const [y, m, d] = input.appointmentDate.trim().split('-').map(Number);
  const appointmentDate = new Date(y!, m! - 1, d!);
  if (Number.isNaN(appointmentDate.getTime())) throw new Error('INVALID_DATE');
  const now = new Date();
  const startOf = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diffDays = Math.round((startOf(appointmentDate) - startOf(now)) / 86400000);
  if (diffDays < 0 || diffDays > 30) throw new Error('INVALID_DATE');
  const dayOfWeek = jsDayToEnum(appointmentDate);

  // Chamber: explicit pick wins; otherwise auto-resolve from the chosen date's
  // weekday (one weekday = one chamber) — the public form has no dropdown.
  // hospitalSlug narrows the scope for hospital portals.
  let chamber = null as null | (typeof doctor.chambers)[number];
  const slugKey = (input.hospitalSlug || '').trim().toLowerCase();
  const scoped = slugKey
    ? doctor.chambers.filter((c) => c.hospital?.slug.toLowerCase() === slugKey)
    : doctor.chambers;
  const ownerOfDay = (day: string): string | null =>
    doctor.schedules.find((s) => s.chamberId && String(s.dayOfWeek).toUpperCase() === day)?.chamberId ?? null;
  if (typeof input.chamberId === 'string' && input.chamberId.trim()) {
    chamber = scoped.find((c) => c.id === input.chamberId!.trim()) ?? null;
    if (!chamber) throw new Error('INVALID_CHAMBER');
  } else if (scoped.length > 0) {
    // A date owned by another hospital's chamber isn't bookable in this portal.
    const globalOwner = ownerOfDay(dayOfWeek);
    if (slugKey && globalOwner && !scoped.some((c) => c.id === globalOwner)) {
      throw new Error('CLOSED_DAY');
    }
    const scopedOwner = doctor.schedules.find(
      (s) =>
        s.chamberId &&
        String(s.dayOfWeek).toUpperCase() === dayOfWeek &&
        scoped.some((c) => c.id === s.chamberId),
    )?.chamberId;
    chamber = (scopedOwner && scoped.find((c) => c.id === scopedOwner)) || scoped[0]!;
  }
  if (!doctor.chambers.length) throw new Error('NO_CHAMBER');

  // The date must be a running day (chamber-bound schedules win, else full roster).
  const relevant = chamber
    ? (() => {
        const own = doctor.schedules.filter(
          (s) => (s.chamberId || '').toLowerCase() === chamber!.id.toLowerCase(),
        );
        return own.length ? own : doctor.schedules;
      })()
    : doctor.schedules;
  if (!relevant.some((s) => String(s.dayOfWeek).toUpperCase() === dayOfWeek)) {
    throw new Error('CLOSED_DAY');
  }

  const chamberName = chamber
    ? [chamber.hospital?.name || chamber.chamberName || chamber.addressLine, [chamber.thana, chamber.district].filter(Boolean).join(', ')].filter(Boolean).join(' — ')
    : null;
  const hospitalId = chamber?.hospitalId ?? null;
  const hospitalName = chamber?.hospital?.name ?? null;
  const dayLabel = buildDayLabel(appointmentDate);

  const row = await prisma.pendingAppointment.create({
    data: {
      phoneNumber: contactPhone,
      doctorId: doctor.id,
      doctorName: doctor.name,
      hospitalId,
      hospitalName,
      problem,
      appointmentDate,
      dayLabel,
      chamberId: chamber?.id ?? null,
      chamberName,
      patientName,
      patientType,
      patientAge,
      patientWeight,
      patientArea,
      contactPhone,
      source: 'website',
      status: 'PENDING',
    },
    select: { id: true, dayLabel: true, appointmentDate: true },
  });

  return {
    id: row.id,
    dayLabel: row.dayLabel,
    message: `✅ ধন্যবাদ, ${patientName}! আপনার অনুরোধটি পেয়েছি। ${dayLabel} — আমরা শীঘ্রই আপনাকে কল করব। 📞`,
  };
}
