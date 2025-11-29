import React, { useState, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../services/api";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  // State for products
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // State for adding new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "Other",
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
      toast.error("Failed to load products");
    }
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      toast.success("Product added successfully!");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "Other",
      });
      setShowForm(false);
      fetchProducts();
    } catch {
      toast.error("Failed to add product");
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
      toast.success("Product updated!");
      setEditingProduct(null);
      fetchProducts();
    } catch {
      toast.error("Failed to update product");
    }
  };

  // Confirm delete
  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      handleDelete(id);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted!");
      fetchProducts();
    } catch {
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <p>Manage your medical equipment inventory</p>
        </div>
        <button 
          className="btn-add-product"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add New Product"}
        </button>
      </div>

      {/* Add Product Form Modal */}
      {showForm && (
        <div className="form-container">
          <div className="form-card">
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct} className="product-form">
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  placeholder="Enter product name" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Enter product description" 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
                  required 
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <div className="input-with-prefix">
                    <span>TND</span>
                    <input 
                      type="number" 
                      step="0.01"
                      placeholder="0.00" 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Stock</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} 
                    required
                  >
                    <option value="Diagnostic">Diagnostic</option>
                    <option value="Surgical">Surgical</option>
                    <option value="Therapy">Therapy</option>
                    <option value="Monitoring">Monitoring</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="text" 
                  placeholder="https://example.com/image.jpg" 
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
                />
              </div>

              <button type="submit" className="btn-submit">Add Product</button>
            </form>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="products-section">
        <h2>Products ({products.length})</h2>
        
        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products found. Add your first product to get started!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    {editingProduct?._id === product._id ? (
                      <td colSpan="7" className="edit-row">
                        <form onSubmit={handleEditSubmit} className="product-form edit-form">
                          <div className="form-group">
                            <label>Name</label>
                            <input 
                              type="text" 
                              value={editData.name}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })} 
                              required 
                            />
                          </div>

                          <div className="form-group">
                            <label>Description</label>
                            <textarea 
                              value={editData.description}
                              onChange={(e) => setEditData({ ...editData, description: e.target.value })} 
                              required 
                              rows="2"
                            />
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label>Price</label>
                              <div className="input-with-prefix">
                                <span>TND</span>
                                <input 
                                  type="number" 
                                  step="0.01"
                                  value={editData.price}
                                  onChange={(e) => setEditData({ ...editData, price: e.target.value })} 
                                  required 
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Stock</label>
                              <input 
                                type="number" 
                                value={editData.stock}
                                onChange={(e) => setEditData({ ...editData, stock: e.target.value })} 
                                required 
                              />
                            </div>

                            <div className="form-group">
                              <label>Category</label>
                              <select 
                                value={editData.category}
                                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                              >
                                <option value="Diagnostic">Diagnostic</option>
                                <option value="Surgical">Surgical</option>
                                <option value="Therapy">Therapy</option>
                                <option value="Monitoring">Monitoring</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Image URL</label>
                            <input 
                              type="text" 
                              value={editData.image}
                              onChange={(e) => setEditData({ ...editData, image: e.target.value })} 
                            />
                          </div>

                          <div className="form-actions">
                            <button type="submit" className="btn-save">Save Changes</button>
                            <button 
                              type="button" 
                              className="btn-cancel" 
                              onClick={() => setEditingProduct(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </td>
                    ) : (
                      <>
                        <td className="image-cell">
                          <img src={product.image} alt={product.name} />
                        </td>
                        <td className="name-cell">{product.name}</td>
                        <td className="description-cell">{product.description}</td>
                        <td className="price-cell">TND {parseFloat(product.price).toFixed(2)}</td>
                        <td className="stock-cell">
                          <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="category-cell">
                          <span className="category-badge">{product.category}</span>
                        </td>
                        <td className="actions-cell">
                          <button 
                            className="btn-edit" 
                            onClick={() => startEditing(product)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn-delete" 
                            onClick={() => confirmDelete(product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
