import React, { useState, useEffect } from "react";
import { getProducts } from "../services/api"; // Import API request
import { toast } from "react-toastify";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]); // Products from backend
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // To manage fetching
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Call the API
        setProducts(response.data); // Store data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        toast.error("❌ Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    addToCart(product); // Pass product to parent
  };

  // Filter products (search)
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) return <p style={styles.loading}>Loading products...</p>;
  if (error) return <p style={styles.error}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🩺 Medical Products</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      <div style={styles.grid}>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.description}>{product.description}</p>
              <p style={styles.price}>${product.price}</p>
              <p style={styles.stock}>Stock: {product.stock}</p>

              <button style={styles.button} onClick={() => handleAdd(product)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

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
    marginBottom: "20px",
  },
  loading: { textAlign: "center", fontSize: "18px", color: "orange" },
  error: { textAlign: "center", fontSize: "18px", color: "red" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.25s ease",
  },
  productName: { fontSize: "20px", fontWeight: "bold" },
  description: { color: "#555" },
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
  },
};
