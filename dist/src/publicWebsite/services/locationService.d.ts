export interface LocationCounts {
    chambers: number;
    doctors: number;
    hospitals: number;
}
export interface ThanaNode extends LocationCounts {
    thana: string;
}
export interface DistrictNode extends LocationCounts {
    district: string;
    thanas: ThanaNode[];
}
export interface DivisionNode extends LocationCounts {
    division: string;
    districts: DistrictNode[];
}
export declare function getLocationTree(): Promise<DivisionNode[]>;
export declare function listDivisions(): Promise<{
    division: string;
    chambers: number;
    doctors: number;
    hospitals: number;
}[]>;
export declare function listDistricts(division?: string): Promise<(Omit<DistrictNode, "thanas"> & {
    division: string;
})[]>;
export declare function listThanas(division?: string, district?: string): Promise<(ThanaNode & {
    division: string;
    district: string;
})[]>;
//# sourceMappingURL=locationService.d.ts.map