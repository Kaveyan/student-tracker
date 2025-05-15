import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import src from '../img/Free Vector _ Unboxing concept illustration.jpeg';

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
    <div className="background">
      <div className="img">
        <img src={src} alt="Login Illustration" />
      </div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h3>Login Here</h3>

          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Log In</button>
          <div className="new">
            <p>Don't have an account? <Link to="/Create">Signup</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
