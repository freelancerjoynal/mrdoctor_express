// Service layer for the blogs table.
// DOCTOR writes with their own doctorId, HOSPITAL with their own hospitalId,
// SUPER_ADMIN may write as any authorType (optionally linked to a doctor/hospital).
import { prisma } from '../../lib/prisma.js';
import { isAdminRole } from '../../authentication/middleware/authMiddleware.js';
const TITLE_MAX = 200;
const EXCERPT_MAX = 500;
const CONTENT_MAX = 20000;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function cleanText(value, min, max, field) {
    if (typeof value !== 'string')
        throw new Error(`INVALID_${field}`);
    const trimmed = value.trim().replace(/\s+/g, ' ');
    if (trimmed.length < min || trimmed.length > max)
        throw new Error(`INVALID_${field}`);
    return trimmed;
}
function cleanOptional(value, max, field) {
    if (value === undefined || value === null || value === '')
        return undefined;
    if (typeof value !== 'string')
        throw new Error(`INVALID_${field}`);
    const trimmed = value.trim();
    if (!trimmed)
        return undefined;
    if (trimmed.length > max)
        throw new Error(`INVALID_${field}`);
    return trimmed;
}
function cleanContent(value) {
    if (typeof value !== 'string')
        throw new Error('INVALID_CONTENT');
    const trimmed = value.trim();
    if (trimmed.length < 20 || trimmed.length > CONTENT_MAX)
        throw new Error('INVALID_CONTENT');
    return trimmed;
}
function cleanTags(value) {
    if (value === undefined)
        return [];
    if (!Array.isArray(value))
        throw new Error('INVALID_TAGS');
    return value
        .filter((t) => typeof t === 'string' && t.trim().length > 0)
        .map((t) => t.trim().slice(0, 50))
        .slice(0, 10);
}
function slugify(title) {
    const ascii = title
        .toLowerCase()
        .replace(/[^a-z0-9\u0980-\u09FF]+/g, '-')
        .replace(/[\u0980-\u09FF]+/g, 'blog')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 60);
    const base = SLUG_RE.test(ascii) && ascii.length >= 3 ? ascii : 'blog';
    return `${base}-${Date.now().toString(36)}`;
}
async function resolveOwnDoctorId(caller) {
    const own = await prisma.user.findUnique({
        where: { id: caller.userId },
        select: { doctorProfile: { select: { id: true, name: true } } },
    });
    const profile = own?.doctorProfile;
    if (!profile)
        throw new Error('NO_DOCTOR_PROFILE');
    return profile.id;
}
async function resolveOwnHospitalId(caller) {
    const own = await prisma.user.findUnique({
        where: { id: caller.userId },
        select: { hospitalProfile: { select: { id: true } } },
    });
    const profile = own?.hospitalProfile;
    if (!profile)
        throw new Error('NO_HOSPITAL_PROFILE');
    return profile.id;
}
async function ensureDoctorExists(id) {
    const found = await prisma.doctor.findUnique({ where: { id }, select: { id: true } });
    if (!found)
        throw new Error('DOCTOR_NOT_FOUND');
}
async function ensureHospitalExists(id) {
    const found = await prisma.hospital.findUnique({ where: { id }, select: { id: true } });
    if (!found)
        throw new Error('HOSPITAL_NOT_FOUND');
}
// Which blog rows may this caller see/edit? Returns a Prisma where clause.
async function ownershipFilter(caller) {
    if (isAdminRole(caller.role))
        return null; // everything
    if (caller.role === 'DOCTOR') {
        try {
            const doctorId = await resolveOwnDoctorId(caller);
            return { doctorId };
        }
        catch {
            return { authorUserId: caller.userId };
        }
    }
    if (caller.role === 'HOSPITAL') {
        const hospitalId = await resolveOwnHospitalId(caller);
        return { hospitalId };
    }
    return { authorUserId: caller.userId };
}
export async function listBlogs(caller, opts = {}) {
    const filter = await ownershipFilter(caller);
    const where = { ...(filter ?? {}) };
    if (opts.status === 'DRAFT' || opts.status === 'PUBLISHED' || opts.status === 'ARCHIVED') {
        where.status = opts.status;
    }
    return prisma.blog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: Math.min(Math.max(opts.take ?? 20, 1), 50),
    });
}
export async function getBlog(caller, id) {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog)
        throw new Error('BLOG_NOT_FOUND');
    const filter = await ownershipFilter(caller);
    if (filter) {
        const denied = Object.entries(filter).some(([key, value]) => blog[key] !== value);
        if (denied)
            throw new Error('FORBIDDEN');
    }
    return blog;
}
export async function createBlog(caller, input) {
    if (!['DOCTOR', 'HOSPITAL', 'SUPER_ADMIN', 'ADMIN_MANAGER'].includes(caller.role))
        throw new Error('FORBIDDEN');
    const title = cleanText(input.title, 5, TITLE_MAX, 'TITLE');
    const content = cleanContent(input.content);
    const excerpt = cleanOptional(input.excerpt, EXCERPT_MAX, 'EXCERPT');
    const coverImage = cleanOptional(input.coverImage, 500, 'COVER');
    const coverGradient = cleanOptional(input.coverGradient, 120, 'COVER') ?? undefined;
    const coverSymbol = cleanOptional(input.coverSymbol, 10, 'COVER') ?? undefined;
    const category = cleanOptional(input.category, 80, 'CATEGORY') ?? undefined;
    const tags = cleanTags(input.tags);
    const authorName = cleanOptional(input.authorName, 120, 'AUTHOR');
    let authorType = 'DOCTOR';
    let doctorId = null;
    let hospitalId = null;
    if (caller.role === 'DOCTOR') {
        authorType = 'DOCTOR';
        doctorId = await resolveOwnDoctorId(caller);
    }
    else if (caller.role === 'HOSPITAL') {
        authorType = 'HOSPITAL';
        hospitalId = await resolveOwnHospitalId(caller);
    }
    else {
        authorType = input.authorType ?? 'SUPER_ADMIN';
        if (authorType === 'DOCTOR') {
            if (!input.doctorId?.trim())
                throw new Error('DOCTOR_REQUIRED');
            await ensureDoctorExists(input.doctorId.trim());
            doctorId = input.doctorId.trim();
        }
        else if (authorType === 'HOSPITAL') {
            if (!input.hospitalId?.trim())
                throw new Error('HOSPITAL_REQUIRED');
            await ensureHospitalExists(input.hospitalId.trim());
            hospitalId = input.hospitalId.trim();
        }
    }
    const status = input.status ?? 'DRAFT';
    if (!['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(status))
        throw new Error('INVALID_STATUS');
    let slug = input.slug?.trim().toLowerCase() || slugify(title);
    if (!SLUG_RE.test(slug) || slug.length < 3 || slug.length > 80)
        slug = slugify(title);
    const clash = await prisma.blog.findUnique({ where: { slug }, select: { id: true } });
    if (clash)
        slug = slugify(title);
    return prisma.blog.create({
        data: {
            slug,
            title,
            excerpt,
            content,
            coverImage,
            coverGradient: coverGradient ?? undefined,
            coverSymbol: coverSymbol ?? undefined,
            category: category ?? undefined,
            tags,
            authorType,
            authorName,
            authorUserId: caller.userId,
            doctorId,
            hospitalId,
            status,
            publishedAt: status === 'PUBLISHED' ? new Date() : null,
        },
    });
}
export async function updateBlog(caller, id, input) {
    const blog = await getBlog(caller, id); // enforces ownership
    const data = {};
    if (input.title !== undefined)
        data.title = cleanText(input.title, 5, TITLE_MAX, 'TITLE');
    if (input.content !== undefined)
        data.content = cleanContent(input.content);
    if (input.excerpt !== undefined)
        data.excerpt = cleanOptional(input.excerpt, EXCERPT_MAX, 'EXCERPT') ?? null;
    if (input.coverImage !== undefined)
        data.coverImage = cleanOptional(input.coverImage, 500, 'COVER') ?? null;
    if (input.coverGradient !== undefined)
        data.coverGradient = cleanOptional(input.coverGradient, 120, 'COVER') ?? 'from-emerald-500 to-teal-700';
    if (input.coverSymbol !== undefined)
        data.coverSymbol = cleanOptional(input.coverSymbol, 10, 'COVER') ?? '✿';
    if (input.category !== undefined)
        data.category = cleanOptional(input.category, 80, 'CATEGORY') ?? 'স্বাস্থ্য টিপস';
    if (input.tags !== undefined)
        data.tags = cleanTags(input.tags);
    if (input.authorName !== undefined)
        data.authorName = cleanOptional(input.authorName, 120, 'AUTHOR') ?? null;
    // SUPER_ADMIN may re-assign linkage; owners may not move a post to someone else.
    if (isAdminRole(caller.role)) {
        if (input.doctorId !== undefined) {
            if (input.doctorId && String(input.doctorId).trim()) {
                await ensureDoctorExists(String(input.doctorId).trim());
                data.doctorId = String(input.doctorId).trim();
            }
            else
                data.doctorId = null;
        }
        if (input.hospitalId !== undefined) {
            if (input.hospitalId && String(input.hospitalId).trim()) {
                await ensureHospitalExists(String(input.hospitalId).trim());
                data.hospitalId = String(input.hospitalId).trim();
            }
            else
                data.hospitalId = null;
        }
        if (input.authorType !== undefined) {
            if (!['DOCTOR', 'HOSPITAL', 'SUPER_ADMIN'].includes(input.authorType))
                throw new Error('INVALID_AUTHOR');
            data.authorType = input.authorType;
        }
    }
    if (input.status !== undefined) {
        if (!['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(input.status))
            throw new Error('INVALID_STATUS');
        data.status = input.status;
        if (input.status === 'PUBLISHED' && !blog.publishedAt)
            data.publishedAt = new Date();
        if (input.status !== 'PUBLISHED' && blog.status === 'PUBLISHED' && input.status === 'DRAFT') {
            data.publishedAt = null;
        }
    }
    if (input.slug !== undefined && isAdminRole(caller.role)) {
        const next = String(input.slug).trim().toLowerCase();
        if (!SLUG_RE.test(next) || next.length < 3 || next.length > 80)
            throw new Error('INVALID_SLUG');
        const clash = await prisma.blog.findUnique({ where: { slug: next }, select: { id: true } });
        if (clash && clash.id !== id)
            throw new Error('SLUG_TAKEN');
        data.slug = next;
    }
    return prisma.blog.update({ where: { id }, data });
}
export async function deleteBlog(caller, id) {
    await getBlog(caller, id); // enforces ownership
    await prisma.blog.delete({ where: { id } });
    return { id };
}
//# sourceMappingURL=blogService.js.map