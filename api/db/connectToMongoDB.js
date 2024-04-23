import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.MONGODB_URI;
export default async function connectToMongoDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error connecting to MongoDB: ", error.message);
  }
}
