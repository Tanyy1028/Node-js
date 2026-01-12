import express from 'express'
import {isUserExists,isUserAuthenticated,userNotSignedIn} from '../middlwares/Auth_Middleware.js'
import {signUp,signIn,signOut} from '../controllers/Auth_controller.js'
import {createBlog,getBlogs,deleteBlog,updateBlogs} from '../controllers/Blog_controller.js'
import {verifyOtp} from '../controllers/OTP_controller.js'
import {upload} from '../config/multer.js'

const router=express.Router();

router.post("/signup",isUserExists,signUp);
router.post("/signin",signIn);
router.post("/verifyOtp",verifyOtp);
router.post("/createBlog",isUserAuthenticated,upload.single("image"),createBlog);

router.get("/getBlogs",isUserAuthenticated,getBlogs);
router.get("/signout",userNotSignedIn,signOut);

// router.get("/blog",isUserAuthenticated,Blog);
router.delete("/deleteBlogs/:id",isUserAuthenticated,deleteBlog);
router.put("/updateBlogs/:id",isUserAuthenticated, upload.single("image"),updateBlogs);

export default router;