import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../img/Free Vector _ Design thinking concept illustration.jpeg";

export default function AdminCreate() {
  const navigate = useNavigate();
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
      // Ensure role is set
      const roleFromStorage = localStorage.getItem('selectedRole');
      const adminSignupWithRole = {
        ...adminSignup,
        role: roleFromStorage || 'admin'
      };

      // Register admin with backend
      const response = await fetch('http://localhost:3001/users/adminregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminSignupWithRole)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.admin.role);

        // Clear the selected role
        localStorage.removeItem('selectedRole');

        // Navigate to admin home
        navigate('/adminhome');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'An error occurred. Please try again.');
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
