import React from 'react';
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">Fitt3D</h3>
            <p className="footer-description">
              Your destination for discovering unique fashion from local brands and designers.
            </p>
            <div className="footer-social">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products/streetwear">Streetwear</Link></li>
              <li><Link to="/products/minimalist">Minimalist</Link></li>
              <li><Link to="/products/vintage">Vintage</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">About</h4>
            <ul className="footer-links">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/about#sellers">For Sellers</Link></li>
              <li><Link to="/ai-styling">AI Stylist</Link></li>
              <li><Link to="/3d-try-on">3D Try-On</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/delivery-information">Shipping Info</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/login">Login / Register</Link></li>
              <li><Link to="/payment">Payment Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">© 2024 Fitt3D. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

