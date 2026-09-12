// Thin controller for the blogs resource.
// GET    /api/users/blogs[?status=&take=] — own posts (all posts for SUPER_ADMIN)
// GET    /api/users/blogs/:id
// POST   /api/users/blogs — { title, content, excerpt?, coverImage?, category?, tags?, status? }
// PUT    /api/users/blogs/:id
// DELETE /api/users/blogs/:id
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import { listBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '../services/blogService.js';

function callerOf(req: AuthenticatedRequest) {
  return { userId: req.user!.userId, role: req.user!.role as UserRole };
}

function mapError(error: any): { status: number; body: Record<string, string> } {
  const msg = error?.message ?? 'UNKNOWN';
  if (msg === 'FORBIDDEN') return { status: 403, body: { error: 'Access denied' } };
  if (msg === 'BLOG_NOT_FOUND') return { status: 404, body: { error: 'Blog not found' } };
  if (msg === 'DOCTOR_NOT_FOUND') return { status: 404, body: { error: 'Doctor not found' } };
  if (msg === 'HOSPITAL_NOT_FOUND') return { status: 404, body: { error: 'Hospital not found' } };
  if (msg === 'NO_DOCTOR_PROFILE')
    return { status: 404, body: { error: 'No doctor profile linked to this user' } };
  if (msg === 'NO_HOSPITAL_PROFILE')
    return { status: 404, body: { error: 'No hospital profile linked to this user' } };
  if (msg === 'DOCTOR_REQUIRED' || msg === 'HOSPITAL_REQUIRED')
    return { status: 400, body: { error: 'doctorId/hospitalId is required for this authorType' } };
  if (msg === 'SLUG_TAKEN') return { status: 409, body: { error: 'Slug is already taken' } };
  if (
    msg.startsWith('INVALID_') ||
    msg === 'INVALID_STATUS' ||
    msg === 'INVALID_AUTHOR' ||
    msg === 'INVALID_SLUG' ||
    msg === 'INVALID_TAGS'
  )
    return {
      status: 400,
      body: {
        error:
          'Invalid payload. Required: { title (5-200), content (20-20000) }. Optional: excerpt, coverImage, category, tags[], status.',
      },
    };
  return { status: 500, body: { error: 'Blog request failed' } };
}

export const listUserBlogs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawStatus = req.query.status;
    const rawTake = req.query.take;
    const blogs = await listBlogs(callerOf(req), {
      status: typeof rawStatus === 'string' ? rawStatus : undefined,
      take: typeof rawTake === 'string' ? parseInt(rawTake, 10) || undefined : undefined,
    });
    return res.json({ backend: 'usersBackend', data: blogs });
  } catch (error: any) {
    const { status, body } = mapError(error);
    return res.status(status).json(body);
  }
};

export const showUserBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const blog = await getBlog(callerOf(req), req.params.id as string);
    return res.json({ backend: 'usersBackend', data: blog });
  } catch (error: any) {
    const { status, body } = mapError(error);
    return res.status(status).json(body);
  }
};

export const storeUserBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const blog = await createBlog(callerOf(req), req.body ?? {});
    return res.status(201).json({ backend: 'usersBackend', data: blog });
  } catch (error: any) {
    const { status, body } = mapError(error);
    return res.status(status).json(body);
  }
};

export const modifyUserBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const blog = await updateBlog(callerOf(req), req.params.id as string, req.body ?? {});
    return res.json({ backend: 'usersBackend', data: blog });
  } catch (error: any) {
    const { status, body } = mapError(error);
    return res.status(status).json(body);
  }
};

export const removeUserBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await deleteBlog(callerOf(req), req.params.id as string);
    return res.json({ backend: 'usersBackend', data: result });
  } catch (error: any) {
    const { status, body } = mapError(error);
    return res.status(status).json(body);
  }
};
