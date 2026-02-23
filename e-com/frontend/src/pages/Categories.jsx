import { useEffect, useState } from "react";
import API from "../api/axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Categories</h1>
      <p>{categories.length} categories</p>

      {categories.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <h3>No categories yet</h3>
          <p>Categories will appear here once added.</p>
        </div>
      ) : (
        <ul>
          {categories.map((c) => (
            <li key={c._id}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;