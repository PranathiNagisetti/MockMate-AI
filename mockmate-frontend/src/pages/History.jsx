import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function History() {
  const [sessions, setSessions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/interview/history");
        setSessions(res.data);
      } catch (err) {
        console.log(err);
        console.log("Response:", err.response?.data);
      }
    };

    fetchHistory();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 40) return "text-green-700";
    if (score >= 25) return "text-yellow-600";
    return "text-red-600";
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 text-gray-800">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-10">
         <h1 className="text-4xl font-extrabold text-green-700 mb-2">
            Interview History
          </h1>

          <p className="text-gray-600">
            Track your interview progress and
            monitor improvement over time.
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-green-100 p-6">
            <h3 className="text-gray-500 text-sm font-medium">
              Total Interviews
            </h3>

            <p className="text-4xl font-bold text-green-700 mt-2">
              {sessions.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-green-100 p-6">
            <h3 className="text-gray-500 text-sm font-medium">
              Completed
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {
                sessions.filter(
                  (s) => s.status === "Completed"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-green-100 p-6">
            <h3 className="text-gray-500 text-sm font-medium">
              Average Score
            </h3>

            <p className="text-4xl font-bold text-emerald-600 mt-2">
              {sessions.length > 0
                ? (
                    sessions.reduce(
                      (sum, item) =>
                        sum + item.finalScore,
                      0
                    ) / sessions.length
                  ).toFixed(1)
                : 0}
            </p>
          </div>

        </div>

        {/* Interview Cards */}
        <div className="max-w-7xl mx-auto px-6 pb-10">

          {sessions.length === 0 ? (

            <div className="bg-white shadow-lg border border-green-100 rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-bold text-green-700 mb-3">
                No Interviews Yet
              </h2>

              <p className="text-gray-600">
                Start your first mock interview
                to see history here.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {sessions.map((session) => (

                <div
                  key={session._id}
                  onClick={() =>
                    navigate(
                      `/history/${session._id}`
                    )
                  }
                className="bg-white border border-green-200 rounded-3xl p-6 cursor-pointer shadow-md hover:shadow-xl hover:border-green-500 transition-all duration-300 hover:-translate-y-2"                >

                  {/* Role */}
                  <h2 className="text-2xl font-bold text-green-700 mb-2">

                      {session.role === ""
                          ? session.company
                          : session.role}

                  </h2>

                  <p className="text-sm text-gray-500 mb-4">

                      {session.role === ""
                          ? "Company Based Interview"
                          : "Role Based Interview"}

                  </p>

                  {/* Status */}
                  <div className="flex justify-between items-center mb-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        session.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {session.status}
                    </span>

                    <span className="text-gray-500 text-sm">
                      {new Date(
                        session.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  {/* Difficulty */}
                 <div className="space-y-2">

                    <p className="text-gray-500">

                    Difficulty

                    <span className="ml-2 text-green-700 font-semibold  ">

                    {session.difficulty}

                    </span>

                    </p>

                    

                  </div>

                  {/* Final Score */}
                  <p className="text-gray-600 font-medium mt-4">
                    Final Score:
                    <span
                      className={`ml-2 font-bold ${getScoreColor(
                        session.finalScore
                      )}`}
                    >
                      {session.finalScore}
                    </span>
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </>
  );
}

export default History;