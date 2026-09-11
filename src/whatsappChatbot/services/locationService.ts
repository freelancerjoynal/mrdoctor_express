import axios from "axios";

export async function getLocationDetails(lat: number, lng: number) {
    try {
        const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: { lat, lon: lng, format: "json" },
            headers: { "User-Agent": "whatsapp-bot" },
        });

        const addr = res.data.address;

        return {
            village: addr.village || addr.hamlet || addr.suburb || "",
            post: addr.postcode || "",
            upazila: addr.county || addr.state_district || "",
            district: addr.state || "",
            country: addr.country || "",
            display: res.data.display_name,
        };
    } catch (error) {
        console.error("Reverse Geocode Error:", error);
        return null;
    }
}
