---
id: 1703080000011
title: Implemented Floating Chatbot Component
stage: green
date: '2025-12-18'
surface: agent
model: gemini-pro
feature: chatbot-ui
branch: main
user: user
command: okay
labels:
  - chatbot
  - react
  - tailwindcss
  - frontend
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - "src/components/Chatbot/index.tsx"
tests_yaml: |
  - "none"
---

# PROMPT

You are an expert React and Tailwind CSS frontend engineer.TASK:- Implement a right-bottom floating chatbot for the website.- The chatbot should appear as a small icon at the bottom-right corner of the screen.- When the user clicks the icon, the chat window should open; clicking close should hide it.- Do NOT render the chatbot as a full-page component or at the end of the homepage.- Remove glassmorphism completely.- Maintain a clean, modern design with: - Solid background (no transparency) - Rounded corners - Subtle shadow for depth - Smooth open/close animations- Do NOT modify any learning content, markdown files, docs, chapters, or wording.- Keep all chatbot functionality, text, and content unchanged.- Ensure it works on both desktop and mobile and does not interfere with page layout.OUTPUT FORMAT:- Provide a ready-to-use React component (with Tailwind CSS) for the floating chatbot with icon- Include all necessary imports and code so it can run directly- Add comments for clarity- Chat window should open/close when clicking the iconNow create a modern, standard bottom-right floating chatbot with icon only, correctly positioned.

# RESPONSE

Of course. Here is a complete, ready-to-use React component for a modern floating chatbot that meets all your requirements.

This component is self-contained. To use it, simply save it as `src/components/Chatbot/index.tsx` and add the `<Chatbot />` component to your main layout file (e.g., `src/theme/Root.tsx`) so it appears globally across your site.

```tsx
/**
 * src/components/Chatbot/index.tsx
 *
 * A floating chatbot widget that remains in the bottom-right corner of the screen.
 * It features a clean, solid design with smooth open/close animations.
 * The component is self-contained and uses Tailwind CSS for styling.
 */
import React, { useState, useEffect, useRef } from 'react';

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
    scrollToBottom();
  }, [messages, isLoading]);

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
    // Prevent sending empty or while loading
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
      // Display an error message if the API call fails
      const errorMessage: Message = { text: 'Sorry, I am having trouble connecting. Please try again later.', isUser: false };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      // Reset the loading state
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Main container for the floating chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {/* Uses CSS transitions for smooth show/hide animation */}
        <div 
          className={`
            w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out
            origin-bottom-right
            ${isOpen ? 'transform scale-100 opacity-100' : 'transform scale-90 opacity-0 pointer-events-none'}
          `}
          aria-hidden={!isOpen}
        >
          {/* Header */}
          <div className="bg-gray-800 text-white p-4 rounded-t-2xl text-center font-semibold shadow-md">
            Physical AI Assistant
          </div>

          {/* Message Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-3`}>
                <div 
                  className={`
                    py-2 px-4 rounded-xl max-w-xs break-words
                    ${msg.isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Loading indicator for when the bot is typing */}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-800 rounded-xl rounded-bl-none py-2 px-4 flex items-center space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            )}
            {/* Invisible div to anchor auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question..."
                className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage} 
                disabled={isLoading}
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex-shrink-0 flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                aria-label="Send Message"
              >
                {/* Send Icon */}
                <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Toggle Button */}
        <button 
          onClick={toggleChat} 
          className="w-16 h-16 bg-gray-800 text-white rounded-full shadow-xl flex items-center justify-center text-3xl hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-transform transform hover:scale-110"
          aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
          style={{ position: 'absolute', bottom: 0, right: 0 }}
        >
          {/* Animate between chat and close icons */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Chat Icon */}
            <svg 
              className={`
                w-full h-full transition-all duration-300 ease-in-out absolute
                ${isOpen ? 'transform scale-75 opacity-0' : 'transform scale-100 opacity-100'}
              `}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2z" />
            </svg>
            {/* Close Icon (X) */}
            <svg 
              className={`
                w-full h-full transition-all duration-300 ease-in-out absolute
                ${isOpen ? 'transform scale-100 opacity-100' : 'transform scale-75 opacity-0'}
              `}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
};

export default Chatbot;
```
