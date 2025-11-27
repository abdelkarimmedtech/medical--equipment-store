import React from "react";
import products from "../data/products";

function Products({ addToCart }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🩺 Medical Products</h2>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>${product.price}</p>
            <p style={styles.stock}>Stock: {product.stock}</p>
            <button style={styles.button} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "20px" },
  title: { fontSize: "28px", marginBottom: "20px", color: "#28a745" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    padding: "10px",
  },

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

// Hover effect
styles.card[':hover'] = { transform: "scale(1.03)" };

export default Products;
