import React from 'react';
import './hero.css'; // Create this CSS file for styling
import { FaBookOpen, FaPencilAlt, FaLightbulb, FaEllipsisH } from 'react-icons/fa';

const HeroSection = ({ onPredefinedMessage }) => {
  return (
    <div className="hero-container">
      <h1 className="hero-title">What can I help with?</h1>
      <div className="hero-buttons">
        <div className="hero-button" onClick={() => onPredefinedMessage('Summarize text')}>
          <FaBookOpen className="icon" />
          <span>Summarize text</span>
        </div>
        <div className="hero-button" onClick={() => onPredefinedMessage('Help me write')}>
          <FaPencilAlt className="icon" />
          <span>Help me write</span>
        </div>
        <div className="hero-button" onClick={() => onPredefinedMessage('Get advice')}>
          <FaLightbulb className="icon" />
          <span>Get advice</span>
        </div>
        <div className="hero-button" onClick={() => onPredefinedMessage('More')}>
          <FaEllipsisH className="icon" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
