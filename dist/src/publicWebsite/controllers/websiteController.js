import { getWebsiteStatus } from '../services/websiteService.js';
export const getHome = (_req, res) => {
    res.json({ message: 'Welcome to the public website', ...getWebsiteStatus() });
};
export const getHealth = (_req, res) => {
    res.json(getWebsiteStatus());
};
//# sourceMappingURL=websiteController.js.map