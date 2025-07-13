import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
