import React, { useState } from 'react';

export default function UploadCLanguage() {
  const [formData, setFormData] = useState({
    name: '',
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

    const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/upload/clanguage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include JWT token in the Authorization header
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Language uploaded successfully!');
        // Clear the form or handle the response data
        setFormData({ name: '', proof: '' });
      } else {
        const errorData = await response.json();
        alert(`Error uploading language: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading language!');
    }
  };

  return (
    <div>
      <form className='up-form' onSubmit={handleSubmit}>
        <div className='res'>
          <div className="input-box">
            <label>Language name</label>
            <input
              type="text"
              name="name"
              placeholder='Name...'
              value={formData.name}
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
              placeholder='Give link of certificate'
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
