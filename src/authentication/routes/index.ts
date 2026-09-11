// Central routing barrel for the authentication module.
// Import these routers in src/server.ts — do not define auth routes elsewhere.
import authRouter from './authRoutes.js';
import profileRouter from './profileRoutes.js';

export { authRouter, profileRouter };
export default authRouter;
