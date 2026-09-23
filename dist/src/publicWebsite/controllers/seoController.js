import { getPublicSeo } from '../services/seoService.js';
export const getSeo = async (req, res) => {
    try {
        const data = await getPublicSeo(String(req.query.pageType ?? ''), String(req.query.pageKey ?? ''));
        return res.json({ backend: 'publicWebsite', data });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load SEO' });
    }
};
//# sourceMappingURL=seoController.js.map