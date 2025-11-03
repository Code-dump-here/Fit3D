import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './About.css';

// Figma asset URLs
const imgDesignerWorkspace = "https://www.figma.com/api/mcp/asset/ef814809-c652-49e2-a728-56c91c63e7d2";
const imgCheckIcon = "https://www.figma.com/api/mcp/asset/fa641254-e184-4524-840f-d743707e2ca7";
const imgCheckIcon2 = "https://www.figma.com/api/mcp/asset/ddaba87e-ddd8-4785-9886-ef173bc5f3de";
const imgCheckIcon3 = "https://www.figma.com/api/mcp/asset/d68cf84e-9f1f-47f0-996b-95d4b4d64edf";
const img3DTryOnIcon = "https://www.figma.com/api/mcp/asset/e290e51c-24aa-4523-bfc1-c6d2ab5047bc";
const imgAIStylistIcon = "https://www.figma.com/api/mcp/asset/4595fbeb-1df6-4f98-8858-7bb1133bae5f";
const imgPersonalizationIcon = "https://www.figma.com/api/mcp/asset/35c76f0a-5852-48bc-9cb9-2f714ded022b";

function About() {
  return (
    <div className="about-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Fit3D</h1>
          <p className="hero-subtitle">Where fashion meets innovation</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="story-content">
            <p className="story-text-large">
              Fitt3D was born from a simple vision: to revolutionize online fashion shopping by bringing 
              the fitting room experience to your screen. We connect fashion lovers with local designers 
              and emerging brands, offering an immersive 3D try-on experience that makes online 
              shopping more personal, confident, and exciting.
            </p>
            <p className="story-text">
              Our platform empowers small businesses and independent designers to showcase their 
              creativity while providing shoppers with cutting-edge technology to visualize outfits 
              before they buy. We believe fashion should be accessible, sustainable, and fun.
            </p>
          </div>
        </div>
      </section>

      {/* For Sellers Section */}
      <section className="for-sellers-section">
        <div className="container">
          <div className="sellers-content">
            <div className="sellers-text">
              <h2 className="section-title">For Sellers</h2>
              <p className="sellers-description">
                Are you a local brand or independent designer looking to reach more 
                customers? Join Fitt3D and showcase your collection to a community that 
                values unique, quality fashion.
              </p>
              
              <div className="features-list">
                <div className="feature-item">
                  <img src={imgCheckIcon} alt="Check" className="feature-icon" />
                  <span className="feature-text">List unlimited products with beautiful 3D visualization</span>
                </div>
                <div className="feature-item">
                  <img src={imgCheckIcon2} alt="Check" className="feature-icon" />
                  <span className="feature-text">Connect with fashion-forward customers</span>
                </div>
                <div className="feature-item">
                  <img src={imgCheckIcon3} alt="Check" className="feature-icon" />
                  <span className="feature-text">Leverage AI-powered styling recommendations</span>
                </div>
              </div>
              
              <button className="join-seller-btn">Join as Seller</button>
            </div>
            
            <div className="sellers-image">
              <img src={imgDesignerWorkspace} alt="Designer workspace" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      <section className="technology-section">
        <div className="container">
          <h2 className="section-title">Our Technology</h2>
          <div className="technology-cards">
            <div className="tech-card">
              <div className="tech-icon-wrapper">
                <img src={img3DTryOnIcon} alt="3D Try-On" className="tech-icon" />
              </div>
              <h3 className="tech-title">3D Try-On</h3>
              <p className="tech-description">
                Advanced 3D modeling lets you see how 
                clothes fit and move on customizable avatars 
                in real-time.
              </p>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon-wrapper">
                <img src={imgAIStylistIcon} alt="AI Stylist" className="tech-icon" />
              </div>
              <h3 className="tech-title">AI Stylist</h3>
              <p className="tech-description">
                Our intelligent assistant learns your style 
                preferences and suggests outfits tailored to 
                any occasion.
              </p>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon-wrapper">
                <img src={imgPersonalizationIcon} alt="Personalization" className="tech-icon" />
              </div>
              <h3 className="tech-title">Personalization</h3>
              <p className="tech-description">
                Customize body measurements, style 
                preferences, and get recommendations that 
                truly fit you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;



