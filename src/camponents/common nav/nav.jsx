import React from 'react';
import { FaUserCircle, FaTh, FaComment } from 'react-icons/fa';
import './cnav.css'; // Make sure this path is correct

const Navbar = ({ chatSessions, onNewChat, toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#home">Code-Shorts.AI</a>
      </div>
      <div className="navbar-links">
        <button className="nav-button" onClick={toggleSidebar}>
          <FaTh className="nav-icon" />
        </button>
        <button className="nav-button" onClick={onNewChat}>
          <FaComment className="nav-icon" />
          <h1>New Chat</h1>
        </button>
        <div className="navbar-profile">
          <FaUserCircle className="profile-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
