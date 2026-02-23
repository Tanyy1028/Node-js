import { useEffect, useState } from "react";
import API from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>All Products</h1>
      <p>{products.length} products available</p>

      {products.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <h3>No products yet</h3>
          <p>Be the first to add a product!</p>
        </div>
      ) : (
        <div style={grid}>
          {products.map((p) => (
            <div key={p._id} style={card}>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
  gap: "20px",
  marginTop: "30px",
};

const card = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "10px",
};

export default Products;