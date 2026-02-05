import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading, error } = useAuthContext()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loginError, setLoginError] = useState<string | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setLoginError(null) // Clear error when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    
    const result = await login(formData)
    
    if (result.success) {
      navigate('/') // Redirect to home on success
    } else {
      setLoginError(result.message || 'Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="page login-page">
      <Header />
      
      <main className="login-main">
        <div className="login-container">
          <div className="login-content">
            {/* Left side - Login Form */}
            <div className="login-form-section">
              <div className="login-form-container">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Sign in to access your wishlist and try-ons.</p>
                
                <form onSubmit={handleSubmit} className="login-form">
                  {(loginError || error) && (
                    <div className="error-message" style={{
                      padding: '12px',
                      backgroundColor: '#fee',
                      border: '1px solid #fcc',
                      borderRadius: '4px',
                      color: '#c00',
                      marginBottom: '16px'
                    }}>
                      {loginError || error}
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>

                <div className="login-links">
                  <a href="#" className="forgot-password-link">Forgot Password?</a>
                  <p className="signup-prompt">
                    Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Fashion Image */}
            <div className="login-image-section">
              <div className="login-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Fashion showcase" 
                  className="login-image"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default LoginPage



