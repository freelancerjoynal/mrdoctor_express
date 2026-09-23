import type { UserRole } from '../../authentication/middleware/authMiddleware.js';
export interface ChamberCaller {
    userId: string;
    role: UserRole;
}
export interface ChamberInput {
    chamberName?: unknown;
    chamberName_en?: unknown;
    addressLine?: unknown;
    addressLine_en?: unknown;
    thana?: unknown;
    thana_en?: unknown;
    district?: unknown;
    district_en?: unknown;
    division?: unknown;
    division_en?: unknown;
    newPatientFee?: unknown;
    oldPatientFee?: unknown;
    latitude?: unknown;
    longitude?: unknown;
    hospitalId?: unknown;
}
export declare function listChambers(caller: ChamberCaller, explicitDoctorId?: string): Promise<({
    schedules: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        hospitalId: string | null;
        chamberId: string | null;
        dayOfWeek: import("../../../generated/prisma/enums.js").DayOfWeek;
        startTime: string;
        endTime: string;
    }[];
    hospital: {
        name: string;
        id: string;
        name_en: string | null;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    division: string | null;
    division_en: string | null;
    district: string | null;
    district_en: string | null;
    thana: string | null;
    thana_en: string | null;
    addressLine: string | null;
    addressLine_en: string | null;
    doctorId: string | null;
    hospitalId: string | null;
    chamberName: string | null;
    chamberName_en: string | null;
    latitude: number | null;
    longitude: number | null;
    newPatientFee: number;
    oldPatientFee: number;
})[]>;
export interface HospitalOptionFilters {
    search?: string;
    division?: string;
    district?: string;
    thana?: string;
}
export declare function listHospitalOptions(caller: ChamberCaller, filters: HospitalOptionFilters): Promise<{
    data: {
        name: string;
        id: string;
        name_en: string | null;
        division: string;
        division_en: string | null;
        district: string;
        district_en: string | null;
        thana: string;
        thana_en: string | null;
    }[];
    facets: {
        divisions: string[];
        districts: string[];
        thanas: string[];
    };
}>;
export declare function createChamber(caller: ChamberCaller, input: ChamberInput & {
    doctorId?: unknown;
}): Promise<{
    schedules: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        hospitalId: string | null;
        chamberId: string | null;
        dayOfWeek: import("../../../generated/prisma/enums.js").DayOfWeek;
        startTime: string;
        endTime: string;
    }[];
    hospital: {
        name: string;
        id: string;
        name_en: string | null;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    division: string | null;
    division_en: string | null;
    district: string | null;
    district_en: string | null;
    thana: string | null;
    thana_en: string | null;
    addressLine: string | null;
    addressLine_en: string | null;
    doctorId: string | null;
    hospitalId: string | null;
    chamberName: string | null;
    chamberName_en: string | null;
    latitude: number | null;
    longitude: number | null;
    newPatientFee: number;
    oldPatientFee: number;
}>;
export declare function updateChamber(caller: ChamberCaller, id: string, input: ChamberInput): Promise<{
    schedules: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        hospitalId: string | null;
        chamberId: string | null;
        dayOfWeek: import("../../../generated/prisma/enums.js").DayOfWeek;
        startTime: string;
        endTime: string;
    }[];
    hospital: {
        name: string;
        id: string;
        name_en: string | null;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    division: string | null;
    division_en: string | null;
    district: string | null;
    district_en: string | null;
    thana: string | null;
    thana_en: string | null;
    addressLine: string | null;
    addressLine_en: string | null;
    doctorId: string | null;
    hospitalId: string | null;
    chamberName: string | null;
    chamberName_en: string | null;
    latitude: number | null;
    longitude: number | null;
    newPatientFee: number;
    oldPatientFee: number;
}>;
export declare function deleteChamber(caller: ChamberCaller, id: string): Promise<{
    id: string;
}>;
export interface ScheduleInput {
    chamberId?: unknown;
    dayOfWeek?: unknown;
    startTime?: unknown;
    endTime?: unknown;
}
export declare function listSchedules(caller: ChamberCaller, explicitDoctorId?: string): Promise<({
    chamber: {
        id: string;
        addressLine: string | null;
        chamberName: string | null;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    hospitalId: string | null;
    chamberId: string | null;
    dayOfWeek: import("../../../generated/prisma/enums.js").DayOfWeek;
    startTime: string;
    endTime: string;
})[]>;
export declare function createSchedule(caller: ChamberCaller, input: ScheduleInput & {
    doctorId?: unknown;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    hospitalId: string | null;
    chamberId: string | null;
    dayOfWeek: import("../../../generated/prisma/enums.js").DayOfWeek;
    startTime: string;
    endTime: string;
}>;
export declare function updateSchedule(caller: ChamberCaller, id: string, input: ScheduleInput): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    hospitalId: string | null;
    chamberId: string | null;
    dayOfWeek: import("../../../generated/prisma/enums.js").DayOfWeek;
    startTime: string;
    endTime: string;
}>;
export declare function deleteSchedule(caller: ChamberCaller, id: string): Promise<{
    id: string;
}>;
//# sourceMappingURL=chamberService.d.ts.map