import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import './AIStyling.css';

function AIStyling() {
  return (
    <div className="page ai-styling">
      <Header />
      <main className="ai-styling-content">
        <div className="ai-styling-hero">
          <h1 className="ai-styling-title">AI Assistant</h1>
          <p className="ai-styling-description">
            Chat with our AI assistant to get real-time information about Ho Chi Minh City — 
            including current time, date, and weather conditions.
          </p>
        </div>
        <div className="ai-styling-chat-wrapper">
          <ChatBox />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AIStyling;



