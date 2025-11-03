import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './ProfilePage.css'

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('account')
  const [profileData, setProfileData] = useState({
    fullName: 'Emma Rodriguez',
    email: 'emma.rodriguez@fashionista.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Mock data
  const mockOrderHistory = [
    {
      id: 'ORD-2024-001',
      date: '2024-10-15',
      items: ['Over-sized Cotton Tee', 'Leather Biker Jacket'],
      total: 145.99,
      status: 'Delivered'
    },
    {
      id: 'ORD-2024-002', 
      date: '2024-10-01',
      items: ['Vintage Denim Jacket'],
      total: 89.50,
      status: 'Delivered'
    }
  ]

  const mockWishlist = [
    {
      id: 1,
      name: 'Over-sized Cotton Tee',
      brand: 'Local Brand Studio',
      price: 45,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Leather Biker Jacket', 
      brand: 'Urban Edge Co.',
      price: 199,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ]

  const mock3DTryOns = [
    {
      id: 1,
      name: 'Sad to be Good T-Shirt',
      description: 'Dam good fit - has a good look in 3D mode',
      timeUsed: '5:30',
      rating: 4.5,
      date: '2024-10-20'
    },
    {
      id: 2,
      name: 'Vintage Leather Jacket',
      description: 'Perfect fit for winter styling',
      timeUsed: '3:45', 
      rating: 5.0,
      date: '2024-10-18'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Saving profile changes:', profileData)
    alert('Profile updated successfully!')
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    console.log('Changing password')
    alert('Password updated successfully!')
  }

  return (
    <div className="page profile-page">
      <Header />
      
      <main className="profile-main">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b743?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                alt="Profile" 
                className="avatar-image"
              />
            </div>
            <div className="profile-info">
              <h1 className="profile-name">Hello, {profileData.fullName}</h1>
              <p className="profile-email">{profileData.email}</p>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-sidebar">
              <nav className="profile-nav">
                <button 
                  className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
                  onClick={() => setActiveTab('account')}
                >
                  Account Details
                </button>
                <button 
                  className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  Order History
                </button>
                <button 
                  className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  My Wish-list
                </button>
                <button 
                  className={`nav-item ${activeTab === '3d-tryons' ? 'active' : ''}`}
                  onClick={() => setActiveTab('3d-tryons')}
                >
                  Saved 3D Try-Ons
                </button>
                <button 
                  className={`nav-item ${activeTab === 'password' ? 'active' : ''}`}
                  onClick={() => setActiveTab('password')}
                >
                  Change Password
                </button>
                <button 
                  className={`nav-item ${activeTab === 'payment' ? 'active' : ''}`}
                  onClick={() => setActiveTab('payment')}
                >
                  Payment & Addresses
                </button>
                <button className="nav-item logout-btn">
                  Logout
                </button>
              </nav>
            </div>

            <div className="profile-main-content">
              {activeTab === 'account' && (
                <div className="tab-content">
                  <h2>Profile Information</h2>
                  <form onSubmit={handleSaveChanges} className="profile-form">
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <button type="submit" className="save-btn">Save Changes</button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="tab-content">
                  <h2>Order History</h2>
                  <div className="orders-list">
                    {mockOrderHistory.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <span className="order-id">{order.id}</span>
                          <span className="order-date">{order.date}</span>
                          <span className={`order-status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="order-items">
                          {order.items.map((item, index) => (
                            <span key={index} className="order-item">{item}</span>
                          ))}
                        </div>
                        <div className="order-total">${order.total}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="tab-content">
                  <h2>My Wish-list</h2>
                  <div className="wishlist-grid">
                    {mockWishlist.map(item => (
                      <div key={item.id} className="wishlist-item">
                        <img src={item.image} alt={item.name} className="wishlist-image" />
                        <div className="wishlist-info">
                          <h3 className="wishlist-name">{item.name}</h3>
                          <p className="wishlist-brand">{item.brand}</p>
                          <p className="wishlist-price">${item.price}</p>
                        </div>
                        <button className="remove-btn">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === '3d-tryons' && (
                <div className="tab-content">
                  <h2>Saved 3D Try-Ons</h2>
                  <div className="tryons-list">
                    {mock3DTryOns.map(tryon => (
                      <div key={tryon.id} className="tryon-card">
                        <div className="tryon-info">
                          <h3 className="tryon-name">{tryon.name}</h3>
                          <p className="tryon-description">{tryon.description}</p>
                          <div className="tryon-meta">
                            <span className="tryon-time">Time Used: {tryon.timeUsed}</span>
                            <span className="tryon-rating">Rating: {tryon.rating}/5</span>
                            <span className="tryon-date">Date: {tryon.date}</span>
                          </div>
                        </div>
                        <button className="replay-btn">Replay 3D</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'password' && (
                <div className="tab-content">
                  <h2>Change Password</h2>
                  <form onSubmit={handlePasswordChange} className="password-form">
                    <div className="form-group">
                      <label htmlFor="currentPassword" className="form-label">Current Password</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={profileData.currentPassword}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={profileData.newPassword}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={profileData.confirmPassword}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <button type="submit" className="update-btn">Update Password</button>
                  </form>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="tab-content">
                  <h2>Payment & Addresses</h2>
                  <div className="payment-section">
                    <div className="payment-card">
                      <h3>Payment Methods</h3>
                      <p>No payment methods added yet.</p>
                      <button className="add-btn">Add Payment Method</button>
                    </div>
                    <div className="address-card">
                      <h3>Shipping Addresses</h3>
                      <p>No addresses added yet.</p>
                      <button className="add-btn">Add Address</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default ProfilePage



