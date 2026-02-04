
import {userCollection} from '../models/user-model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const updateUser=async(req,res)=>{
  const {email}=req.body;
  try{
 const user= await userCollection.findOneAndUpdate({email},{$set:req.body});
 const token= jwt.sign({...user},process.env.SECRET_KEY,{
    expiresIn:"1h"
  });

  res.cookie("auth_token",token,{
    maxAge:1000*60*60,
    httpOnly:true
  });
  return res.json({status:true,message:"User Updated Successfully!"});
  }catch(err){
return res.json({status:false,message:err.message});
  }
}



export const getAllUsers=async(req,res)=>{
    const {email}=req.body;
  try{
  const users=await userCollection.find();
  return res.json({status:true,message:"All User Fetched!"}); 
  }catch(err){
return res.json({status:false,message:err.message}); 
  }

}

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token not found"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return res.json({
      status: true,
      message: "User fetched successfully!",
      user: decoded._doc
    });
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: err.message
    });
  }
};


