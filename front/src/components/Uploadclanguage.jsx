import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './uploadforms.css';

export default function UploadPLanguage() {
  const [formData, setFormData] = useState({
    name: '',
    level: '',
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
      const response = await fetch('https://student-tracker-backend-45dp.onrender.com/upload/clanguage', {
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
          text: 'Language proficiency uploaded successfully!'
        });
        setFormData({
          name: '',
          level: '',
          proof: '',
          description: ''
        });
      } else {
        const errorData = await response.json();
        setMessage({
          type: 'error',
          text: `Error uploading language: ${errorData.message}`
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({
        type: 'error',
        text: 'Error uploading language!'
      });
    }
  };

  const languages = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Ruby',
    'PHP',
    'Swift',
    'Go',
    'Rust',
    'TypeScript',
    'Kotlin',
    'Other'
  ];

  const proficiencyLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="form-section">
          <div className="form-header">
            <h1>Add Programming Language</h1>
            <p>Share your programming language expertise</p>
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
              <label htmlFor="name">Programming Language</label>
              <select
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              >
                <option value="">Select language</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="level">Proficiency Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="">Select proficiency level</option>
                {proficiencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="description">Experience & Projects</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your experience and notable projects with this language..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="proof">Portfolio/GitHub Link</label>
              <input
                id="proof"
                type="url"
                name="proof"
                placeholder="Link to projects or GitHub repository"
                value={formData.proof}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Add Language
            </button>
          </form>

          <div className="form-footer">
            Add links to your best projects in this programming language
          </div>
        </div>

        <div className="illustration-section">
          <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/web-programming-3454635-2918523.png" 
            alt="Programming"
          />
          <h2>Coding Skills</h2>
          <p>Showcase your programming expertise and projects</p>
        </div>
      </div>
    </div>
  );
}
