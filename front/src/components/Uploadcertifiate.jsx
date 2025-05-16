import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './uploadforms.css';

export default function UploadCertificate() {
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    issuer: '',
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
      const response = await fetch('https://student-tracker-backend-45dp.onrender.com/upload/certificate', {
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
          text: 'Certificate uploaded successfully!'
        });
        setFormData({
          title: '',
          domain: '',
          issuer: '',
          date: '',
          proof: '',
          description: ''
        });
      } else {
        const errorData = await response.json();
        setMessage({
          type: 'error',
          text: `Error uploading certificate: ${errorData.message}`
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({
        type: 'error',
        text: 'Error uploading certificate!'
      });
    }
  };

  const domains = [
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Data Science',
    'Machine Learning',
    'Blockchain',
    'UI/UX Design',
    'Project Management',
    'Other'
  ];

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="form-section">
          <div className="form-header">
            <h1>Add Certificate</h1>
            <p>Share your certifications and credentials</p>
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
              <label htmlFor="title">Certificate Title</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter certificate name"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="domain">Domain</label>
              <select
                id="domain"
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
              <label htmlFor="issuer">Issuing Organization</label>
              <input
                id="issuer"
                type="text"
                name="issuer"
                placeholder="Enter organization name"
                value={formData.issuer}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="date">Issue Date</label>
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
                placeholder="Brief description of the certification..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="proof">Certificate Link</label>
              <input
                id="proof"
                type="url"
                name="proof"
                placeholder="Link to verify the certificate"
                value={formData.proof}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Upload Certificate
            </button>
          </form>

          <div className="form-footer">
            Make sure to provide a valid verification link for your certificate
          </div>
        </div>

        <div className="illustration-section">
          <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-certification-3428523-2902705.png" 
            alt="Certificate Upload"
          />
          <h2>Validate Your Skills</h2>
          <p>Add your certifications to showcase your expertise</p>
        </div>
      </div>
    </div>
  );
}
