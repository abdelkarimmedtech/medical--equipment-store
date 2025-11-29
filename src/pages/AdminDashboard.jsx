import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct, addProduct } from "../services/api";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  // Fetch real products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      console.log("📦 Products from DB:", response.data); // Debug
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      toast.error("❌ Failed to load products");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("🗑 Product deleted!");
      fetchProducts();
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      toast.error("❌ Error deleting product");
    }
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      toast.success("✨ Product added successfully!");
      setNewProduct({ name: "", description: "", price: "", stock: "", image: "" });
      fetchProducts();
    } catch (error) {
      console.error("❌ Error adding product:", error);
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🛠 Admin Dashboard</h2>
      <p>Manage products below</p>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} style={styles.form}>
        <input type="text" placeholder="Product Name" value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
        <input type="text" placeholder="Description" value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} required />
        <input type="number" placeholder="Price" value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
        <input type="number" placeholder="Stock" value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} required />
        <input type="text" placeholder="Image URL (optional)" value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
        <button type="submit" style={styles.addButton}>➕ Add Product</button>
      </form>

      <hr />

      {/* Product List */}
      <div>
        {products.length === 0 ? (
          <p>⚠ No products available or failed to load...</p>
        ) : (
          products.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>💵 Price: ${product.price}</p>
              <p>📦 Stock: {product.stock}</p>

              <button style={styles.deleteButton} onClick={() => handleDelete(product._id)}>
                ❌ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "30px" },
  form: { display: "flex", flexDirection: "column", width: "300px", margin: "auto", gap: "10px" },
  productCard: { background: "#fff", padding: "15px", margin: "10px auto", width: "300px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  addButton: { padding: "10px", background: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  deleteButton: { padding: "8px", background: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
};
