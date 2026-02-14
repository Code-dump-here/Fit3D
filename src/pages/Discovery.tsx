import React, { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useProducts, useCategories } from '../hooks/useProducts'
import './Discovery.css'

function Discovery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const { products, pagination, isLoading, error } = useProducts({ 
    page: currentPage, 
    size: 12,
    categoryId: selectedCategory 
  })
  
  const { categories } = useCategories()

  return (
    <div className="page discovery">
      <Header />
      
      <div className="discovery-container">
        <div className="discovery-header">
          <div className="discovery-header-left">
            <h1 className="discovery-title">Trending Now</h1>
            <p className="discovery-count">
              {isLoading ? 'Loading...' : `${pagination?.totalCount || 0} items`}
            </p>
          </div>
          
          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select 
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setCurrentPage(1)
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid #E4E4E7',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                color: '#242428',
                minWidth: '180px'
              }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
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
        
        {!isLoading && !error && products.length === 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '60px',
            color: '#666'
          }}>
            No products found
          </div>
        )}
        
        {!isLoading && products.length > 0 && (
          <>
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
            
            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '40px',
                padding: '20px'
              }}>
                <button
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  disabled={!pagination.hasPrevious}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E4E4E7',
                    background: pagination.hasPrevious ? 'white' : '#f5f5f5',
                    cursor: pagination.hasPrevious ? 'pointer' : 'not-allowed',
                    color: pagination.hasPrevious ? '#242428' : '#999'
                  }}
                >
                  Previous
                </button>
                
                <span style={{ padding: '8px 16px', color: '#666' }}>
                  Page {pagination.pageNumber} of {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!pagination.hasNext}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E4E4E7',
                    background: pagination.hasNext ? 'white' : '#f5f5f5',
                    cursor: pagination.hasNext ? 'pointer' : 'not-allowed',
                    color: pagination.hasNext ? '#242428' : '#999'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  )
}

export default Discovery
