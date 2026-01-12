import express from 'express'
import router from './routes/Auth_routes.js'
import {connectDB} from './config/db.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));



connectDB();
dotenv.config();
const PORT=process.env.PORT;

app.use("/",router);
app.use("/uploads", express.static("uploads"));

app.listen(PORT,()=>{
    console.log("Server Started Successfully!..");
})