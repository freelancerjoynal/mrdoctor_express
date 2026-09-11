// Central routing barrel for the whatsappChatbot module.
// Import these routers in src/server.ts — do not define chatbot routes elsewhere.
import whatsappRouter from './whatsappRoutes.js';
import doctorRedirectRouter from './doctorRedirectRoutes.js';

export { whatsappRouter, doctorRedirectRouter };
export default whatsappRouter;
