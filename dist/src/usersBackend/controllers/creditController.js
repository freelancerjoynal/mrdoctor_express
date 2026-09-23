import { resolveCreditOwner, getCreditBalance } from '../../lib/creditService.js';
export const showMyCreditBalance = async (req, res) => {
    try {
        const owner = await resolveCreditOwner({ userId: req.user.userId, role: req.user.role });
        const data = await getCreditBalance(owner.ownerType, owner.ownerId);
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        const code = error?.message;
        if (code === 'FORBIDDEN')
            return res.status(403).json({ error: 'Access denied' });
        if (code === 'NO_DOCTOR_PROFILE')
            return res.status(404).json({ error: 'No doctor linked to this account' });
        if (code === 'NO_HOSPITAL_PROFILE')
            return res.status(404).json({ error: 'No hospital linked to this account' });
        if (code === 'OWNER_NOT_FOUND')
            return res.status(404).json({ error: 'Wallet not found' });
        return res.status(500).json({ error: 'ব্যালেন্স লোড করা যায়নি।' });
    }
};
//# sourceMappingURL=creditController.js.map