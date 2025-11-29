import React, { useState, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../services/api";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  // State for products
  const [products, setProducts] = useState([]);

  // State for adding new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "Other", // 👈 Added category here
  });

  // Editing states
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch products from DB
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch {
      toast.error("❌ Failed to load products");
    }
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      toast.success("✨ Product added successfully!");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "Other",
      });
      fetchProducts();
    } catch {
      toast.error("❌ Failed to add product");
    }
  };

  // Start editing
  const startEditing = (product) => {
    setEditingProduct(product);
    setEditData(product);
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct._id, editData);
      toast.success("🔁 Product updated!");
      setEditingProduct(null);
      fetchProducts();
    } catch {
      toast.error("❌ Failed to update product");
    }
  };

  // Confirm delete
  const confirmDelete = (id) => {
    if (window.confirm("⚠ Are you sure you want to delete this product?")) {
      handleDelete(id);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("🗑 Product deleted!");
      fetchProducts();
    } catch {
      toast.error("❌ Error deleting product");
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

        {/* 👇 Category Selection */}
        <select value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required>
          <option value="Diagnostic">Diagnostic</option>
          <option value="Surgical">Surgical</option>
          <option value="Therapy">Therapy</option>
          <option value="Monitoring">Monitoring</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" style={styles.addButton}>➕ Add Product</button>
      </form>

      <hr />

      {/* Product List in Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>📸 Image</th>
            <th>📌 Name</th>
            <th>📝 Description</th>
            <th>💵 Price</th>
            <th>📦 Stock</th>
            <th>📂 Category</th>
            <th>⚙ Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              {editingProduct?._id === product._id ? (
                <td colSpan="7">
                  <form onSubmit={handleEditSubmit} style={styles.form}>
                    <input type="text" value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })} required />

                    <input type="text" value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })} required />

                    <input type="number" value={editData.price}
                      onChange={(e) => setEditData({ ...editData, price: e.target.value })} required />

                    <input type="number" value={editData.stock}
                      onChange={(e) => setEditData({ ...editData, stock: e.target.value })} required />

                    <input type="text" value={editData.image}
                      onChange={(e) => setEditData({ ...editData, image: e.target.value })} />

                    {/* 👇 Edit Category */}
                    <select value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}>
                      <option value="Diagnostic">Diagnostic</option>
                      <option value="Surgical">Surgical</option>
                      <option value="Therapy">Therapy</option>
                      <option value="Monitoring">Monitoring</option>
                      <option value="Other">Other</option>
                    </select>

                    <button type="submit" style={styles.saveButton}>💾 Save</button>
                    <button type="button" style={styles.cancelButton} onClick={() => setEditingProduct(null)}>✖ Cancel</button>
                  </form>
                </td>
              ) : (
                <>
                  <td><img src={product.image} alt={product.name} style={styles.image} /></td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <button style={styles.editButton} onClick={() => startEditing(product)}>✏ Edit</button>
                    <button style={styles.deleteButton} onClick={() => confirmDelete(product._id)}>🗑 Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 🔹 Styling
const styles = {
  container: { textAlign: "center", padding: "30px" },
  form: { display: "flex", flexDirection: "column", width: "300px", margin: "auto", gap: "10px" },
  table: { width: "90%", margin: "20px auto", borderCollapse: "collapse" },
  image: { width: "60px", height: "60px", borderRadius: "6px", objectFit: "cover" },
  addButton: { padding: "10px", background: "green", color: "white", borderRadius: "5px", cursor: "pointer" },
  deleteButton: { padding: "8px", background: "red", color: "white", borderRadius: "5px", cursor: "pointer" },
  editButton: { padding: "8px", background: "orange", color: "white", borderRadius: "5px", cursor: "pointer" },
  saveButton: { padding: "8px", background: "green", color: "white", borderRadius: "5px", cursor: "pointer" },
  cancelButton: { padding: "8px", background: "gray", color: "white", borderRadius: "5px", cursor: "pointer" },
};
//DEZNFDJNSDKJF
