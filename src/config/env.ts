import dotenv from "dotenv";

dotenv.config();

export const env = {
    VERIFY_TOKEN: process.env.VERIFY_TOKEN!,
    PHONE_NUMBER_ID: process.env.PHONE_NUMBER_ID!,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN!,
};