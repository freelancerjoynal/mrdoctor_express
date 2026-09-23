// CLI entry: seeds ONE admin directly into the database (SUPER_ADMIN by default).
// Usage:
//   npx tsx src/seeder/seed.superadmin.ts [email] [password] [name] [role]
//   SUPER_ADMIN_EMAIL=a@b.com SUPER_ADMIN_PASSWORD=secret123 npx tsx src/seeder/seed.superadmin.ts
//   npm run seed:superadmin -- admin@mrdoctor.com SuperAdmin123! "Super Admin" SUPER_ADMIN
//   npm run seed:admin-manager -- manager@mrdoctor.com Manager123! "Admin Manager"
// Role is SUPER_ADMIN unless overridden to ADMIN_MANAGER.
import 'dotenv/config';
import { prisma } from '../lib/prisma.js';
import { runSeedAdminUser } from './services/superAdminService.js';
const email = process.argv[2] || process.env.SUPER_ADMIN_EMAIL || 'admin@mrdoctor.com';
const password = process.argv[3] || process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin123!';
const name = process.argv[4] || process.env.SUPER_ADMIN_NAME || 'Super Admin';
const rawRole = (process.argv[5] || process.env.SUPER_ADMIN_ROLE || 'SUPER_ADMIN').trim().toUpperCase();
const role = rawRole === 'ADMIN_MANAGER' ? 'ADMIN_MANAGER' : 'SUPER_ADMIN';
try {
    await runSeedAdminUser({ email, password, name, role });
    console.log(`✅ ===== ${role} SEED DONE =====`);
}
catch (error) {
    console.error('❌ ERROR seeding super admin:', error.message || error);
    process.exitCode = 1;
}
finally {
    await prisma.$disconnect();
}
//# sourceMappingURL=seed.superadmin.js.map