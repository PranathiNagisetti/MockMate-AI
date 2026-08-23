import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";
function CodingDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const startAssessment = async () => {
    try {
      setLoading(true);

      const res = await API.post("/coding/start");

      navigate(`/coding/${res.data.assessmentId}`);
    } catch (err) {
      console.log(err);
      alert("Unable to start assessment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-50">
        

        <div className="max-w-7xl mx-auto px-8 py-12">

          {/* Header */}

          <div className="text-center mb-12">

            <h1 className="text-5xl font-extrabold text-green-700">
              Coding Assessment
            </h1>
            <div className="mb-6">

                <button
                    onClick={() => navigate("/main-dashboard")}
                    className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors font-medium"
                >
                    <ArrowLeft size={24} />
                    <span>Back</span>
                </button>

            </div>

            <p className="mt-4 text-gray-600 text-lg">
              Test your coding skills in a real interview environment.
            </p>

          </div>

          {/* Cards */}

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Assessment Details */}

            <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-8">

              <h2 className="text-2xl font-bold text-green-700 mb-8">
                📋 Assessment Details
              </h2>

              <div className="space-y-5 text-gray-700">

                <div className="flex justify-between border-b pb-3">
                  <span>⏱ Duration</span>
                  <span className="font-semibold text-green-700">
                    45 Minutes
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>📝 Questions</span>
                  <span className="font-semibold text-green-700">
                    2 Problems
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>🎯 Difficulty</span>
                  <span className="font-semibold text-green-700">
                    Easy • Medium • Hard
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>💻 Languages</span>

                  <span className="font-semibold text-green-700">
                    Java, Python,
                    <br />
                    C++, JavaScript
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>📊 Evaluation</span>

                  <span className="font-semibold text-green-700">
                    Hidden Test Cases
                  </span>
                </div>

              </div>

            </div>

            {/* Instructions */}

            <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-8">

              <h2 className="text-2xl font-bold text-green-700 mb-8">
                📖 Instructions
              </h2>

              <ul className="space-y-4 text-gray-700">

                <li className="flex items-start gap-3">
                  ✅ Write the complete program.
                </li>

                <li className="flex items-start gap-3">
                  ✅ Read input from Standard Input.
                </li>

                <li className="flex items-start gap-3">
                  ✅ Print output to Standard Output.
                </li>

                <li className="flex items-start gap-3">
                  ✅ Run your code unlimited times before submitting.
                </li>

                <li className="flex items-start gap-3">
                  ✅ Hidden test cases determine your final score.
                </li>

                <li className="flex items-start gap-3">
                  ✅ Timer starts immediately after beginning.
                </li>

                <li className="flex items-start gap-3">
                  ✅ Assessment auto-submits after 45 minutes.
                </li>

              </ul>

            </div>

          </div>

          {/* Start Button */}

          <div className="mt-14 flex justify-center">

            <button
              onClick={startAssessment}
              disabled={loading}
              className="px-12 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xl font-semibold shadow-lg transition duration-300 disabled:bg-green-300"
            >
              {loading
                ? "Preparing Assessment..."
                : "🚀 Start Coding Assessment"}
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default CodingDashboard;