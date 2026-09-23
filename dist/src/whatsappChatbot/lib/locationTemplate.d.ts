/** Processes Lat/Lng, fetches Nominatim details, returns formatted template data. */
export declare function getLocationTemplate(lat: number, lng: number): Promise<{
    success: boolean;
    locationText: string;
    mapsLink: string;
}>;
//# sourceMappingURL=locationTemplate.d.ts.map