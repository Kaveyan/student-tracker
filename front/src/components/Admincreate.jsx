import React, { useState } from 'react';
import img from "../img/Free Vector _ Design thinking concept illustration.jpeg";

export default function AdminCreate() {
  const [adminSignup, setAdminSignup] = useState({
    firstName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminSignup(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/adminregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminSignup),
      });

      if (response.ok) {
        alert('Registration successful!');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Registration failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="column">
      <div className='f-contain'> 
        <div>
          <header>Register Here..</header>
        </div>
        <form onSubmit={handleSubmit} className='form'>
          <div className='res'>
            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                name="firstName"
                placeholder='Name...'
                value={adminSignup.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='res'>
            <div className="input-box">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder='Email...'
                value={adminSignup.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder='Password...'
                value={adminSignup.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <img src={img} alt="Illustration" />
    </div>
  );
}
