import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const role = params.get('role');
    const name = params.get('name');

    if (token && role) {
      // Store the token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', name);

      // Redirect to the appropriate dashboard
      const dashboardRoutes = {
        'admin': '/adminhome',
        'student': '/studenthome',
        'faculty': '/facultyhome',
        'parent': '/parenthome'
      };

      navigate(dashboardRoutes[role] || '/');
    } else {
      // If no token or role, redirect to login
      navigate('/login');
    }
  }, [navigate, location]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Authenticating...</p>
    </div>
  );
}

export default OAuthSuccess;
