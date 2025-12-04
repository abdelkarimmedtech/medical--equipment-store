import React from "react";
import { toast } from "react-toastify";

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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <div>
                <h4>{item.name}</h4>
                <p>TND {item.price}</p>
              </div>

              <div style={styles.actions}>
                <button onClick={() => updateCartItem(item._id, -1)}>-</button>
                <span style={styles.qty}>{item.quantity}</span>
                <button onClick={() => updateCartItem(item._id, 1)}>+</button>
                <button
                  style={styles.remove}
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 style={{ marginTop: "20px" }}>💵 Total: TND {total.toFixed(2)}</h3>

          <button style={styles.purchase} onClick={handlePurchase}>
            ✔ Purchase
          </button>
        </>
      )}
    </div>
  );
}

// 😊 Styles
const styles = {
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  actions: { display: "flex", gap: "10px", alignItems: "center" },
  qty: {
    padding: "5px 10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  remove: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  purchase: {
    marginTop: "20px",
    background: "green",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
