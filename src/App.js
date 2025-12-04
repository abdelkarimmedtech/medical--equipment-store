import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/products"; // 🔹 Ensure uppercase P to match your folder
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reduceStock, increaseStock } from "./services/api";

// 🛡️ Protect admin route
const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("role") === "admin";
  return isAdmin ? children : <Navigate to="/login" replace />;
};

// 🧭 Navbar wrapper to show correct navbar based on route
const NavbarWrapper = ({ cartCount, clearCart }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return isAdminPage ? (
    <AdminNavbar clearCart={clearCart} />
  ) : (
    <Navbar cartCount={cartCount} clearCart={clearCart} />
  );
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

  // ➕ Add item to cart with stock reduction
  const addToCart = async (product) => {
    try {
      // Check if product has _id (from backend) or id (from local data)
      const productId = product._id || product.id;
      
      if (!productId) {
        toast.error("Error: Product ID not found", { autoClose: 1500 });
        return;
      }

      // Reduce stock from backend
      await reduceStock(productId, 1);

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === productId);
        let updatedCart;

        if (existingItem) {
          updatedCart = prevCart.map((item) =>
            item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedCart = [...prevCart, { ...product, quantity: 1, _id: productId }];
        }

        setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
        toast.success(`${product.name} added to cart!`, { autoClose: 1500 });
        return updatedCart;
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      if (error.response && error.response.status === 400) {
        toast.error("❌ Sorry, we don't have the stock is empty", { autoClose: 2000 });
      } else {
        toast.error("Error adding to cart: " + (error.message || "Unknown error"), { autoClose: 1500 });
      }
    }
  };

  // 🆙 Update cart quantity with stock sync
  const updateCartItem = async (id, change) => {
    try {
      if (change > 0) {
        // Increasing quantity - reduce stock
        await reduceStock(id, 1);
      } else if (change < 0) {
        // Decreasing quantity - increase stock
        await increaseStock(id, 1);
      }

      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item._id === id
              ? { ...item, quantity: Math.max(1, item.quantity + change) }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    } catch (error) {
      console.error("Update cart error:", error);
      toast.error("Error updating cart: " + (error.message || "Unknown error"), { autoClose: 1500 });
    }
  };

  // ❌ Remove item from cart with stock restoration
  const removeItem = async (id) => {
    try {
      const item = cart.find((item) => item._id === id);
      if (item) {
        // Restore stock for removed items (user changed mind)
        await increaseStock(id, item.quantity);
      }
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Remove item error:", error);
      toast.error("Error removing item: " + (error.message || "Unknown error"), { autoClose: 1500 });
    }
  };

  // 🧹 Clear cart - for removing items (restores stock)
  const clearCart = async () => {
    try {
      // Restore all item quantities back to stock
      for (const item of cart) {
        await increaseStock(item._id, item.quantity);
      }
      setCart([]);
    } catch (error) {
      // Still clear cart even if stock update fails
      setCart([]);
    }
  };

  // 🛒 Complete purchase - cart cleared WITHOUT stock restoration (permanent purchase)
  const completePurchase = () => {
    // Just clear the cart - stock reduction is PERMANENT
    setCart([]);
  };

  return (
    <Router>
      <NavbarWrapper cartCount={cartCount} clearCart={clearCart} />

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
                completePurchase={completePurchase}
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
