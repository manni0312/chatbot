import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';  // Trash icon from react-icons
import './sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, chatSessions, onDeleteSession }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>
        &times;
      </button>
      <h2>Chat History</h2>
      <div className="chat-history">
        <ul>
          {chatSessions.map((session, index) => (
            <li key={index} className="session-item">
              <strong>Session {index + 1}</strong>

              {/* Delete button */}
              <button 
                className="delete-btn" 
                onClick={() => onDeleteSession(index)}  // Delete session
                title="Delete this session"
              >
                <FaTrashAlt />
              </button>

              {/* Display session messages */}
              <div className="session-messages">
                {session.map((message, i) => (
                  <p key={i} className="message">{message.message}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
