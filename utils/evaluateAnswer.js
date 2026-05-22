const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const evaluateAnswer = async (question, answer) => {

const model = genAI.getGenerativeModel({
model: "gemini-2.5-flash"
})

const prompt = `
You are a technical interviewer.

Evaluate the candidate's answer.

Question:
${question}

Candidate Answer:
${answer}

Return response ONLY in JSON format:

{
 "score": number (0-10),
 "feedback": "short constructive feedback"
}
`

const result = await model.generateContent(prompt)
const text = result.response.text()

const cleaned = text
.replace(/```json/g,"")
.replace(/```/g,"")
.trim()

return JSON.parse(cleaned)
}

module.exports = evaluateAnswer