import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage'; // Import DashboardPage component

// Placeholder components (we'll create separate files later)
// Removed inline LandingPage
// Removed inline LoginPage
// Removed inline SignupPage
// Removed inline DashboardPage
// Removed inline Navbar

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
