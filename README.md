# MockMate-AI
🚀 MockMate.ai

**AI-Powered Mock Interview Platform**

MockMate.ai is a full-stack AI-driven mock interview platform designed to simulate real-world technical interviews. It generates dynamic, role-based interview questions and evaluates responses using NLP-based rubric scoring.

**🎯 Features**

🔐 Secure JWT-based authentication

🤖 AI-generated interview questions (Gemini API)

📝 Text-based interview mode

🎙️ Voice-based interview mode (Speech-to-Text)

📊 NLP-based rubric scoring system

📈 Performance analytics and session tracking

🗄️ MongoDB-based scalable data storage

**🏗️ Tech Stack**

    Frontend: React.js
    Backend: Node.js, Express.js
    Database: MongoDB (Mongoose)
    Authentication: JWT
    AI Integration: Gemini API
    Speech Processing: Web Speech API / Speech-to-Text


**🧠 How It Works**

  1.User registers and logs in securely.
    
  2.User selects role and difficulty level.
    
  3.AI generates tailored interview questions.
    
  4.User answers via text or voice.
    
  5.NLP-based engine evaluates responses.
    
  6.System generates rubric-based score and feedback.
    
  7.Results are stored for performance tracking.

**📂 Project Structure**

              MockMate/
              │
              ├── client/        # React frontend
              ├── server/        # Node + Express backend
              │   ├── models/
              │   ├── routes/
              │   ├── middleware/
              │   └── server.js
              └── README.md
