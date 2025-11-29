import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Medical Store</h1>
          <p className="hero-subtitle">Your trusted partner for quality medical equipment and supplies</p>
          <Link to="/products" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Quality Assured</h3>
            <p>All products are certified and tested for quality and safety.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping to your doorstep.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Competitive pricing with regular discounts and offers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Expert Support</h3>
            <p>Professional support team available 24/7 for assistance.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Product Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">🔬</div>
            <h3>Diagnostic</h3>
            <p>Advanced diagnostic equipment and tools</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🏥</div>
            <h3>Surgical</h3>
            <p>Precision surgical instruments and equipment</p>
          </div>
          <div className="category-card">
            <div className="category-icon">💪</div>
            <h3>Therapy</h3>
            <p>Physical therapy and rehabilitation equipment</p>
          </div>
          <div className="category-card">
            <div className="category-icon">❤️</div>
            <h3>Monitoring</h3>
            <p>Patient monitoring and vital signs equipment</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Browse our extensive collection of medical equipment</p>
          <Link to="/products" className="cta-button">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
