// Minimal controller for the single canonical profile endpoint.
// The route guard enforces authentication + role; the service enforces visibility.
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import { getProfileData, updateProfileData } from '../services/profileService.js';

// GET /api/users/profile[?userId=] — own data for every role, others for SUPER_ADMIN only.
export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const raw = req.query.userId;
    const targetUserId = typeof raw === 'string' ? raw : undefined;

    const profile = await getProfileData(
      { userId: req.user!.userId, role: req.user!.role as UserRole },
      targetUserId,
    );

    if (!profile) return res.status(404).json({ error: 'User not found' });
    return res.json({ backend: 'usersBackend', profile });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') {
      return res.status(403).json({ error: 'You can only view your own profile' });
    }
    return res.status(500).json({ error: 'Failed to load profile' });
  }
};

// PATCH|PUT /api/users/profile — update OWN name / password + (DOCTOR) full doctor fields + (HOSPITAL) card images.
// Email/username are immutable; doctor/hospital status is admin-controlled.
export const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const profile = await updateProfileData(
      { userId: req.user!.userId, role: req.user!.role as UserRole },
      {
        name: req.body?.name,
        currentPassword: req.body?.currentPassword,
        newPassword: req.body?.newPassword,
        profilePicture: req.body?.profilePicture,
        email: req.body?.email ?? req.body?.doctor?.email ?? req.body?.hospital?.email,
        username: req.body?.username ?? req.body?.doctor?.username,
        status: req.body?.status ?? req.body?.doctor?.status ?? req.body?.hospital?.status,
        doctor: req.body?.doctor,
        hospital: req.body?.hospital,
      },
    );

    return res.json({ backend: 'usersBackend', profile });
  } catch (error: any) {
    if (error.message === 'EMAIL_IMMUTABLE') {
      return res.status(400).json({ error: 'Email cannot be changed.' });
    }
    if (error.message === 'USERNAME_IMMUTABLE') {
      return res.status(400).json({ error: 'Username cannot be changed.' });
    }
    if (error.message === 'STATUS_IMMUTABLE') {
      return res.status(400).json({ error: 'Status cannot be changed.' });
    }
    if (error.message === 'IMMUTABLE_FIELD') {
      return res.status(400).json({ error: 'This field cannot be changed.' });
    }
    if (error.message === 'INVALID_NAME') {
      return res.status(400).json({ error: 'Name must be 2–80 characters.' });
    }
    if (error.message === 'INVALID_DOCTOR_FIELD') {
      return res.status(400).json({ error: 'Invalid doctor field. Check lengths/formats (phone 6–20 chars, year 1950–present, gender MALE/FEMALE).' });
    }
    if (error.message === 'INVALID_HOSPITAL_FIELD') {
      return res.status(400).json({ error: 'Invalid hospital field. Card image URL max 500 chars.' });
    }
    if (error.message === 'NAME_IMMUTABLE') {
      return res.status(400).json({ error: 'Name cannot be changed here.' });
    }
    if (error.message === 'SLUG_IMMUTABLE') {
      return res.status(400).json({ error: 'Slug cannot be changed.' });
    }
    if (error.message === 'NO_HOSPITAL_PROFILE') {
      return res.status(404).json({ error: 'No hospital profile linked to this user.' });
    }
    if (error.message === 'INVALID_PICTURE') {
      return res.status(400).json({ error: 'ছবির URL সঠিক নয় (সর্বোচ্চ ৫০০ অক্ষর)।' });
    }
    if (error.message === 'INVALID_PASSWORD') {
      return res.status(400).json({ error: 'Current password is incorrect or the new password is too short (min 6 characters).' });
    }
    if (error.message === 'NOTHING_TO_UPDATE') {
      return res.status(400).json({ error: 'Nothing to update. Provide a name, password change, or doctor fields.' });
    }
    if (error.message === 'FORBIDDEN') {
      return res.status(403).json({ error: 'You can only update your own profile.' });
    }
    if (error.message === 'NO_DOCTOR_PROFILE') {
      return res.status(404).json({ error: 'No doctor profile linked to this user.' });
    }
    return res.status(500).json({ error: 'Failed to update profile' });
  }
};
