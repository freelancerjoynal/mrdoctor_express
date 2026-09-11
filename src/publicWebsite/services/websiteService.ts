// Isolated service layer for the publicWebsite module.
// Mirrors src/whatsappChatbot/services/* — no imports from whatsappChatbot.
import { SITE_NAME, SITE_TAGLINE } from '../lib/siteConfig.js';

export function getWebsiteStatus() {
  return {
    site: SITE_NAME,
    tagline: SITE_TAGLINE,
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
}
