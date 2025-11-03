import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './CartPage.css';

// Figma asset URLs
const imgOversizedCottonTee = "https://www.figma.com/api/mcp/asset/3c7b693f-874a-4614-8b2b-1607c029f0df";
const imgVintageDenimJacket = "https://www.figma.com/api/mcp/asset/b8c8cdf6-bf5b-45ff-a366-cb971765e164";
const imgDeleteIcon = "https://www.figma.com/api/mcp/asset/b4c1481c-8d8c-4a32-bda4-7b493690006c";
const imgMinusIcon = "https://www.figma.com/api/mcp/asset/17452023-de1f-46db-8d3b-39b77c89f861";
const imgPlusIcon = "https://www.figma.com/api/mcp/asset/059a9cb5-dc13-4cfc-ae2b-9f80377c9227";

interface CartItem {
  id: number;
  brand: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      brand: "Minimalist Co",
      name: "Minimalist White Tee",
      size: "M",
      price: 45,
      quantity: 2,
      image: imgOversizedCottonTee
    },
    {
      id: 2,
      brand: "Vintage Soul",
      name: "Vintage Denim Jacket",
      size: "L",
      price: 120,
      quantity: 1,
      image: imgVintageDenimJacket
    }
  ]);
  
  const [discountCode, setDiscountCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="cart-page">
      <Header />
      
      <main className="cart-main">
        <div className="container">
          <h1 className="cart-title">Shopping Cart</h1>
          
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <div className="item-brand">{item.brand}</div>
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-size">Size: {item.size}</div>
                    
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <img src={imgMinusIcon} alt="Decrease" />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <img src={imgPlusIcon} alt="Increase" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-price">${item.price * item.quantity}</div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <img src={imgDeleteIcon} alt="Remove" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">${subtotal}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value">Calculated at checkout</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span className="summary-label">Total</span>
                <span className="summary-value total-price">${subtotal}</span>
              </div>
              
              <div className="discount-section">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="discount-input"
                />
                <button className="apply-code-btn">Apply Code</button>
              </div>
              
              <button className="checkout-btn">Proceed to Checkout</button>
              <button className="continue-shopping-btn">Continue Shopping</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CartPage;



