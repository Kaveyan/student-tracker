import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield } from 'react-icons/fa';
import './create.css';

function Create() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    // Store selected role in local storage for registration
    localStorage.setItem('selectedRole', role);
    
    // Navigate to appropriate registration page
    switch(role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'student':
        navigate('/student');
        break;
      case 'faculty':
        navigate('/faculty');
        break;
      default:
        console.error('Invalid role selected');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-header">
          <FaUserGraduate className="logo-icon" />
          <h1>Create Account</h1>
          <p className="subtitle">Choose your role to get started</p>
        </div>

        <div className="role-buttons">
          <button 
            type="button" 
            className="role-button admin-button"
            onClick={() => handleRoleSelection('admin')}
          >
            <FaUserShield className="role-icon" />
            <span>Admin</span>
          </button>

          <button 
            type="button" 
            className="role-button student-button"
            onClick={() => handleRoleSelection('student')}
          >
            <FaUserGraduate className="role-icon" />
            <span>Student</span>
          </button>

          <button 
            type="button" 
            className="role-button faculty-button"
            onClick={() => handleRoleSelection('faculty')}
          >
            <FaChalkboardTeacher className="role-icon" />
            <span>Faculty</span>
          </button>
        </div>

        <p className="login-link">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>

      <div className="signup-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
      </div>
    </div>
  );
}

export default Create;


