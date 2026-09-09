import { sendWhatsAppMessage } from "../../lib/sendWhatsAppMessage.js";
import { handleMainFlow } from "./flows/mainFlow.js";
import { handleDoctorMenuFlow } from "./flows/doctor/doctorMenuFlow.js";
import { handleAiDoctorFlow } from "./flows/doctor/aiDoctorStep.js";

// সেশন স্টোর: এখন প্রতিটি ইউজারের flow, step এবং প্রয়োজনীয় data ট্র্যাক করা হবে
const userSessions = new Map<
    string,
    { 
        flow: string;        // যেমন: 'MAIN_MENU', 'DOCTOR_MENU', 'AI_DOCTOR_FLOW'
        step: string;        // নির্দিষ্ট ফ্লোর ভেতরের বর্তমান স্টেপ
        data: {
            problem?: string;
            location?: string;
            category?: string; // 'DOCTOR' বা 'HOSPITAL'
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
        // ইউজারের সেশন ফেচ করা বা ডিফল্ট সেশন তৈরি করা
        let session = userSessions.get(phoneNumber) || { 
            flow: "MAIN_MENU", 
            step: "WELCOME", 
            data: {} 
        };

        /**
         * ১. মেইন ফ্লো (যেমন: ওয়েলকাম এবং ক্যাটাগরি চয়েস - ডাক্তার নাকি হসপিটাল)
         */
        if (session.flow === "MAIN_MENU") {
            await handleMainFlow(
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

        /**
         * ২. ডাক্তার সাব-মেনু ফ্লো (এআই সার্চ নাকি এলাকা ভিত্তিক সার্চ)
         */
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

        /**
         * ৩. এআই ডাক্তার ও লোকেশন প্রসেসিং ফ্লো
         */
        if (session.flow === "AI_DOCTOR_FLOW") {
            await handleAiDoctorFlow(
                phoneNumber, 
                text, 
                msg, 
                session, 
                () => {
                    // কাজ শেষ হলে বা রিসেট করতে চাইলে আবার মেইন মেনুতে ফিরিয়ে নেওয়া
                    userSessions.set(phoneNumber, { 
                        flow: "MAIN_MENU", 
                        step: "WELCOME", 
                        data: {} 
                    });
                }
            );
            return;
        }

        /**
         * ডিফল্ট ফলব্যাক
         */
        userSessions.set(phoneNumber, { 
            flow: "MAIN_MENU", 
            step: "WELCOME", 
            data: {} 
        });
        await sendWhatsAppMessage(phoneNumber, "বট রিসেট করা হয়েছে। শুরু করতে 'Hi' বা 'Hello' লিখুন।");

    } catch (error) {
        console.error("❌ WhatsApp Service Error:", error);
        await sendWhatsAppMessage(phoneNumber, "❌ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
}