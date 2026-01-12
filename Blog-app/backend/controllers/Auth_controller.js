import {authModel} from '../models/Auth_Models.js'
import bcrypt from 'bcrypt'
import {sendMail} from '../services/Otp_services.js'


export const signUp=async(req,res)=>{
try{
    const{email}=req.body;
    const hashedPassword=await bcrypt.hash(req.body.password,10);
   await authModel.create({email:email,password:hashedPassword});
  res.json({ success: true, message: "User Sign Up successfully!" });
}catch(err){
   res.json({success:false,message:"SignUp not done!",err:err});
}

}


export const signIn=async(req,res)=>{
    try{
        const{email,password}=req.body;
          const user= await authModel.findOne({email})
          if(!user){
            return res.json({success:false,message:"User Not Found!"});
          }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Password Invalid!"});
        }
         await sendMail(email);
         res.json({success:true,message:"OTP sent to your email!",email});
       
        
    }catch(err){
        res.json({success:false,message:"SignIn Failed!"});
    }

}

export const signOut=async(req,res)=>{
    res.clearCookie("Authentication",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    });
    res.json({success:true,message:"User Log Out!"});
}

export const Blog=async(req,res)=>{
 res.json({success:true,message:"Blog-Page accessed!",user:req.user});
    
}