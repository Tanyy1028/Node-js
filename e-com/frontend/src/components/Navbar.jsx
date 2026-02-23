import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2>ShopHub</h2>

      <div style={styles.links}>
        <Link to="/">Products</Link>
        <Link to="/categories">Categories</Link>
      </div>

      <div style={styles.auth}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    borderBottom: "1px solid #ddd",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  auth: {
    display: "flex",
    gap: "15px",
  },
};

export default Navbar;