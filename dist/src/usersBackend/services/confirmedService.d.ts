import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface ConfirmedCaller {
    userId: string;
    role: UserRole;
}
export type ConfirmedRange = 'today' | 'tomorrow' | 'last30';
export type ConfirmedTypeFilter = 'ALL' | 'ONLINE' | 'OFFLINE';
export interface ConfirmedFilters {
    range: ConfirmedRange;
    bookingType: ConfirmedTypeFilter;
    doctorUsername?: string;
    /** Hospital desk: narrow the hospital scope to one specific doctor. */
    doctorId?: string;
    page: number;
    limit: number;
}
/**
 * Create a confirmed booking with the next daily serial for this doctor+day.
 * Serial restarts at 1 every 12:00 AM (appointmentDate is day-precision).
 * Retries on unique-conflict so concurrent bookings never share a serial.
 */ export declare function createConfirmedWithSerial(data: {
    doctorId: string;
    appointmentDate: Date;
    [key: string]: unknown;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    createdBy: string | null;
    doctorId: string;
    hospitalId: string | null;
    chamberName: string | null;
    pendingAppointmentId: string | null;
    phoneNumber: string;
    doctorName: string | null;
    hospitalName: string | null;
    problem: string;
    appointmentDate: Date;
    dayLabel: string | null;
    chamberId: string | null;
    patientName: string;
    patientType: string;
    patientAge: number | null;
    patientWeight: number | null;
    patientArea: string | null;
    contactPhone: string;
    source: string;
    createdByName: string | null;
    bookingType: import("../../../generated/prisma/enums.js").BookingType;
    serial: number;
    collectionAmount: number | null;
    transactionId: string | null;
    orderId: string | null;
    paymentUserId: string | null;
    paymentAmount: number | null;
    currency: string;
    paymentStatus: import("../../../generated/prisma/enums.js").PaymentStatus | null;
    paymentMethod: string | null;
    gatewayResponse: import("@prisma/client/runtime/client").JsonValue | null;
    paidAt: Date | null;
}>;
export declare function listConfirmed(caller: ConfirmedCaller, filters: ConfirmedFilters): Promise<{
    data: any[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    counts: {
        today: number;
        tomorrow: number;
        last30: number;
    };
}>;
/** Tab counters only (today / tomorrow / last30, bookingType ALL). One round trip. */
export declare function getConfirmedCounts(caller: ConfirmedCaller, doctorUsername?: string, doctorId?: string): Promise<{
    today: number;
    tomorrow: number;
    last30: number;
}>;
/** Served-tab counters (today / tomorrow / last30). Doctor + staff + hospital scope. */
export declare function getServedCounts(caller: ConfirmedCaller, doctorUsername?: string, doctorId?: string): Promise<{
    today: number;
    tomorrow: number;
    last30: number;
}>;
/** Service done: move the row to served_appointments (snapshot + remove). */
export declare function completeConfirmed(caller: ConfirmedCaller, id: string): Promise<{
    id: string;
    createdAt: Date;
    createdBy: string | null;
    doctorId: string;
    hospitalId: string | null;
    chamberName: string | null;
    doctorName: string | null;
    appointmentDate: Date;
    chamberId: string | null;
    patientName: string;
    patientType: string;
    contactPhone: string;
    createdByName: string | null;
    bookingType: import("../../../generated/prisma/enums.js").BookingType;
    serial: number;
    collectionAmount: number | null;
    paymentAmount: number | null;
    appointmentId: string;
    servedBy: string;
    servedAt: Date;
}>;
/** Served (সেবা সম্পন্ন) tab list. Hospital callers scope via their chambers' doctors. */
export declare function listServed(caller: ConfirmedCaller, filters: ConfirmedFilters): Promise<{
    data: any[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export interface UpdateConfirmedInput {
    patientName?: unknown;
    contactPhone?: unknown;
    appointmentDate?: unknown;
    collectionAmount?: unknown;
}
/** Update name / phone / offline amount. The appointment date is immutable.
 * Hospital desk: only the user who added the booking (createdBy) may update
 * it — same owner-only rule as delete. Legacy rows without createdBy stay
 * editable by anyone in the hospital scope. */
export declare function updateConfirmed(caller: ConfirmedCaller, id: string, input: UpdateConfirmedInput): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    createdBy: string | null;
    doctorId: string;
    hospitalId: string | null;
    chamberName: string | null;
    pendingAppointmentId: string | null;
    phoneNumber: string;
    doctorName: string | null;
    hospitalName: string | null;
    problem: string;
    appointmentDate: Date;
    dayLabel: string | null;
    chamberId: string | null;
    patientName: string;
    patientType: string;
    patientAge: number | null;
    patientWeight: number | null;
    patientArea: string | null;
    contactPhone: string;
    source: string;
    createdByName: string | null;
    bookingType: import("../../../generated/prisma/enums.js").BookingType;
    serial: number;
    collectionAmount: number | null;
    transactionId: string | null;
    orderId: string | null;
    paymentUserId: string | null;
    paymentAmount: number | null;
    currency: string;
    paymentStatus: import("../../../generated/prisma/enums.js").PaymentStatus | null;
    paymentMethod: string | null;
    gatewayResponse: import("@prisma/client/runtime/client").JsonValue | null;
    paidAt: Date | null;
}>;
/**
 * Delete a walk-in (OFFLINE) booking: snapshot to cancelled_appointments_local,
 * then remove the row. ONLINE rows can never be deleted — use a cancel request.
 * Owner-only: nobody may delete a booking they didn't add — not even the
 * doctor, and the canApprove gate does NOT apply here. Only the adder
 * (createdBy) may delete; rows without createdBy (legacy) stay deletable.
 * After removal the day's serials are rearranged 1..N so no gap remains.
 */
export declare function deleteOfflineBooking(caller: ConfirmedCaller, id: string, reason?: unknown): Promise<{
    deleted: boolean;
}>;
/**
 * Online cancel request: snapshot to cancelled_appointments_online.
 * The booking stays untouched (approved later). One request per booking.
 */
export declare function requestOnlineCancel(caller: ConfirmedCaller, id: string, reason?: unknown): Promise<{
    requested: boolean;
}>;
//# sourceMappingURL=confirmedService.d.ts.map