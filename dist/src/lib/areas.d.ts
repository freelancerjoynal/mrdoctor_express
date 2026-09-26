export interface District {
    name: string;
    thanas: string[];
}
export interface Division {
    name: string;
    districts: District[];
}
/** 8 divisions → 64 districts → thana/upazila lists (Bangla). */
export declare const DIVISIONS: Division[];
export declare const TOTAL_DISTRICTS: number;
export declare const TOTAL_THANAS: number;
//# sourceMappingURL=areas.d.ts.map