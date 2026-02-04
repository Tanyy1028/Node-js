import express from 'express'
import { changeForgetPassword, changePassword, checkLoginStatus, forgetPassword, signin, signout, signup, verifyOtp } from '../controllers/auth-controller.js';

const auth_routes = express.Router();

auth_routes.post("/signup", signup)
auth_routes.post("/signin", signin)
auth_routes.post("/verifyOtp", verifyOtp)

auth_routes.get("/checkLoginStatus", checkLoginStatus)
auth_routes.get("/signout", signout)

auth_routes.post("/change-password", changePassword)
auth_routes.post("/forget-password", forgetPassword)
auth_routes.post("/change-forget-password", changeForgetPassword)

export default auth_routes;