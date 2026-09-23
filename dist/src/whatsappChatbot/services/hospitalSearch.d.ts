import type { DoctorWithChambers } from "./doctorSearch.js";
export interface HospitalWithDoctors {
    id: string;
    name: string;
    slug: string;
    address: string | null;
    phone: string | null;
    doctorCount: number;
    departments: string[];
    doctors: {
        id: string;
        name: string;
        username: string;
        degree: string | null;
        speciality: string | null;
        phone: string | null;
        chamberName: string | null;
        addressLine: string;
        thana: string;
        district: string;
        newPatientFee: number | null;
        oldPatientFee: number | null;
    }[];
}
/** Random 5 hospitals in the user's area (new schema). */
export declare function findHospitalsByArea(area: string, limit?: number): Promise<HospitalWithDoctors[]>;
export declare function getHospitalById(hospitalId: string): Promise<HospitalWithDoctors | null>;
export declare function doctorsToCards(doctors: DoctorWithChambers[]): string;
export declare function buildHospitalCard(index: number, h: HospitalWithDoctors): string;
//# sourceMappingURL=hospitalSearch.d.ts.map