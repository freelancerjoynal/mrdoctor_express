export interface ExpertiseItem {
    icon: string;
    service: string;
    service_details: string;
}
export interface TimelineItem {
    year: string;
    title: string;
}
/** 2010 → "২০১০" (matches the timeline screenshots). */
export declare function toBnYear(year: number): string;
/** Speciality → 3 expertise cards. Unknown speciality falls back to general care. */
export declare function buildExpertiseForSpeciality(speciality: string): ExpertiseItem[];
/** English mirror of buildExpertiseForSpeciality — used for expertise_en. */
export declare function buildExpertiseEnForSpeciality(speciality: string): ExpertiseItem[];
export interface TimelineDoctorInput {
    degree: string;
    speciality: string;
    startedYear?: number | null;
    firstChamberThana?: string | null;
}
/**
 * 4–5 timeline entries derived from the doctor's own degree / speciality / startedYear.
 * Index rotates colleges & hospitals so neighbouring doctors don't read identically.
 */
export declare function buildTimelineForDoctor(doctor: TimelineDoctorInput, index: number): TimelineItem[];
//# sourceMappingURL=doctorInformationContent.d.ts.map