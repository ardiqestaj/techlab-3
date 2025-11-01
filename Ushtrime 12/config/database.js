import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connetionString = process.env.MONGODB_URI;
    await mongoose.connect(connetionString);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
