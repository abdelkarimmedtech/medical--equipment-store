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
import Products from "./pages/products"; 
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reduceStock, increaseStock } from "./services/api";


const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("role") === "admin";
  return isAdmin ? children : <Navigate to="/login" replace />;
};


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
  
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  
  const [cartCount, setCartCount] = useState(0);

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);

  
  const addToCart = async (product) => {
    try {
      
      const productId = product._id || product.id;
      
      if (!productId) {
        toast.error("Error: Product ID not found", { autoClose: 1500 });
        return;
      }

      
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

  
  const updateCartItem = async (id, change) => {
    try {
      if (change > 0) {
        
        await reduceStock(id, 1);
      } else if (change < 0) {
        
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

  
  const removeItem = async (id) => {
    try {
      const item = cart.find((item) => item._id === id);
      if (item) {
        
        await increaseStock(id, item.quantity);
      }
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Remove item error:", error);
      toast.error("Error removing item: " + (error.message || "Unknown error"), { autoClose: 1500 });
    }
  };

  
  const clearCart = async () => {
    try {
     
      for (const item of cart) {
        await increaseStock(item._id, item.quantity);
      }
      setCart([]);
    } catch (error) {
      
      setCart([]);
    }
  };

  
  const completePurchase = () => {
    
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
