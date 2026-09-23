import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface AppointmentCaller {
    userId: string;
    role: UserRole;
}
export interface AppointmentFilters {
    status?: string;
    doctorUsername?: string;
    hospitalSlug?: string;
    date?: string;
    from?: string;
    to?: string;
    page: number;
    limit: number;
}
export declare const APPOINTMENT_STATUSES: readonly ["PENDING", "CONFIRMED", "DONE", "CANCELLED"];
/** Fee map of one doctor's chambers: chamberId -> { newFee, oldFee }. */
export declare function chamberFeeMap(doctorId: string): Promise<Map<string, {
    newFee: number;
    oldFee: number;
}>>;
/** Visit fee of one row: RENEW pays the old-patient fee, else the new-patient fee. */
export declare function feeOf(row: {
    chamberId?: string | null;
    patientType?: string | null;
}, fees: Map<string, {
    newFee: number;
    oldFee: number;
}>): number;
export declare function listAppointments(caller: AppointmentCaller, filters: AppointmentFilters): Promise<{
    data: ({
        doctor: {
            name: string;
            speciality: string;
            username: string;
        };
        hospital: {
            name: string;
            slug: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        doctorId: string;
        hospitalId: string | null;
        chamberName: string | null;
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
    } & {
        fee: number;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
/** Today's work queue (all statuses), oldest first, each row with its fee. */
export declare function listTodayAppointments(caller: AppointmentCaller): Promise<({
    doctor: {
        name: string;
        speciality: string;
        username: string;
    };
    hospital: {
        name: string;
        slug: string;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    doctorId: string;
    hospitalId: string | null;
    chamberName: string | null;
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
} & {
    fee: number;
})[]>;
export interface IncomeBucket {
    total: number;
    count: number;
    newCount: number;
    renewCount: number;
}
export interface CustomBucket extends IncomeBucket {
    from: string;
    to: string;
}
/**
 * Monday-to-Sunday weekly collection (never a rolling "last 7 days").
 * - patientCount: every appointment in the range, any status.
 * - total/newCount/renewCount/doneCount: realized (DONE) only.
 * - cancelled: CANCELLED rows in the range.
 */
export interface WeeklyBucket {
    from: string;
    to: string;
    total: number;
    patientCount: number;
    doneCount: number;
    newCount: number;
    renewCount: number;
    cancelled: number;
}
export interface AppointmentSummary {
    today: string;
    /** Expected collection today (everything not cancelled — statuses can still change). */
    todayExpected: IncomeBucket;
    /** Realized today (DONE only). */
    todayDone: IncomeBucket;
    /** Realized last 7 days (DONE). Visible to staff. */
    week: IncomeBucket;
    /** This Monday 00:00 → now. Visible to doctor + staff. */
    thisWeek: WeeklyBucket;
    /** Last Monday 00:00 → Sunday 24:00 (full previous Mon–Sun week). Visible to doctor + staff. */
    lastWeek: WeeklyBucket;
    /** Realized last 30 days (DONE). Doctor only. */
    month: IncomeBucket | null;
    /** Realized lifetime (DONE). Doctor only (gross collection). */
    lifetime: IncomeBucket | null;
    /** Realized income (DONE) in the requested custom range. Staff ranges clamp to the last 7 days. */
    custom: CustomBucket | null;
}
export declare function getAppointmentSummary(caller: AppointmentCaller, opts?: {
    doctorUsername?: string;
    from?: string;
    to?: string;
}): Promise<AppointmentSummary>;
export declare function updateAppointmentStatus(caller: AppointmentCaller, id: string, status: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    doctorId: string;
    hospitalId: string | null;
    chamberName: string | null;
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
}>;
//# sourceMappingURL=appointmentService.d.ts.map