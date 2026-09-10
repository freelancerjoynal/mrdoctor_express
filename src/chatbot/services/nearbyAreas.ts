// ============================================================================
// nearbyAreas.ts — GPS (lat/lng) -> nearest Bengali area names for DB search.
// ============================================================================
//
// WHY THIS FILE EXISTS:
//   - Chamber/Hospital areas in the DB are stored in BENGALI
//     (thana: জলঢাকা, ডোমার, সৈয়দপুর … district: নীলফামারী).
//   - Online reverse-geocoding returns ENGLISH names, so it usually MISSES.
//   - This gazetteer maps GPS coords -> Bengali names via haversine distance,
//     offline and reliable.
//
// HOW TO ADD A NEW AREA (copy one line, keep coordinates approximate —
// nearest-3 ranking only needs rough positions):
//   { nameBn: "পার্বতীপুর", aliases: ["parbatipur"], lat: 25.656, lng: 88.910, kind: "upazila", district: "দিনাজপুর" },
//
// USAGE:
//   findNearestAreas(26.05, 89.0, 3)        -> ["জলঢাকা", "ডিমলা", "কিশোরগঞ্জ"]
//   findNearestByName("শিমুলবাড়ি", 3)      -> nearest areas to a typed name
//                                            (matches alias/upazila text)
// ============================================================================

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

export const AREAS: AreaEntry[] = [
    // ---- নীলফামারী জেলার উপজেলা (DB thana names, Bengali) ----
    { nameBn: "নীলফামারী সদর", aliases: ["nilphamari", "nilphamari sadar", "sadar"], lat: 25.931, lng: 88.856, kind: "upazila", district: "নীলফামারী" },
    { nameBn: "সৈয়দপুর", aliases: ["saidpur", "syedpur"], lat: 25.778, lng: 88.892, kind: "upazila", district: "নীলফামারী" },
    { nameBn: "জলঢাকা", aliases: ["jaldhaka", "jaladhaka", "jaldaka", "shimulbari", "শিমুলবাড়ি"], lat: 26.011, lng: 88.992, kind: "upazila", district: "নীলফামারী" },
    { nameBn: "ডোমার", aliases: ["domar", "domer"], lat: 25.929, lng: 88.834, kind: "upazila", district: "নীলফামারী" },
    { nameBn: "ডিমলা", aliases: ["dimla"], lat: 26.131, lng: 88.93, kind: "upazila", district: "নীলফামারী" },
    { nameBn: "কিশোরগঞ্জ", aliases: ["kishoreganj", "kishoregong"], lat: 25.91, lng: 89.022, kind: "upazila", district: "নীলফামারী" },

    // ---- রংপুর বিভাগের অন্যান্য জেলা ----
    { nameBn: "রংপুর", aliases: ["rangpur", "rongpur"], lat: 25.743, lng: 89.275, kind: "district", district: "রংপুর" },
    { nameBn: "দিনাজপুর", aliases: ["dinajpur"], lat: 25.628, lng: 88.644, kind: "district", district: "দিনাজপুর" },
    { nameBn: "কুড়িগ্রাম", aliases: ["kurigram"], lat: 25.807, lng: 89.629, kind: "district", district: "কুড়িগ্রাম" },
    { nameBn: "লালমনিরহাট", aliases: ["lalmonirhat"], lat: 25.992, lng: 89.285, kind: "district", district: "লালমনিরহাট" },
    { nameBn: "গাইবান্ধা", aliases: ["gaibandha"], lat: 25.329, lng: 89.543, kind: "district", district: "গাইবান্ধা" },
    { nameBn: "ঠাকুরগাঁও", aliases: ["thakurgaon"], lat: 26.034, lng: 88.461, kind: "district", district: "ঠাকুরগাঁও" },
    { nameBn: "পঞ্চগড়", aliases: ["panchagarh", "ponchogorh"], lat: 26.342, lng: 88.554, kind: "district", district: "পঞ্চগড়" },

    // ---- অন্যান্য বড় শহর ----
    { nameBn: "ঢাকা", aliases: ["dhaka"], lat: 23.811, lng: 90.412, kind: "district", district: "ঢাকা" },
];

/** Haversine distance in km between two GPS points. */
export function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(a));
}

/** Nearest `limit` Bengali area names to a GPS point (closest first). */
export function findNearestAreas(lat: number, lng: number, limit = 3): string[] {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return [];
    return [...AREAS]
        .sort((a, b) => distanceKm(lat, lng, a.lat, a.lng) - distanceKm(lat, lng, b.lat, b.lng))
        .slice(0, Math.max(1, limit))
        .map((a) => a.nameBn);
}

/**
 * Nearest areas to a TYPED name (e.g. user typed "শিমুলবাড়ি" or "jaldhaka").
 * Matches the gazetteer by Bengali name or alias, then returns neighbours.
 * Returns [] when the name is unknown — caller falls back to plain DB search.
 */
export function findNearestByName(name: string, limit = 3): string[] {
    const q = (name || "").toLowerCase().trim();
    if (!q) return [];
    const hit = AREAS.find(
        (a) => a.nameBn === name.trim() || q.includes(a.nameBn) || a.aliases.some((al) => q.includes(al))
    );
    if (!hit) return [];
    return [...AREAS]
        .filter((a) => a.nameBn !== hit.nameBn)
        .sort((a, b) => distanceKm(hit.lat, hit.lng, a.lat, a.lng) - distanceKm(hit.lat, hit.lng, b.lat, b.lng))
        .slice(0, Math.max(1, limit))
        .map((a) => a.nameBn);
}
