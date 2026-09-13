// Thin controller for the doctor's appointment admin panel.
// GET /api/users/appointments/today — today's work queue (all statuses, with fees)
// GET /api/users/appointments/summary — collection + income buckets (role-gated)
// GET /api/users/appointments[?status=&doctorUsername=&hospitalSlug=&date=&page=&limit=]
// PATCH /api/users/appointments/:id — { status: PENDING | CONFIRMED | DONE | CANCELLED }
import type { Response } from 'express';
import type { AuthenticatedRequest, UserRole } from '../../authentication/middleware/authMiddleware.js';
import {
  listAppointments,
  listTodayAppointments,
  getAppointmentSummary,
  updateAppointmentStatus,
} from '../services/appointmentService.js';
import { createLocalBooking } from '../services/localBookingService.js';
import {
  listConfirmed,
  type ConfirmedRange,
  type ConfirmedTypeFilter,
} from '../services/confirmedService.js';

function callerOf(req: AuthenticatedRequest) {
  return { userId: req.user!.userId, role: req.user!.role as UserRole };
}

function parsePaging(req: AuthenticatedRequest): { page: number; limit: number } {
  const rawPage = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
  const rawLimit = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
  return {
    page: Math.max(1, parseInt(typeof rawPage === 'string' ? rawPage : '1', 10) || 1),
    limit: Math.min(50, Math.max(1, parseInt(typeof rawLimit === 'string' ? rawLimit : '20', 10) || 20)),
  };
}

function parseOptional(req: AuthenticatedRequest, key: string): string | undefined {
  const raw = Array.isArray(req.query[key]) ? req.query[key][0] : req.query[key];
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed ? trimmed : undefined;
}

export const listUserAppointments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await listAppointments(callerOf(req), {
      ...parsePaging(req),
      status: parseOptional(req, 'status'),
      doctorUsername: parseOptional(req, 'doctorUsername'),
      hospitalSlug: parseOptional(req, 'hospitalSlug'),
      date: parseOptional(req, 'date'),
      from: parseOptional(req, 'from'),
      to: parseOptional(req, 'to'),
    });
    return res.json({ backend: 'usersBackend', ...result });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    return res.status(500).json({ error: 'Failed to load appointments' });
  }
};

export const showTodayAppointments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await listTodayAppointments(callerOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    return res.status(500).json({ error: "Failed to load today's appointments" });
  }
};

export const showAppointmentSummary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const summary = await getAppointmentSummary(callerOf(req), {
      doctorUsername: parseOptional(req, 'doctorUsername'),
      from: parseOptional(req, 'from'),
      to: parseOptional(req, 'to'),
    });
    return res.json({ backend: 'usersBackend', data: summary });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND' || error.message === 'DOCTOR_REQUIRED')
      return res.status(404).json({ error: 'Doctor not found' });
    return res.status(500).json({ error: 'Failed to load summary' });
  }
};

export const patchUserAppointment = async (req: AuthenticatedRequest, res: Response) => {  try {
    const updated = await updateAppointmentStatus(callerOf(req), req.params.id as string, req.body?.status);
    return res.json({ backend: 'usersBackend', data: updated });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'APPOINTMENT_NOT_FOUND') return res.status(404).json({ error: 'Appointment not found' });
    if (error.message === 'INVALID_STATUS')
      return res.status(400).json({ error: 'Status must be PENDING, CONFIRMED, DONE or CANCELLED' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    return res.status(500).json({ error: 'Failed to update appointment' });
  }
};

// POST /api/users/appointments/local — staff walk-in offline booking + SMS receipt.
export const createLocalBookingAppointment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await createLocalBooking(callerOf(req), {
      patientName: req.body?.patientName,
      phone: req.body?.phone,
      patientType: req.body?.patientType,
      collectionAmount: req.body?.collectionAmount,
      date: req.body?.date,
      age: req.body?.age,
      area: req.body?.area,
      chamberId: req.body?.chamberId,
      problem: req.body?.problem,
    });
    return res.status(201).json({
      backend: 'usersBackend',
      data: result.booking,
      smsSent: result.smsSent,
      message: result.smsSent ? 'বুকিং সম্পন্ন! রোগীর ফোনে SMS পাঠানো হয়েছে।' : 'বুকিং সম্পন্ন! কিন্তু SMS পাঠানো যায়নি।',
    });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE')
      return res.status(404).json({ error: 'No doctor linked to this account' });
    if (error.message === 'INVALID_NAME') return res.status(400).json({ error: 'রোগীর নাম দিন (২–৮০ অক্ষর)।' });
    if (error.message === 'INVALID_PHONE') return res.status(400).json({ error: 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)।' });
    if (error.message === 'INVALID_PATIENT_TYPE')
      return res.status(400).json({ error: 'রোগীর ধরন নতুন বা পুরনো হতে হবে।' });
    if (error.message === 'INVALID_AMOUNT') return res.status(400).json({ error: 'সঠিক আদায়ের টাকা দিন।' });
    if (error.message === 'INVALID_DATE') return res.status(400).json({ error: 'সঠিক তারিখ দিন (YYYY-MM-DD)।' });
    if (error.message === 'INVALID_AGE') return res.status(400).json({ error: 'সঠিক বয়স দিন।' });
    if (error.message === 'INVALID_CHAMBER') return res.status(400).json({ error: 'চেম্বার সঠিক নয়।' });
    return res.status(500).json({ error: 'Failed to create booking' });
  }
};

// GET /api/users/appointments/confirmed?range=today|tomorrow|last30&bookingType=ALL|ONLINE|OFFLINE
export const listConfirmedAppointments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawRange = parseOptional(req, 'range');
    const rawType = parseOptional(req, 'bookingType');
    const range: ConfirmedRange = rawRange === 'tomorrow' || rawRange === 'last30' ? rawRange : 'today';
    const bookingType: ConfirmedTypeFilter = rawType === 'ONLINE' || rawType === 'OFFLINE' ? rawType : 'ALL';
    const result = await listConfirmed(callerOf(req), {
      range,
      bookingType,
      doctorUsername: parseOptional(req, 'doctorUsername'),
      ...parsePaging(req),
    });
    return res.json({ backend: 'usersBackend', ...result });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'Doctor not found' });
    return res.status(500).json({ error: 'Failed to load confirmed appointments' });
  }
};
