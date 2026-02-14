import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import type { ClothingContext } from '../services/aiService';
import './ThreeDTryOn.css';

const ThreeDTryOn: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>('Male');
  const [height, setHeight] = useState<number>(165);
  const [weight, setWeight] = useState<number>(55);
  const [bodyType, setBodyType] = useState<string>('Average');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [zoom, setZoom] = useState<number>(100);

  // Clothing catalog data
  const clothingItems = [
    {
      id: 1,
      name: 'Cotton Tee',
      price: 29,
      colors: ['#ffffff', '#000000', '#f7c7cc'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 2,
      name: 'Silk Blouse',
      price: 79,
      colors: ['#f2f2f3', '#f7c7cc'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 3,
      name: 'Denim Jacket',
      price: 99,
      colors: ['#4a90e2', '#2c3e50'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 4,
      name: 'Slim Jeans',
      price: 69,
      colors: ['#4a90e2', '#2c3e50'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 5,
      name: 'Pleated Skirt',
      price: 59,
      colors: ['#f7c7cc', '#ffffff'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 6,
      name: 'Wide Pants',
      price: 89,
      colors: ['#000000', '#2c3e50'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 7,
      name: 'Sneakers',
      price: 119,
      colors: ['#ffffff'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 8,
      name: 'Leather Boots',
      price: 149,
      colors: ['#000000'],
      image: '/api/placeholder/64/64'
    }
  ];

  // Recommended products data
  const recommendations = [
    {
      id: 1,
      name: 'Leather Handbag',
      price: 129,
      color: '#000000',
      image: '/api/placeholder/250/296'
    },
    {
      id: 2,
      name: 'Statement Necklace',
      price: 49,
      color: 'gold',
      image: '/api/placeholder/250/296'
    },
    {
      id: 3,
      name: 'Ankle Boots',
      price: 149,
      colors: ['#000000', '#8B4513'],
      image: '/api/placeholder/250/296'
    },
    {
      id: 4,
      name: 'Wide Belt',
      price: 39,
      colors: ['#000000', '#8B4513'],
      image: '/api/placeholder/250/296'
    }
  ];

  const handleTryOnItem = (itemId: number) => {
    const itemExists = selectedItems.includes(itemId.toString());
    if (itemExists) {
      setSelectedItems(selectedItems.filter(id => id !== itemId.toString()));
    } else {
      setSelectedItems([...selectedItems, itemId.toString()]);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50));
  };

  const handleBuyNow = () => {
    if (selectedItems.length === 0) {
      alert('Please select some items to try on first');
      return;
    }
    console.log('Purchasing items:', selectedItems);
  };

  // Build clothing context for the AI ChatBox
  const clothingContext: ClothingContext = useMemo(() => ({
    availableItems: clothingItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      colors: item.colors,
    })),
    selectedItems,
    userProfile: {
      gender: selectedGender,
      height,
      weight,
      bodyType,
    },
  }), [clothingItems, selectedItems, selectedGender, height, weight, bodyType]);

  return (
    <div className="threed-tryon">
      <Header />
      
      <main className="tryon-layout">
        {/* Left Panel - Clothing Catalog */}
        <div className="clothing-catalog">
          <div className="catalog-header">
            <h2 className="catalog-title">Clothing Catalog</h2>
            <p className="catalog-subtitle">Select items to try on</p>
          </div>
          
          <div className="catalog-content">
            {clothingItems.map((item) => (
              <div key={item.id} className="clothing-item">
                <div className="item-info">
                  <div className="item-image">IMG</div>
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-price">${item.price}</p>
                    <div className="item-colors">
                      {item.colors.map((color, index) => (
                        <div
                          key={index}
                          className="color-swatch"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  className="try-on-btn"
                  onClick={() => handleTryOnItem(item.id)}
                  style={{
                    backgroundColor: selectedItems.includes(item.id.toString()) ? '#c91d56' : '#f9fafb',
                    color: selectedItems.includes(item.id.toString()) ? 'white' : '#242428',
                    borderColor: selectedItems.includes(item.id.toString()) ? '#c91d56' : '#e5e7eb'
                  }}
                >
                  {selectedItems.includes(item.id.toString()) ? 'Remove' : 'Try On'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column - 3D Model Viewer + AI Stylist */}
        <div className="center-column">
          {/* 3D Model Viewer */}
          <div className="model-viewer">
            <div className="viewer-controls">
              <button className="control-btn" onClick={handleZoomOut}>
                <span>🔍</span>
              </button>
              <button className="control-btn" onClick={handleZoomOut}>
                <span>↩️</span>
              </button>
              <div className="control-divider" />
              <button className="control-btn">
                <span>🔍</span>
              </button>
              <div className="zoom-display">{zoom}%</div>
              <button className="control-btn" onClick={handleZoomIn}>
                <span>🔍</span>
              </button>
              <div className="control-divider" />
              <button className="control-btn">
                <span>🔲</span>
              </button>
              <button className="control-btn">
                <span>↪️</span>
              </button>
              <button className="control-btn">
                <span>📷</span>
              </button>
            </div>
            
            <div className="model-header">
              <p>3D Model</p>
              <p>rotate and zoom</p>
            </div>
            
            <div className="model-container">
              <img
                src="/api/placeholder/440/725"
                alt="3D Avatar Model"
                className="model-image"
                style={{ transform: `scale(${zoom / 100})` }}
              />
              <div className="model-gradient" />
            </div>
          </div>

          {/* AI Stylist Panel */}
          <div className="ai-stylist-panel">
            <ChatBox clothingContext={clothingContext} />
          </div>
        </div>

        {/* Right Panel - Personalization */}
        <div className="personalization-panel">
          <div className="personalization-header">
            <span>👤</span>
            <div>
              <h2 className="personalization-title">Personalization</h2>
              <p className="personalization-subtitle">Customize your avatar</p>
            </div>
          </div>
          
          <div className="personalization-content">
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="slider-group">
              <label className="slider-label">Height: {height} cm</label>
              <div className="slider-container">
                <div className="slider-track">
                  <div 
                    className="slider-fill" 
                    style={{ width: `${((height - 150) / (200 - 150)) * 100}%` }}
                  />
                </div>
                <div
                  className="slider-thumb"
                  style={{ left: `${((height - 150) / (200 - 150)) * 100}%` }}
                />
                <input
                  type="range"
                  min="150"
                  max="200"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  style={{ 
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>

            <div className="slider-group">
              <label className="slider-label">Weight: {weight} kg</label>
              <div className="slider-container">
                <div className="slider-track">
                  <div 
                    className="slider-fill" 
                    style={{ width: `${((weight - 40) / (120 - 40)) * 100}%` }}
                  />
                </div>
                <div
                  className="slider-thumb"
                  style={{ left: `${((weight - 40) / (120 - 40)) * 100}%` }}
                />
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  style={{ 
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Body Type</label>
              <select
                className="form-select"
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                <option value="Average">Average</option>
                <option value="Slim">Slim</option>
                <option value="Athletic">Athletic</option>
                <option value="Curvy">Curvy</option>
              </select>
            </div>

            <div className="current-outfit">
              <h3 className="outfit-title">Current Outfit</h3>
              {selectedItems.length === 0 ? (
                <p className="outfit-empty">No items selected</p>
              ) : (
                <div>
                  {selectedItems.map(itemId => {
                    const item = clothingItems.find(i => i.id.toString() === itemId);
                    return item ? (
                      <p key={itemId} style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#242428' }}>
                        {item.name} - ${item.price}
                      </p>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>
          
          <div className="buy-now-footer">
            <button
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={selectedItems.length === 0}
              style={{
                opacity: selectedItems.length > 0 ? 1 : 0.5
              }}
            >
              <span>🛒</span>
              Buy Now ({selectedItems.length} items)
            </button>
          </div>
        </div>
      </main>

      {/* Complete the Look Section */}
      <section className="complete-look-section">
        <div className="section-header">
          <span style={{ fontSize: '1.5rem' }}>✨</span>
          <div>
            <h2 className="section-title">Complete the Look</h2>
            <p className="section-subtitle">AI-recommended items to match your style</p>
          </div>
        </div>
        
        <div className="recommendations-container">
          <div className="recommendations-grid">
            {recommendations.map((item) => (
              <div key={item.id} className="recommendation-card">
                <div className="recommendation-image-container">
                  <span>IMG</span>
                  <div className="try-3d-badge">Try in 3D</div>
                </div>
                <div className="recommendation-info">
                  <div className="recommendation-details">
                    <h4>{item.name}</h4>
                    <p className="price">${item.price}</p>
                  </div>
                  {Array.isArray(item.colors) ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {item.colors.map((color, index) => (
                        <div
                          key={index}
                          className="recommendation-color"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className="recommendation-color"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                  <button className="recommendation-try-btn">Try On</button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="scroll-controls scroll-left">
            <span>‹</span>
          </button>
          <button className="scroll-controls scroll-right">
            <span>›</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThreeDTryOn;



