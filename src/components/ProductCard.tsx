import { Link } from 'react-router-dom'
import './ProductCard.css'

export interface ProductCardProps {
  id: string | number
  image?: string
  brand: string
  name: string
  price: number
  badges?: string[]
  imageAlt?: string
  className?: string
}

function ProductCard({ 
  id, 
  image, 
  brand, 
  name, 
  price, 
  badges = [], 
  imageAlt,
  className = ''
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(0)}`
  }

  return (
    <Link to={`/product/${id}`} className={`product-card ${className}`}>
      <div className="product-image-wrapper">
        <div 
          className="product-image" 
          style={image ? { backgroundImage: `url(${image})` } : undefined}
        >
          {!image && (
            <div className="product-image-placeholder"></div>
          )}
          {badges.length > 0 && (
            <div className="product-badges">
              {badges.map((badge, index) => (
                <span key={index} className="badge">
                  {badge}
                </span>
              ))}
            </div>
          )}
          <button 
            className="product-heart-button" 
            aria-label="Add to favorites"
            onClick={(e) => {
              e.preventDefault()
              // Handle favorite toggle
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="rgba(255, 255, 255, 0.8)"/>
              <path 
                d="M20 30L18 28C10 20 4 15 4 11C4 7 7 4 11 4C13 4 15 5 16 6C17 5 19 4 21 4C25 4 28 7 28 11C28 15 22 20 14 28L12 30H20Z" 
                fill="#242428"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="product-info">
        <p className="product-brand">{brand}</p>
        <h3 className="product-name">{name}</h3>
        <p className="product-price">{formatPrice(price)}</p>
      </div>
    </Link>
  )
}

export default ProductCard



