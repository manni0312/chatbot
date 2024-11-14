import React, { useState } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import './input.css';

const InputBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message); // Send the message to App
      setMessage(''); // Clear the input after sending
    }
  };

  const handleUpload = () => {
    document.getElementById('file-upload').click(); // Trigger file input click
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log("File uploaded:", files[0].name); // Handle file upload logic here
    }
  };

  return (
    <div className="input-bar">
      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }} // Hide the file input
        onChange={handleFileChange}
      />
      <button className="icon-button" onClick={handleUpload}>
        <FaPaperclip />
      </button>
      <textarea
        className="input-field"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        rows={1}
      />
      <button className="icon-button" onClick={handleSend}>
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default InputBar;
