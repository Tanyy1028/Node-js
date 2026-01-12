import mongoose from 'mongoose'

const otpSchema=new mongoose.Schema({
    email:String,
    otp:Number,
    expiry:Date

},{timestamps:true});

export const otpModel=mongoose.model("Otp's",otpSchema);