import type { Request, Response, NextFunction } from 'express';
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}
export type AuthRequest = AuthenticatedRequest & {
    userId?: string;
};
export type UserRole = 'SUPER_ADMIN' | 'ADMIN_MANAGER' | 'DOCTOR' | 'DOCTOR_STAFF' | 'BUSINESS_OWNER' | 'HOSPITAL' | 'HOSPITAL_STAFF';
export declare const ADMIN_ROLES: readonly UserRole[];
export declare const isAdminRole: (role: string | undefined | null) => boolean;
export declare const protectedRoute: (...allowedRoles: [UserRole, ...UserRole[]]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=authMiddleware.d.ts.map