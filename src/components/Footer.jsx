import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>Your trusted partner for quality medical equipment and supplies.</p>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <p>📧 Email: info@medicalstore.com</p>
          <p>📞 Phone: +1 (234) 567-8900</p>
          <p>📍 Address: 123 Medical Ave, Health City</p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#cart">Cart</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#facebook" className="social-icon">f</a>
            <a href="#twitter" className="social-icon">𝕏</a>
            <a href="#instagram" className="social-icon">📷</a>
            <a href="#linkedin" className="social-icon">in</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Medical Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
