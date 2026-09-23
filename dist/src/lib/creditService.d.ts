import type { UserRole } from '../authentication/middleware/authMiddleware.js';
/** One offline appointment always costs exactly this. */
export declare const APPOINTMENT_COST = 1;
export type CreditOwnerType = 'DOCTOR' | 'HOSPITAL';
export interface CreditCaller {
    userId: string;
    role: UserRole;
}
/**
 * Whose wallet pays for a booking made by this caller:
 * doctor-side roles (doctor + own staff) → the doctor,
 * hospital-side roles (hospital + desk staff) → the hospital.
 */
export declare function resolveCreditOwner(caller: CreditCaller): Promise<{
    ownerType: CreditOwnerType;
    ownerId: string;
}>;
/**
 * Wallet behind any user row (for OTP SMS charging):
 * doctor + own staff → the doctor, hospital + desk staff → the hospital.
 * Returns null for platform roles (admins etc.) — their OTP SMS is free.
 */
export declare function ownerForUser(user: {
    id: string;
    role: string;
    staffDoctorId?: string | null;
    staffHospitalId?: string | null;
}): Promise<{
    ownerType: CreditOwnerType;
    ownerId: string;
} | null>;
/** Send one OTP SMS, charging 1 credit. Returns true if sent AND charged. */
export declare function sendOtpSms(opts: {
    phone: string;
    text: string;
    owner: {
        ownerType: CreditOwnerType;
        ownerId: string;
    } | null;
    refId: string;
    note: string;
    createdBy?: string | null;
}): Promise<boolean>;
export interface SpendInput {
    ownerType: CreditOwnerType;
    ownerId: string;
    /** Ledger kind — appointment spends (default) or OTP_SMS. */
    kind?: 'APPOINTMENT_SPEND' | 'OTP_SMS';
    /** Which table row this spend belongs to (linked right after creation). */
    refType: 'PendingAppointment' | 'ConfirmedAppointment' | 'User';
    /** Known upfront for OTP sends (the user already exists). */
    refId?: string | null;
    /** User who booked (null for patient-side website/WhatsApp bookings). */
    createdBy?: string | null;
    note?: string | null;
}
/**
 * Atomically spend 1 credit (check-and-decrement in one statement, so
 * concurrent bookings can never overspend past zero).
 * Throws INSUFFICIENT_CREDIT at zero balance — the caller maps it to
 * "contact support". Throws OWNER_NOT_FOUND for a bad owner id.
 */
export declare function spendAppointmentCredit(input: SpendInput): Promise<{
    ledgerId: string;
    balanceAfter: number;
}>;
/** Attach the created appointment id to a spend row (best-effort, never throws). */
export declare function linkCreditRef(ledgerId: string, refId: string): Promise<void>;
/**
 * Void a spend (booking creation failed AFTER the charge): deletes the
 * spend row and gives the credit back. Best-effort — never throws, so the
 * original booking error always propagates.
 */
export declare function voidSpend(ledgerId: string): Promise<void>;
export interface TopupInput {
    ownerType: CreditOwnerType;
    ownerId: string;
    amount: number;
    note?: string | null;
    createdBy?: string | null;
}
/** Admin top-up: add credits (1–100000) + TOPUP ledger row. */
export declare function topupCredit(input: TopupInput): Promise<{
    balanceAfter: number;
}>;
export interface CreditBalance {
    ownerType: CreditOwnerType;
    ownerId: string;
    ownerName: string;
    balance: number;
    /** How many more offline bookings can be taken right now (0 = contact support). */
    bookableLeft: number;
    exhausted: boolean;
}
/** Wallet snapshot for panels (doctor, hospital, staff all see their owner's). */
export declare function getCreditBalance(ownerType: CreditOwnerType, ownerId: string): Promise<CreditBalance>;
export interface LedgerRow {
    id: string;
    amount: number;
    balanceAfter: number;
    kind: string;
    refType: string | null;
    refId: string | null;
    note: string | null;
    createdAt: Date;
}
/** Newest-first ledger for an owner (admin history, panel dropdowns). */
export declare function listCreditLedger(ownerType: CreditOwnerType, ownerId: string, take?: number): Promise<LedgerRow[]>;
/** Bengali "contact support" message shared by every blocked-booking response. */
export declare function insufficientCreditMessage(): string;
//# sourceMappingURL=creditService.d.ts.map