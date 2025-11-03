import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import './Discovery.css'

// Mock product data - replace with actual data from API
const mockProducts = [
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
  {
    id: 9,
    brand: 'Coalstar Comfort',
    name: 'Striped Knit Sweater',
    price: 68,
    badges: ['Minimalist', 'New'],
  },
  {
    id: 10,
    brand: 'Urban Ege',
    name: 'Leather Biker Jacket',
    price: 185,
    badges: ['Minimalist', 'New'],
  },
  {
    id: 11,
    brand: 'Free Spirit Co.',
    name: 'Leather Biker Jacket',
    price: 98,
    badges: ['Vintage', 'New'],
  },
  {
    id: 12,
    brand: 'Classic Elegance',
    name: 'Leather Biker Jacket',
    price: 72,
    badges: ['Formal'],
  },
]

function Discovery() {
  return (
    <div className="page discovery">
      <Header />
      
      <div className="discovery-container">
        <div className="discovery-header">
          <div className="discovery-header-left">
            <h1 className="discovery-title">Trending Now</h1>
            <p className="discovery-count">{mockProducts.length} items</p>
          </div>
          <a href="#" className="view-all-link">View All →</a>
        </div>
        
        <div className="products-grid">
          {mockProducts.map((product) => (
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
      
      <Footer />
    </div>
  )
}

export default Discovery
