import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routes/auth/auth.js';
import profileRouter from './routes/profile/profile.js';
import seederRouter from './routes/seeders/seederRouter.js';
import { whatsappRouter, doctorRedirectRouter } from './whatsappChatbot/routes/index.js';
import websiteRouter from './publicWebsite/routes/index.js';

dotenv.config();

const app = express();

// Global middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

// Module routes (each module owns its routing inside its own folder)
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/seeders', seederRouter);
app.use('/api/webhook/whatsapp', whatsappRouter);
app.use('/d', doctorRedirectRouter);


// Public website routes
app.use('/api/website', websiteRouter);

// Server configuration
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`TS Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
