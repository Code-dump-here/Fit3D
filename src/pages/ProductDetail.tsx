import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Product data
  const product = {
    brand: 'Local Brand Studio',
    name: 'Oversized Cotton Tee',
    price: 45,
    description: 'Premium oversized cotton t-shirt with a relaxed fit. Perfect for everyday wear with maximum comfort. Made from 100% organic cotton with a soft, breathable texture.',
    material: '100% Organic Cotton',
    tags: ['Streetwear', 'New', 'Sustainable'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ]
  };

  // Recommended products
  const recommendations = [
    {
      id: 1,
      brand: 'Wardrobe',
      name: 'Linen Wide Pants',
      price: 78,
      image: '/api/placeholder/250/250'
    },
    {
      id: 2,
      brand: 'Minimalist',
      name: 'Cropped Knit Cardigan',
      price: 92,
      image: '/api/placeholder/250/250'
    },
    {
      id: 3,
      brand: 'Streetwear',
      name: 'High-Waist Cargo Pants',
      price: 85,
      image: '/api/placeholder/250/250'
    },
    {
      id: 4,
      brand: 'Vintage',
      name: 'Vintage Denim Jacket',
      price: 120,
      image: '/api/placeholder/250/250'
    }
  ];

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Handle buy now logic
    console.log('Buy now clicked', { product: product.name, size: selectedSize });
  };

  const handleAddToWishlist = () => {
    // Handle wishlist logic
    console.log('Added to wishlist:', product.name);
  };

  const handleShare = () => {
    // Handle share logic
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from ${product.brand}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="product-detail">
      <Header />
      
      <main className="product-content">
        {/* Left side - Images */}
        <div className="product-images">
          <img
            src={product.images[selectedImageIndex]}
            alt={product.name}
            className="main-image"
          />
          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                onClick={() => handleImageSelect(index)}
              />
            ))}
          </div>
        </div>

        {/* Right side - Product info */}
        <div className="product-info">
          <p className="brand-name">{product.brand}</p>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price}</p>
          
          <p className="product-description">{product.description}</p>
          
          <div className="product-tags">
            {product.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>

          {/* Size selection */}
          <div className="size-section">
            <h3 className="size-label">Size</h3>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Material */}
          <div className="material-section">
            <h3 className="material-label">Material</h3>
            <p className="material-value">{product.material}</p>
          </div>

          {/* Action buttons */}
          <div className="action-buttons">
            <button className="buy-now-btn" onClick={handleBuyNow}>
              <span>🛒</span>
              Buy Now
            </button>
            
            <div className="secondary-actions">
              <button className="wishlist-btn" onClick={handleAddToWishlist}>
                <span>♡</span>
              </button>
              <button className="share-btn" onClick={handleShare}>
                <span>📤</span>
              </button>
            </div>
            
            <p className="purchase-note">
              * Purchases subject to seller's store (Dreamer/Retail Shop)
            </p>
          </div>
        </div>
      </main>

      {/* Complete the Look section */}
      <section className="complete-look">
        <h2>Complete the Look</h2>
        <p>Style it with these pieces</p>
        
        <div className="recommendations">
          {recommendations.map((item) => (
            <div key={item.id} className="recommendation-card">
              <img
                src={item.image}
                alt={item.name}
                className="recommendation-image"
              />
              <button className="wishlist-icon">
                <span>♡</span>
              </button>
              <div className="recommendation-overlay">
                <p className="recommendation-brand">{item.brand}</p>
                <h4 className="recommendation-name">{item.name}</h4>
                <p className="recommendation-price">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;



