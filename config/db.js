import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("MongoDB Connected Successfully!")
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}