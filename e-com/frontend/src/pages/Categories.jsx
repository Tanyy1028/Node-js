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
    <div style={styles.container}>
      <h1 style={styles.title}>Categories</h1>
      <p style={styles.count}>{categories.length} categories</p>

      {categories.length === 0 ? (
        <div style={styles.emptyBox}>
          <h3>No categories yet</h3>
          <p>Categories will appear here once added.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {categories.map((c) => (
            <div key={c._id} style={styles.card}>
              {c.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "#f8f9fa",
    minHeight: "100vh",
  },

  title: {
    marginBottom: "5px",
    color: "#333",
  },

  count: {
    marginBottom: "25px",
    color: "#666",
  },

  emptyBox: {
    textAlign: "center",
    marginTop: "80px",
    padding: "40px",
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #eee",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
    transition: "0.2s",
    cursor: "pointer",
  },
};

export default Categories;