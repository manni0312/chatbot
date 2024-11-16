import React, { useState } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import './input.css';

const InputBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);  // Track the selected file
  const [isUploading, setIsUploading] = useState(false);  // Track upload status

  // Function to send the message
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);  // Send the message to App
      setMessage('');  // Clear the input after sending
    }

    // If there's a file, we should upload it
    if (file) {
      uploadFile(file);
    }
  };

  // Trigger file selection when the user clicks the attachment button
  const handleUpload = () => {
    document.getElementById('file-upload').click(); // Trigger file input click
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const uploadedFile = files[0];
      setFile(uploadedFile);  // Store the selected file

      // Show file preview (if it's an image)
      if (uploadedFile.type.startsWith('image/')) {
        // You can show an image preview here
        console.log("File uploaded:", uploadedFile.name);
      }
    }
  };

  // Function to upload the file to the server
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true); // Start uploading

    try {
      // Make an API call to upload the file (replace with your server URL)
      const response = await fetch('https://your-server.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();  // Assuming the server responds with JSON
      console.log('File uploaded successfully', data);
      setIsUploading(false);  // Stop uploading

      // Optionally, handle the response (e.g., display uploaded file URL or process the image)
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  };

  return (
    <div className="input-bar">
      {/* Hidden file input */}
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

      {/* Display file preview */}
      {file && (
        <div className="file-preview">
          <p>Uploaded file: {file.name}</p>
          {file.type.startsWith('image/') && (
            <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '100px' }} />
          )}
        </div>
      )}

      {/* Display loading indicator if uploading */}
      {isUploading && <p>Uploading...</p>}
    </div>
  );
};

export default InputBar;
