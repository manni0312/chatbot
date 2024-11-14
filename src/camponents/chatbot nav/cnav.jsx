import React, { useState } from 'react';
import { FaUserCircle, FaTh, FaComment } from 'react-icons/fa';
import Sidebar from '../Side Bar/Sidebar'; // Adjusted path
import './cnav.css';

const Navbar = ({ chatSessions, onNewChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (link === 'new-chat') {
      onNewChat(); // Call the new chat function
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand"><a href="#home">Code-Shorts.AI</a></div>
        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <button className={`nav-button ${activeLink === 'sidebar' ? 'active' : ''}`} onClick={toggleSidebar}>
            <FaTh className="nav-icon" />
          </button>
          <button className={`nav-button ${activeLink === 'new-chat' ? 'active' : ''}`} onClick={() => handleLinkClick('new-chat')}>
            <FaComment className="nav-icon" /> <h2>New Chat</h2>
          </button>
          <div className={`navbar-profile`} onClick={toggleDropdown}>
            <FaUserCircle className="profile-icon" />
            <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
              <a href="#view-profile">View Profile</a>
              <a href="#add-account">Add Account</a>
              <a href="#logout">Logout</a>
            </div>
          </div>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} chatSessions={chatSessions} />
    </>
  );
};

export default Navbar;
