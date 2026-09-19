import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

// Alias kept for backwards compatibility (e.g. seeders importing AuthRequest).
// Supports both `req.user` (set by protectedRoute) and `req.userId`.
export type AuthRequest = AuthenticatedRequest & { userId?: string };

// All roles from the Role enum in prisma/schema.prisma — HOSPITAL was missing, which made a hospital-guarded route untypable.
export type UserRole = 'SUPER_ADMIN' | 'ADMIN_MANAGER' | 'DOCTOR' | 'DOCTOR_STAFF' | 'BUSINESS_OWNER' | 'HOSPITAL' | 'HOSPITAL_STAFF';

// ADMIN_MANAGER shares every SUPER_ADMIN privilege (full platform admin).
// Central helper so services don't scatter `=== 'SUPER_ADMIN' || === 'ADMIN_MANAGER'` checks.
export const ADMIN_ROLES: readonly UserRole[] = ['SUPER_ADMIN', 'ADMIN_MANAGER'] as const;
export const isAdminRole = (role: string | undefined | null): boolean =>
  role === 'SUPER_ADMIN' || role === 'ADMIN_MANAGER';

// এখানে [UserRole, ...UserRole[]] ব্যবহার করার ফলে অন্তত একটি রোল পাস করা বাধ্যতামূলক করা হয়েছে
export const protectedRoute = (...allowedRoles: [UserRole, ...UserRole[]]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // 1. টোকেন চেক করা (কুকি বা হেডার থেকে)
      const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'Access token missing. Unauthorized access.' });
      }

      // 2. টোকেন ভেরিফাই করা
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: string; role: string };
      req.user = decoded;

      // 3. রোল ম্যাচ করছে কিনা চেক করা
      if (!allowedRoles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          error: `Access denied. This route is restricted and your role (${req.user.role}) is not allowed.`
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
  };
};
