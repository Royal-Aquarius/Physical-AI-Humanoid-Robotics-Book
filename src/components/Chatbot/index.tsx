/**
 * src/components/Chatbot/index.tsx
 *
 * A true floating chatbot widget that uses a CSS module for styling to ensure
 * correct fixed positioning, mirroring the behavior of the site's `BackToTopButton`.
 */
import React, { useState, useEffect, useRef } from 'react';
// Import the CSS module
import styles from './styles.module.css';

// Define the structure for a chat message
interface Message {
  text: string;
  isUser: boolean;
}

// Main Chatbot component
const Chatbot: React.FC = () => {
  // State to manage the chatbot's visibility (open or closed)
  const [isOpen, setIsOpen] = useState(false);
  // State to store the conversation history
  const [messages, setMessages] = useState<Message[]>([]);
  // State for the user's current input
  const [inputValue, setInputValue] = useState('');
  // State to indicate if the bot is currently fetching a response
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref to the message container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to smoothly scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll whenever a new message is added
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  // Function to toggle the chat window's visibility
  const toggleChat = () => {
    // When opening for the first time, add the welcome message
    if (!isOpen && messages.length === 0) {
      setMessages([
        { text: "Hello! I'm your AI assistant. Ask me anything about the Physical AI course.", isUser: false }
      ]);
    }
    setIsOpen(!isOpen);
  };

  // Function to handle sending a message
  const handleSendMessage = async () => {
    // Prevent sending empty messages or while the bot is typing
    if (inputValue.trim() === '' || isLoading) return;

    // Add the user's message to the conversation
    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear the input field and set loading state
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // API call to the backend chatbot service
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: currentInput }),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.json();
      // Add the bot's response to the conversation
      const botMessage: Message = { text: data.answer, isUser: false };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      // Display an error message in the chat if the API call fails
      const errorMessage: Message = { text: 'Sorry, I am having trouble connecting. Please try again later.', isUser: false };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      // Reset the loading state
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.chatbotContainer} ${isOpen ? styles.open : ''}`}>
      {/* Chat Window */}
      <div className={`${styles.chatWindow} ${isOpen ? styles.open : styles.closed}`} aria-hidden={!isOpen}>
        
        {/* Header */}
        <div className={styles.chatHeader}>
          Physical AI Assistant
        </div>

        {/* Message Area */}
        <div className={styles.messageArea}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${msg.isUser ? styles.user : styles.bot}`}>
              <div className={`${styles.messageContent} ${msg.isUser ? styles.user : styles.bot}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {/* Loading indicator for when the bot is "typing" */}
          {isLoading && (
            <div className={styles.loadingIndicator}>
              <div className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          {/* Invisible div to anchor auto-scrolling to the bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
              className={styles.inputField}
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage} 
              disabled={isLoading}
              className={styles.sendButton}
              aria-label="Send Message"
            >
              <svg className={styles.sendIcon} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button 
        onClick={toggleChat} 
        className={styles.chatToggleButton}
        aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
      >
        <div className={styles.iconContainer}>
          {/* Chat Icon (visible when closed) */}
          <svg className={`${styles.icon} ${styles.chatIcon}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          {/* Close Icon (X) (visible when open) */}
          <svg className={`${styles.icon} ${styles.closeIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Chatbot;
