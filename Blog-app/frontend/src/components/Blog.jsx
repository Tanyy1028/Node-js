
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";

export default function Blog(){
  const navigate = useNavigate();

  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [image,setImage] = useState(null);
  const [blogs,setBlogs] = useState([]);
  const [editId,setEditId] = useState(null);

  const handleLogout = async () => {
    const res = await axios.get("http://localhost:4444/signout",{withCredentials:true});
    alert(res.data.message);
    navigate("/signin");
  };

  const getBlogs = async () => {
    const res = await axios.get("http://localhost:4444/getBlogs",{withCredentials:true});
    setBlogs(res.data.blogs);
  };

  useEffect(()=>{
    getBlogs();
  },[]);

  const handlePublish = async () => {
    try{
      const formData = new FormData();
      formData.append("title",title);
      formData.append("content",content);
      if(image) formData.append("image",image);

      let res;

      if(editId){
        res = await axios.put(
          `http://localhost:4444/updateBlogs/${editId}`,
          formData,
          { withCredentials:true }
        );
      }else{
        res = await axios.post(
          "http://localhost:4444/createBlog",
          formData,
          { withCredentials:true }
        );
      }

      alert(res.data.message);
      setTitle("");
      setContent("");
      setImage(null);
      setEditId(null);
      getBlogs();

    }catch(err){
      alert("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this blog?")) return;

    const res = await axios.delete(
      `http://localhost:4444/deleteBlogs/${id}`,
      { withCredentials:true }
    );

    alert(res.data.message);
    getBlogs();
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditId(blog._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{width:"900px"}}>

        <div className="brand">Vibe<span>Check</span> Blog</div>
        <div className="subtitle"> Blogging Platform 🚀</div>

        {/* CREATE / UPDATE */}
        <h3 style={{margin:"15px 0"}}>{editId ? "✏️ Edit Blog" : "📝 Create New Blog"}</h3>

        <input 
          placeholder="Enter blog title" 
          value={title}
          onChange={e=>setTitle(e.target.value)} 
        />

        <textarea 
          placeholder="Write your blog content..."
          value={content}
          onChange={e=>setContent(e.target.value)}
          style={{minHeight:"110px"}}
        />

        <input 
          type="file"
          onChange={e=>setImage(e.target.files[0])}
        />

        <button 
          onClick={handlePublish}
          disabled={!title || !content}
          style={{opacity:(!title || !content) ? 0.6 : 1}}
        >
          {editId ? "Update Blog" : "Publish Blog"}
        </button>

        <hr style={{margin:"28px 0",opacity:0.15}}/>

        {/* BLOG LIST */}
        <h3 style={{marginBottom:"15px"}}>📚 All Blogs</h3>

        {blogs.length === 0 && (
          <p style={{fontSize:"13px",color:"#94a3b8"}}>
            No blogs yet. Create your first blog above.
          </p>
        )}

        {blogs.map((b)=>(
          <div key={b._id} style={{
            background:"#0f172a",
            padding:"16px",
            borderRadius:"14px",
            marginBottom:"18px",
            textAlign:"left",
            boxShadow:"0 10px 25px rgba(0,0,0,0.25)"
          }}>

            {b.image && (
              <img 
                src={`http://localhost:4444/uploads/${b.image}`} 
                alt="" 
                style={{
                  width:"100%",
                  borderRadius:"12px",
                  marginBottom:"10px",
                  maxHeight:"260px",
                  objectFit:"cover"
                }}
              />
            )}

            <h4 style={{marginBottom:"4px"}}>{b.title}</h4>

            <p style={{fontSize:"13px",color:"#cbd5f5"}}>
              {b.content}
            </p>

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              marginTop:"12px"
            }}>
              <span style={{fontSize:"11px",color:"#94a3b8"}}>
                Author: {b.author || "User"}
              </span>

              <div style={{display:"flex",gap:"10px"}}>
                <button 
                  onClick={()=>handleEdit(b)} 
                  style={{background:"#2563eb"}}
                >
                  Edit
                </button>
                <button 
                  onClick={()=>handleDelete(b._id)} 
                  style={{background:"#dc2626"}}
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}

        <button 
          onClick={handleLogout} 
          style={{marginTop:"22px",maxWidth:"200px"}}
        >
          Logout
        </button>

      </div>
    </div>
  );
}