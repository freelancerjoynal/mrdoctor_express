import { sendWhatsAppMessage, sendTypingIndicator, sendInteractiveButtons } from "../../lib/sendWhatsAppMessage.js";
import { getLocationTemplate } from "../../lib/locationTemplate.js";
import { getOpenAIResponse } from "../AiService/deepseek.js";
import { prisma } from "../../lib/prisma.js";

// Session store
const userSessions = new Map<
    string,
    { state: string; location?: string }
>();

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

            await sendInteractiveButtons(
                phoneNumber,
                "📍 আপনার লোকেশন দিতে নিচের বাটনে ক্লিক করুন",
                [{ id: "loc_btn", title: "📍 লোকেশন দিন" }]
            );

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
                        "⏳ এখনো লোকেশন পাইনি। দয়া করে লোকেশন পাঠান বা এলাকার নাম লিখুন"
                    );
                }
            }, 25000);

            return;
        }

        /**
         * STEP 3: Handle Location
         */
        if (state === "ASK_LOCATION") {
            if (text.includes("লোকেশন") || text.includes("location")) {
                await sendWhatsAppMessage(
                    phoneNumber,
                    `📍 লোকেশন পাঠাতে:\n\n1️⃣ 📎 (Attach) চাপুন\n2️⃣ Location নির্বাচন করুন\n3️⃣ Send Current Location চাপুন`
                );
                return;
            }

            if (msg.location) {
                const lat = msg.location.latitude;
                const lng = msg.location.longitude;

                // 🔥 lib থেকে লোকেশন টেমপ্লেট কল করা হচ্ছে
                const template = await getLocationTemplate(lat, lng);

                await sendWhatsAppMessage(
                    phoneNumber,
                    `${template.locationText}\n\n🗺️ ম্যাপে দেখতে:\n${template.mapsLink}\n\n👉 ঠিক থাকলে লিখুন "yes"\n👉 ভুল হলে আবার লোকেশন পাঠান`
                );

                userSessions.set(phoneNumber, {
                    state: "CONFIRM_LOCATION",
                    location: template.locationText,
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
                    await sendWhatsAppMessage(phoneNumber, "❌ কোনো ডাক্তার পাওয়া যায়নি");
                    userSessions.set(phoneNumber, { state: "WELCOME" });
                    return;
                }

                const doctorList = doctors
                    .map(
                        (doc: any) =>
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
                await sendWhatsAppMessage(phoneNumber, "❌ আবার লোকেশন পাঠান বা এলাকার নাম লিখুন");
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
        await sendWhatsAppMessage(phoneNumber, "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন");
    }
}