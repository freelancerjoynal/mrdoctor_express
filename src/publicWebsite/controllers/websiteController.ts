// Isolated controllers for the publicWebsite module.
// Mirrors src/whatsappChatbot/controllers/* — no imports from whatsappChatbot.
import type { Request, Response } from 'express';
import { getWebsiteStatus } from '../services/websiteService.js';

export const getHome = (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the public website', ...getWebsiteStatus() });
};

export const getHealth = (_req: Request, res: Response) => {
  res.json(getWebsiteStatus());
};
