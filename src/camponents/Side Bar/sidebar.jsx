import React from 'react';
import './sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, chatSessions }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>
        &times;
      </button>
      <h2>Chat History</h2>
      <div className="chat-history">
        
      </div>
    </div>
  );
};

export default Sidebar;
