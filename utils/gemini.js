const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const MODEL_CANDIDATES = ["gemini-2.0-flash", "gemini-2.5-flash"]

const buildPrompt = (role, experience, count) => `
Act as a technical interviewer.

Generate ${count} interview questions for a ${role}
with ${experience} years of experience.

Include:
- technical questions
- coding questions
- conceptual questions

Return ONLY a JSON array.

Example:
[
"Question 1",
"Question 2",
"Question 3"
]
`

const generateInterviewQuestions = async (role, experience, count) => {

    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing in server/.env")
    }

    const prompt = buildPrompt(role, experience, count)
    let lastError = null

    for (const modelName of MODEL_CANDIDATES) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName })
            const result = await model.generateContent(prompt)
            const text = result.response.text()

            const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim()

            return JSON.parse(cleaned)
        } catch (error) {
            lastError = error
        }
    }

    throw new Error(`Failed to generate questions: ${lastError?.message}`)
}

module.exports = { generateInterviewQuestions }