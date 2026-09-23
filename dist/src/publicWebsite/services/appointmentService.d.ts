export declare const DAY_BN: Record<string, string>;
/** "শনিবার, ১৩ সেপ্টেম্বর" (+ আজকে/আগামীকাল prefix when applicable). */
export declare function buildDayLabel(date: Date): string;
export interface CreateAppointmentInput {
    doctorUsername?: string;
    hospitalSlug?: string;
    chamberId?: string;
    appointmentDate?: string;
    patientName?: string;
    patientType?: string;
    contactPhone?: string;
    phoneNumber?: string;
    problem?: string;
    patientAge?: number | string;
    patientWeight?: number | string;
    patientArea?: string;
}
/** Booking options for the form: chambers + schedules + next running days. */
export declare function getAppointmentOptions(username: string): Promise<{
    doctor: {
        username: string;
        name: string;
        speciality: string;
    };
    chambers: {
        id: string;
        name: string;
        area: string;
        newFee: number;
        oldFee: number;
        hospital: {
            slug: string;
            name: string;
        } | null;
    }[];
    schedules: {
        dayOfWeek: import("../../../generated/prisma/enums.js").DayOfWeek;
        dayBn: string;
        chamberId: string | null;
        startTime: string;
        endTime: string;
    }[];
    days: {
        date: string;
        dayOfWeek: string;
        dayBn: string;
        label: string;
        chamberId: string | null;
    }[];
}>;
export declare function getSerialLiveBoard(username: string): Promise<{
    current: {
        serial: number;
        patientName: string;
        chamberName: string | null;
        hospitalName: string | null;
        bookingType: "ONLINE" | "OFFLINE";
    } | null;
    next: {
        serial: number;
        patientName: string;
        chamberName: string | null;
        hospitalName: string | null;
        bookingType: "ONLINE" | "OFFLINE";
    } | null;
    upcoming: {
        serial: number;
        patientName: string;
        chamberName: string | null;
        hospitalName: string | null;
        bookingType: "ONLINE" | "OFFLINE";
    }[];
    missed: {
        skippedAt: string | null;
        serial: number;
        patientName: string;
        chamberName: string | null;
        hospitalName: string | null;
        bookingType: "ONLINE" | "OFFLINE";
    }[];
    waitingCount: number;
    totalToday: number;
    live: boolean;
    doctor: {
        username: string;
        name: string;
        speciality: string;
        profilePicture: string | null;
    };
    liveUpdatedAt: Date | null;
    break: {
        reason: string;
        endsAt: Date;
    } | null;
}>;
export declare function createAppointment(input: CreateAppointmentInput): Promise<{
    id: string;
    dayLabel: string | null;
    message: string;
}>;
//# sourceMappingURL=appointmentService.d.ts.map