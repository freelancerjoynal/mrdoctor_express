export interface DoctorPoolTopic {
    slugBase: string;
    title: string;
    excerpt: string;
    content: string;
    coverGradient: string;
    coverSymbol: string;
    category: string;
    tags: string[];
}
/** Speciality → 3 pool topics (unknown speciality → general pool). */
export declare function poolTopicsFor(speciality: string): DoctorPoolTopic[];
export interface DoctorPoolSeedInput {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverGradient: string;
    coverSymbol: string;
    category: string;
    tags: string[];
    authorName: string;
    publishedAt: Date;
}
/**
 * Build 3 ready-to-store seeds for one doctor.
 * `daysAgoBase` staggers publish dates so profiles look naturally grown.
 */
export declare function buildDoctorPoolSeeds(doctor: {
    username: string;
    name: string;
    speciality: string;
}, daysAgoBase?: number): DoctorPoolSeedInput[];
export interface HospitalPoolSeedInput extends DoctorPoolSeedInput {
}
/** Build 2 ready-to-store seeds for one hospital. */
export declare function buildHospitalPoolSeeds(hospital: {
    slug: string;
    name: string;
}, daysAgoBase?: number): HospitalPoolSeedInput[];
//# sourceMappingURL=blogPoolContent.d.ts.map