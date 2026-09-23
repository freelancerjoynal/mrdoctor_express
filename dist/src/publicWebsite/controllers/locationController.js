import { getLocationTree, listDivisions, listDistricts, listThanas } from '../services/locationService.js';
function parseOptionalQuery(req, key) {
    const raw = Array.isArray(req.query[key]) ? req.query[key][0] : req.query[key];
    if (typeof raw !== 'string')
        return undefined;
    const trimmed = raw.trim();
    return trimmed ? trimmed : undefined;
}
export const getTree = async (_req, res) => {
    try {
        const data = await getLocationTree();
        return res.json({ backend: 'publicWebsite', data });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load locations' });
    }
};
export const getDivisions = async (_req, res) => {
    try {
        const data = await listDivisions();
        return res.json({ backend: 'publicWebsite', data });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load divisions' });
    }
};
export const getDistricts = async (req, res) => {
    try {
        const data = await listDistricts(parseOptionalQuery(req, 'division'));
        return res.json({ backend: 'publicWebsite', data });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load districts' });
    }
};
export const getThanas = async (req, res) => {
    try {
        const data = await listThanas(parseOptionalQuery(req, 'division'), parseOptionalQuery(req, 'district'));
        return res.json({ backend: 'publicWebsite', data });
    }
    catch {
        return res.status(500).json({ error: 'Failed to load thanas' });
    }
};
//# sourceMappingURL=locationController.js.map