import React, { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { getChatService } from '../services/aiService';
import type { ChatMessage, ClothingContext } from '../services/aiService';
import './ChatBox.css';

interface ChatBoxProps {
  clothingContext?: ClothingContext;
}

const SUGGESTIONS = [
  '💕 Suggest a date night outfit',
  '💼 What should I wear to the office?',
  '🔥 Give me a trendy street look',
  '☀️ Casual weekend outfit ideas',
];

function ChatBox({ clothingContext }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Update AI service with clothing context whenever it changes
  useEffect(() => {
    if (clothingContext) {
      try {
        const service = getChatService();
        service.setClothingContext(clothingContext);
      } catch {
        // ignore if service not initialized yet
      }
    }
  }, [clothingContext]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    setInput('');
    setError(null);

    const userMessage: ChatMessage = {
      role: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const service = getChatService();
      const response = await service.sendMessage(messageText);

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        text: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Something went wrong';
      setError(errMsg);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleClearChat = () => {
    try {
      const service = getChatService();
      service.clearHistory();
    } catch {
      // ignore if service not initialized
    }
    setMessages([]);
    setError(null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="chatbox">
      {/* Header */}
      <div className="chatbox-header">
        <div className="chatbox-header-info">
          <div className="chatbox-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h3 className="chatbox-title">AI Styling Assistant</h3>
            <span className="chatbox-subtitle">Outfit tips • Suggestions • Style advice</span>
          </div>
        </div>
        <button className="chatbox-clear-btn" onClick={handleClearChat} title="Clear chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="chatbox-messages">
        {messages.length === 0 && (
          <div className="chatbox-welcome">
            <div className="chatbox-welcome-icon">👗</div>
            <h4>Hi, I'm your AI Stylist!</h4>
            <p>Ask me for outfit suggestions, styling tips, or help picking the perfect look.</p>
            <div className="chatbox-suggestions">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="chatbox-suggestion-btn"
                  onClick={() => handleSend(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbox-message chatbox-message--${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="chatbox-msg-avatar">🤖</div>
            )}
            <div className="chatbox-msg-bubble">
              <div className="chatbox-msg-text">{msg.text}</div>
              <span className="chatbox-msg-time">{formatTime(msg.timestamp)}</span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chatbox-message chatbox-message--assistant">
            <div className="chatbox-msg-avatar">🤖</div>
            <div className="chatbox-msg-bubble chatbox-typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        {error && (
          <div className="chatbox-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form className="chatbox-input-area" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="chatbox-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your ideal outfit or ask for styling tips..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="chatbox-send-btn"
          disabled={!input.trim() || isLoading}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
