const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const evaluateAnswer = async (
  question,
  answer
) => {

  // HANDLE EMPTY ANSWERS
  if (
    !answer ||
    answer.trim().length < 3
  ) {

    return {
      correctness: 0,
      clarity: 0,
      technicalDepth: 0,
      relevance: 0,
      communication: 0,
      finalScore: 0,
      feedback:
        "Answer is too short or empty."
    };

  }

  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

  const prompt = `
You are a senior technical interviewer.

Evaluate the candidate answer STRICTLY.

SCORING CRITERIA:

1. Correctness (0-10)
2. Clarity (0-10)
3. Technical Depth (0-10)
4. Relevance (0-10)
5. Communication (0-10)

IMPORTANT RULES:
- Random text like "jjjj", "asdf", meaningless words must get 0.
- Do NOT reward answer length.
- Evaluate actual technical quality only.
- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT include explanation outside JSON.

Question:
${question}

Candidate Answer:
${answer}

Return EXACTLY this format:

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

    console.log(
      "RAW EVALUATION RESPONSE:",
      text
    );

    // CLEAN RESPONSE
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // EXTRACT JSON SAFELY
    const jsonMatch =
      cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {

      throw new Error(
        "No valid JSON found"
      );

    }

    const parsed =
      JSON.parse(jsonMatch[0]);

    // SAFETY DEFAULTS
    return {
      correctness:
        parsed.correctness || 0,

      clarity:
        parsed.clarity || 0,

      technicalDepth:
        parsed.technicalDepth || 0,

      relevance:
        parsed.relevance || 0,

      communication:
        parsed.communication || 0,

      finalScore:
        parsed.finalScore || 0,

      feedback:
        parsed.feedback ||
        "No feedback available"
    };

  } catch (error) {

    console.log(
      "EVALUATION ERROR:",
      error.message
    );

    return {
      correctness: 0,
      clarity: 0,
      technicalDepth: 0,
      relevance: 0,
      communication: 0,
      finalScore: 0,
      feedback:
        "AI evaluation failed. Please try again."
    };

  }

};

module.exports = evaluateAnswer;