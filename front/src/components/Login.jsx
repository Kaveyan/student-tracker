import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import src from '../img/Free Vector _ Unboxing concept illustration.jpeg';

function Login() {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed!');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store the JWT token in localStorage

      // Redirect based on role
      if (role === 'admin') {
        navigate('/adminhome');
      } else if (role === 'student') {
        navigate('/studenthome');
      } else if (role === 'faculty') {
        navigate('/facultyhome');
      } else if (role === 'parent') {
        navigate('/studenthome');
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
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

          <label htmlFor="role">Enter As</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="parent">Parent</option>
          </select>

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
            <p>
              Don't have an account? <Link to="/Create">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
