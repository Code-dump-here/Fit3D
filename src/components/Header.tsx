import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import './Header.css'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthContext()
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/login')
  }
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Fitt3D" className="logo-image" />
          </Link>
          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/discovery" className={`nav-link ${isActive('/discovery') ? 'active' : ''}`}>Discovery</Link>
            <Link to="/3d-try-on" className={`nav-link ${isActive('/3d-try-on') ? 'active' : ''}`}>3D Try-On</Link>
            <Link to="/shops" className={`nav-link ${isActive('/shops') ? 'active' : ''}`}>Shops</Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
          </nav>
        </div>
        <div className="header-right">
          <div className="header-icons">
            <Link to="/wishlist" className="icon-button" aria-label="Favorites">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 30L18 28C10 20 4 15 4 11C4 7 7 4 11 4C13 4 15 5 16 6C17 5 19 4 21 4C25 4 28 7 28 11C28 15 22 20 14 28L12 30H20Z" fill="currentColor"/>
              </svg>
            </Link>
            <Link to="/cart" className="icon-button" aria-label="Cart">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M10 10H30L28 22H12L10 10ZM12 26C12 27.1 12.9 28 14 28C15.1 28 16 27.1 16 26C16 24.9 15.1 24 14 24C12.9 24 12 24.9 12 26ZM26 26C26 27.1 26.9 28 28 28C29.1 28 30 27.1 30 26C30 24.9 29.1 24 28 24C26.9 24 26 24.9 26 26Z" fill="currentColor"/>
              </svg>
            </Link>
          </div>
          
          {isAuthenticated() ? (
            <div className="user-menu-container">
              <button 
                className="user-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="user-name">{user?.fullName}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    Profile
                  </Link>
                  <Link to="/order-history" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    Order History
                  </Link>
                  <Link to="/wishlist" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    Wishlist
                  </Link>
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </>
          )}
          
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search styles..." 
              className="search-input"
            />
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

