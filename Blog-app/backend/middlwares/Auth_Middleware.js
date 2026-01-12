import {authModel} from '../models/Auth_Models.js'

export const isUserExists=async(req,res,next)=>{
    const{email}=req.body;
    const user=await authModel.findOne({email});
    if(!user){
        next();
    }else{
        res.json({message:"User Already Exists!"});
    }
}

export const isUserAuthenticated=async(req,res,next)=>{
    if(req.cookies.Authentication){
        next();
    }else{
        res.json({message:"SignIn First ! "});
    }
}

export const userNotSignedIn=async(req,res,next)=>{
    if(req.cookies && req.cookies.Authentication){
        next();
    }
    else{
       return res.json({message:"Sign In first to Signed out!"});
    }
}