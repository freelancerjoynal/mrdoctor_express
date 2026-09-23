import { getLocationDetails } from "../services/locationService.js";
/** Processes Lat/Lng, fetches Nominatim details, returns formatted template data. */
export async function getLocationTemplate(lat, lng) {
    try {
        const details = await getLocationDetails(lat, lng);
        let locationText = `Lat:${lat},Lng:${lng}`;
        if (details) {
            locationText = `
📍 আপনার লোকেশন:

🏠 গ্রাম: ${details.village || "N/A"}
📮 পোস্ট কোড: ${details.post || "N/A"}
🏢 উপজেলা: ${details.upazila || "N/A"}
🌆 জেলা: ${details.district || "N/A"}
🌍 দেশ: ${details.country || "N/A"}
            `;
        }
        const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
        return { success: true, locationText, mapsLink };
    }
    catch (error) {
        console.error("Location Template Error:", error);
        return {
            success: false,
            locationText: `Lat:${lat},Lng:${lng}`,
            mapsLink: `https://www.google.com/maps?q=${lat},${lng}`,
        };
    }
}
//# sourceMappingURL=locationTemplate.js.map