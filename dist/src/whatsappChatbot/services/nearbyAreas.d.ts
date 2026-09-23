export interface AreaEntry {
    /** Bengali name — shown on buttons AND used for DB search. */
    nameBn: string;
    /** English / alternate spellings, lowercase, for name matching. */
    aliases: string[];
    lat: number;
    lng: number;
    kind: "upazila" | "district";
    district: string;
}
export declare const AREAS: AreaEntry[];
/** Haversine distance in km between two GPS points. */
export declare function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number;
/** Nearest `limit` Bengali area names to a GPS point (closest first). */
export declare function findNearestAreas(lat: number, lng: number, limit?: number): string[];
/**
 * Nearest areas to a TYPED name (e.g. user typed "শিমুলবাড়ি" or "jaldhaka").
 * Matches the gazetteer by Bengali name or alias, then returns neighbours.
 * Returns [] when the name is unknown — caller falls back to plain DB search.
 */
export declare function findNearestByName(name: string, limit?: number): string[];
//# sourceMappingURL=nearbyAreas.d.ts.map