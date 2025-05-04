import React, { useState } from 'react';

export default function UploadAchievement() {
  const [formData, setFormData] = useState({
    eventname: '',
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

    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    try {
      // Manually decode the token
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decodedToken = JSON.parse(jsonPayload);
      const userId = decodedToken.userId;

      const response = await fetch('http://localhost:8000/upload/achivement', {
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
        const data = await response.json();
        alert('Achievement uploaded successfully!');
        setFormData({ eventname: '', proof: '' }); 
      } else {
        const errorData = await response.json();
        alert(`Error uploading achievement: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form className='up-form' onSubmit={handleSubmit}>
        <div className='input-box'>
          <label htmlFor='eventname'>Event Name</label>
          <input
            id='eventname'
            type='text'
            name='eventname'
            placeholder='Enter event name'
            value={formData.eventname}
            onChange={handleChange}
            required
          />
        </div>
    
        <div className='input-box'>
          <label htmlFor='proof'>Proof</label>
          <input
            id='proof'
            type='text'
            name='proof'
            placeholder='Provide certificate link'
            value={formData.proof}
            onChange={handleChange}
            required
          />
        </div>
     
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

