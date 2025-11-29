import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct, addProduct, updateProduct } from "../services/api";
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

  // Editing states
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch real products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error("❌ Failed to load products");
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

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      toast.success("✨ Product added successfully!");
      setNewProduct({ name: "", description: "", price: "", stock: "", image: "" });
      fetchProducts();
    } catch {
      toast.error("❌ Failed to add product");
    }
  };

  // Begin editing
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
              {editingProduct?._id === product._id ? (
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

                  <button type="submit" style={styles.saveButton}>💾 Save</button>
                  <button type="button" style={styles.cancelButton} onClick={() => setEditingProduct(null)}>✖ Cancel</button>
                </form>
              ) : (
                <>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>💵 Price: ${product.price}</p>
                  <p>📦 Stock: {product.stock}</p>

                  <button style={styles.editButton} onClick={() => startEditing(product)}>✏ Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(product._id)}>❌ Delete</button>
                </>
              )}
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
  
  productCard: {
    background: "#fff",
    padding: "15px",
    margin: "10px auto",
    width: "300px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },

  addButton: { padding: "10px", background: "green", color: "white", borderRadius: "5px", cursor: "pointer" },
  deleteButton: { padding: "8px", background: "red", color: "white", borderRadius: "5px", cursor: "pointer" },
  editButton: { padding: "8px", background: "orange", color: "white", borderRadius: "5px", cursor: "pointer" },
  saveButton: { padding: "8px", background: "green", color: "white", borderRadius: "5px", cursor: "pointer" },
  cancelButton: { padding: "8px", background: "gray", color: "white", borderRadius: "5px", cursor: "pointer" },
};
