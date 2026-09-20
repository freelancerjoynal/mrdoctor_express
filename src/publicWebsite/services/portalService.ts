// Thana-portal aggregation for the location subdomains.
// Every location is a thana: `<slug>.domain.com` lists the categories
// (doctor specialities) derived from chambers in that thana, plus the
// doctors / hospitals behind them. Single source of truth = chambers.
//
// Strict thana-by-thana: each doctor/hospital row carries ONLY its chambers
// in this thana (plus only the schedules tied to those chambers), so a
// chamber from another thana can never leak into this portal — not in the
// UI, not in popups, not even in the serialized payload.
import { prisma } from '../../lib/prisma.js';
import { getPublicDoctors, getPublicHospitals } from './directoryService.js';

export interface PortalFilters {
  division?: string;
  district?: string;
  thana?: string;
  /** Whole-district portal (`?scope=district`) — thana skipped. */
  districtWide?: boolean;
  limit?: number;
}

export interface PortalCategory {
  speciality: string;
  doctors: number;
}

function chamberMatch(filters: { division?: string; district?: string; thana?: string }) {
  const { division, district, thana } = filters;
  if (!division && !district && !thana) return undefined;
  return {
    some: {
      ...(division ? { division: { contains: division, mode: 'insensitive' as const } } : {}),
      ...(district ? { district: { contains: district, mode: 'insensitive' as const } } : {}),
      ...(thana ? { thana: { contains: thana, mode: 'insensitive' as const } } : {}),
    },
  };
}

/** Same contains-insensitive rule as the query, applied to one chamber row. */
function isLocalChamber(
  chamber: { division?: string | null; district?: string | null; thana?: string | null },
  loc: { division?: string; district?: string; thana?: string },
): boolean {
  const hit = (value: string | null | undefined, needle: string | undefined) =>
    !needle || (value ?? '').toLowerCase().includes(needle.toLowerCase());
  return hit(chamber.division, loc.division) && hit(chamber.district, loc.district) && hit(chamber.thana, loc.thana);
}

export async function getThanaPortal(filters: PortalFilters) {
  const { division, district, thana, districtWide } = filters;
  const limit = Math.min(Math.max(filters.limit ?? 100, 1), 100);
  const loc = districtWide ? { division, district } : { division, district, thana };

  const doctorWhere: any = { status: 'APPROVED' };
  const location = chamberMatch(loc);
  if (location) doctorWhere.chambers = location;

  // Categories = distinct specialities of doctors with a chamber here.
  // (groupBy has no limit issue — every category shows up even past page 1.)
  const groups = await prisma.doctor.groupBy({
    by: ['speciality'],
    where: doctorWhere,
    _count: { speciality: true },
  });
  const categories: PortalCategory[] = groups
    .map((g) => ({
      speciality: g.speciality,
      doctors: g._count.speciality,
    }))
    .sort((a, b) => b.doctors - a.doctors);

  const [doctors, hospitals, chamberCount] = await Promise.all([
    getPublicDoctors({ page: 1, limit, ...loc }),
    getPublicHospitals({ page: 1, limit, ...loc }),
    prisma.chamber.count({
      where: {
        ...(division ? { division: { contains: division, mode: 'insensitive' as const } } : {}),
        ...(district ? { district: { contains: district, mode: 'insensitive' as const } } : {}),
        ...(!districtWide && thana ? { thana: { contains: thana, mode: 'insensitive' as const } } : {}),
      },
    }),
  ]);

  // Trim every row to this thana's chambers (+ schedules tied to them).
  const trimChambers = <T extends { chambers?: any[] | null }>(row: T): T => ({
    ...row,
    chambers: (row.chambers ?? []).filter((c) => isLocalChamber(c, loc)),
  });
  const trimSchedules = <T extends { chambers?: { id: string }[] | null; schedules?: any[] | null }>(row: T): T => {
    const ids = new Set((row.chambers ?? []).map((c) => c.id));
    return {
      ...row,
      schedules: (row.schedules ?? []).filter((s) => !s?.chamber?.id || ids.has(s.chamber.id)),
    };
  };
  const trimDoctor = (d: any) => trimSchedules(trimChambers(d));

  return {
    data: {
      categories,
      doctors: doctors.data.map(trimDoctor),
      doctorsTotal: doctors.pagination.total,
      hospitals: hospitals.data.map(trimChambers),
      hospitalsTotal: hospitals.pagination.total,
      chambers: chamberCount,
    },
  };
}
