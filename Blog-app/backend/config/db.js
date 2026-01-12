import mongoose from 'mongoose'

export const connectDB=async()=>{
   try{
     await mongoose.connect("mongodb://localhost:27017/Blog");
     console.log("MongoDB connected!");
   }catch(err){
    console.log("Failed in connecting MongoDb!",err);
   }
}