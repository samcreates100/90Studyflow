import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      // Sign in using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      // On successful login, Firebase's onAuthStateChanged listener
      // (which we'll set up later) should handle redirection.
      console.log('Login successful!');
      // You might want to redirect the user here or manage state globally
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message); // Display Firebase error message
    } finally {
      setLoading(false); // Ensure loading state is turned off
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {/* Optional: Add link to Signup page */}
      {/* <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> */}
    </div>
  );
}

export default LoginPage;
