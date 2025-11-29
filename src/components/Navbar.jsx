import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [username, setUsername] = useState(localStorage.getItem("username") || "User");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUsername(localStorage.getItem("username") || "User");
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setIsMobileMenuOpen(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🩺</span>
          <span className="logo-text">Medical Store</span>
        </Link>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-nav-links">
            <Link to="/" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              Products
            </Link>

            {!isAdminPage && (
              <Link
                to="/cart"
                className="navbar-link cart-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🛒 Cart</span>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            )}
          </div>

          <div className="navbar-auth">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="navbar-btn navbar-btn-signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {role === "admin" && (
                  <Link
                    to="/admin"
                    className="navbar-link navbar-admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                {!isAdminPage && (
                  <div className="user-profile">
                    <span className="user-name">👤 {username}</span>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="navbar-btn navbar-btn-logout"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
