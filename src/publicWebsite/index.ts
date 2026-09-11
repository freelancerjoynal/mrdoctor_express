// Central entry for the public website setup.
// All website controllers / services / libs / flows live under src/publicWebsite/*
// Localized routing lives in src/publicWebsite/routes/*.
// Fully isolated from src/whatsappChatbot/*.

export { getHome, getHealth } from './controllers/websiteController.js';
export { getWebsiteStatus } from './services/websiteService.js';
export { homeFlow } from './flows/homeFlow.js';
export { websiteRouter } from './routes/index.js';
