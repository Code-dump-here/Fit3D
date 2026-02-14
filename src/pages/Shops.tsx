import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProducts, useCategories } from '../hooks/useProducts';
import './Shops.css';

const Shops: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from API
  const { products, pagination, isLoading, error } = useProducts({
    page: currentPage,
    size: 12,
    categoryId: selectedCategory
  });
  
  const { categories } = useCategories();

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['#000000', '#ffffff', '#f7c7cc', '#93c5fd', '#86efac', '#fef3c7'];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    setCurrentPage(1);
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
                <label className="filter-option">
                  <input
                    type="radio"
                    checked={selectedCategory === ''}
                    onChange={() => handleCategoryChange('')}
                    className="filter-checkbox"
                  />
                  <span className="filter-label">All Items</span>
                </label>
                {categories.map(category => (
                  <label key={category.id} className="filter-option">
                    <input
                      type="radio"
                      checked={selectedCategory === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label">{category.name}</span>
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
                  <p className="price-value">Max: ${priceRange}</p>
                </div>
              </div>
            </aside>
  
            {/* Products Section */}
            <div className="products-section">
              <div className="products-header">
                <p className="products-count">
                  {isLoading ? 'Loading...' : `${pagination?.totalCount || 0} products found`}
                </p>
              </div>
            
            {isLoading && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                padding: '60px',
                color: '#666'
              }}>
                Loading products...
              </div>
            )}
            
            {error && (
              <div style={{ 
                padding: '20px',
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                borderRadius: '8px',
                color: '#c00',
                margin: '20px 0'
              }}>
                Error: {error}
              </div>
            )}
            
            {!isLoading && !error && (
              <>
                <div className="products-grid">
                  {products.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="product-image-container">
                        <img 
                          src={product.imageUrl || '/api/placeholder/357/444'} 
                          alt={product.name}
                          className="product-image"
                        />
                        <button 
                          className="wishlist-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log('Add to wishlist:', product.id);
                          }}
                          aria-label="Add to wishlist"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 14L7 13C3 9 1 7 1 5C1 3 3 1 5 1C6 1 7 2 8 3C9 2 10 1 11 1C13 1 15 3 15 5C15 7 13 9 9 13L8 14Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          </svg>
                        </button>
                        <div className="product-tags">
                          {product.isFeatured && <span className="product-tag">Featured</span>}
                          {product.salePrice && product.salePrice < product.price && (
                            <span className="product-tag">Sale</span>
                          )}
                        </div>
                      </div>
                      <div className="product-info">
                        <p className="product-brand">{product.brand}</p>
                        <h4 className="product-name">{product.name}</h4>
                        <p className="product-price">${product.salePrice || product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      disabled={!pagination.hasPrevious}
                    >
                      Previous
                    </button>
                    
                    {[...Array(pagination.totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button 
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={!pagination.hasNext}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}

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



