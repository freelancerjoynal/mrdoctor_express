// Localized doctor deep-link redirection routing for the whatsappChatbot module.
// Re-exports the router defined in ../lib/doctorRedirectManager.js so that
// all whatsappChatbot routing stays inside src/whatsappChatbot/routes/.
import doctorRedirectRouter from '../lib/doctorRedirectManager.js';

export default doctorRedirectRouter;
