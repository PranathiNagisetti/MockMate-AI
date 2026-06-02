const express = require("express");
const router = express.Router();
const upload =
require("../middleware/uploadMiddleware");
const InterviewSession = require(
  "../models/InterviewSession"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  generateInterviewQuestions
} = require("../utils/gemini");

const evaluateAnswer = require(
  "../utils/evaluateAnswer"
);


// START INTERVIEW
router.post(
  "/start",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        role,
        difficulty,
        experience
      } = req.body;
      if (!role || !difficulty || !experience) {

        return res.status(400).json({
          message:
            "Role, difficulty and experience are required"
        })

      }
      const aiQuestions =
      await generateInterviewQuestions(
          role,
          experience,
          5
        );

      if (
        !Array.isArray(aiQuestions) ||
        aiQuestions.length === 0
      ) {

        return res.status(500).json({
          message:
            "Failed to generate interview questions"
        });

      }

      const formattedQuestions =
        aiQuestions.map((q) => ({
          questionText: q,
          answerText: "",
          score: 0,
          feedback: {
            correctness: 0,
            clarity: 0,
            technicalDepth: 0,
            relevance: 0,
            communication: 0,
            overall: ""
          }
        }));

      const newSession =
        new InterviewSession({
          user: req.user.id,
          role,
          difficulty,
          questions: formattedQuestions,
          status: "Started"
        });

      await newSession.save();

      res.json({
        sessionId: newSession._id,
        questions: formattedQuestions
      });

    } catch (error) {

      console.log(
        "START INTERVIEW ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to start interview"
      });

    }

  }
);


// GET QUESTIONS
router.get(
  "/:sessionId",
  authMiddleware,
  async (req, res) => {

    try {

      const session =
        await InterviewSession.findById(
          req.params.sessionId
        );

      if (!session) {
        return res.status(404).json({
          message: "Session not found"
        });
      }

      const questions =
        session.questions.map(
          (q) => q.questionText
        );

      res.json({ questions });

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to load questions"
      });

    }

  }
);


// SUBMIT ANSWER
router.post(
  "/submit-answer",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        sessionId,
        questionIndex,
        answer
      } = req.body;

      const session =
        await InterviewSession.findById(
          sessionId
        );

      if (!session) {
        return res.status(404).json({
          message: "Session not found"
        });
      }

      session.questions[questionIndex]
        .answerText = answer;

      const evaluation =
        await evaluateAnswer(
          session.questions[questionIndex]
            .questionText,
          answer
        );

      session.questions[questionIndex]
        .score = evaluation.finalScore;

      session.questions[questionIndex]
        .feedback = {
          correctness:
            evaluation.correctness,

          clarity:
            evaluation.clarity,

          technicalDepth:
            evaluation.technicalDepth,

          relevance:
            evaluation.relevance,

          communication:
            evaluation.communication,

          overall:
            evaluation.feedback
        };

      await session.save();

     res.json({
      score: evaluation.finalScore,

      feedback: evaluation.feedback
    });

    } catch (error) {

      console.log(
        "START INTERVIEW ERROR:"
      )

      console.log(error)

      if(error.response){
        console.log(error.response.data)
      }

      res.status(500).json({
        message:
          "Failed to submit answer"
      });

    }

  }
);


// COMPLETE INTERVIEW
router.post(
  "/complete",
  authMiddleware,
  async (req, res) => {

    try {

      const { sessionId } = req.body;

      const session =
        await InterviewSession.findById(
          sessionId
        );

      if (!session) {
        return res.status(404).json({
          message: "Session not found"
        });
      }

      let totalScore = 0;

      session.questions.forEach((q) => {
        totalScore += q.score;
      });

      session.finalScore = totalScore;

      session.status = "Completed";

      await session.save();

      res.json({
        message:
          "Interview completed",
        finalScore: totalScore
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to complete interview"
      });

    }

  }
);


// SUMMARY
router.get(
  "/summary/:sessionId",
  authMiddleware,
  async (req, res) => {

    try {

      const session =
        await InterviewSession.findById(
          req.params.sessionId
        );

      if (!session) {
        return res.status(404).json({
          message: "Session not found"
        });
      }

      let strengths = [];
      let weaknesses = [];

      session.questions.forEach((q) => {

        if (q.score >= 7) {
          strengths.push(
            q.questionText
          );
        } else {
          weaknesses.push(
            q.questionText
          );
        }

      });

      const averageScore =
        session.questions.length > 0
          ? (
              session.finalScore /
              session.questions.length
            ).toFixed(1)
          : 0;

      res.json({
        totalScore:
          session.finalScore,

        averageScore,

        questions:
          session.questions,

        strengths,

        weaknesses,

        improvementTips: [
          "Provide more technical depth",
          "Use practical examples",
          "Explain concepts clearly",
          "Improve communication structure"
        ]
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to generate summary"
      });

    }

  }
);


// HISTORY
router.get(
  "/history",
  authMiddleware,
  async (req, res) => {

    try {

      const sessions =
        await InterviewSession.find({
          user: req.user.id
        }).sort({
          createdAt: -1
        });

      res.json(sessions);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch history"
      });

    }

  }
);

router.post(
  "/upload-video",
  authMiddleware,
  upload.single("video"),

  async (req, res) => {

    try {

      const { sessionId } = req.body;

      const session =
      await InterviewSession.findById(
        sessionId
      );

      if (!session) {

        return res.status(404).json({
          message: "Session not found"
        });

      }

      session.videoUrl =
        `/uploads/${req.file.filename}`;

      await session.save();

      res.json({
        videoUrl:
          session.videoUrl
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Video upload failed"
      });

    }

  }
);

module.exports = router;