import axios from "axios";
import { sendWhatsAppMessage, sendTypingIndicator } from "../../lib/sendWhatsAppMessage.js";
import { getOpenAIResponse } from "../AiService/deepseek.js";
import { prisma } from "../../lib/prisma.js";
import { env } from "../../config/env.js";

// Session store
const userSessions = new Map<
    string,
    { state: string; location?: string }
>();

/**
 * 📍 Reverse Geocoding (Lat/Lng → Full Address)
 */
async function getLocationDetails(lat: number, lng: number) {
    try {
        const res = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
                params: {
                    lat,
                    lon: lng,
                    format: "json",
                },
                headers: {
                    "User-Agent": "whatsapp-bot",
                },
            }
        );

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

/**
 * 📍 Send Location Button
 */
export async function sendWhatsAppLocationRequest(to: string) {
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                type: "interactive",
                interactive: {
                    type: "button",
                    body: {
                        text: "📍 আপনার লোকেশন দিতে নিচের বাটনে ক্লিক করুন",
                    },
                    action: {
                        buttons: [
                            {
                                type: "reply",
                                reply: {
                                    id: "loc_btn",
                                    title: "📍 লোকেশন দিন",
                                },
                            },
                        ],
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("📤 Location button sent");
    } catch (err: any) {
        console.error("❌ Button Error:", err.response?.data || err.message);
    }
}

/**
 * 🔥 Main Handler
 */
export async function handleIncomingMessage(msg: any) {
    console.log("📥 Incoming:", JSON.stringify(msg, null, 2));

    const text =
        (msg.text ||
            msg.buttonReply?.title ||
            msg.interactive?.button_reply?.title ||
            "")
            .toLowerCase()
            .trim();

    const phoneNumber = msg.number;

    if (!text && !msg.location) return;

    try {
        let session = userSessions.get(phoneNumber) || { state: "WELCOME" };
        let state = session.state;

        /**
         * STEP 1: Welcome
         */
        if (state === "WELCOME" || ["hi", "hello", "start", "reset"].includes(text)) {
            userSessions.set(phoneNumber, { state: "ASK_PROBLEM" });

            await sendWhatsAppMessage(phoneNumber, "রোগীর কী সমস্যা?");
            return;
        }

        /**
         * STEP 2: Problem → Ask Location
         */
        if (state === "ASK_PROBLEM") {
            userSessions.set(phoneNumber, { state: "ASK_LOCATION" });

            await sendTypingIndicator(phoneNumber);

            await sendWhatsAppLocationRequest(phoneNumber);

            await sendWhatsAppMessage(
                phoneNumber,
                "👉 বাটনে ক্লিক করুন, তারপর:\n📎 Attach → Location → Send Current Location\nঅথবা আপনার এলাকার নাম লিখুন"
            );

            // ⏳ Reminder
            setTimeout(async () => {
                const s = userSessions.get(phoneNumber);
                if (s?.state === "ASK_LOCATION") {
                    await sendWhatsAppMessage(
                        phoneNumber,
                        "⏳ এখনো লোকেশন পাইনি। দয়া করে লোকেশন পাঠান বা এলাকার নাম লিখুন"
                    );
                }
            }, 25000);

            return;
        }

        /**
         * STEP 3: Handle Location
         */
        if (state === "ASK_LOCATION") {
            let userLocation = text;

            // 👉 Button click
            if (text.includes("লোকেশন") || text.includes("location")) {
                await sendWhatsAppMessage(
                    phoneNumber,
                    `📍 লোকেশন পাঠাতে:

1️⃣ 📎 (Attach) চাপুন  
2️⃣ Location নির্বাচন করুন  
3️⃣ Send Current Location চাপুন`
                );
                return;
            }

            // 👉 Real location
            if (msg.location) {
                const lat = msg.location.latitude;
                const lng = msg.location.longitude;

                console.log("✅ LOCATION RECEIVED", lat, lng);

                // 🔥 Reverse Geocode
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

                await sendWhatsAppMessage(
                    phoneNumber,
                    `${locationText}

🗺️ ম্যাপে দেখতে:
${mapsLink}

👉 ঠিক থাকলে লিখুন "yes"
👉 ভুল হলে আবার লোকেশন পাঠান`
                );

                userSessions.set(phoneNumber, {
                    state: "CONFIRM_LOCATION",
                    location: locationText,
                });

                return;
            }

            return;
        }

        /**
         * STEP 4: Confirm Location
         */
        if (state === "CONFIRM_LOCATION") {
            if (["yes", "ok", "ঠিক"].includes(text)) {
                await sendTypingIndicator(phoneNumber);

                const savedLocation = session.location || "Unknown";

                const doctors = await prisma.doctor.findMany({
                    orderBy: { rating: "desc" },
                });

                if (!doctors.length) {
                    await sendWhatsAppMessage(phoneNumber, "❌ কোনো ডাক্তার পাওয়া যায়নি");
                    userSessions.set(phoneNumber, { state: "WELCOME" });
                    return;
                }

                const doctorList = doctors
                    .map(
                        (doc) =>
                            `ID:${doc.id}, Name:${doc.name}, Degree:${doc.degree}, Speciality:${doc.speciality}, Place:${doc.workingPlace}, Phone:${doc.phone}, Rating:${doc.rating}`
                    )
                    .join("\n");

                const prompt = `
User Location:
${savedLocation}

Doctors:
${doctorList}

Task:
- Select top 3 doctors
- Give 1 line reason in Bengali
- Format nicely
`;

                const aiReply = await getOpenAIResponse(prompt);

                await sendWhatsAppMessage(
                    phoneNumber,
                    `🩺 আপনার জন্য সেরা ডাক্তার:\n\n${aiReply}`
                );

                userSessions.set(phoneNumber, { state: "WELCOME" });
                return;
            } else {
                userSessions.set(phoneNumber, { state: "ASK_LOCATION" });

                await sendWhatsAppMessage(
                    phoneNumber,
                    "❌ আবার লোকেশন পাঠান বা এলাকার নাম লিখুন"
                );

                return;
            }
        }

        /**
         * Default
         */
        userSessions.set(phoneNumber, { state: "ASK_PROBLEM" });
        await sendWhatsAppMessage(phoneNumber, "রোগীর কী সমস্যা?");
    } catch (error) {
        console.error("❌ ERROR:", error);

        await sendWhatsAppMessage(
            phoneNumber,
            "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন"
        );
    }
}