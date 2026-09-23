export interface DoctorWithChambers {
    id: string;
    name: string;
    username: string;
    degree: string | null;
    speciality: string | null;
    phone: string | null;
    chambers: {
        id: string;
        chamberName: string | null;
        addressLine: string;
        thana: string;
        district: string;
        division: string;
        newPatientFee: number | null;
        oldPatientFee: number | null;
        hospital: {
            id: string;
            name: string;
        } | null;
    }[];
}
/**
 * New-schema area search: Chamber.thana / district / division / addressLine
 * matched against the user's area. Returns up to `limit` RANDOM doctors.
 * Doctors whose speciality matches the suggested department are preferred.
 */
export declare function findDoctorsByArea(area: string, department?: string, limit?: number): Promise<{
    doctors: DoctorWithChambers[];
    totalInArea: number;
}>;
/** One-line chamber label for cards: "Hospital — thana, district" */
export declare function chamberLabel(c?: DoctorWithChambers["chambers"][number]): string;
export declare function buildDoctorCard(index: number, d: DoctorWithChambers): string;
/** "💰 ফি — নতুন: ৭০০ টাকা | পুরনো: ৬০০ টাকা" (shown only when a fee exists). */
export declare function feeLine(newFee?: number | null, oldFee?: number | null): string;
//# sourceMappingURL=doctorSearch.d.ts.map