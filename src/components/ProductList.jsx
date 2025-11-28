import React, { useState } from "react";
import products from "../data/products";

function Products({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on the search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🩺 Medical Products</h2>

      {/*  Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      {filteredProducts.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map((product) => (
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
      )}
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: { textAlign: "center", padding: "20px" },
  title: { fontSize: "28px", marginBottom: "20px", color: "#28a745" },
  searchInput: {
    padding: "10px",
    width: "50%",
    maxWidth: "350px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px"
  },
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

export default Products;
