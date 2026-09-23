// Pure dashboard stats for the admin module (SUPER_ADMIN / ADMIN_MANAGER).
// No Express req/res here — the controller in ../controllers/ handles HTTP.
// Read-only aggregations for the /admin section. Routes already enforce the
// admin role, so these queries intentionally see the whole platform.
import { prisma } from '../../lib/prisma.js';
export const getAdminOverview = async () => {
    const [usersTotal, usersByRole, doctorsApproved, doctorsPending, hospitalsApproved, hospitalsPending, joinPendingDoctors, joinPendingHospitals, joinTotal, blogsPublished, reviewsPending,] = await Promise.all([
        prisma.user.count(),
        prisma.user.groupBy({ by: ['role'], _count: { role: true } }),
        prisma.doctor.count({ where: { status: 'APPROVED' } }),
        prisma.doctor.count({ where: { status: 'PENDING' } }),
        prisma.hospital.count({ where: { status: 'APPROVED' } }),
        prisma.hospital.count({ where: { status: 'PENDING' } }),
        prisma.joinRequest.count({ where: { type: 'DOCTOR', status: 'PENDING' } }),
        prisma.joinRequest.count({ where: { type: 'HOSPITAL', status: 'PENDING' } }),
        prisma.joinRequest.count(),
        prisma.blog.count({ where: { status: 'PUBLISHED' } }),
        prisma.review.count({ where: { status: 'PENDING' } }),
    ]);
    const users = { total: usersTotal };
    for (const row of usersByRole) {
        users[String(row.role)] = row._count.role;
    }
    return {
        users,
        doctors: { approved: doctorsApproved, pending: doctorsPending, total: doctorsApproved + doctorsPending },
        hospitals: { approved: hospitalsApproved, pending: hospitalsPending, total: hospitalsApproved + hospitalsPending },
        joinRequests: {
            pendingDoctors: joinPendingDoctors,
            pendingHospitals: joinPendingHospitals,
            pendingTotal: joinPendingDoctors + joinPendingHospitals,
            total: joinTotal,
        },
        blogsPublished,
        reviewsPending,
    };
};
function cleanFilter(raw) {
    if (typeof raw !== 'string')
        return undefined;
    const v = raw.trim();
    return v ? v : undefined;
}
/** Distinct location options for the admin filter dropdowns. */
export const getLocationOptions = async () => {
    const [hospitals, chambers] = await Promise.all([
        prisma.hospital.findMany({ select: { division: true, district: true, thana: true } }),
        prisma.chamber.findMany({ select: { division: true, district: true, thana: true } }),
    ]);
    const divisions = new Set();
    const districtByDivision = new Map();
    const thanaByDistrict = new Map();
    for (const r of [...hospitals, ...chambers]) {
        const div = r.division?.trim();
        const dis = r.district?.trim();
        const tha = r.thana?.trim();
        if (div) {
            divisions.add(div);
            if (dis) {
                if (!districtByDivision.has(div))
                    districtByDivision.set(div, new Set());
                districtByDivision.get(div).add(dis);
                if (tha) {
                    if (!thanaByDistrict.has(dis))
                        thanaByDistrict.set(dis, new Set());
                    thanaByDistrict.get(dis).add(tha);
                }
            }
        }
    }
    return {
        divisions: [...divisions].sort(),
        districts: [...districtByDivision.entries()].map(([division, set]) => ({
            division,
            districts: [...set].sort(),
        })),
        thanas: [...thanaByDistrict.entries()].map(([district, set]) => ({
            district,
            thanas: [...set].sort(),
        })),
    };
};
export const listDirectory = async (filter) => {
    const type = cleanFilter(filter.type)?.toUpperCase() === 'DOCTOR' ? 'DOCTOR' : 'HOSPITAL';
    const division = cleanFilter(filter.division);
    const district = cleanFilter(filter.district);
    const thana = cleanFilter(filter.thana);
    const q = cleanFilter(filter.q);
    const take = Math.min(Math.max(Number(filter.take) || 50, 1), 200);
    if (type === 'HOSPITAL') {
        return prisma.hospital.findMany({
            where: {
                ...(division ? { division } : {}),
                ...(district ? { district } : {}),
                ...(thana ? { thana } : {}),
                ...(q
                    ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { slug: { contains: q, mode: 'insensitive' } }] }
                    : {}),
            },
            select: {
                id: true,
                name: true,
                slug: true,
                division: true,
                district: true,
                thana: true,
                addressLine: true,
                phone: true,
                status: true,
                _count: { select: { chambers: true } },
            },
            orderBy: { name: 'asc' },
            take,
        });
    }
    const speciality = cleanFilter(filter.speciality);
    const chamberLoc = {
        ...(division ? { division } : {}),
        ...(district ? { district } : {}),
        ...(thana ? { thana } : {}),
    };
    return prisma.doctor.findMany({
        where: {
            ...(Object.keys(chamberLoc).length > 0 ? { chambers: { some: chamberLoc } } : {}),
            ...(speciality ? { speciality } : {}),
            ...(q
                ? {
                    OR: [
                        { name: { contains: q, mode: 'insensitive' } },
                        { username: { contains: q, mode: 'insensitive' } },
                        { speciality: { contains: q, mode: 'insensitive' } },
                    ],
                }
                : {}),
        },
        select: {
            id: true,
            name: true,
            username: true,
            degree: true,
            speciality: true,
            phone: true,
            status: true,
            profilePicture: true,
            chambers: {
                select: { id: true, chamberName: true, thana: true, district: true, division: true, hospitalId: true },
            },
        },
        orderBy: { name: 'asc' },
        take,
    });
};
// ------------------------------------------------------------------
// Detail overviews: one round trip per page — profile + booking counts
// (pending / confirmed-unserved / served) + income (served lifetime +
// today + pending-expected from unserved confirmed rows).
// ------------------------------------------------------------------
function startOfToday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}
const rowAmount = (r) => (r.collectionAmount ?? 0) + (r.paymentAmount ?? 0);
export const getDoctorOverview = async (id) => {
    const doctor = await prisma.doctor.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            username: true,
            degree: true,
            speciality: true,
            phone: true,
            status: true,
            profilePicture: true,
            bmdcNumber: true,
            user: { select: { email: true } },
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
                    hospital: { select: { id: true, name: true, slug: true } },
                },
            },
        },
    });
    if (!doctor)
        throw new Error('DOCTOR_NOT_FOUND');
    const today = startOfToday();
    const [pending, confirmedRows, servedAgg, servedTodayAgg] = await Promise.all([
        prisma.pendingAppointment.count({ where: { doctorId: id, status: 'PENDING' } }),
        prisma.confirmedAppointment.findMany({
            where: { doctorId: id, status: 'CONFIRMED' },
            select: { collectionAmount: true, paymentAmount: true },
        }),
        prisma.servedAppointment.aggregate({
            where: { doctorId: id },
            _sum: { collectionAmount: true, paymentAmount: true },
            _count: { _all: true },
        }),
        prisma.servedAppointment.aggregate({
            where: { doctorId: id, servedAt: { gte: today } },
            _sum: { collectionAmount: true, paymentAmount: true },
            _count: { _all: true },
        }),
    ]);
    const servedTotal = (servedAgg._sum.collectionAmount ?? 0) + (servedAgg._sum.paymentAmount ?? 0);
    const servedToday = (servedTodayAgg._sum.collectionAmount ?? 0) + (servedTodayAgg._sum.paymentAmount ?? 0);
    const pendingExpected = confirmedRows.reduce((s, r) => s + rowAmount(r), 0);
    return {
        doctor,
        bookings: { pending, confirmed: confirmedRows.length, served: servedAgg._count._all },
        income: { servedTotal, servedToday, pendingExpected },
    };
};
export const getHospitalOverview = async (id) => {
    const hospital = await prisma.hospital.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            slug: true,
            division: true,
            district: true,
            thana: true,
            addressLine: true,
            phone: true,
            status: true,
            user: { select: { email: true } },
            _count: { select: { chambers: true } },
        },
    });
    if (!hospital)
        throw new Error('HOSPITAL_NOT_FOUND');
    const today = startOfToday();
    const [doctorIds, pending, confirmedRows, servedAgg, servedTodayAgg, payoutsAgg, onlineAgg] = await Promise.all([
        prisma.doctorSchedule.findMany({ where: { hospitalId: id }, select: { doctorId: true }, distinct: ['doctorId'] }),
        prisma.pendingAppointment.count({ where: { hospitalId: id, status: 'PENDING' } }),
        prisma.confirmedAppointment.findMany({
            where: { hospitalId: id, status: 'CONFIRMED' },
            select: { collectionAmount: true, paymentAmount: true, bookingType: true },
        }),
        prisma.servedAppointment.aggregate({
            where: { hospitalId: id },
            _sum: { collectionAmount: true, paymentAmount: true },
            _count: { _all: true },
        }),
        prisma.servedAppointment.aggregate({
            where: { hospitalId: id, servedAt: { gte: today } },
            _sum: { collectionAmount: true, paymentAmount: true },
            _count: { _all: true },
        }),
        prisma.hospitalPayout.aggregate({ where: { hospitalId: id }, _sum: { amount: true } }),
        // Lifetime ONLINE served income (desk cash excluded) — payout formula base.
        prisma.servedAppointment.aggregate({
            where: { hospitalId: id, bookingType: 'ONLINE' },
            _sum: { paymentAmount: true },
        }),
    ]);
    const servedTotal = (servedAgg._sum.collectionAmount ?? 0) + (servedAgg._sum.paymentAmount ?? 0);
    const servedToday = (servedTodayAgg._sum.collectionAmount ?? 0) + (servedTodayAgg._sum.paymentAmount ?? 0);
    const pendingExpected = confirmedRows.reduce((s, r) => s + rowAmount(r), 0);
    const paidOut = payoutsAgg._sum.amount ?? 0;
    const lifetimeOnline = onlineAgg._sum.paymentAmount ?? 0;
    return {
        hospital,
        doctorsCount: doctorIds.length,
        bookings: { pending, confirmed: confirmedRows.length, served: servedAgg._count._all },
        income: {
            servedTotal,
            servedToday,
            pendingExpected,
            paidOut,
            // Online balance still with the platform (desk cash never enters payouts).
            onlineBalance: lifetimeOnline - paidOut,
            lifetimeOnline,
        },
    };
};
//# sourceMappingURL=adminService.js.map