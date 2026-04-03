import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};