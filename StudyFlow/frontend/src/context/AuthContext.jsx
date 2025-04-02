import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import { onAuthStateChanged } from 'firebase/auth';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Create the provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial auth state check

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set user to null if logged out, user object if logged in
      setLoading(false); // Auth state check is complete
      console.log("Auth State Changed:", user ? `Logged in as ${user.email}` : "Logged out");
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []); // Empty dependency array ensures this runs only once on mount

  // Value provided by the context
  const value = {
    currentUser,
    // Add signup, login, logout functions here if needed,
    // though they are currently handled in the page components
  };

  // Render children only after the initial loading is complete
  // to prevent rendering protected routes prematurely
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
