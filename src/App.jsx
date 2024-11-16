import React, { useState, useEffect } from 'react';
import Navbar from './camponents/chatbot nav/cnav';
import HeroSection from './camponents/hero section/hero';
import InputBar from './camponents/input box/input';
import Sidebar from './camponents/Side Bar/Sidebar';
import './App.css';

const App = () => {
  const [chatSessions, setChatSessions] = useState([]);  // Stores all chat sessions
  const [currentChat, setCurrentChat] = useState([]); // Current active chat
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Sidebar toggle
  const [message, setMessage] = useState("");  // Stores the message for input
  const [isLoading, setIsLoading] = useState(false); // For loading indication

  // Loading chat sessions from localStorage when the app loads
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('chatSessions')) || [];
    setChatSessions(savedSessions);
    setCurrentChat([]);  // Start with an empty chat history
  }, []);

  const predefinedResponses = {
    "summarize text": "Sure! Please provide the text you would like me to summarize.",
    "help me write": "I can help you write! What would you like to write about?",
    "et advice": "I'm here to give advice. What's your question?",
  };

  // Function to send a message and get the response from the bot
  const handleSendMessage = async (userMessage) => {
    const updatedChat = [...currentChat, { sender: 'user', message: userMessage }];
    setCurrentChat(updatedChat); // Update the current chat with the user's message
  
    // Start loading state (for showing the loading indicator)
    setIsLoading(true);
  
    // Normalize the user input to lowercase to handle case insensitivity
    const normalizedMessage = userMessage.trim().toLowerCase();
  
    // Simulate a delay before bot responds (can be adjusted to fit your desired delay)
    setTimeout(() => {
      // Check if the normalized message matches any predefined responses
      let botMessage = predefinedResponses[normalizedMessage];
  
      // If the message is not predefined, send a generic development message
      if (!botMessage) {
        botMessage = "I'm still under development!";
      }
  
      // Add the bot's response to the chat after the delay
      setCurrentChat([...updatedChat, { sender: 'bot', message: botMessage }]);
  
      // Stop loading after response
      setIsLoading(false);
  
      // Optionally, save to localStorage
      localStorage.setItem('chatSessions', JSON.stringify([...chatSessions, updatedChat]));
    }, 1500); // Simulate a 1.5 second delay
  };
  

  // Function to create a new chat session
  const handleNewChat = () => {
    if (currentChat.length > 0) {
      setChatSessions([...chatSessions, currentChat]);
      localStorage.setItem('chatSessions', JSON.stringify([...chatSessions, currentChat]));
    }
    setCurrentChat([]);  // Reset current chat to start fresh
  };

  // Predefined messages based on HeroSection button clicks
  const handlePredefinedMessage = (predefinedMessage) => {
    setMessage(predefinedMessage);
    handleSendMessage(predefinedMessage);  // Send the predefined message automatically
  };

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Navbar with chat sessions and sidebar toggle */}
        <Navbar chatSessions={chatSessions} onNewChat={handleNewChat} onSidebarToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Display HeroSection or chat history */}
        {currentChat.length === 0 ? (
          <HeroSection onPredefinedMessage={handlePredefinedMessage} />
        ) : (
          <div className="chat-container">
            {currentChat.map((chat, index) => (
              <div
                key={index}
                className={`message ${chat.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-box">{chat.message}</div>
              </div>
            ))}

            {/* Show loading indicator if isLoading is true */}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-box">...</div> {/* Loading indicator with same size/color */}
              </div>
            )}
          </div>
        )}

        {/* Input Bar for typing new messages */}
        <InputBar message={message} setMessage={setMessage} onSendMessage={handleSendMessage} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Sidebar to display previous chat sessions */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} chatSessions={chatSessions} />
    </div>
  );
};

export default App;