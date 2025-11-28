import React, { useState } from "react";
import productsData from "../data/products"; // Using static list temporarily
import ProductTable from "../components/ProductTable";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [products, setProducts] = useState(productsData);

  // 🗑 Delete product by ID
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    toast.error("❌ Product deleted!", { autoClose: 1500 });
  };

  // ⚙️ Edit placeholder (next step)
  const handleEdit = (product) => {
    toast.info(`✏ Editing ${product.name}... (Coming soon)`, { autoClose: 1500 });
  };

  return (
    <div style={styles.container}>
      <h2>🛠 Admin Dashboard</h2>
      <p>Manage your products below 👇</p>

      <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
  },
};
