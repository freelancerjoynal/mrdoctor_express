// Public review queries for the publicWebsite module.
// PUBLIC-SAFE by construction: listings only return APPROVED reviews,
// never reviewerPhone. Submissions land as PENDING for moderation.
import { prisma } from '../../lib/prisma.js';
const PUBLIC_REVIEW_SELECT = {
    id: true,
    rating: true,
    reviewerName: true,
    title: true,
    comment: true,
    createdAt: true,
};
function cleanName(value) {
    if (typeof value !== 'string')
        throw new Error('INVALID_NAME');
    const name = value.trim().replace(/\s+/g, ' ');
    if (name.length < 2 || name.length > 60)
        throw new Error('INVALID_NAME');
    return name;
}
function cleanComment(value) {
    if (typeof value !== 'string')
        throw new Error('INVALID_COMMENT');
    const comment = value.trim();
    if (comment.length < 5 || comment.length > 1000)
        throw new Error('INVALID_COMMENT');
    return comment;
}
// Visitor submission — exactly one of doctorUsername / hospitalSlug required.
export async function submitReview(input) {
    const hasDoctor = !!input.doctorUsername?.trim();
    const hasHospital = !!input.hospitalSlug?.trim();
    if (hasDoctor === hasHospital)
        throw new Error('INVALID_TARGET');
    const rating = Number(input.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5)
        throw new Error('INVALID_RATING');
    const reviewerName = cleanName(input.reviewerName);
    const comment = cleanComment(input.comment);
    const title = typeof input.title === 'string' && input.title.trim()
        ? input.title.trim().slice(0, 120)
        : null;
    const reviewerPhone = typeof input.reviewerPhone === 'string' && input.reviewerPhone.trim()
        ? input.reviewerPhone.trim().slice(0, 20)
        : null;
    if (hasDoctor) {
        const doctor = await prisma.doctor.findFirst({
            where: { username: input.doctorUsername.trim(), status: 'APPROVED' },
            select: { id: true },
        });
        if (!doctor)
            throw new Error('DOCTOR_NOT_FOUND');
        return prisma.review.create({
            data: { rating, reviewerName, reviewerPhone, title, comment, doctorId: doctor.id },
            select: { id: true, status: true, createdAt: true },
        });
    }
    const hospital = await prisma.hospital.findFirst({
        where: { slug: input.hospitalSlug.trim(), status: 'APPROVED' },
        select: { id: true },
    });
    if (!hospital)
        throw new Error('HOSPITAL_NOT_FOUND');
    return prisma.review.create({
        data: { rating, reviewerName, reviewerPhone, title, comment, hospitalId: hospital.id },
        select: { id: true, status: true, createdAt: true },
    });
}
// Random spotlight picks: 2 random reviews out of the latest 10 APPROVED ones.
// Powers the hospital-popup "view profile" preview (speciality + tagline +
// latest 2 random reviews). Empty array when there are none.
export async function getDoctorSpotlightReviews(username, take = 2, pool = 10) {
    const doctor = await prisma.doctor.findFirst({
        where: { username, status: 'APPROVED' },
        select: { id: true },
    });
    if (!doctor)
        return null;
    const ids = await prisma.review.findMany({
        where: { doctorId: doctor.id, status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
        take: Math.min(Math.max(pool, take), 25),
        select: { id: true },
    });
    // Fisher–Yates shuffle, then take — uniform random picks.
    for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    const picked = ids.slice(0, Math.min(Math.max(take, 1), 5)).map((r) => r.id);
    if (!picked.length)
        return [];
    const rows = await prisma.review.findMany({
        where: { id: { in: picked } },
        select: PUBLIC_REVIEW_SELECT,
    });
    // Preserve the shuffled order.
    const order = new Map(picked.map((id, i) => [id, i]));
    return rows.sort((a, b) => order.get(a.id) - order.get(b.id));
}
async function summarize(where) {
    const agg = await prisma.review.aggregate({
        where: { ...where, status: 'APPROVED' },
        _avg: { rating: true },
        _count: { rating: true },
    });
    return { average: agg._avg.rating ? Math.round(agg._avg.rating * 10) / 10 : 0, count: agg._count.rating };
}
export async function getDoctorRatingSummary(username) {
    const doctor = await prisma.doctor.findFirst({
        where: { username, status: 'APPROVED' },
        select: { id: true },
    });
    if (!doctor)
        return null;
    return summarize({ doctorId: doctor.id });
}
export async function getHospitalRatingSummary(slug) {
    const hospital = await prisma.hospital.findFirst({
        where: { slug, status: 'APPROVED' },
        select: { id: true },
    });
    if (!hospital)
        return null;
    return summarize({ hospitalId: hospital.id });
}
export async function getDoctorReviews(username, paging) {
    const doctor = await prisma.doctor.findFirst({
        where: { username, status: 'APPROVED' },
        select: { id: true },
    });
    if (!doctor)
        return null;
    const where = { doctorId: doctor.id, status: 'APPROVED' };
    const [total, data, rating] = await Promise.all([
        prisma.review.count({ where }),
        prisma.review.findMany({
            where,
            select: PUBLIC_REVIEW_SELECT,
            orderBy: { createdAt: 'desc' },
            skip: (paging.page - 1) * paging.limit,
            take: paging.limit,
        }),
        summarize({ doctorId: doctor.id }),
    ]);
    return { data, rating, pagination: { ...paging, total, totalPages: Math.ceil(total / paging.limit) } };
}
export async function getHospitalReviews(slug, paging) {
    const hospital = await prisma.hospital.findFirst({
        where: { slug, status: 'APPROVED' },
        select: { id: true },
    });
    if (!hospital)
        return null;
    const where = { hospitalId: hospital.id, status: 'APPROVED' };
    const [total, data, rating] = await Promise.all([
        prisma.review.count({ where }),
        prisma.review.findMany({
            where,
            select: PUBLIC_REVIEW_SELECT,
            orderBy: { createdAt: 'desc' },
            skip: (paging.page - 1) * paging.limit,
            take: paging.limit,
        }),
        summarize({ hospitalId: hospital.id }),
    ]);
    return { data, rating, pagination: { ...paging, total, totalPages: Math.ceil(total / paging.limit) } };
}
//# sourceMappingURL=reviewService.js.map