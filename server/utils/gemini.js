const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const MODEL_CANDIDATES = [
  
  "gemini-2.5-flash"
];

const buildPrompt = (
  role,
  experience,
  count
) => `

Act as a professional technical interviewer.

Generate ${count} interview questions.

Role: ${role}
Experience: ${experience} years

Requirements:
- Include technical questions
- Include coding questions
- Include conceptual questions
- Include problem-solving questions
- Questions should match experience level
- Questions should be realistic
- Mix moderate and challenging questions

IMPORTANT:
Return ONLY a valid JSON array.
Do NOT return markdown.
Do NOT return explanation.
Do NOT return extra text.

Example:
[
  "What is React?",
  "Explain closures in JavaScript",
  "Write a function to reverse a string"
]
`;

const generateInterviewQuestions = async (
  role,
  experience,
  count = 5
) => {

  if (!process.env.GEMINI_API_KEY) {

    throw new Error(
      "GEMINI_API_KEY missing in .env"
    );

  }

  const prompt = buildPrompt(
    role,
    experience,
    count
  );

  let lastError = null;

  for (const modelName of MODEL_CANDIDATES) {

    try {

      console.log(
        `Trying model: ${modelName}`
      );

      const model =
        genAI.getGenerativeModel({
          model: modelName
        });

      const result =
        await model.generateContent(
          prompt
        );

      const text =
        result.response.text();

      console.log(
        "RAW GEMINI RESPONSE:",
        text
      );

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed =
        JSON.parse(cleaned);

      if (!Array.isArray(parsed)) {

        throw new Error(
          "Gemini response is not array"
        );

      }

      return parsed;

    } catch (error) {

      console.log(
        `MODEL ${modelName} FAILED`
      );

      console.log(error.message);

      lastError = error;

    }

  }

  throw new Error(
    `Failed to generate questions: ${lastError?.message}`
  );

};

module.exports = {
  generateInterviewQuestions
};