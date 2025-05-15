import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaEnvelope, FaUser, FaLock, FaBuilding, FaIdCard, FaBookReader } from 'react-icons/fa';
import './createforms.css';

export default function FacultyCreate() {
  const navigate = useNavigate();
  const [facultySignup, setFacultySignup] = useState({
    firstName: "",
    department: "",
    roleNumber: "",
    domain: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultySignup(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure role is set
      const roleFromStorage = localStorage.getItem('selectedRole');
      const facultySignupWithRole = {
        ...facultySignup,
        role: roleFromStorage || 'faculty'
      };

      const response = await fetch('http://localhost:3001/users/facultyregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facultySignupWithRole),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.faculty.role);
        
        // Clear the selected role
        localStorage.removeItem('selectedRole');
        
        // Navigate to faculty home
        navigate('/facultyhome');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Registration failed.');
        // Handle errors (e.g., show error message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="form-container">
      <div className="form-content">
        <div className="form-header">
          <FaChalkboardTeacher className="logo-icon" />
          <h1>Faculty Registration</h1>
          <p className="subtitle">Create your faculty account</p>
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
                  value={facultySignup.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Department</label>
              <div className="input-wrapper">
                <FaBuilding className="input-icon" />
                <input
                  className="form-input"
                  type="text"
                  name="department"
                  placeholder="Enter your department"
                  value={facultySignup.department}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Faculty ID</label>
              <div className="input-wrapper">
                <FaIdCard className="input-icon" />
                <input
                  className="form-input"
                  type="text"
                  name="roleNumber"
                  placeholder="Enter your faculty ID"
                  value={facultySignup.roleNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Domain</label>
              <div className="input-wrapper">
                <FaBookReader className="input-icon" />
                <input
                  className="form-input"
                  type="text"
                  name="domain"
                  placeholder="Enter your domain"
                  value={facultySignup.domain}
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
                  value={facultySignup.email}
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
                  value={facultySignup.password}
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
