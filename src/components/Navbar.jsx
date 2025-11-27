import React from "react";
import { Link } from "react-router-dom"; // 🔹 Import Link correctly

export default function Navbar({ cartCount }) { // 🔹 Receive cartCount from props
  return (
    <nav
      style={{
        backgroundColor: "#28a745",
        padding: "12px",
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        fontSize: "18px",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>🏠 Home</Link>
      <Link to="/products" style={{ color: "white", textDecoration: "none" }}>🩺 Products</Link>
      <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>🛒 Cart ({cartCount})</Link>
      <Link to="/login" style={{ color: "white", textDecoration: "none" }}>🔐 Login</Link>
    </nav>
  );
}
