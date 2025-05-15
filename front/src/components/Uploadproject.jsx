import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './uploadforms.css';

export default function UploadProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    proof: ''
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
      const response = await fetch('http://localhost:3001/upload/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Project uploaded successfully!'
        });
        setFormData({ title: '', description: '', domain: '', proof: '' });
      } else {
        const errorData = await response.json();
        setMessage({
          type: 'error',
          text: `Error uploading project: ${errorData.message}`
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({
        type: 'error',
        text: 'Error uploading project!'
      });
    }
  };

  const domains = [
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'Data Science',
    'Cloud Computing',
    'DevOps',
    'Blockchain',
    'IoT',
    'Game Development',
    'Other'
  ];

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="form-section">
          <div className="form-header">
            <h1>Add New Project</h1>
            <p>Share your amazing project with the community</p>
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
              <label>Project Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter project title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Describe your project..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Domain</label>
              <select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                required
              >
                <option value="">Select domain</option>
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Project Link</label>
              <input
                type="url"
                name="proof"
                placeholder="GitHub repository or live demo URL"
                value={formData.proof}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Upload Project
            </button>
          </form>

          <div className="form-footer">
            Make sure to include a detailed description and working links
          </div>
        </div>

        <div className="illustration-section">
          <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-3454633-2918522.png" 
            alt="Project Upload"
          />
          <h2>Showcase Your Work</h2>
          <p>Share your projects to demonstrate your skills and build your portfolio</p>
        </div>
      </div>
    </div>
  );
}
