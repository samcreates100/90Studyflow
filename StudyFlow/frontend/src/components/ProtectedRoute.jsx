import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the custom hook

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth(); // Get the current user from the context

  // If there's no logged-in user, redirect to the login page
  if (!currentUser) {
    // You can pass the intended destination via state if you want to redirect
    // back after successful login, but we'll keep it simple for now.
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the child components (the actual protected page)
  return children;
}

export default ProtectedRoute;
