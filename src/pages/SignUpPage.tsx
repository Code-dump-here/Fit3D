import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './SignUpPage.css'

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sign up attempt:', formData)
    // TODO: Implement actual sign up logic
  }

  return (
    <div className="page signup-page">
      <Header />
      
      <main className="signup-main">
        <div className="signup-container">
          <div className="signup-content">
            {/* Left side - Sign Up Form */}
            <div className="signup-form-section">
              <div className="signup-form-container">
                <h1 className="signup-title">Create Your Account</h1>
                <p className="signup-subtitle">Sign up for a better style experience.</p>
                
                <form onSubmit={handleSubmit} className="signup-form">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

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
                    />
                  </div>

                  <button type="submit" className="signup-button">
                    Create Account
                  </button>
                </form>

                <div className="signup-links">
                  <p className="login-prompt">
                    Already have an account? <a href="/login" className="login-link">Sign In</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Fashion Image */}
            <div className="signup-image-section">
              <div className="signup-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Fashion showcase" 
                  className="signup-image"
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

export default SignUpPage



