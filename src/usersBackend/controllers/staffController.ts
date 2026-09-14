// Thin controller for doctor staff management.
// GET|POST /api/users/staff — list / invite (DOCTOR, SUPER_ADMIN lists)
// DELETE /api/users/staff/:id — remove
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import { listStaff, inviteStaff, removeStaff, updateStaff } from '../services/staffService.js';

function callerOf(req: AuthenticatedRequest) {
  return { userId: req.user!.userId, role: req.user!.role as UserRole };
}

export const listUserStaff = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await listStaff(callerOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE')
      return res.status(404).json({ error: 'No doctor profile linked to this user' });
    return res.status(500).json({ error: 'Failed to load staff' });
  }
};

export const inviteUserStaff = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await inviteStaff(callerOf(req), {
      email: req.body?.email,
      name: req.body?.name,
      canApprove: req.body?.canApprove,
      canManageChambers: req.body?.canManageChambers,
    });
    return res.status(201).json({
      backend: 'usersBackend',
      data: result,
      message: result.emailSent
        ? 'স্টাফ যোগ হয়েছে। লগইন তথ্য ইমেইলে পাঠানো হয়েছে।'
        : 'স্টাফ যোগ হয়েছে, কিন্তু ইমেইল পাঠানো যায়নি — নিচের পাসওয়ার্ডটি সংরক্ষণ করুন।',
    });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE')
      return res.status(404).json({ error: 'No doctor profile linked to this user' });
    if (error.message === 'EMAIL_TAKEN') return res.status(409).json({ error: 'এই ইমেইলে ইতিমধ্যে অ্যাকাউন্ট আছে।' });
    if (error.message === 'INVALID_EMAIL') return res.status(400).json({ error: 'সঠিক ইমেইল ঠিকানা দিন।' });
    if (error.message === 'INVALID_NAME') return res.status(400).json({ error: 'স্টাফের নাম দিন (২–৮০ অক্ষর)।' });
    return res.status(500).json({ error: 'Failed to invite staff' });
  }
};

export const patchUserStaff = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await updateStaff(callerOf(req), req.params.id as string, {
      canApprove: req.body?.canApprove,
      canManageChambers: req.body?.canManageChambers,
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'STAFF_NOT_FOUND') return res.status(404).json({ error: 'Staff not found' });
    if (error.message === 'NOTHING_TO_UPDATE') return res.status(400).json({ error: 'Nothing to update' });
    return res.status(500).json({ error: 'Failed to update staff' });
  }
};

export const removeUserStaff = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await removeStaff(callerOf(req), req.params.id as string);
    return res.json({ backend: 'usersBackend', data: result });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'STAFF_NOT_FOUND') return res.status(404).json({ error: 'Staff not found' });
    if (error.message === 'NO_DOCTOR_PROFILE')
      return res.status(404).json({ error: 'No doctor profile linked to this user' });
    return res.status(500).json({ error: 'Failed to remove staff' });
  }
};
