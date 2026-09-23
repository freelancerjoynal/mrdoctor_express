import { getCreditBalance, listCreditLedger, topupCredit, } from '../../lib/creditService.js';
function parseOwner(req) {
    const q = (req.query ?? {});
    const ownerType = typeof q.ownerType === 'string' ? q.ownerType.trim().toUpperCase() : '';
    const ownerId = typeof q.ownerId === 'string' ? q.ownerId.trim() : '';
    if ((ownerType !== 'DOCTOR' && ownerType !== 'HOSPITAL') || !ownerId) {
        throw new Error('INVALID_OWNER');
    }
    return { ownerType, ownerId };
}
export const showCredit = async (req, res) => {
    try {
        const { ownerType, ownerId } = parseOwner(req);
        const [balance, ledger] = await Promise.all([
            getCreditBalance(ownerType, ownerId),
            listCreditLedger(ownerType, ownerId, 50),
        ]);
        return res.json({ backend: 'admin', data: { ...balance, ledger } });
    }
    catch (error) {
        const code = error?.message;
        if (code === 'INVALID_OWNER')
            return res.status(400).json({ error: 'সঠিক ownerType (DOCTOR/HOSPITAL) ও ownerId দিন।' });
        if (code === 'OWNER_NOT_FOUND')
            return res.status(404).json({ error: 'এই অ্যাকাউন্ট পাওয়া যায়নি।' });
        console.error('Admin credit view error:', error);
        return res.status(500).json({ error: 'ক্রেডিট লোড করা যায়নি।' });
    }
};
export const runTopup = async (req, res) => {
    try {
        const body = (req.body ?? {});
        const ownerType = typeof body.ownerType === 'string' ? body.ownerType.trim().toUpperCase() : '';
        const ownerId = typeof body.ownerId === 'string' ? body.ownerId.trim() : '';
        if ((ownerType !== 'DOCTOR' && ownerType !== 'HOSPITAL') || !ownerId) {
            return res.status(400).json({ error: 'সঠিক ownerType (DOCTOR/HOSPITAL) ও ownerId দিন।' });
        }
        await topupCredit({
            ownerType,
            ownerId,
            amount: body.amount,
            note: body.note,
            createdBy: req.user.userId,
        });
        // Full view (balance + fresh ledger) so the card can render it directly.
        const [balance, ledger] = await Promise.all([
            getCreditBalance(ownerType, ownerId),
            listCreditLedger(ownerType, ownerId, 50),
        ]);
        return res.json({ backend: 'admin', data: { ...balance, ledger } });
    }
    catch (error) {
        const code = error?.message;
        if (code === 'INVALID_OWNER')
            return res.status(400).json({ error: 'সঠিক ownerType (DOCTOR/HOSPITAL) ও ownerId দিন।' });
        if (code === 'INVALID_AMOUNT')
            return res.status(400).json({ error: 'টপ-আপ ১–১০০০০০ ক্রেডিটের মধ্যে হতে হবে।' });
        if (error?.code === 'P2025')
            return res.status(404).json({ error: 'এই অ্যাকাউন্ট পাওয়া যায়নি।' });
        console.error('Admin topup error:', error);
        return res.status(500).json({ error: 'টপ-আপ করা যায়নি।' });
    }
};
//# sourceMappingURL=creditController.js.map