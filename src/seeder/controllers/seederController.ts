// Thin controller for the seeder module.
// - seedAll: protectedRoute on the route (SUPER_ADMIN / ADMIN_MANAGER).
// - seedSuperAdminPublic: PUBLIC bootstrap route — no access token. Guarded
//   inside: requires SEED_SECRET when configured, otherwise only works while
//   no admin account exists yet (prevents open admin takeover after setup).
// - seedAdminManager: SUPER_ADMIN-only creation of ADMIN_MANAGER accounts.
import type { Request, Response } from 'express';
import { runSeedAll } from '../services/seederService.js';
import { runSeedAdminUser, type AdminSeedRole } from '../services/superAdminService.js';
import { prisma } from '../../lib/prisma.js';

export const seedAll = async (_req: Request, res: Response) => {
  try {
    const { summary } = await runSeedAll();
    return res.status(201).json({
      success: true,
      message:
        'নীলফামারী জেলার ১০ হাসপাতাল, ১০০ ডাক্তার, চেম্বার (per-chamber ফি সহ) ও সিডিউল সফলভাবে সিড করা হয়েছে এবং ইউজার অ্যাকাউন্টের সাথে যুক্ত করা হয়েছে!',
      summary,
    });
  } catch (error: any) {
    console.error('❌ ERROR seeding:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to seed Nilphamari data',
      details: error.message,
    });
  }
};

// POST /api/seeders/seed-super-admin — PUBLIC, no access token required.
// Credentials come from the server env (SUPER_ADMIN_EMAIL / SUPER_ADMIN_PASSWORD /
// SUPER_ADMIN_NAME) — no request body needed. An explicit body may still
// override individual fields ({ email, password, name?, role?, secret? }).
// Guard (prevents an open admin-creation endpoint after setup):
// - If SEED_SECRET env is set: request must carry it as `x-seed-secret`
//   header or `secret` body field.
// - If SEED_SECRET is NOT set: allowed only while zero admin users exist.
export const seedSuperAdminPublic = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role, secret } = req.body ?? {};

    const seedSecret = process.env.SEED_SECRET?.trim();
    if (seedSecret) {
      const provided = req.headers['x-seed-secret'] ?? secret;
      if (provided !== seedSecret) {
        return res.status(403).json({ success: false, error: 'Invalid seed secret.' });
      }
    } else {
      const adminCount = await prisma.user.count({
        where: { role: { in: ['SUPER_ADMIN', 'ADMIN_MANAGER'] } },
      });
      if (adminCount > 0) {
        return res.status(403).json({
          success: false,
          error: 'Admin already exists. Ask a SUPER_ADMIN to create further admin accounts.',
        });
      }
    }

    const seedRole: AdminSeedRole = role === 'ADMIN_MANAGER' ? 'ADMIN_MANAGER' : 'SUPER_ADMIN';
    const { user } = await runSeedAdminUser({
      email: email?.trim() || process.env.SUPER_ADMIN_EMAIL || 'admin@mrdoctor.com',
      password: password || process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin123!',
      name: name?.trim() || process.env.SUPER_ADMIN_NAME || 'Super Admin',
      role: seedRole,
    });

    return res.status(201).json({
      success: true,
      message: `${seedRole} seeded successfully.`,
      admin: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error: any) {
    console.error('❌ ERROR seeding admin:', error);
    const msg: string = error.message || 'Failed to seed admin';
    const status = msg.startsWith('INVALID_') || msg.startsWith('PASSWORD_') ? 400 : 500;
    return res.status(status).json({ success: false, error: 'Failed to seed admin', details: msg });
  }
};

// POST /api/seeders/seed-admin-manager — SUPER_ADMIN only (access token required).
// Body: { email, password, name? }
export const seedAdminManager = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body ?? {};
    const { user } = await runSeedAdminUser({ email, password, name, role: 'ADMIN_MANAGER' });

    return res.status(201).json({
      success: true,
      message: 'ADMIN_MANAGER seeded successfully.',
      admin: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error: any) {
    console.error('❌ ERROR seeding admin manager:', error);
    const msg: string = error.message || 'Failed to seed admin manager';
    const status = msg.startsWith('INVALID_') || msg.startsWith('PASSWORD_') ? 400 : 500;
    return res.status(status).json({ success: false, error: 'Failed to seed admin manager', details: msg });
  }
};
