import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">
          🩺 Medical Store
        </Link>

        <div className="flex gap-6 text-lg">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/products" className="hover:text-gray-200">Products</Link>
          <Link to="/cart" className="hover:text-gray-200">
            Cart <span className="bg-white text-primary rounded-full px-2">{cartCount}</span>
          </Link>
          <Link to="/login" className="hover:text-gray-200">Login</Link>
          <Link
            to="/register"
            className="bg-white text-primary px-3 py-1 rounded-md hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
