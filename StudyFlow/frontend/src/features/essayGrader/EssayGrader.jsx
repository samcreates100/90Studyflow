import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext'; // If needed later

// Define the backend API URL (adjust for production later)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const EssayGrader = () => {
  // const { currentUser } = useAuth(); // If needed later
  const [essayText, setEssayText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGradeEssay = async (e) => {
    e.preventDefault();
    if (!essayText.trim()) {
      setError('Please enter essay text to grade.');
      return;
    }
    setError('');
    setLoading(true);
    setFeedback('');
    setScore(null);

    try {
      // Call the backend API endpoint
      console.log(`Calling backend API: ${API_URL}/api/grade`);
      const response = await fetch(`${API_URL}/api/grade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ essay: essayText }), // Send 'essay' field
      });

      console.log("API response status:", response.status);
      const result = await response.json();

      if (!response.ok) {
        // Handle HTTP errors
        console.error("API Error:", result);
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      console.log("API result:", result);
      // Extract feedback and score from the result data
      const feedbackFromServer = result.feedback;
      const scoreFromServer = result.grade; // Backend sends 'grade'
      setFeedback(feedbackFromServer);
      setScore(scoreFromServer);

    } catch (err) {
      console.error("Error calling backend API:", err);
      setError(err.message || 'Failed to grade essay. Please check the console and ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Correct JSX structure with standard angle brackets
  return (
    <div>
      <h2>Essay Grader</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleGradeEssay}>
        <div>
          <label htmlFor="essayText">Essay Text:</label>
          <textarea
            id="essayText"
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            rows="15"
            cols="60"
            required
            placeholder="Paste your essay here..."
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Grading...' : 'Grade Essay'}
        </button>
      </form>

      {/* Keep loading indicator separate */}
      {loading && <p>Grading in progress...</p>}

      {!loading && feedback && (
        <div>
          <h3>Feedback:</h3>
          <p>{feedback}</p>
          {score !== null && <h4>Score: {score}/100</h4>}
        </div>
      )}
    </div>
  );
};

export default EssayGrader;
