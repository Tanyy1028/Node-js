import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.URL);
  console.log("MongoDB Connected");
};

export default connectDB;