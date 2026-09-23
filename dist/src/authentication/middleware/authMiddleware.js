import jwt from 'jsonwebtoken';
// ADMIN_MANAGER shares every SUPER_ADMIN privilege (full platform admin).
// Central helper so services don't scatter `=== 'SUPER_ADMIN' || === 'ADMIN_MANAGER'` checks.
export const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN_MANAGER'];
export const isAdminRole = (role) => role === 'SUPER_ADMIN' || role === 'ADMIN_MANAGER';
// এখানে [UserRole, ...UserRole[]] ব্যবহার করার ফলে অন্তত একটি রোল পাস করা বাধ্যতামূলক করা হয়েছে
export const protectedRoute = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // 1. টোকেন চেক করা (কুকি বা হেডার থেকে)
            const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'Access token missing. Unauthorized access.' });
            }
            // 2. টোকেন ভেরিফাই করা
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            req.user = decoded;
            // 3. রোল ম্যাচ করছে কিনা চেক করা
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    error: `Access denied. This route is restricted and your role (${req.user.role}) is not allowed.`
                });
            }
            return next();
        }
        catch (error) {
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }
    };
};
//# sourceMappingURL=authMiddleware.js.map