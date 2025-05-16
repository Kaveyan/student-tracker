import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import './createforms.css';

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
      const response = await fetch('https://student-tracker-backend-45dp.onrender.com/users/adminregister', {
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
    <div className="form-container">
      <div className="form-content">
        <div className="form-header">
          <FaUserShield className="logo-icon" />
          <h1>Admin Registration</h1>
          <p className="subtitle">Create your admin account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  className="form-input"
                  type="text"
                  name="firstName"
                  placeholder="Enter your full name"
                  value={adminSignup.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={adminSignup.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={adminSignup.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">Create Account</button>
        </form>
      </div>

      <div className="form-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
      </div>
    </div>
  );
}
