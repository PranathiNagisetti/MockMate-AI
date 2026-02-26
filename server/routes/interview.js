const express = require("express");
const router = express.Router();
const InterviewSession = require("../models/InterviewSession");
const authMiddleware = require("../middleware/authMiddleware");
const generateInterviewQuestions = require("../utils/gemini");
// 🔥 Start Interview
router.post("/start", authMiddleware, async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    // 🔥 Generate AI Questions
    const aiQuestions = await generateInterviewQuestions(role, difficulty);

    const formattedQuestions = aiQuestions.map(q => ({
      questionText: q,
      answerText: "",
      score: 0,
      feedback: ""
    }));

    const newSession = new InterviewSession({
      user: req.user,
      role,
      difficulty,
      questions: formattedQuestions,   // ✅ FIXED
      status: "Started"
    });

    await newSession.save();

    res.status(201).json({
      message: "Interview session started",
      sessionId: newSession._id,
      questions: formattedQuestions   // ✅ FIXED
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// 🔥 Submit Answer
router.post("/submit-answer", authMiddleware, async (req, res) => {
  try {
    const { sessionId, questionIndex, answer } = req.body;

    const session = await InterviewSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update answer
    session.questions[questionIndex].answerText = answer;

    // 🔥 Temporary Scoring Logic (Basic)
    let score = 0;
    let feedback = "";

    if (answer.length > 50) {
      score = 8;
      feedback = "Good detailed answer.";
    } else {
      score = 4;
      feedback = "Answer needs more depth.";
    }

    session.questions[questionIndex].score = score;
    session.questions[questionIndex].feedback = feedback;

    await session.save();

    res.json({
      message: "Answer submitted",
      score,
      feedback
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔥 Complete Interview
router.post("/complete", authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await InterviewSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Calculate final score
    let totalScore = 0;
    session.questions.forEach(q => {
      totalScore += q.score;
    });

    session.finalScore = totalScore;
    session.status = "Completed";

    await session.save();

    res.json({
      message: "Interview completed",
      finalScore: totalScore,
      totalQuestions: session.questions.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;