import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: String,
    subject: String,
    photo: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);