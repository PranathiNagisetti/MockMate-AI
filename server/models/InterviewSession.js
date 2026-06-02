const mongoose = require("mongoose");

const InterviewSessionSchema = new mongoose.Schema(
  {
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
        questionText: {
          type: String,
          default: ""
        },

        answerText: {
          type: String,
          default: ""
        },

        score: {
          type: Number,
          default: 0
        },

        feedback: {
          correctness: {
            type: Number,
            default: 0
          },

          clarity: {
            type: Number,
            default: 0
          },

          technicalDepth: {
            type: Number,
            default: 0
          },

          relevance: {
            type: Number,
            default: 0
          },

          communication: {
            type: Number,
            default: 0
          },

          overall: {
            type: String,
            default: ""
          }
        }
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
    },

    videoUrl: {
      type: String,
      default: ""
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "InterviewSession",
  InterviewSessionSchema
);