const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (only once)
admin.initializeApp();

/**
 * Summarizes the text provided in the data payload.
 *
 * @param {object} data The data passed to the function.
 * @param {string} data.text The text to summarize.
 * @param {object} context The context object.
 * @param {object} context.auth Information about the authenticated user.
 * @returns {Promise<object>} A promise that resolves with the summary object.
 */
exports.summarizeText = functions.https.onCall(async (data, context) => {
  // 1. Authentication Check
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
        "unauthenticated", // Code
        "The function must be called while authenticated.", // Message
    );
  }

  // 2. Input Validation: Check if text was provided.
  const textToSummarize = data.text;
  if (!(typeof textToSummarize === "string") || textToSummarize.length === 0) {
    // Throwing an HttpsError for invalid arguments.
    throw new functions.https.HttpsError(
        "invalid-argument", // Code
        "The function must be called with \"text\" argument.", // Message
    );
  }

  // --- Placeholder Summarization Logic ---
  // In a real implementation, you would:
  // - Get your API key securely (e.g., using environment configuration:
  //   functions.config().summarizer.key)
  // - Make a request to an external summarization API (e.g., OpenAI,
  //   Cohere, etc.)
  // - Handle potential errors from the API call.
  functions.logger.info(
      `Summarizing text for user: ${context.auth.uid}`,
      {textLength: textToSummarize.length},
  );

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate successful response
    const summary = `[Server Placeholder] Summary of: ` +
                    `${textToSummarize.substring(0, 50)}...`;

    // Returning the summary object.
    return {summary: summary};
  } catch (error) {
    functions.logger.error("Summarization failed (Placeholder)", {error});
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
        "internal", // Code
        "Failed to summarize text.", // Message
        error, // Optional: include details for server logs
    );
  }
  // --- End Placeholder Logic ---
});

/**
 * Grades the essay text provided in the data payload.
 *
 * @param {object} data The data passed to the function.
 * @param {string} data.text The essay text to grade.
 * @param {object} context The context object.
 * @param {object} context.auth Information about the authenticated user.
 * @returns {Promise<object>} A promise that resolves with the grading object.
 */
exports.gradeEssay = functions.https.onCall(async (data, context) => {
  // 1. Authentication Check
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
        "unauthenticated", // Code
        "The function must be called while authenticated.", // Message
    );
  }

  // 2. Input Validation
  const essayText = data.text;
  if (!(typeof essayText === "string") || essayText.length === 0) {
    // Throwing an HttpsError for invalid arguments.
    throw new functions.https.HttpsError(
        "invalid-argument", // Code
        "The function must be called with \"text\" argument.", // Message
    );
  }

  // --- Placeholder Grading Logic ---
  // In a real implementation, you would:
  // - Get API keys securely.
  // - Call an external essay grading API.
  // - Handle errors from the API.
  functions.logger.info(
      `Grading essay for user: ${context.auth.uid}`,
      {textLength: essayText.length},
  );

  try {
    // Simulate API call delay (longer for grading)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate successful response
    const feedback = "[Server Placeholder Feedback] The essay demonstrates " +
                     "a basic understanding but lacks depth. " +
                     "More examples needed.";
    const score = Math.floor(Math.random() * 31) + 65; // Random score 65-95

    // Returning the feedback and score object.
    return {feedback: feedback, score: score};
  } catch (error) {
    functions.logger.error("Essay grading failed (Placeholder)", {error});
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
        "internal", // Code
        "Failed to grade essay.", // Message
        error,
    );
  }
  // --- End Placeholder Logic ---
});
