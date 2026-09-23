import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface StaffCollectionCaller {
    userId: string;
    role: UserRole;
}
export type StaffCollectionRange = 'today' | 'tomorrow' | 'yesterday' | 'last30';
export declare const UNKNOWN_STAFF = "unknown";
export interface StaffBucket {
    userId: string;
    name: string;
    count: number;
    total: number;
    confirmedCount: number;
    confirmedTotal: number;
    servedCount: number;
    servedTotal: number;
}
/** Per-taker OFFLINE totals for the range (confirmed + served combined).
 * `date` (yyyy-mm-dd) narrows to one explicit calendar day and wins over `range`. */
export declare function getStaffCollections(caller: StaffCollectionCaller, opts: {
    range: StaffCollectionRange;
    date?: string;
    doctorUsername?: string;
    doctorId?: string;
}): Promise<StaffBucket[]>;
export interface MonthlyLocalCount {
    year: number;
    month: number;
    name: string;
    /** Locally booked patients that month (confirmed pending + served done). */
    count: number;
}
/**
 * Last 12 calendar months (oldest → newest) of LOCAL booking patient counts.
 * Number only — no amounts. Both ledgers are counted so a booking never
 * drops when it is marked served. 24 tiny indexed COUNTs in parallel, no
 * rows transferred.
 */
export declare function getLocalMonthlyCounts(caller: StaffCollectionCaller, opts?: {
    doctorUsername?: string;
    doctorId?: string;
}): Promise<{
    months: MonthlyLocalCount[];
    thisMonth: MonthlyLocalCount;
}>;
export interface StaffRow {
    id: string;
    serial: number;
    patientName: string;
    contactPhone: string;
    problem: string;
    appointmentDate: Date;
    served: boolean;
    servedAt?: Date | string | null;
    createdBy?: string | null;
    createdByName?: string | null;
    amount: number;
    doctorId: string;
    doctorName: string;
    doctorSpeciality?: string | null;
}
export interface StaffDoctorBreakdown {
    doctorId: string;
    doctorName: string;
    doctorSpeciality?: string | null;
    count: number;
    total: number;
    confirmedCount: number;
    confirmedTotal: number;
    servedCount: number;
    servedTotal: number;
}
/** OFFLINE rows taken by one staff in the range (confirmed + served).
 * Each row carries its doctor so hospital desks can answer
 * "এই স্টাফ আজ কোন ডাক্তারের জন্য কত নিয়েছে" without extra round trips.
 * Response also includes a per-doctor breakdown (byDoctor) for that taker. */
export declare function listStaffRows(caller: StaffCollectionCaller, opts: {
    range: StaffCollectionRange;
    userId: string;
    date?: string;
    doctorUsername?: string;
    doctorId?: string;
    limit?: unknown;
}): Promise<{
    name: string;
    confirmed: StaffRow[];
    served: StaffRow[];
    byDoctor: StaffDoctorBreakdown[];
}>;
//# sourceMappingURL=staffCollectionService.d.ts.map