import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Discovery from './pages/Discovery'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SignUpPage from './pages/SignUpPage'
import OrderHistory from './pages/OrderHistory'
import Wishlist from './pages/Wishlist'
import ProductDetail from './pages/ProductDetail'
import ThreeDTryOn from './pages/ThreeDTryOn'
import AIStyling from './pages/AIStyling'
import Shops from './pages/Shops'
import About from './pages/About'
import CartPage from './pages/CartPage'
import DeliveryInformation from './pages/DeliveryInformation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/3d-try-on" element={<ThreeDTryOn />} />
        <Route path="/ai-styling" element={<AIStyling />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/delivery-information" element={<DeliveryInformation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
