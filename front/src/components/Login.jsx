import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import { FaGoogle, FaEnvelope, FaLock, FaUserGraduate } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dashboardRoutes = {
    'admin': '/adminhome',
    'student': '/studenthome',
    'faculty': '/facultyhome',
    'parent': '/parenthome'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const role = data.user?.role;
      if (!role || !dashboardRoutes[role]) {
        throw new Error('Unable to determine correct dashboard');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);

      navigate(dashboardRoutes[role]);
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
      localStorage.clear();
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <FaUserGraduate className="logo-icon" />
          <h1>Welcome Back!</h1>
          <p className="subtitle">Please enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <button 
            type="button" 
            className="google-button"
            onClick={() => window.location.href = 'http://localhost:3001/auth/google'}
          >
            <FaGoogle className="google-icon" />
            Sign in with Google
          </button>

          <p className="signup-link">
            Don't have an account? <Link to="/Create">Sign up</Link>
          </p>
        </form>
      </div>

      <div className="login-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
      </div>
    </div>
  );
}

export default Login;
