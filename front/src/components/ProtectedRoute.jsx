import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" />;
  }

  try {
    // Manually decode the token to get the payload
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(base64));

    const userRole = decodedPayload.role; // Assuming the token contains a 'role' field

    // Check if the user's role is in the list of required roles
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      // If user role is not authorized, redirect to unauthorized page or login
      return <Navigate to="/" />;
    }

    // If user is authorized, render the children components
    return children;
  } catch (error) {
    console.error('Invalid token:', error);
    // If the token is invalid, redirect to login
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
