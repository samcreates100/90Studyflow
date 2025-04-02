import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import { createUserWithEmailAndPassword } from "firebase/auth";
// Optional: Import Firestore to save user profile data upon signup
// import { db } from '../firebaseConfig';
// import { doc, setDoc } from "firebase/firestore";

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      // Create user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Signup successful!', user);

      // Optional: Create a user document in Firestore
      // try {
      //   await setDoc(doc(db, "users", user.uid), {
      //     email: user.email,
      //     createdAt: new Date(),
      //     subscriptionStatus: 'trial', // Or 'free'
      //     // Add other default fields
      //   });
      //   console.log("User profile created in Firestore");
      // } catch (firestoreError) {
      //   console.error("Error creating user profile in Firestore:", firestoreError);
      //   // Decide how to handle this - maybe delete the auth user or log it
      // }

      // Firebase's onAuthStateChanged listener should handle redirection.
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message); // Display Firebase error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
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
            minLength="6" // Firebase default minimum
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {/* Optional: Add link to Login page */}
      {/* <p>Already have an account? <Link to="/login">Login</Link></p> */}
    </div>
  );
}

export default SignupPage;
