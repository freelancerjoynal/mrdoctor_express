import { getPublicPortalSetting } from '../services/portalSettingService.js';
export const getPortalSetting = async (req, res) => {
    try {
        const data = await getPublicPortalSetting(String(req.params.slug ?? ''));
        return res.json({ backend: 'publicWebsite', data });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load portal setting' });
    }
};
//# sourceMappingURL=portalSettingController.js.map