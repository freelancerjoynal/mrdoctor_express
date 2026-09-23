// Service layer for staff users (DOCTOR_STAFF + HOSPITAL_STAFF).
// - DOCTOR invites/lists/removes their own DOCTOR_STAFF (users.staffDoctorId).
// - HOSPITAL (hospital owner) invites/lists/removes their own HOSPITAL_STAFF
//   (users.staffHospitalId). Hospital staff get NO chamber management and NO
//   serve/approve right — only the doctor marks service-done. They book and
//   manage appointments for any doctor of that hospital.
// - SUPER_ADMIN may list/remove/update either kind.
// Invite creates a verified staff user and emails one-time credentials
// (also returned once in the response).
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '../../lib/prisma.js';
import { isAdminRole } from '../../authentication/middleware/authMiddleware.js';
import { sendMail } from '../../lib/mailer.js';
import { sendOtpSms } from '../../lib/creditService.js';
const STAFF_SELECT = {
    id: true,
    email: true,
    name: true,
    phone: true,
    role: true,
    isVerified: true,
    canApprove: true,
    canManageChambers: true,
    createdAt: true,
};
async function resolveOwnDoctorId(caller) {
    if (isAdminRole(caller.role))
        return '';
    if (caller.role !== 'DOCTOR')
        throw new Error('FORBIDDEN');
    const own = await prisma.user.findUnique({
        where: { id: caller.userId },
        select: { doctorProfile: { select: { id: true, name: true } } },
    });
    const doctor = own?.doctorProfile;
    if (!doctor)
        throw new Error('NO_DOCTOR_PROFILE');
    return doctor.id;
}
async function resolveOwnHospitalId(caller) {
    if (isAdminRole(caller.role))
        return '';
    if (caller.role !== 'HOSPITAL')
        throw new Error('FORBIDDEN');
    const own = await prisma.user.findUnique({
        where: { id: caller.userId },
        select: { hospitalProfile: { select: { id: true, name: true } } },
    });
    const hospital = own?.hospitalProfile;
    if (!hospital)
        throw new Error('NO_HOSPITAL_PROFILE');
    return hospital.id;
}
function cleanName(raw) {
    if (typeof raw !== 'string')
        throw new Error('INVALID_NAME');
    const name = raw.trim().replace(/\s+/g, ' ');
    if (name.length < 2 || name.length > 80)
        throw new Error('INVALID_NAME');
    return name;
}
function cleanEmail(raw) {
    if (typeof raw !== 'string')
        throw new Error('INVALID_EMAIL');
    const email = raw.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160)
        throw new Error('INVALID_EMAIL');
    return email;
}
/** Staff mobile — REQUIRED at invite (login details + OTP go here by SMS). */
function cleanPhone(raw) {
    if (typeof raw !== 'string')
        throw new Error('INVALID_PHONE');
    let digits = raw.replace(/[^\d]/g, '');
    if (digits.startsWith('880'))
        digits = '0' + digits.slice(3);
    if (digits.startsWith('00880'))
        digits = '0' + digits.slice(5);
    if (!/^01\d{9}$/.test(digits))
        throw new Error('INVALID_PHONE');
    return digits;
}
/** 10-char alphanumeric temporary password. */
function makeTempPassword() {
    return crypto.randomBytes(8).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).padEnd(10, '7');
}
export async function listStaff(caller) {
    if (caller.role === 'DOCTOR') {
        return prisma.user.findMany({
            where: { role: 'DOCTOR_STAFF', staffDoctorId: await resolveOwnDoctorId(caller) },
            select: { ...STAFF_SELECT, staffDoctor: { select: { id: true, name: true, username: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    if (caller.role === 'HOSPITAL') {
        return prisma.user.findMany({
            where: { role: 'HOSPITAL_STAFF', staffHospitalId: await resolveOwnHospitalId(caller) },
            select: { ...STAFF_SELECT, staffHospital: { select: { id: true, name: true, slug: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    if (isAdminRole(caller.role)) {
        return prisma.user.findMany({
            where: { role: { in: ['DOCTOR_STAFF', 'HOSPITAL_STAFF'] } },
            select: {
                ...STAFF_SELECT,
                staffDoctor: { select: { id: true, name: true, username: true } },
                staffHospital: { select: { id: true, name: true, slug: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    throw new Error('FORBIDDEN');
}
export async function inviteStaff(caller, input) {
    const email = cleanEmail(input.email);
    const name = cleanName(input.name);
    const phone = cleanPhone(input.phone);
    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (existing)
        throw new Error('EMAIL_TAKEN');
    const tempPassword = makeTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    // Hospital owner invites HOSPITAL_STAFF: no chamber management, no
    // serve/approve right — only booking + update. Flags are forced off.
    if (caller.role === 'HOSPITAL') {
        const hospitalId = await resolveOwnHospitalId(caller);
        const hospital = await prisma.hospital.findUnique({ where: { id: hospitalId }, select: { name: true } });
        const staff = await prisma.user.create({
            data: {
                email,
                name,
                phone,
                password: hashedPassword,
                role: 'HOSPITAL_STAFF',
                isVerified: true,
                staffHospitalId: hospitalId,
                canApprove: false,
                canManageChambers: false,
            },
            select: STAFF_SELECT,
        });
        let emailSent = true;
        try {
            const greeting = `${name}, ${hospital?.name ?? 'আপনার হাসপাতাল'} আপনাকে স্টাফ হিসেবে যোগ করেছেন।`;
            await sendMail({
                to: email,
                subject: 'আপনার স্টাফ লগইন তথ্য — MrDoctor',
                text: `${greeting}\n\nইমেইল: ${email}\nপাসওয়ার্ড: ${tempPassword}\n\nএই তথ্য দিয়ে লগইন করুন। লগইনের পর ইমেইলে পাঠানো ওটিপি দিয়ে ভেরিফাই করুন।`,
                html: `
      <h3>${greeting}</h3>
      <p>ইমেইল: <b>${email}</b></p>
      <p>পাসওয়ার্ড: <b>${tempPassword}</b></p>
      <p>এই তথ্য দিয়ে লগইন করুন। লগইনের পর ইমেইলে পাঠানো ওটিপি দিয়ে ভেরিফাই করুন।</p>
    `,
            });
        }
        catch (error) {
            console.error('Staff credentials email failed:', error);
            emailSent = false;
        }
        // Login details by SMS too — 1 credit from the HOSPITAL wallet.
        // Best-effort: the email above already delivered them.
        const smsSent = await sendOtpSms({
            phone,
            text: `${hospital?.name ?? 'MrDoctor'}: আপনাকে স্টাফ হিসেবে যোগ করা হয়েছে। ইমেইল: ${email}, পাসওয়ার্ড: ${tempPassword} — লগইন করুন।`,
            owner: { ownerType: 'HOSPITAL', ownerId: hospitalId },
            refId: staff.id,
            note: `Staff invite SMS: ${name}`,
            createdBy: caller.userId,
        });
        return { staff, tempPassword, emailSent, smsSent };
    }
    const doctorId = await resolveOwnDoctorId(caller);
    // Manage-approve option: false = staff can only collect + update,
    // approval (serve/done) stays with the doctor. Default true (full rights).
    const canApprove = input.canApprove === undefined ? true : Boolean(input.canApprove);
    // Chamber-manage option: true = staff can manage chambers + schedules
    // (timing / date availability). Default false (doctor only).
    const canManageChambers = input.canManageChambers === undefined ? false : Boolean(input.canManageChambers);
    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId }, select: { name: true } });
    const staff = await prisma.user.create({
        data: {
            email,
            name,
            phone,
            password: hashedPassword,
            role: 'DOCTOR_STAFF',
            isVerified: true,
            staffDoctorId: doctorId,
            canApprove,
            canManageChambers,
        },
        select: STAFF_SELECT,
    });
    let emailSent = true;
    try {
        const greeting = `${name}, ${doctor?.name ?? 'আপনার ডাক্তার'} আপনাকে স্টাফ হিসেবে যোগ করেছেন।`;
        await sendMail({
            to: email,
            subject: 'আপনার স্টাফ লগইন তথ্য — MrDoctor',
            text: `${greeting}\n\nইমেইল: ${email}\nপাসওয়ার্ড: ${tempPassword}\n\nএই তথ্য দিয়ে লগইন করুন। লগইনের পর ইমেইলে পাঠানো ওটিপি দিয়ে ভেরিফাই করুন।`,
            html: `
      <h3>${greeting}</h3>
      <p>ইমেইল: <b>${email}</b></p>
      <p>পাসওয়ার্ড: <b>${tempPassword}</b></p>
      <p>এই তথ্য দিয়ে লগইন করুন। লগইনের পর ইমেইলে পাঠানো ওটিপি দিয়ে ভেরিফাই করুন।</p>
    `,
        });
    }
    catch (error) {
        console.error('Staff credentials email failed:', error);
        emailSent = false;
    }
    // Login details by SMS too — 1 credit from the DOCTOR wallet.
    // Best-effort: the email above already delivered them.
    const smsSent = await sendOtpSms({
        phone,
        text: `${doctor?.name ?? 'MrDoctor'}: আপনাকে স্টাফ হিসেবে যোগ করা হয়েছে। ইমেইল: ${email}, পাসওয়ার্ড: ${tempPassword} — লগইন করুন।`,
        owner: { ownerType: 'DOCTOR', ownerId: doctorId },
        refId: staff.id,
        note: `Staff invite SMS: ${name}`,
        createdBy: caller.userId,
    });
    // tempPassword is shown exactly once — it is never stored in plain text.
    return { staff, tempPassword, emailSent, smsSent };
}
/** Flip a staff member's rights.
 * - DOCTOR_STAFF: DOCTOR owns (or SUPER_ADMIN) — canApprove + canManageChambers.
 * - HOSPITAL_STAFF: fixed at no-approve / no-chambers — PATCH is a no-op
 *   guard (hospital owner has nothing to toggle).
 */
export async function updateStaff(caller, id, input) {
    const target = await prisma.user.findUnique({
        where: { id },
        select: { id: true, role: true, staffDoctorId: true, staffHospitalId: true },
    });
    if (!target || (target.role !== 'DOCTOR_STAFF' && target.role !== 'HOSPITAL_STAFF')) {
        throw new Error('STAFF_NOT_FOUND');
    }
    if (target.role === 'DOCTOR_STAFF') {
        if (caller.role !== 'DOCTOR' && !isAdminRole(caller.role))
            throw new Error('FORBIDDEN');
        if (caller.role === 'DOCTOR') {
            const doctorId = await resolveOwnDoctorId(caller);
            if (target.staffDoctorId !== doctorId)
                throw new Error('FORBIDDEN');
        }
        const data = {};
        if (input.canApprove !== undefined)
            data.canApprove = Boolean(input.canApprove);
        if (input.canManageChambers !== undefined)
            data.canManageChambers = Boolean(input.canManageChambers);
        if (Object.keys(data).length === 0)
            throw new Error('NOTHING_TO_UPDATE');
        return prisma.user.update({ where: { id }, data, select: STAFF_SELECT });
    }
    // HOSPITAL_STAFF: nothing to toggle — rights are fixed.
    if (caller.role !== 'HOSPITAL' && !isAdminRole(caller.role))
        throw new Error('FORBIDDEN');
    if (caller.role === 'HOSPITAL') {
        const hospitalId = await resolveOwnHospitalId(caller);
        if (target.staffHospitalId !== hospitalId) {
            throw new Error('FORBIDDEN');
        }
    }
    throw new Error('NOTHING_TO_UPDATE');
}
export async function removeStaff(caller, id) {
    const target = await prisma.user.findUnique({
        where: { id },
        select: { id: true, role: true, staffDoctorId: true, staffHospitalId: true },
    });
    if (!target || (target.role !== 'DOCTOR_STAFF' && target.role !== 'HOSPITAL_STAFF')) {
        throw new Error('STAFF_NOT_FOUND');
    }
    if (target.role === 'DOCTOR_STAFF') {
        if (caller.role !== 'DOCTOR' && !isAdminRole(caller.role))
            throw new Error('FORBIDDEN');
        if (caller.role === 'DOCTOR') {
            const doctorId = await resolveOwnDoctorId(caller);
            if (target.staffDoctorId !== doctorId)
                throw new Error('FORBIDDEN');
        }
    }
    else {
        if (caller.role !== 'HOSPITAL' && !isAdminRole(caller.role))
            throw new Error('FORBIDDEN');
        if (caller.role === 'HOSPITAL') {
            const hospitalId = await resolveOwnHospitalId(caller);
            if (target.staffHospitalId !== hospitalId) {
                throw new Error('FORBIDDEN');
            }
        }
    }
    await prisma.user.delete({ where: { id } });
    return { id };
}
//# sourceMappingURL=staffService.js.map