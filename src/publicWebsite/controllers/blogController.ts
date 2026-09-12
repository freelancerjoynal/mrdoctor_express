// Thin public controllers for the blog resource.
// No auth here by design — only PUBLISHED posts are returned.
import type { Request, Response } from 'express';
import { getPublicBlogs, getPublicBlogBySlug, getPublicDoctorBlogs, getPublicHospitalBlogs } from '../services/directoryService.js';

function parsePaging(req: Request): { page: number; limit: number } {
  const rawPage = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
  const rawLimit = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
  const page = Math.max(1, parseInt(typeof rawPage === 'string' ? rawPage : '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(typeof rawLimit === 'string' ? rawLimit : '12', 10) || 12));
  return { page, limit };
}

function parseOptional(req: Request, key: string): string | undefined {
  const raw = Array.isArray(req.query[key]) ? req.query[key][0] : req.query[key];
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed ? trimmed : undefined;
}

export const listBlogs = async (req: Request, res: Response) => {
  try {
    const result = await getPublicBlogs({
      ...parsePaging(req),
      search: parseOptional(req, 'search'),
      category: parseOptional(req, 'category'),
      authorType: parseOptional(req, 'authorType'),
      doctorUsername: parseOptional(req, 'doctorUsername'),
      hospitalSlug: parseOptional(req, 'hospitalSlug'),
    });
    return res.json({ backend: 'publicWebsite', ...result });
  } catch {
    return res.status(500).json({ error: 'Failed to load blogs' });
  }
};

export const showBlog = async (req: Request, res: Response) => {
  try {
    const blog = await getPublicBlogBySlug(req.params.slug as string);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    return res.json({ backend: 'publicWebsite', data: blog });
  } catch {
    return res.status(500).json({ error: 'Failed to load blog' });
  }
};

export const listDoctorBlogs = async (req: Request, res: Response) => {
  try {
    const rawTake = Array.isArray(req.query.take) ? req.query.take[0] : req.query.take;
    const blogs = await getPublicDoctorBlogs(
      req.params.username as string,
      typeof rawTake === 'string' ? parseInt(rawTake, 10) || 6 : 6,
    );
    if (!blogs) return res.status(404).json({ error: 'Doctor not found' });
    return res.json({ backend: 'publicWebsite', data: blogs });
  } catch {
    return res.status(500).json({ error: 'Failed to load doctor blogs' });
  }
};

export const listHospitalBlogs = async (req: Request, res: Response) => {
  try {
    const rawTake = Array.isArray(req.query.take) ? req.query.take[0] : req.query.take;
    const blogs = await getPublicHospitalBlogs(
      req.params.slug as string,
      typeof rawTake === 'string' ? parseInt(rawTake, 10) || 6 : 6,
    );
    if (!blogs) return res.status(404).json({ error: 'Hospital not found' });
    return res.json({ backend: 'publicWebsite', data: blogs });
  } catch {
    return res.status(500).json({ error: 'Failed to load hospital blogs' });
  }
};
