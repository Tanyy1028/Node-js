import { blogModel} from '../models/Blog_Model.js'
import fs from "fs";
import path from "path";


export const createBlog=async(req,res)=>{
    try{
 const{title,content}=req.body;
    
    if(!req.file){
        return res.json({message:"Image is required!."});
    }

    const userID=req.cookies.Authentication;

    const blog=await blogModel.create({
       title,
       content,
       image:req.file.filename,
       author:userID
    });

    res.json({success:true,message:"Blog Created!",blog});
    }catch(err){
    res.json({success:false,message:"Blog not created!",err:err});
    }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.json({ success: true, blogs });
  } catch (err) {
    res.json({ success: false, message: "Failed to fetch blogs" });
  }
};



export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    // delete image from uploads folder
    const imagePath = path.join("uploads", blog.image);
    fs.unlink(imagePath, (err) => {
      if (err) console.log("Image delete error:", err);
    });

    await blogModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Blog deleted" });

  } catch (err) {
    res.json({ success: false, message: "Delete Failed" });
  }
};


export const updateBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    const updateData = { title, content };

    if (req.file) {
      // remove old image
      const oldPath = path.join("uploads", blog.image);
      fs.unlink(oldPath, (err) => {
        if (err) console.log("Old image delete error:", err);
      });

      updateData.image = req.file.filename;
    }

    await blogModel.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Blog Updated" });

  } catch (err) {
    res.json({ success: false, message: "Blog updation failed" });
  }
};