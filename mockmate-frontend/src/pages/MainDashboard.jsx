import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainDashboard() {

  const navigate = useNavigate();

  const cards = [
    {
      title: "Role Based Interviews",
      subtitle: "Practice interviews for Software Engineer, Frontend, Backend, ML, Data Science and more.",
      icon: "💼",
      color: "from-green-500 to-emerald-600",
      route: "/dashboard" 
    },
    {
      title: "Company Based Interviews",
      subtitle: "Experience interview patterns from Google, Amazon, Microsoft, Adobe, Flipkart and more.",
      icon: "🏢",
      color: "from-green-500 to-emerald-600",
      route: "/company-dashboard"
    },
    {
      title: "Resume Analysis",
      subtitle: "Upload your resume and receive AI feedback with ATS score and improvement suggestions.",
      icon: "📄",
      color: "from-green-500 to-emerald-600",
      route: "/resume-analyzer"
    },
    {
      title: "Coding Assessment",
      subtitle: "Practice coding questions with AI evaluation and company-wise coding challenges.",
      icon: "💻",
      color: "from-green-500 to-emerald-600",
      route: "/coding-dashboard"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">

        {/* Hero */}

        <div className="max-w-7xl mx-auto px-8 pt-12">

          <div className="text-center mb-14">

            <h1 className="text-5xl font-bold text-gray-800">
              MockMate AI
            </h1>

            <p className="mt-4 text-xl text-gray-600">
              Your Complete AI Interview Preparation Platform
            </p>

          </div>

          {/* Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {cards.map((card, index) => (

              <div
                key={index}
                onClick={() => navigate(card.route)}
                className="cursor-pointer rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >

                <div
                  className={`bg-gradient-to-r ${card.color} h-3`}
                />

                <div className="p-8">

                  <div className="text-6xl mb-5">
                    {card.icon}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {card.title}
                  </h2>

                  <p className="text-gray-600 mt-4 leading-7">
                    {card.subtitle}
                  </p>

                  <button
                    className={`mt-8 px-6 py-3 rounded-xl bg-gradient-to-r ${card.color} text-white font-semibold hover:scale-105 transition`}
                  >
                    Explore →
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Features */}

          <div className="mt-16 rounded-3xl bg-white shadow-lg p-10">

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Platform Features
            </h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">

              <div>

                <div className="text-4xl mb-3">🤖</div>

                <h3 className="font-bold text-lg">
                  AI Evaluation
                </h3>

                <p className="text-gray-600 mt-2">
                  Instant AI feedback on every answer.
                </p>

              </div>

              <div>

                <div className="text-4xl mb-3">📈</div>

                <h3 className="font-bold text-lg">
                  Performance Dashboard
                </h3>

                <p className="text-gray-600 mt-2">
                  Visual analytics of your interview performance.
                </p>

              </div>

              <div>

                <div className="text-4xl mb-3">🎯</div>

                <h3 className="font-bold text-lg">
                  Personalized Practice
                </h3>

                <p className="text-gray-600 mt-2">
                  Company and role specific interview preparation.
                </p>

              </div>

              <div>

                <div className="text-4xl mb-3">📑</div>

                <h3 className="font-bold text-lg">
                  Resume Insights
                </h3>

                <p className="text-gray-600 mt-2">
                  ATS score, keyword suggestions and AI improvements.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );

}

export default MainDashboard;