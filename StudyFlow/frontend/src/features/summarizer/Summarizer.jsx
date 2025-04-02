import React, { useState } from 'react';
// We might need useAuth later if summaries are saved per user
// import { useAuth } from '../../context/AuthContext';

// Define the backend API URL (adjust for production later)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Summarizer = () => {
  // const { currentUser } = useAuth(); // If needed later
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError('Please enter text to summarize.');
      return;
    }
    setError('');
    setLoading(true);
    setSummary(''); // Clear previous summary

    try {
      // Call the backend API endpoint
      console.log(`Calling backend API: ${API_URL}/api/summarize`);
      const response = await fetch(`${API_URL}/api/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      console.log("API response status:", response.status);
      const result = await response.json();

      if (!response.ok) {
        // Handle HTTP errors (e.g., 400, 500)
        console.error("API Error:", result);
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      console.log("API result:", result);
      // Extract summary from the result data
      const summaryFromServer = result.summary;
      setSummary(summaryFromServer);

    } catch (err) {
      console.error("Error calling backend API:", err);
      setError(err.message || 'Failed to summarize text. Please check the console and ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Text Summarizer</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSummarize}>
        <div>
          <label htmlFor="textToSummarize">Text to Summarize:</label>
          <textarea
            id="textToSummarize"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows="10"
            cols="50"
            required
            placeholder="Paste your text here..."
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </form>

      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
