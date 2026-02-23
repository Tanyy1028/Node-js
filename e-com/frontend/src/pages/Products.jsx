import { useEffect, useState } from "react";
import API from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, form);
      } else {
        await API.post("/products", form);
      }

      setForm({ name: "", price: "", category: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Save product error:", err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category?._id || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Product CRUD</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category ID"
          value={form.category}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p._id} style={styles.card}>
            <h3 style={styles.name}>{p.name}</h3>
            <p style={styles.price}>₹{p.price}</p>
            <p style={styles.category}>
              Category: <span>{p.category?.name}</span>
            </p>

            <div style={styles.btnRow}>
              <button onClick={() => handleEdit(p)} style={styles.editBtn}>
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
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
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
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
  },
  name: {
    margin: "0 0 8px 0",
  },
  price: {
    margin: "0 0 6px 0",
    fontWeight: "bold",
    color: "#0d6efd",
  },
  category: {
    margin: 0,
    color: "#666",
  },
  btnRow: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  editBtn: {
    padding: "6px 12px",
    background: "#ffc107",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 12px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Products;