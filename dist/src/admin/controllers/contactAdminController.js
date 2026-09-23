import { listContactMessages, updateContactStatus } from '../services/contactAdminService.js';
// GET /api/admin/contact-messages?status=&topic=&q=&page=&limit=
export const showContactMessages = async (req, res) => {
    try {
        const q = req.query;
        return res.json({
            data: await listContactMessages({
                status: q.status,
                topic: q.topic,
                q: q.q,
                page: q.page,
                limit: q.limit,
            }),
        });
    }
    catch (error) {
        console.error('Admin contact-messages error:', error);
        return res.status(500).json({ error: 'বার্তা লোড করা যায়নি।' });
    }
};
// PATCH /api/admin/contact-messages/:id — { status: NEW|READ|REPLIED|ARCHIVED }
export const runContactStatus = async (req, res) => {
    try {
        const row = await updateContactStatus(String(req.params.id), (req.body ?? {}).status);
        return res.json({ data: row });
    }
    catch (error) {
        if (error instanceof Error && error.message === 'INVALID_STATUS')
            return res.status(400).json({ error: 'ভুল স্ট্যাটাস।' });
        if (error instanceof Error && error.message === 'NOT_FOUND')
            return res.status(404).json({ error: 'বার্তা পাওয়া যায়নি।' });
        console.error('Admin contact-status error:', error);
        return res.status(500).json({ error: 'আপডেট করা যায়নি।' });
    }
};
//# sourceMappingURL=contactAdminController.js.map