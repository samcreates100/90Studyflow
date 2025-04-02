import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { auth } from '../firebaseConfig'; // Import auth instance
import { signOut } from 'firebase/auth'; // Import signOut function

const Navbar = () => {
  const { currentUser } = useAuth(); // Get user from context
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout Error:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {currentUser ? ( // Check currentUser from context
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li> {/* Add onClick handler */}
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
