// Pure seeding logic for the admin bootstrap accounts (SUPER_ADMIN + ADMIN_MANAGER).
// No Express req/res here — callable from CLI and the seeder controllers.
// Idempotent: safe to re-run, uses upsert on User.email.
// NOTE: ADMIN_MANAGER reuses the super_admin_profiles row (shared admin profile).
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma.js';
export const runSeedAdminUser = async (input) => {
    const email = input.email?.trim().toLowerCase() ?? '';
    const name = input.name?.trim() || (input.role === 'ADMIN_MANAGER' ? 'Admin Manager' : 'Super Admin');
    const role = input.role ?? 'SUPER_ADMIN';
    if (role !== 'SUPER_ADMIN' && role !== 'ADMIN_MANAGER')
        throw new Error('INVALID_ROLE');
    if (!email || !email.includes('@'))
        throw new Error('INVALID_EMAIL');
    if (!input.password || input.password.length < 8) {
        throw new Error('PASSWORD_TOO_SHORT: use at least 8 characters');
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);
    // Upsert User — if the email already exists as a non-admin,
    // promote it; otherwise create fresh. Always (re)set verified + password.
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role,
            isVerified: true,
            otp: null,
            otpExpiry: null,
        },
        create: {
            email,
            password: hashedPassword,
            role,
            isVerified: true,
        },
    });
    // Upsert linked profile row (required by profileService for admin roles).
    const profile = await prisma.superAdminProfile.upsert({
        where: { userId: user.id },
        update: { name },
        create: { userId: user.id, name, permissions: [] },
    });
    console.log(`✅ Admin ready [${role}]: ${email} (userId=${user.id})`);
    return { user, profile };
};
/** Backwards-compatible alias — seeds a SUPER_ADMIN (CLI default). */
export const runSeedSuperAdmin = async (input) => runSeedAdminUser({ ...input, role: input.role ?? 'SUPER_ADMIN' });
/** Convenience wrapper — seeds an ADMIN_MANAGER. */
export const runSeedAdminManager = async (input) => runSeedAdminUser({ ...input, role: 'ADMIN_MANAGER' });
//# sourceMappingURL=superAdminService.js.map