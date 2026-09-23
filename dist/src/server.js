import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter, profileRouter } from './authentication/routes/index.js';
import applicationRouter from './applications/routes/index.js';
import seederRouter from './seeder/routes/index.js';
import { whatsappRouter, doctorRedirectRouter } from './whatsappChatbot/routes/index.js';
import websiteRouter from './publicWebsite/routes/index.js';
import usersRouter from './usersBackend/routes/index.js';
import adminRouter from './admin/routes/index.js';
dotenv.config();
const app = express();
// Global middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));
// Module routes (each module owns its routing inside its own folder)
app.use('/api/auth', authRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/profile', profileRouter);
app.use('/api/seeders', seederRouter);
app.use('/api/webhook/whatsapp', whatsappRouter);
app.use('/d', doctorRedirectRouter);
// Public website routes
app.use('/api/website', websiteRouter);
// Canonical permission-based user/profile lookup (all roles, admins may view others)
app.use('/api/users', usersRouter);
// Admin dashboard APIs (SUPER_ADMIN + ADMIN_MANAGER only)
app.use('/api/admin', adminRouter);
// Server configuration
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`TS Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
// Background sweep: turn off abandoned/empty/rolled-over live serial boards
// even when no request arrives to trigger the lazy checks (closed tabs,
// logouts, dead sessions, midnight). Keeps overnight TVs from holding load.
void (async () => {
    try {
        const { sweepStaleLives, LIVE_SWEEP_MS } = await import('./usersBackend/services/serialLiveService.js');
        const run = () => sweepStaleLives().catch((err) => console.error('[SerialLive] sweep failed:', err));
        void run();
        setInterval(run, LIVE_SWEEP_MS);
    }
    catch (err) {
        console.error('[SerialLive] sweep scheduler failed to start:', err);
    }
})();
//# sourceMappingURL=server.js.map