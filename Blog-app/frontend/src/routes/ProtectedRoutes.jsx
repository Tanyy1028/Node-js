import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuth,setIsAuth] = useState(null);

  useEffect(()=>{
    axios.get("http://localhost:4444/getBlogs", { withCredentials:true })
      .then(()=> setIsAuth(true))
      .catch(()=> setIsAuth(false));
  },[]);

  if(isAuth === null) return <h3>Loading...</h3>;

  return isAuth ? children : <Navigate to="/signin" />;
}