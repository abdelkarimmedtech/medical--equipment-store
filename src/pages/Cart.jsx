import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Cart.css";

export default function Cart({ cartItems, updateCartItem, removeItem, clearCart, completePurchase }) {
  // Total price calculation
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Purchase action - this is FINAL, stock should NOT be restored
  const handlePurchase = () => {
    if (cartItems.length === 0) {
      toast.info("🛒 Your cart is empty!", { autoClose: 1500 });
      return;
    }

    toast.success("🎉 Purchase successful! Thank you!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    });

    // Complete purchase - stock remains reduced (permanent transaction)
    completePurchase();
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <p className="cart-subtitle">Review and manage your items</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="empty-icon">📦</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some medical equipment to get started!</p>
          <Link to="/products" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="items-header">
              <span>{cartItems.length} Item(s)</span>
            </div>

            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || "https://via.placeholder.com/100"} alt={item.name} />
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <p className="item-category">📌 {item.category}</p>
                </div>

                <div className="item-price">
                  <p className="price-label">Unit Price</p>
                  <p className="price">TND {item.price.toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <button 
                    className="qty-btn"
                    onClick={() => updateCartItem(item._id, -1)}
                    title="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateCartItem(item._id, 1)}
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="item-subtotal">
                  <p className="subtotal-label">Subtotal</p>
                  <p className="subtotal">TND {(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeItem(item._id)}
                  title="Remove from cart"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-box">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>TND {total.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span className="shipping-free">Free</span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>TND {(total * 0.19).toFixed(2)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total Amount</span>
                <span>TND {(total + total * 0.19).toFixed(2)}</span>
              </div>

              <button 
                className="btn-purchase"
                onClick={handlePurchase}
              >
                ✓ Complete Purchase
              </button>

              <Link to="/products" className="btn-continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
