import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/api";
import { toast } from "react-toastify";
import "./Products.css";

export default function Products({ addToCart }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        toast.error("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      toast.warning("Please log in to add items to cart", { autoClose: 1500 });
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <h1>Medical Products</h1>
        <p>Discover our wide range of quality medical equipment</p>
      </div>

      {/* Filters */}
      <div className="products-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-container">
        {loading && <div className="loading">Loading products...</div>}
        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found.</p>
            <small>Try adjusting your search or filter criteria</small>
          </div>
        )}

        {!loading && !error && (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.stock === 0 && (
                    <div className="out-of-stock-badge">Out of Stock</div>
                  )}
                </div>

                <div className="product-content">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>

                  <div className="product-footer">
                    <div className="product-price">TND {parseFloat(product.price).toFixed(2)}</div>
                    <div className="product-stock">
                      Stock: <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
                        {product.stock}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`add-to-cart-btn ${product.stock === 0 ? "disabled" : ""}`}
                    onClick={() => handleAdd(product)}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
