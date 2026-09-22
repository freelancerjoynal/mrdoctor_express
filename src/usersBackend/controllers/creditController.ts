// Own credit wallet — doctor, own staff, hospital, desk staff all see
// their owner's balance here. GET /api/users/credits/balance
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import { resolveCreditOwner, getCreditBalance } from '../../lib/creditService.js';

export const showMyCreditBalance = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const owner = await resolveCreditOwner({ userId: req.user!.userId, role: req.user!.role as UserRole });
    const data = await getCreditBalance(owner.ownerType, owner.ownerId);
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    const code = error?.message as string | undefined;
    if (code === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (code === 'NO_DOCTOR_PROFILE') return res.status(404).json({ error: 'No doctor linked to this account' });
    if (code === 'NO_HOSPITAL_PROFILE') return res.status(404).json({ error: 'No hospital linked to this account' });
    if (code === 'OWNER_NOT_FOUND') return res.status(404).json({ error: 'Wallet not found' });
    return res.status(500).json({ error: 'ব্যালেন্স লোড করা যায়নি।' });
  }
};
