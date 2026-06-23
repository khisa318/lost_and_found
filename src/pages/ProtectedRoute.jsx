import React from 'react'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({ children, role='user' }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  const isUserAuthenticated = localStorage.getItem('userToken');

  if (role === 'admin' && !isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (role === 'user' && !isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute