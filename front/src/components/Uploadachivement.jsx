import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './uploadforms.css';

export default function UploadAchievement() {
  const [formData, setFormData] = useState({
    eventname: '',
    category: '',
    date: '',
    proof: '',
    description: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage({
        type: 'error',
        text: 'You are not authenticated. Please log in.'
      });
      return;
    }

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decodedToken = JSON.parse(jsonPayload);
      const userId = decodedToken.userId;

      const response = await fetch('http://localhost:3001/upload/achivement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          userId
        }),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Achievement uploaded successfully!'
        });
        setFormData({
          eventname: '',
          category: '',
          date: '',
          proof: '',
          description: ''
        });
      } else {
        const errorData = await response.json();
        setMessage({
          type: 'error',
          text: `Error uploading achievement: ${errorData.message}`
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again later.'
      });
    }
  };

  const categories = [
    'Competition',
    'Hackathon',
    'Workshop',
    'Conference',
    'Award',
    'Recognition',
    'Certification',
    'Other'
  ];

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="form-section">
          <div className="form-header">
            <h1>Add Achievement</h1>
            <p>Share your accomplishments and recognitions</p>
          </div>

          {message.text && (
            <div className={`${message.type}-message`}>
              <FontAwesomeIcon 
                icon={message.type === 'success' ? faCheck : faExclamationCircle} 
              />
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="eventname">Event Name</label>
              <input
                id="eventname"
                type="text"
                name="eventname"
                placeholder="Enter event or achievement name"
                value={formData.eventname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="date">Date Achieved</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your achievement..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="proof">Certificate/Proof Link</label>
              <input
                id="proof"
                type="url"
                name="proof"
                placeholder="Link to certificate or proof of achievement"
                value={formData.proof}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Upload Achievement
            </button>
          </form>

          <div className="form-footer">
            Add details that highlight the significance of your achievement
          </div>
        </div>

        <div className="illustration-section">
          <img 
            src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png" 
            alt="Achievement Upload"
          />
          <h2>Celebrate Your Success</h2>
          <p>Document your achievements and build a strong portfolio</p>
        </div>
      </div>
    </div>
  );
}

