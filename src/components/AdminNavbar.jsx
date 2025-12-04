import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = ({ clearCart }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    clearCart();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-navbar-logo">
          <span className="admin-icon">👨‍💼</span>
          <span className="admin-text">Admin Dashboard</span>
        </div>

        <button
          onClick={handleLogout}
          className="admin-navbar-logout"
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
