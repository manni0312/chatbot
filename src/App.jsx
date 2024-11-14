import React, { useState, useEffect } from 'react';
import Navbar from './camponents/chatbot nav/cnav';
import HeroSection from './camponents/hero section/hero';
import InputBar from './camponents/input box/input';
import Sidebar from './camponents/Side Bar/Sidebar';
import './App.css';

const App = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('chatSessions')) || [];
    setChatSessions(savedSessions);
    setCurrentChat([]);
  }, []);

  const handleSendMessage = async (message) => {
    const updatedChat = [...currentChat, message];
    setCurrentChat(updatedChat);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botMessage = data.response;
      setCurrentChat([...updatedChat, botMessage]);

      localStorage.setItem('chatSessions', JSON.stringify([...chatSessions, updatedChat]));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleNewChat = () => {
    if (currentChat.length > 0) {
      setChatSessions([...chatSessions, currentChat]);
      localStorage.setItem('chatSessions', JSON.stringify([...chatSessions, currentChat]));
    }
    setCurrentChat([]);
  };

  const handlePredefinedMessage = (message) => {
    handleSendMessage(message);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  return (
    <div className="app-container">
      <div className={`main-content`}>
        {/* The main content wrapper */}
        <Navbar chatSessions={chatSessions} onNewChat={handleNewChat} onSidebarToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <InputBar onSendMessage={handleSendMessage} isSidebarOpen={isSidebarOpen} />
        <HeroSection onPredefinedMessage={handlePredefinedMessage} />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} chatSessions={chatSessions} />
    </div>
  );
};

export default App;
 