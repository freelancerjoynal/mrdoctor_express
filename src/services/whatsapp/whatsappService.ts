import { sendWhatsAppMessage, sendInteractiveButtons } from "../../lib/sendWhatsAppMessage.js";
import { handleDoctorMenuFlow } from "./flows/doctor/doctorMenuFlow.js";
import { handleAiDoctorFlow } from "./flows/doctor/aiDoctorStep.js";
// ভবিষ্যতে নতুন ফ্লো বানালে এখানে ইম্পোর্ট করবেন
// import { handleHospitalFlow } from "./flows/hospital/hospitalFlow.js";

const userSessions = new Map<
    string,
    { 
        flow: string;        // যেমন: 'MAIN_MENU', 'DOCTOR_MENU', 'AI_DOCTOR_FLOW', 'HOSPITAL_FLOW'
        step: string;        // নির্দিষ্ট ফ্লোর ভেতরের বর্তমান স্টেপ
        data: {
            problem?: string;
            location?: string;
            category?: string; 
        }
    }
>();

export async function handleIncomingMessage(msg: any) {
    console.log("📥 Incoming Message:", JSON.stringify(msg, null, 2));

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
        let session = userSessions.get(phoneNumber) || { 
            flow: "MAIN_MENU", 
            step: "WELCOME", 
            data: {} 
        };

        // গ্লোবাল হোম বা মূল মেনুতে ফিরে যাওয়ার চেক
        if (text.includes("home") || text.includes("মূল মেনু") || text.includes("মেনু") || text.includes("menu")) {
            userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "ASK_CATEGORY", data: {} });
            
            await sendWhatsAppMessage(
                phoneNumber,
                "👋 আসসালামু আলাইকুম/নমস্কার!\n\n" +
                "মিস্টার ডক্টর (Mr. Doctor)-এর পক্ষ থেকে আপনাকে জানাচ্ছি আন্তরিক শুভেচ্ছা ও স্বাগতম। 🩺✨\n\n" +
                "আপনার এবং আপনার পরিবারের সুস্বাস্থ্য নিশ্চিত করাই আমাদের প্রধান লক্ষ্য। অসুস্থতার মুহূর্তে সঠিক ডাক্তার নির্বাচন করা কিংবা সঠিক সময়ে সঠিক চিকিৎসাসেবা পাওয়া যেন আপনার জন্য সহজ হয়, সেজন্যই আমাদের এই ডিজিটাল প্ল্যাটফর্ম। ঘরে বসেই খুব সহজে আপনার সমস্যার কথা জানিয়ে সেরা বিশেষজ্ঞ চিকিৎসকের পরামর্শ পেতে পারেন আমাদের সাথে।\n\n" +
                "আপনার সুস্বাস্থ্যই আমাদের একমাত্র অর্জন!"
            );

            await sendInteractiveButtons(
                phoneNumber,
                "নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন:",
                [
                    { id: "doc_btn", title: "ডাক্তার" },
                    { id: "hosp_btn", title: "হসপিটাল" }
                ]
            );
            return;
        }

        // ১. মেইন মেনু বা প্রথম বার্তা হ্যান্ডেলিং
        if (session.flow === "MAIN_MENU") {
            if (session.step === "WELCOME" || ["hi", "hello", "start", "reset"].includes(text)) {
                userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "ASK_CATEGORY", data: {} });
                
                await sendWhatsAppMessage(
                    phoneNumber,
                    "👋 আসসালামু আলাইকুম/নমস্কার!\n\n" +
                    "মিস্টার ডক্টর (Mr. Doctor)-এর পক্ষ থেকে আপনাকে জানাচ্ছি আন্তরিক শুভেচ্ছা ও স্বাগতম। 🩺✨\n\n" +
                    "আপনার এবং আপনার পরিবারের সুস্বাস্থ্য নিশ্চিত করাই আমাদের প্রধান লক্ষ্য। অসুস্থতার মুহূর্তে সঠিক ডাক্তার নির্বাচন করা কিংবা সঠিক সময়ে সঠিক চিকিৎসাসেবা পাওয়া যেন আপনার জন্য সহজ হয়, সেজন্যই আমাদের এই ডিজিটাল প্ল্যাটফর্ম। ঘরে বসেই খুব সহজে আপনার সমস্যার কথা জানিয়ে সেরা বিশেষজ্ঞ চিকিৎসকের পরামর্শ পেতে পারেন আমাদের সাথে।\n\n" +
                    "আপনার সুস্বাস্থ্যই আমাদের একমাত্র অর্জন!"
                );

                await sendInteractiveButtons(
                    phoneNumber,
                    "নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন:",
                    [
                        { id: "doc_btn", title: "ডাক্তার" },
                        { id: "hosp_btn", title: "হসপিটাল" }
                    ]
                );
                return;
            }

            if (session.step === "ASK_CATEGORY") {
                if (text.includes("ডাক্তার") || text.includes("doc")) {
                    // সেশন আপডেট করে সরাসরি ডাক্তার ফ্লোতে সেট করা
                    const newSessionData = { flow: "DOCTOR_MENU", step: "ASK_DOCTOR_TYPE", data: { category: "DOCTOR" } };
                    userSessions.set(phoneNumber, newSessionData);
                    
                    // সরাসরি ডাক্তার ফ্লো ফাইলের হ্যান্ডলারে কল করে দেওয়া যাতে প্রথম সাব-মেনু বাটন সাথে সাথে চলে যায়
                    await handleDoctorMenuFlow(
                        phoneNumber, 
                        text, 
                        newSessionData, 
                        (newFlow, newStep, updatedData) => {
                            userSessions.set(phoneNumber, { flow: newFlow, step: newStep, data: updatedData });
                        }
                    );
                } else if (text.includes("হসপিটাল") || text.includes("hosp")) {
                    await sendWhatsAppMessage(phoneNumber, "🏥 হসপিটাল খোঁজার ফিচারটি খুব শীঘ্রই আসছে!");
                    userSessions.set(phoneNumber, { flow: "MAIN_MENU", step: "WELCOME", data: {} });
                } else {
                    await sendWhatsAppMessage(phoneNumber, "দয়া করে নিচের বাটন থেকে একটি অপশন সিলেক্ট করুন।");
                }
                return;
            }
        }

        // ২. ডাক্তার মেনু ফ্লোর কাছে রিকোয়েস্ট পাস করা
        if (session.flow === "DOCTOR_MENU") {
            await handleDoctorMenuFlow(
                phoneNumber, 
                text, 
                session, 
                (newFlow, newStep, updatedData) => {
                    userSessions.set(phoneNumber, { 
                        flow: newFlow, 
                        step: newStep, 
                        data: updatedData 
                    });
                }
            );
            return;
        }

        // ৩. এআই ডাক্তার ফ্লোর কাছে রিকোয়েস্ট পাস করা
        if (session.flow === "AI_DOCTOR_FLOW") {
            await handleAiDoctorFlow(
                phoneNumber, 
                text, 
                msg, 
                session, 
                () => {
                    userSessions.set(phoneNumber, { 
                        flow: "MAIN_MENU", 
                        step: "WELCOME", 
                        data: {} 
                    });
                }
            );
            return;
        }

        // ডিফল্ট ফলব্যাক
        userSessions.set(phoneNumber, { 
            flow: "MAIN_MENU", 
            step: "WELCOME", 
            data: {} 
        });
        await sendWhatsAppMessage(phoneNumber, "বট রিসেট করা হয়েছে। শুরু করতে 'Hi' বা 'Hello' লিখুন।");

    } catch (error: any) {
        console.error("❌ WhatsApp Service Error:", error);
        await sendWhatsAppMessage(phoneNumber, "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
}