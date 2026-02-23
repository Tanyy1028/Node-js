import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  // ⭐ fetch categories
  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await API.get("/categories");
        console.log("CATEGORIES:", res.data);
        setCategories(res.data || []);
      } catch (err) {
        console.log("Category fetch error:", err);
      }
    };

    fetchCat();
  }, []);

  // ⭐ handle submit
  const submit = async (e) => {
    e.preventDefault();

    if (!form.category) {
      alert("Please select category");
      return;
    }

    try {
      await API.post("/products", {
        name: form.name,
        price: Number(form.price),
        category: form.category,
      });

      alert("Product added successfully ✅");
      navigate("/products");
    } catch (err) {
      console.log("ADD PRODUCT ERROR:", err?.response?.data || err);
      alert(err?.response?.data?.msg || "Failed to add product");
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={submit} style={styles.form}>
        <h2 style={styles.title}>Add Product</h2>

        {/* Product Name */}
        <input
          style={styles.input}
          value={form.name}
          placeholder="Product name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        {/* Price */}
        <input
          style={styles.input}
          type="number"
          value={form.price}
          placeholder="Price"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          required
        />

        {/* Category Dropdown */}
        <select
          style={styles.select}
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>

          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button style={styles.button} type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8f9fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#333",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
  },

  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#031b4e",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "5px",
  },
};

export default AddProduct;