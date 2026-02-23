import { useEffect, useState } from "react";
import API from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Products</h2>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p._id} style={styles.card}>
            <h3 style={styles.name}>{p.name}</h3>
            <p style={styles.price}>₹{p.price}</p>
            <p style={styles.category}>
              Category: <span>{p.category?.name}</span>
            </p>
          </div>
        ))}
      </div>
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
    marginBottom: "25px",
    color: "#333",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    border: "1px solid #e5e7eb",
    padding: "18px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "0.2s",
    cursor: "pointer",
  },

  name: {
    margin: "0 0 8px 0",
    color: "#111",
  },

  price: {
    margin: "0 0 6px 0",
    fontWeight: "bold",
    color: "#0d6efd",
  },

  category: {
    margin: 0,
    color: "#666",
    fontSize: "14px",
  },
};

export default Products;