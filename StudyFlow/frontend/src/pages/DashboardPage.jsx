import React from 'react';
import { useAuth } from '../context/AuthContext';
import NoteTaker from '../features/notes/NoteTaker';
import Summarizer from '../features/summarizer/Summarizer';
import EssayGrader from '../features/essayGrader/EssayGrader';
import PersonalizedQuizzes from '../features/personalizedQuizzes/PersonalizedQuizzes'; // Import the PersonalizedQuizzes feature

const DashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {currentUser && <p>Welcome, {currentUser.email}!</p>}

      <hr />
      <NoteTaker /> {/* Render the NoteTaker component */}
      <hr />
      <Summarizer /> {/* Render the Summarizer component */}
      <hr />
      <EssayGrader /> {/* Render the EssayGrader component */}
      <hr />
      <PersonalizedQuizzes /> {/* Render the PersonalizedQuizzes component */}
      <hr />
      {/* Removed the "Other Tools" section as all planned features are now included */}
    </div>
  );
};

export default DashboardPage;
