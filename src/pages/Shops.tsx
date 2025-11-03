import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Shops.css';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  tags: string[];
  isWishlisted: boolean;
}

const Shops: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Items']);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(500);

  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      name: 'Fashion Item 1',
      brand: 'Minimalist Co',
      price: 55,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 2,
      name: 'Fashion Item 2',
      brand: 'Street Vibes',
      price: 164,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 3,
      name: 'Fashion Item 3',
      brand: 'Vintage Soul',
      price: 119,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 4,
      name: 'Fashion Item 4',
      brand: 'Urban Edge',
      price: 71,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 5,
      name: 'Fashion Item 5',
      brand: 'Minimalist Co',
      price: 145,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 6,
      name: 'Fashion Item 6',
      brand: 'Street Vibes',
      price: 166,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 7,
      name: 'Fashion Item 7',
      brand: 'Vintage Soul',
      price: 143,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 8,
      name: 'Fashion Item 8',
      brand: 'Urban Edge',
      price: 101,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 9,
      name: 'Fashion Item 9',
      brand: 'Minimalist Co',
      price: 59,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 10,
      name: 'Fashion Item 10',
      brand: 'Street Vibes',
      price: 132,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 11,
      name: 'Fashion Item 11',
      brand: 'Vintage Soul',
      price: 165,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    },
    {
      id: 12,
      name: 'Fashion Item 12',
      brand: 'Urban Edge',
      price: 82,
      image: '/api/placeholder/357/444',
      tags: ['New Arrival', 'Trending'],
      isWishlisted: false
    }
  ];

  const categories = ['All Items', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['#000000', '#ffffff', '#f7c7cc', '#93c5fd', '#86efac', '#fef3c7'];

  const handleCategoryChange = (category: string) => {
    if (category === 'All Items') {
      setSelectedCategories(['All Items']);
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories.filter(c => c !== 'All Items'), category];
      
      setSelectedCategories(newCategories.length === 0 ? ['All Items'] : newCategories);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleWishlist = (productId: number) => {
    // In a real app, this would update the backend
    console.log('Toggle wishlist for product:', productId);
  };

  return (
    <div className="shops-page">
      <Header />
      
      <main className="shops-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Shop the Collections</h1>
            <p className="hero-subtitle">Discover new arrivals from local brands</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="main-content">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            {/* Category Filter */}
            <div className="filter-group">
              <h3 className="filter-title">Category</h3>
              <div className="filter-options">
                {categories.map(category => (
                  <label key={category} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="filter-group">
              <h3 className="filter-title">Size</h3>
              <div className="size-options">
                {sizes.map(size => (
                  <label key={size} className="size-option">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className="size-checkbox"
                    />
                    <span className="size-label">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="filter-group">
              <h3 className="filter-title">Color</h3>
              <div className="color-options">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`color-swatch ${selectedColors.includes(color) ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h3 className="filter-title">Price Range</h3>
              <div className="price-range">
                <div className="price-slider">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="price-labels">
                    <span>$0</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="products-section">
            <div className="products-header">
              <p className="products-count">12 products found</p>
            </div>
            
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
                    />
                    <button 
                      className="wishlist-btn"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Add to wishlist"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 14L7 13C3 9 1 7 1 5C1 3 3 1 5 1C6 1 7 2 8 3C9 2 10 1 11 1C13 1 15 3 15 5C15 7 13 9 9 13L8 14Z" stroke="currentColor" strokeWidth="1.5" fill={product.isWishlisted ? 'currentColor' : 'none'}/>
                      </svg>
                    </button>
                    <div className="product-tags">
                      {product.tags.map(tag => (
                        <span key={tag} className="product-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="product-info">
                    <p className="product-brand">{product.brand}</p>
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="pagination-btn">Previous</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">Next</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shops;



