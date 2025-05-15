import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaEnvelope, FaUser, FaLock, FaBuilding, FaIdCard, FaUsers } from 'react-icons/fa';
import './createforms.css';

export default function StudentCreate() {
  const navigate = useNavigate();
  const [studentSignup, setStudentSignup] = useState({
    firstName: "",
    department: "",
    roleNumber: "",
    batch: "",
    email: "",
    password: "",
    role: localStorage.getItem('selectedRole') || 'student'
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentSignup(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure role is set
      const roleFromStorage = localStorage.getItem('selectedRole');
      const studentSignupWithRole = {
        ...studentSignup,
        role: roleFromStorage || 'student'
      };

      const response = await fetch('http://localhost:3001/users/studentregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentSignupWithRole),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role);
        
        // Clear the selected role
        localStorage.removeItem('selectedRole');
        
        // Navigate to student home
        navigate('/studenthome');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Registration failed.');
        // Handle errors (e.g., show error message)
        
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(error)
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <div className="form-header">
          <FaUserGraduate className="logo-icon" />
          <h1>Student Registration</h1>
          <p className="subtitle">Create your student account</p>
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
                  value={studentSignup.firstName}
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
                  value={studentSignup.department}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Roll Number</label>
              <div className="input-wrapper">
                <FaIdCard className="input-icon" />
                <input
                  className="form-input"
                  type="text"
                  name="roleNumber"
                  placeholder="Enter your roll number"
                  value={studentSignup.roleNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Batch</label>
              <div className="input-wrapper">
                <FaUsers className="input-icon" />
                <input
                  className="form-input"
                  type="text"
                  name="batch"
                  placeholder="Enter your batch"
                  value={studentSignup.batch}
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
                  value={studentSignup.email}
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
                  value={studentSignup.password}
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
