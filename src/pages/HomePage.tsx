import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import './HomePage.css'

// Mock style categories - replace with actual data from API
const mockStyleCategories = [
  {
    id: 1,
    title: 'Formal',
    count: '1.2K',
    slug: 'formal',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: 'Streetwear',
    count: '2.3K',
    slug: 'streetwear',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    title: 'Minimalist',
    count: '1.8K',
    slug: 'minimalist',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 4,
    title: 'Vintage',
    count: '950',
    slug: 'vintage',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
]

function HomePage() {
  // Fetch featured/trending products
  const { products, isLoading } = useProducts({ page: 1, size: 8 })
  return (
    <div className="page home-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your <span className="hero-title-accent">Perfect Style</span>
          </h1>
          <p className="hero-description">
            Explore curated collections from local brands and designers. 
            Try before you buy with our AI-powered styling assistant.
          </p>
          <div className="hero-buttons">
            <Link to="/discovery" className="btn btn-primary">Explore Collections</Link>
            <Link to="/ai-styling" className="btn btn-outline">Start Styling</Link>
          </div>
        </div>
      </section>
      
      {/* Shop by Style Section */}
      <section className="shop-by-style">
        <div className="section-container">
          <h2 className="section-title">Shop by Style</h2>
          <p className="section-subtitle">Find your aesthetic. Each style tells a story.</p>
          <div className="style-cards">
            {mockStyleCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/discovery?style=${category.slug}`} 
                className="style-card"
              >
                <div className="style-card-image" style={{ background: category.gradient }}>
                  <div className="style-card-gradient"></div>
                </div>
                <div className="style-card-content">
                  <h3 className="style-card-title">{category.title}</h3>
                  <p className="style-card-count">{category.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Now Section */}
      <section className="trending-now">
        <div className="section-container">
          <div className="section-header">
            <div className="section-header-left">
              <h2 className="section-title">Trending Now</h2>
              <p className="section-subtitle">What everyone's talking about this week</p>
            </div>
            <Link to="/discovery" className="view-all-link">View All →</Link>
          </div>
          
          {isLoading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              padding: '60px',
              color: '#666'
            }}>
              Loading products...
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  brand={product.brand}
                  name={product.name}
                  price={product.salePrice || product.price}
                  image={product.imageUrl}
                  badges={[
                    product.isFeatured && 'Featured',
                    product.salePrice && product.salePrice < product.price && 'Sale',
                  ].filter(Boolean) as string[]}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default HomePage
