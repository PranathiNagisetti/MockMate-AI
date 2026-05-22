const mongoose = require("mongoose");

const InterviewSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },
  questions: [
    {
      questionText: String,
      answerText: String,
      score: Number,
      feedback: String
    }
  ],
  finalScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["Started", "Completed"],
    default: "Started"
  }
}, { timestamps: true });

module.exports = mongoose.model("InterviewSession", InterviewSessionSchema);