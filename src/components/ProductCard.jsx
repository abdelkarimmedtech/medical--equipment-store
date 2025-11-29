import React from "react";

export default function ProductCard({ product, addToCart }) {
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      cart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("🛒 Product added to cart!");
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.productName}>{product.name}</h3>
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}>TND{product.price}</p>
      <p style={styles.stock}>Stock: {product.stock}</p>
      <button style={styles.button} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.25s",
    cursor: "pointer",
  },
  productName: { fontSize: "20px", fontWeight: "bold" },
  description: { color: "#555", marginBottom: "10px" },
  price: { fontSize: "18px", fontWeight: "bold", color: "#007bff" },
  stock: { fontSize: "14px", color: "#555" },
  button: {
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
    transition: "0.3s",
  },
};
