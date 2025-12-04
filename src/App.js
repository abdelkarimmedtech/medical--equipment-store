import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/products"; // 🔹 Ensure uppercase P to match your folder
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🛡️ Protect admin route
const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("role") === "admin";
  return isAdmin ? children : <Navigate to="/login" replace />;
};

function App() {
  // 🛍 Load cart from localStorage once at startup
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Navbar counter
  const [cartCount, setCartCount] = useState(0);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);

  // ➕ Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id); // 🔹 Use _id (MongoDB)
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
      toast.success(`${product.name} added to cart!`, { autoClose: 1500 });
      return updatedCart;
    });
  };

  // 🆙 Update cart quantity
  const updateCartItem = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ❌ Remove item from cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // 🧹 Clear cart
  const clearCart = () => setCart([]);

  return (
    <Router>
      <Navbar cartCount={cartCount} clearCart={clearCart} />

      <div className="p-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cart}
                updateCartItem={updateCartItem}
                removeItem={removeItem}
                clearCart={clearCart}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 Admin route */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
