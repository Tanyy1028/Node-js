import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    name:String,
    phone:String,
    address:String,
    education:String,
    age:String,
    exp:String,
    role:String,
    image:String,
    skills: [
    {
      skillName: String,          
      level: String,              
      progress: Number,           
      lastUpdated: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

export const userCollection=mongoose.model("users",userSchema);