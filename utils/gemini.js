const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateInterviewQuestions(role, difficulty) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
  const prompt = `
  Generate 3 technical interview questions for a ${role}.
  Difficulty level: ${difficulty}.
  Return ONLY the questions as a JSON array.
  Example format:
  [
    "Question 1?",
    "Question 2?",
    "Question 3?"
  ]
  `;
  console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    // fallback if Gemini adds extra text
    const cleaned = text.substring(text.indexOf("["));
    return JSON.parse(cleaned);
  }
}

module.exports = generateInterviewQuestions;