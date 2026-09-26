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
import { DOCTOR_SPECIALITIES } from '../../lib/doctorSpeciality.js';
import { getPublicDoctors, getPublicHospitals } from './directoryService.js';
/** Master speciality list — portal tiles only ever show these. */
const MASTER_SPECIALITIES = new Set(DOCTOR_SPECIALITIES.map((s) => s.specialty_bn));
function chamberMatch(filters) {
    const { division, district, thana } = filters;
    if (!division && !district && !thana)
        return undefined;
    return {
        some: {
            ...(division ? { division: { contains: division, mode: 'insensitive' } } : {}),
            ...(district ? { district: { contains: district, mode: 'insensitive' } } : {}),
            ...(thana ? { thana: { contains: thana, mode: 'insensitive' } } : {}),
        },
    };
}
/** Same contains-insensitive rule as the query, applied to one chamber row. */
function isLocalChamber(chamber, loc) {
    const hit = (value, needle) => !needle || (value ?? '').toLowerCase().includes(needle.toLowerCase());
    return hit(chamber.division, loc.division) && hit(chamber.district, loc.district) && hit(chamber.thana, loc.thana);
}
export async function getThanaPortal(filters) {
    const { division, district, thana, districtWide } = filters;
    const limit = Math.min(Math.max(filters.limit ?? 100, 1), 100);
    const loc = districtWide ? { division, district } : { division, district, thana };
    const doctorWhere = { status: 'APPROVED' };
    const location = chamberMatch(loc);
    if (location)
        doctorWhere.chambers = location;
    // Categories = master-list specialities of doctors with a chamber here.
    // A tile appears only when at least one chamber exists for that speciality
    // in this thana; legacy free-text values never become tiles.
    // (groupBy has no limit issue — every category shows up even past page 1.)
    const groups = await prisma.doctor.groupBy({
        by: ['speciality'],
        where: doctorWhere,
        _count: { speciality: true },
    });
    const categories = groups
        .filter((g) => MASTER_SPECIALITIES.has(g.speciality))
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
                ...(division ? { division: { contains: division, mode: 'insensitive' } } : {}),
                ...(district ? { district: { contains: district, mode: 'insensitive' } } : {}),
                ...(!districtWide && thana ? { thana: { contains: thana, mode: 'insensitive' } } : {}),
            },
        }),
    ]);
    // Trim every row to this thana's chambers (+ schedules tied to them).
    const trimChambers = (row) => ({
        ...row,
        chambers: (row.chambers ?? []).filter((c) => isLocalChamber(c, loc)),
    });
    const trimSchedules = (row) => {
        const ids = new Set((row.chambers ?? []).map((c) => c.id));
        return {
            ...row,
            schedules: (row.schedules ?? []).filter((s) => !s?.chamber?.id || ids.has(s.chamber.id)),
        };
    };
    const trimDoctor = (d) => trimSchedules(trimChambers(d));
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
//# sourceMappingURL=portalService.js.map