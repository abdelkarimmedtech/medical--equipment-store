import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();

  // Check login status
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username") || "User";

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login"); // Redirect after logout
  };

  return (
    <nav className="bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:opacity-90 transition">
          🩺 Medical Store
        </Link>

        {/* Navigation + User Links */}
        <div className="flex gap-6 text-lg items-center">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/products" className="hover:text-gray-200 transition">Products</Link>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center hover:text-gray-200 transition">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-white text-primary font-bold rounded-full px-2 text-sm shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth logic */}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-gray-200 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-primary px-3 py-1 rounded-md hover:bg-gray-100 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold">👤 {username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
