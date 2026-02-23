import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminCategories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      await API.post("/categories", { name });
      setName("");
      fetchCategories();
      alert("Category created");
    } catch (err) {
      alert("Only admin can create category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Category Panel</h2>

        <form onSubmit={createCategory} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button style={styles.addBtn}>Add</button>
        </form>

        <div>
          {categories.map((cat) => (
            <div key={cat._id} style={styles.card}>
              <span>{cat.name}</span>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteCategory(cat._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8f9fa",
    paddingTop: "40px",
  },
  container: {
    width: "420px",
    margin: "0 auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  addBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    background: "#111827",
    color: "#fff",
    cursor: "pointer",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default AdminCategories;