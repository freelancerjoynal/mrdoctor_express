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
import { getLocalBookingOptions } from '../services/localBookingService.js';
import { getCollectionSummary, getMonthDays, getWeekDays, getDoctorBreakdown, getLifetimeBalance } from '../services/collectionService.js';
import {
  listConfirmed,
  type ConfirmedRange,
  type ConfirmedTypeFilter,
} from '../services/confirmedService.js';
import { getConfirmedCounts, getServedCounts } from '../services/confirmedService.js';
import {
  completeConfirmed,
  updateConfirmed,
  deleteOfflineBooking,
  requestOnlineCancel,
  listServed,
} from '../services/confirmedService.js';
import {
  getStaffCollections,
  listStaffRows,
  getLocalMonthlyCounts,
  type StaffCollectionRange,
} from '../services/staffCollectionService.js';

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

// GET /api/users/appointments/local-options — chambers + schedules + next 2 running days.
export const showLocalBookingOptions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const options = await getLocalBookingOptions(callerOf(req));
    return res.json({ backend: 'usersBackend', data: options });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this account' });
    return res.status(500).json({ error: 'Failed to load booking options' });
  }
};

// GET /api/users/appointments/collection/summary[?doctorUsername=][&doctorId=][&date=yyyy-mm-dd] — today/week/month/lifetime boxes + explicit `day` box.
export const showCollectionSummary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getCollectionSummary(callerOf(req), {
      doctorUsername: parseOptional(req, 'doctorUsername'),
      doctorId: parseOptional(req, 'doctorId'),
      date: parseOptional(req, 'date'),
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND' || error.message === 'DOCTOR_REQUIRED')
      return res.status(404).json({ error: 'Doctor not found' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    return res.status(500).json({ error: 'Failed to load collection' });
  }
};

// GET /api/users/appointments/collection/lifetime-balance — hospital owner only.
// All-time realized balance from served_appointments (ONLINE vs OFFLINE split).
// On-demand (header button): aggregate-only query, never fetched on page load.
export const showLifetimeBalance = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getLifetimeBalance(callerOf(req));
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    return res.status(500).json({ error: 'Failed to load lifetime balance' });
  }
};

// GET /api/users/appointments/collection/days?year=&month=[&doctorUsername=][&doctorId=] — per-day month breakdown.
export const showCollectionDays = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getMonthDays(callerOf(req), {
      year: parseOptional(req, 'year'),
      month: parseOptional(req, 'month'),
      doctorUsername: parseOptional(req, 'doctorUsername'),
      doctorId: parseOptional(req, 'doctorId'),
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND' || error.message === 'DOCTOR_REQUIRED')
      return res.status(404).json({ error: 'Doctor not found' });
    return res.status(500).json({ error: 'Failed to load month days' });
  }
};

// GET /api/users/appointments/collection/week?offset=0[&doctorUsername=][&doctorId=] — per-day week breakdown.
export const showCollectionWeek = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getWeekDays(callerOf(req), {
      offset: parseOptional(req, 'offset'),
      doctorUsername: parseOptional(req, 'doctorUsername'),
      doctorId: parseOptional(req, 'doctorId'),
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND' || error.message === 'DOCTOR_REQUIRED')
      return res.status(404).json({ error: 'Doctor not found' });
    return res.status(500).json({ error: 'Failed to load week days' });
  }
};

// GET /api/users/appointments/collection/doctors?date=yyyy-mm-dd[&from=&to=][&year=&month=][&doctorId=]
// Hospital owner: per-doctor served totals (collection + patient counts, online/offline split).
export const showCollectionDoctors = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getDoctorBreakdown(callerOf(req), {
      date: parseOptional(req, 'date'),
      from: parseOptional(req, 'from'),
      to: parseOptional(req, 'to'),
      year: parseOptional(req, 'year'),
      month: parseOptional(req, 'month'),
      doctorUsername: parseOptional(req, 'doctorUsername'),
      doctorId: parseOptional(req, 'doctorId'),
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND' || error.message === 'DOCTOR_REQUIRED')
      return res.status(404).json({ error: 'Doctor not found' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    return res.status(500).json({ error: 'Failed to load doctor breakdown' });
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
      doctorId: req.body?.doctorId,
    });
    return res.status(201).json({
      backend: 'usersBackend',
      data: result.booking,
      smsSent: result.smsSent,
      message: result.smsSent ? 'বুকিং সম্পন্ন! রোগীর ফোনে SMS পাঠানো হয়েছে।' : 'বুকিং সম্পন্ন! কিন্তু SMS পাঠানো যায়নি।',
    });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this account' });
    if (error.message === 'DOCTOR_REQUIRED') return res.status(400).json({ error: 'ডাক্তার বেছে নিন।' });
    if (error.message === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'ডাক্তার পাওয়া যায়নি।' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    if (error.message === 'INVALID_NAME') return res.status(400).json({ error: 'রোগীর নাম দিন (২–৮০ অক্ষর)।' });
    if (error.message === 'INVALID_PHONE') return res.status(400).json({ error: 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)।' });
    if (error.message === 'INVALID_PATIENT_TYPE')
      return res.status(400).json({ error: 'রোগীর ধরন নতুন বা পুরনো হতে হবে।' });
    if (error.message === 'INVALID_AMOUNT') return res.status(400).json({ error: 'সঠিক আদায়ের টাকা দিন।' });
    if (error.message === 'INVALID_DATE') return res.status(400).json({ error: 'শুধু আজকের তারিখে বুকিং করা যাবে।' });
    if (error.message === 'CLOSED_DAY')
      return res.status(400).json({ error: 'আজ চেম্বার বন্ধ আছে।' });
    if (error.message === 'INVALID_AGE') return res.status(400).json({ error: 'সঠিক বয়স দিন।' });
    if (error.message === 'INVALID_CHAMBER') return res.status(400).json({ error: 'চেম্বার সঠিক নয়।' });
    return res.status(500).json({ error: 'Failed to create booking' });
  }
};

// GET /api/users/appointments/confirmed?range=today|tomorrow|last30&bookingType=ALL|ONLINE|OFFLINE[&doctorId=]
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
      doctorId: parseOptional(req, 'doctorId'),
      ...parsePaging(req),
    });
    return res.json({ backend: 'usersBackend', ...result });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'Doctor not found' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    return res.status(500).json({ error: 'Failed to load confirmed appointments' });
  }
};

// GET /api/users/appointments/confirmed/counts[?doctorUsername=][&doctorId=] — tab counters, one round trip.
export const showConfirmedCounts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getConfirmedCounts(
      callerOf(req),
      parseOptional(req, 'doctorUsername'),
      parseOptional(req, 'doctorId'),
    );
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'Doctor not found' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    return res.status(500).json({ error: 'Failed to load counts' });
  }
};

// GET /api/users/appointments/served/counts[?doctorUsername=][&doctorId=] — served-tab counters.
export const showServedCounts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getServedCounts(
      callerOf(req),
      parseOptional(req, 'doctorUsername'),
      parseOptional(req, 'doctorId'),
    );
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'Doctor not found' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    return res.status(500).json({ error: 'Failed to load counts' });
  }
};

// PATCH /api/users/appointments/confirmed/:id — { status: 'DONE' } moves the row
// to served_appointments, or detail fields { patientName, contactPhone, appointmentDate, collectionAmount }.
export const patchConfirmedAppointment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const body = req.body ?? {};
    const updated =
      body?.status === 'DONE'
        ? await completeConfirmed(callerOf(req), id)
        : await updateConfirmed(callerOf(req), id, {
            patientName: body?.patientName,
            contactPhone: body?.contactPhone,
            appointmentDate: body?.appointmentDate,
            collectionAmount: body?.collectionAmount,
          });
    return res.json({ backend: 'usersBackend', data: updated });
  } catch (error: any) {
    return confirmedActionError(res, error);
  }
};

// DELETE /api/users/appointments/confirmed/:id — walk-in (OFFLINE) only.
// Snapshots to cancelled_appointments_local, then removes the row.
export const deleteConfirmedAppointment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await deleteOfflineBooking(callerOf(req), req.params.id as string, req.body?.reason);
    return res.json({ backend: 'usersBackend', data: { deleted: true } });
  } catch (error: any) {
    return confirmedActionError(res, error);
  }
};

// POST /api/users/appointments/confirmed/:id/cancel-request — ONLINE only.
// Saves to cancelled_appointments_online; the booking stays untouched.
export const postCancelRequest = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await requestOnlineCancel(callerOf(req), req.params.id as string, req.body?.reason);
    return res.status(201).json({
      backend: 'usersBackend',
      data: { requested: true },
      message: 'রিকোয়েস্ট পাঠানো হয়েছে।',
    });
  } catch (error: any) {
    if (error.message === 'ALREADY_REQUESTED')
      return res.status(409).json({ error: 'রিকোয়েস্ট আগেই পাঠানো হয়েছে।' });
    return confirmedActionError(res, error);
  }
};

// GET /api/users/appointments/served?range=today|tomorrow|last30&bookingType=ALL|ONLINE|OFFLINE[&doctorId=]
export const listServedAppointments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawRange = parseOptional(req, 'range');
    const rawType = parseOptional(req, 'bookingType');
    const range: ConfirmedRange = rawRange === 'tomorrow' || rawRange === 'last30' ? rawRange : 'today';
    const bookingType: ConfirmedTypeFilter = rawType === 'ONLINE' || rawType === 'OFFLINE' ? rawType : 'ALL';
    const result = await listServed(callerOf(req), {
      range,
      bookingType,
      doctorUsername: parseOptional(req, 'doctorUsername'),
      doctorId: parseOptional(req, 'doctorId'),
      ...parsePaging(req),
    });
    return res.json({ backend: 'usersBackend', ...result });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND') return res.status(404).json({ error: 'Doctor not found' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    return res.status(500).json({ error: 'Failed to load served appointments' });
  }
};

// GET /api/users/appointments/staff-collections?range=today|yesterday|tomorrow|last30[&date=yyyy-mm-dd][&doctorId=]
// Per-taker OFFLINE (cash) totals — confirmed + served combined.
// `date` narrows to one explicit calendar day (hospital dashboard date picker).
export const showStaffCollections = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawRange = parseOptional(req, 'range');
    const range: StaffCollectionRange =
      rawRange === 'tomorrow' || rawRange === 'yesterday' || rawRange === 'last30' ? rawRange : 'today';
    const data = await getStaffCollections(callerOf(req), {
      range,
      date: parseOptional(req, 'date'),
      doctorUsername: parseOptional(req, 'doctorUsername'),
      doctorId: parseOptional(req, 'doctorId'),
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND' || error.message === 'DOCTOR_REQUIRED')
      return res.status(404).json({ error: 'Doctor not found' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    return res.status(500).json({ error: 'Failed to load staff collections' });
  }
};

// GET /api/users/appointments/staff-collections/monthly[?doctorUsername=][&doctorId=]
// Last 12 months of LOCAL booking patient counts (number only).
export const showLocalMonthlyCounts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await getLocalMonthlyCounts(callerOf(req), {
      doctorUsername: parseOptional(req, 'doctorUsername'),
      doctorId: parseOptional(req, 'doctorId'),
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND' || error.message === 'DOCTOR_REQUIRED')
      return res.status(404).json({ error: 'Doctor not found' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    return res.status(500).json({ error: 'Failed to load monthly counts' });
  }
};

// GET /api/users/appointments/staff-collections/rows?range=&userId=[&date=yyyy-mm-dd][&doctorId=]
// OFFLINE rows taken by one staff (confirmed + served).
export const showStaffCollectionRows = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawRange = parseOptional(req, 'range');
    const range: StaffCollectionRange =
      rawRange === 'tomorrow' || rawRange === 'yesterday' || rawRange === 'last30' ? rawRange : 'today';
    const data = await listStaffRows(callerOf(req), {
      range,
      userId: parseOptional(req, 'userId') ?? 'unknown',
      date: parseOptional(req, 'date'),
      doctorUsername: parseOptional(req, 'doctorUsername'),
      doctorId: parseOptional(req, 'doctorId'),
      limit: parseOptional(req, 'limit'),
    });
    return res.json({ backend: 'usersBackend', data });
  } catch (error: any) {
    if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
    if (error.message === 'NO_DOCTOR_PROFILE' || error.message === 'NO_HOSPITAL_PROFILE')
      return res.status(404).json({ error: 'No profile linked to this user' });
    if (error.message === 'DOCTOR_NOT_FOUND' || error.message === 'DOCTOR_REQUIRED')
      return res.status(404).json({ error: 'Doctor not found' });
    if (error.message === 'DOCTOR_NOT_IN_HOSPITAL')
      return res.status(400).json({ error: 'এই ডাক্তার এই হাসপাতালের নন।' });
    return res.status(500).json({ error: 'Failed to load staff rows' });
  }
};

function confirmedActionError(res: Response, error: any) {
  const msg = error?.message ?? 'UNKNOWN';
  if (msg === 'FORBIDDEN') return res.status(403).json({ error: 'Access denied' });
  if (msg === 'APPOINTMENT_NOT_FOUND') return res.status(404).json({ error: 'বুকিং পাওয়া যায়নি।' });
  if (msg === 'NO_DOCTOR_PROFILE' || msg === 'NO_HOSPITAL_PROFILE')
    return res.status(404).json({ error: 'No profile linked to this user' });
  if (msg === 'ONLINE_DELETE_FORBIDDEN')
    return res.status(403).json({ error: 'অনলাইন বুকিং ডিলিট করা যাবে না। ক্যানসেল রিকোয়েস্ট পাঠান।' });
  if (msg === 'NOT_ONLINE') return res.status(400).json({ error: 'এটি অনলাইন বুকিং নয়।' });
  if (msg === 'ALREADY_CANCELLED') return res.status(400).json({ error: 'বুকিংটি আগেই বাতিল হয়েছে।' });
  if (msg === 'FUTURE_SERVE')
    return res.status(400).json({ error: 'আগামী দিনের বুকিং আজ সেবা সম্পন্ন করা যাবে না।' });
  if (msg === 'APPROVE_FORBIDDEN')
    return res.status(403).json({ error: 'অনুমতি নেই — সেবা সম্পন্ন শুধু ডাক্তার করবেন।' });
  if (msg === 'NOT_OWNER')
    return res.status(403).json({ error: 'এই বুকিং অন্যজন যোগ করেছেন — শুধু তিনি এডিট/ডিলিট করতে পারবেন।' });
  if (msg === 'AMOUNT_NOT_EDITABLE')
    return res.status(400).json({ error: 'অনলাইন পেমেন্টের টাকা এখানে বদলানো যাবে না।' });
  if (msg === 'NOTHING_TO_UPDATE') return res.status(400).json({ error: 'বদলানোর মতো কিছু নেই।' });
  if (msg === 'INVALID_NAME') return res.status(400).json({ error: 'রোগীর নাম দিন (২–৮০ অক্ষর)।' });
  if (msg === 'INVALID_PHONE') return res.status(400).json({ error: 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)।' });
  if (msg === 'INVALID_AMOUNT') return res.status(400).json({ error: 'সঠিক টাকা দিন।' });
  if (msg === 'INVALID_DATE') return res.status(400).json({ error: 'শুধু আজকের তারিখে বুকিং করা যাবে।' });
  if (msg === 'CLOSED_DAY')
    return res.status(400).json({ error: 'আজ চেম্বার বন্ধ আছে।' });
  if (msg === 'DATE_IMMUTABLE')
    return res.status(400).json({ error: 'তারিখ পরিবর্তন করা যাবে না।' });
  return res.status(500).json({ error: 'অনুরোধ ব্যর্থ হয়েছে।' });
}
