const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Render sets the PORT environment variable

// Middleware
app.use(cors()); // Allow requests from any origin (adjust for production later if needed)
app.use(express.json()); // Parse JSON request bodies

// --- API Routes ---

// Placeholder Summarizer Endpoint
app.post('/api/summarize', (req, res) => {
  const { text } = req.body;
  console.log('Received text for summarization (length):', text?.length);

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid text provided for summarization.' });
  }

  // Placeholder: Simulate processing and return a dummy summary
  // In a real scenario, this would call an AI service
  const summary = `This is a placeholder summary for the provided text (first 50 chars): "${text.substring(0, 50)}..."`;
  console.log('Sending summary:', summary);
  res.json({ summary });
});

// Placeholder Essay Grader Endpoint
app.post('/api/grade', (req, res) => {
  const { essay } = req.body;
  console.log('Received essay for grading (length):', essay?.length);

   if (!essay || typeof essay !== 'string' || essay.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid essay provided for grading.' });
  }

  // Placeholder: Simulate grading and return dummy feedback
  // In a real scenario, this would call an AI service
  const grade = Math.floor(Math.random() * 41) + 60; // Random grade between 60-100
  const feedback = `This is placeholder feedback. The essay shows potential but needs more development in argumentation. (Score: ${grade}/100)`;
  console.log('Sending grade/feedback:', grade, feedback);
  res.json({ grade, feedback });
});

// Health Check Route (optional but good practice)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


// Start Server
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
//Had to make a commit