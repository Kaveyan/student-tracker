import React, { useState } from 'react';

export default function UploadCertificate() {
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    proof: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/upload/certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Certificate uploaded successfully!');
        setFormData({ title: '', domain: '', proof: '' });
      } else {
        const errorData = await response.json();
        alert(`Error uploading certificate: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading certificate!');
    }
  };

  return (
    <div>
      <form className='up-form' onSubmit={handleSubmit}>
        <div className='res'>
          <div className="input-box">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder='Title...'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>
    
        <div className='res'>
          <div className="input-box">
            <label>Domain</label>
            <input
              type="text"
              name="domain"
              placeholder='Domain...'
              value={formData.domain}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className='res'>
          <div className="input-box">
            <label>Proof</label>
            <input
              type="text"
              name="proof"
              placeholder='Give Certificate link'
              value={formData.proof}
              onChange={handleChange}
              required
            />
          </div>
        </div>
     
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
