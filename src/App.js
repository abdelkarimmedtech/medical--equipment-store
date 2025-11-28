import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/products"; // 👈 matches your current filename
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Load cart from localStorage once at startup
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Navbar counter
  const [cartCount, setCartCount] = useState(0);

  // Keep localStorage + counter in sync whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);

  // ✅ Add item to cart (fixed)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      // instant navbar update
      setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));

      toast.success(`${product.name} added to cart!`, { autoClose: 1500 });

      return updatedCart;
    });
  };

  // Update quantity in cart
  const updateCartItem = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear cart (used on purchase)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Navbar cartCount={cartCount} />

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
        </Routes>
      </div>

      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
