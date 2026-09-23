import { getIncomeOverview } from '../services/incomeOverviewService.js';
// GET /api/users/income/overview?scope=doctors|hospitals&period=daily|weekly|monthly&anchor=yyyy-mm-dd&search=&take=
export const showIncomeOverview = async (req, res) => {
    try {
        const q = req.query;
        const data = await getIncomeOverview({
            scope: q.scope,
            period: q.period,
            anchor: q.anchor,
            search: q.search,
            take: q.take,
        });
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        console.error('Income overview error:', error);
        return res.status(500).json({ error: 'Failed to load income overview' });
    }
};
//# sourceMappingURL=incomeController.js.map