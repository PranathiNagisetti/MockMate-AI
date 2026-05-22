const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const evaluateAnswer = async (
  question,
  answer
) => {

  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

  const prompt = `
You are a senior technical interviewer.

Evaluate the candidate answer STRICTLY.

SCORING CRITERIA:

1. Correctness (0-10)
- Is the answer technically correct?

2. Clarity (0-10)
- Is the answer understandable?

3. Technical Depth (0-10)
- Does the answer show deep understanding?

4. Relevance (0-10)
- Is the answer relevant to the question?

5. Communication (0-10)
- Is the answer professionally communicated?

VERY IMPORTANT RULES:

- Random text like:
  "jjjjj"
  "asdfgh"
  "12345"
  meaningless words
  repeated characters
  MUST receive 0.

- Short irrelevant answers MUST get very low scores.

- Do NOT reward answer length alone.

- Evaluate actual technical quality.

Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON in this exact format:

{
  "correctness": 0,
  "clarity": 0,
  "technicalDepth": 0,
  "relevance": 0,
  "communication": 0,
  "finalScore": 0,
  "feedback": "Detailed constructive feedback"
}
`;

  try {

    const result =
      await model.generateContent(prompt);

    const text =
      result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log(
      "EVALUATION ERROR:",
      error
    );

    return {
      correctness: 0,
      clarity: 0,
      technicalDepth: 0,
      relevance: 0,
      communication: 0,
      finalScore: 0,
      feedback:
        "Failed to evaluate answer"
    };

  }

};

module.exports = evaluateAnswer;