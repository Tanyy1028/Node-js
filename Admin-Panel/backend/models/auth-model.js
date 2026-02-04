import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: String
}, { timestamps: true });

export const AuthCollection = mongoose.model("auth", authSchema);