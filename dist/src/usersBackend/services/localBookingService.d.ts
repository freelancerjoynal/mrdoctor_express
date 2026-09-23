import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface LocalBookingCaller {
    userId: string;
    role: UserRole;
}
export interface LocalBookingInput {
    patientName?: unknown;
    phone?: unknown;
    patientType?: unknown;
    collectionAmount?: unknown;
    date?: unknown;
    age?: unknown;
    area?: unknown;
    chamberId?: unknown;
    problem?: unknown;
    /** Hospital desk: which doctor of this hospital to book (required for HOSPITAL / HOSPITAL_STAFF). */
    doctorId?: unknown;
}
/** Doctors of one hospital running TODAY (chamber or schedule linked + weekday roster). */
export declare function hospitalDoctorsToday(hospitalId: string): Promise<{
    availableToday: boolean;
    name: string;
    id: string;
    degree: string;
    speciality: string;
}[]>;
export declare function createLocalBooking(caller: LocalBookingCaller, input: LocalBookingInput): Promise<{
    booking: {
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
    };
    smsSent: boolean;
}>;
/**
 * Booking options for the staff walk-in form: chambers + schedules +
 * today only (walk-ins are locked to the current day). The chamber is
 * auto-selected from today's availability (one weekday = one chamber).
 * Hospital desk (HOSPITAL / HOSPITAL_STAFF): returns `doctors` — every doctor
 * linked to this hospital plus an `availableToday` flag — so the desk can
 * pick which doctor to book. Single-doctor callers keep the old shape.
 */
export declare function getLocalBookingOptions(caller: LocalBookingCaller): Promise<{
    doctors: {
        availableToday: boolean;
        name: string;
        id: string;
        degree: string;
        speciality: string;
    }[];
    chambers: {
        id: string;
        name: string;
        area: string;
    }[];
    schedules: {
        dayOfWeek: string;
        chamberId: string | null;
        startTime: string;
        endTime: string;
    }[];
    days: {
        date: string;
        dayOfWeek: string;
        label: string;
    }[];
    today: {
        date: string;
        dayOfWeek: string;
        label: string;
    } | null;
    autoChamberId: string | null;
    todayClosed: boolean;
} | {
    chambers: {
        id: string;
        name: string;
        area: string;
    }[];
    schedules: {
        dayOfWeek: string;
        chamberId: string | null;
        startTime: string;
        endTime: string;
    }[];
    days: {
        date: string;
        dayOfWeek: string;
        label: string;
    }[];
    today: {
        date: string;
        dayOfWeek: string;
        label: string;
    } | null;
    autoChamberId: string | null;
    todayClosed: boolean;
    doctors?: undefined;
}>;
//# sourceMappingURL=localBookingService.d.ts.map