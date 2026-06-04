import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Java Developer",
    "Python Developer",
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Cyber Security Engineer",
    "Cloud Engineer",
    "Android Developer"
  ];

  const startInterview = async () => {
    if (!role || !difficulty || !experience) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/interview/start",
        {
          role,
          difficulty,
          experience
        }
      );

      navigate(
        `/interview/${res.data.sessionId}`
      );

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to start interview"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

        {/* Background Effects */}
        <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full top-10 left-10"></div>

        <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="text-center mb-12">

            <h1 className="text-5xl font-bold mb-4">
              Start Your AI Mock Interview
            </h1>

            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Practice with AI-powered interviews,
              receive detailed feedback,
              score analysis and personalized
              improvement suggestions.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* LEFT PANEL */}
            <div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                <h2 className="text-2xl font-semibold mb-6">
                  Interview Configuration
                </h2>

                {/* Role Grid */}
                <div className="mb-8">

                  <label className="block mb-4 text-slate-300">
                    Select Job Role
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    {roles.map((item) => (

                      <div
                        key={item}
                        onClick={() =>
                          setRole(item)
                        }
                        className={`cursor-pointer p-4 rounded-xl border text-center transition-all duration-300

                        ${
                          role === item
                            ? "bg-blue-600 border-blue-500 text-white shadow-lg"
                            : "bg-slate-800 border-slate-700 hover:border-blue-500 text-slate-300"
                        }
                        `}
                      >

                        {item}

                      </div>

                    ))}

                  </div>

                  {role && (

                    <p className="mt-4 text-green-400">
                      Selected Role:
                      <strong> {role}</strong>
                    </p>

                  )}

                </div>

                {/* Experience */}
                <div className="mb-6">

                  <label className="block mb-2 text-slate-300">
                    Years of Experience
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="20"
                    placeholder="2"
                    value={experience}
                    onChange={(e) =>
                      setExperience(
                        e.target.value
                      )
                    }
                    className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
                  />

                </div>

                {/* Difficulty */}
                <div className="mb-8">

                  <label className="block mb-3 text-slate-300">
                    Difficulty Level
                  </label>

                  <div className="grid grid-cols-3 gap-3">

                    {["Easy", "Medium", "Hard"].map(
                      (level) => (

                        <button
                          key={level}
                          onClick={() =>
                            setDifficulty(level)
                          }
                          className={`p-3 rounded-xl border transition-all duration-300

                          ${
                            difficulty === level
                              ? "bg-blue-600 border-blue-500"
                              : "bg-slate-800 border-slate-700 hover:border-blue-500"
                          }
                          `}
                        >

                          {level}

                        </button>

                      )
                    )}

                  </div>

                </div>

                {/* Start Button */}
                <button
                  onClick={startInterview}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-4 rounded-xl font-semibold text-lg shadow-lg"
                >

                  {loading
                    ? "Generating Questions..."
                    : "🚀 Start Interview"}

                </button>

              </div>

            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-6">

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                <h2 className="text-2xl font-semibold mb-6">
                  Platform Features
                </h2>

                <div className="space-y-5">

                  <div>
                    <h3 className="font-semibold text-blue-400">
                      🤖 AI Generated Questions
                    </h3>

                    <p className="text-slate-400">
                      Dynamic questions based on
                      role and experience.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-purple-400">
                      🎤 Voice Answering
                    </h3>

                    <p className="text-slate-400">
                      Answer naturally using
                      speech recognition.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-400">
                      📊 AI Evaluation
                    </h3>

                    <p className="text-slate-400">
                      Detailed scoring and
                      constructive feedback.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-orange-400">
                      🛡 Proctoring System
                    </h3>

                    <p className="text-slate-400">
                      Face detection, fullscreen
                      monitoring and anti-cheating.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-pink-400">
                      📄 AI Reports
                    </h3>

                    <p className="text-slate-400">
                      Download PDF reports with
                      strengths and weaknesses.
                    </p>
                  </div>

                </div>

              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
                  <h3 className="text-3xl font-bold text-blue-400">
                    AI
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Evaluation
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
                  <h3 className="text-3xl font-bold text-green-400">
                    PDF
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Reports
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
                  <h3 className="text-3xl font-bold text-purple-400">
                    Cam
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Proctoring
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;