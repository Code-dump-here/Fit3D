import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import './HomePage.css'

// Mock product data - replace with actual data from API
const mockTrendingProducts = [
  {
    id: 1,
    brand: 'Local Brand Studio',
    name: 'Oversized Cotton Tee',
    price: 45,
    badges: ['Streetwear', 'New'],
  },
  {
    id: 2,
    brand: 'Minimal Co.',
    name: 'Linen Wide Pants',
    price: 78,
    badges: ['Minimalist'],
  },
  {
    id: 3,
    brand: 'Retro Finds',
    name: 'Vintage Denim Jacket',
    price: 120,
    badges: ['Vintage', 'Trending'],
  },
  {
    id: 4,
    brand: 'Elegance House',
    name: 'Silk Blend Blouse',
    price: 95,
    badges: ['Formal'],
  },
  {
    id: 5,
    brand: 'Cozy Studio',
    name: 'Cropped Knit Cardigan',
    price: 62,
    badges: ['Minimalist', 'New'],
  },
  {
    id: 6,
    brand: 'Street Culture',
    name: 'High-Waist Cargo Pants',
    price: 85,
    badges: ['Streetwear'],
  },
  {
    id: 7,
    brand: 'Bohemian Dreams',
    name: 'Printed Midi Dress',
    price: 110,
    badges: ['Vintage'],
  },
  {
    id: 8,
    brand: 'Professional Line',
    name: 'Tailored Blazer',
    price: 145,
    badges: ['Formal', 'Trending'],
  },
]

function HomePage() {
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
            <div className="style-card">
              <div className="style-card-image">
                <div className="style-card-gradient"></div>
              </div>
              <div className="style-card-content">
                <h3 className="style-card-title">Formal</h3>
                <p className="style-card-count">1.2K items</p>
              </div>
            </div>
            <div className="style-card">
              <div className="style-card-image">
                <div className="style-card-gradient"></div>
              </div>
              <div className="style-card-content">
                <h3 className="style-card-title">Streetwear</h3>
                <p className="style-card-count">2.3K items</p>
              </div>
            </div>
            <div className="style-card">
              <div className="style-card-image">
                <div className="style-card-gradient"></div>
              </div>
              <div className="style-card-content">
                <h3 className="style-card-title">Minimalist</h3>
                <p className="style-card-count">1.8K items</p>
              </div>
            </div>
            <div className="style-card">
              <div className="style-card-image">
                <div className="style-card-gradient"></div>
              </div>
              <div className="style-card-content">
                <h3 className="style-card-title">Vintage</h3>
                <p className="style-card-count">950 items</p>
              </div>
            </div>
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
          <div className="products-grid">
            {mockTrendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                brand={product.brand}
                name={product.name}
                price={product.price}
                badges={product.badges}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default HomePage
