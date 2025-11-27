import React from "react";

export default function Cart({ cartItems, updateCartItem, removeItem }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>🛒 Your Cart</h2>

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
          <h3 style={{ marginTop: "20px" }}>💵 Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}

const styles = {
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "10px",
  },

  actions: { display: "flex", gap: "10px", alignItems: "center" },

  qty: { padding: "5px 10px", border: "1px solid #ddd", borderRadius: "5px" },

  remove: { background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" },
};
