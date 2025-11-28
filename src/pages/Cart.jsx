import React from "react";
import { toast } from "react-toastify";

export default function Cart({ cartItems, updateCartItem, removeItem, clearCart }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {
    if (cartItems.length === 0) {
      toast.info("🛒 Your cart is empty!", { position: "top-center", autoClose: 1500 });
      return;
    }

    toast.success("🎉 Thank you for your purchase!", {
      position: "top-center",
      autoClose: 2000,
    });

    clearCart(); // instantly updates navbar
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <div>
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>

              <div style={styles.actions}>
                <button onClick={() => updateCartItem(item.id, -1)}>-</button>
                <span style={styles.qty}>{item.quantity}</span>
                <button onClick={() => updateCartItem(item.id, 1)}>+</button>
                <button style={styles.remove} onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <h3>💵 Total: ${total.toFixed(2)}</h3>
          <button style={styles.purchase} onClick={handlePurchase}>
            ✔ Purchase
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  qty: {
    border: "1px solid #ddd",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  remove: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
  },
  purchase: {
    marginTop: "10px",
    background: "green",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
  },
};
