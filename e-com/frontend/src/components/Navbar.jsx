import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>
        <Link to="/" style={styles.logoLink}>ShopHub</Link>
      </h2>

      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/categories" style={styles.link}>Categories</Link>
        <Link to="/add-product" style={styles.link}>Add Product</Link>
        <Link to="/admin/categories" style={styles.link}>Admin Categories</Link>
      </div>

      <div style={styles.auth}>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.registerBtn}>Register</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // ⭐ IMPORTANT (missing feel hota hai)
    padding: "15px 30px",
    borderBottom: "1px solid #ddd",
    background: "#fff",
  },

  logo: {
    margin: 0,
  },

  logoLink: {
    textDecoration: "none",
    color: "#0d6efd",
    fontWeight: "bold",
  },

  links: {
    display: "flex",
    gap: "20px",
  },

  auth: {
    display: "flex",
    gap: "15px",
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },

  registerBtn: {
    textDecoration: "none",
    background: "#0d6efd",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "500",
  },
};

export default Navbar;