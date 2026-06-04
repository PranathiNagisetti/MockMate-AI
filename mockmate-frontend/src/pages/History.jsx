import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function History() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get(
          "/interview/history"
        );

        setSessions(res.data);

      } catch (err) {
        console.log(err);
        console.log("Response:", err.response?.data);
      }
    };

    fetchHistory();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 40)
      return "text-green-400";

    if (score >= 25)
      return "text-yellow-400";

    return "text-red-400";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white">

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-10">

          <h1 className="text-4xl font-bold mb-2">
            Interview History
          </h1>

          <p className="text-slate-400">
            Track your interview progress and
            monitor improvement over time.
          </p>

        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h3 className="text-slate-400 text-sm">
              Total Interviews
            </h3>

            <p className="text-4xl font-bold mt-2">
              {sessions.length}
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h3 className="text-slate-400 text-sm">
              Completed
            </h3>

            <p className="text-4xl font-bold text-green-400 mt-2">
              {
                sessions.filter(
                  (s) =>
                    s.status === "Completed"
                ).length
              }
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h3 className="text-slate-400 text-sm">
              Average Score
            </h3>

            <p className="text-4xl font-bold text-blue-400 mt-2">

              {sessions.length > 0
                ? (
                    sessions.reduce(
                      (sum, item) =>
                        sum +
                        item.finalScore,
                      0
                    ) / sessions.length
                  ).toFixed(1)
                : 0}

            </p>

          </div>

        </div>

        {/* History Cards */}
        <div className="max-w-7xl mx-auto px-6 pb-10">

          {sessions.length === 0 ? (

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">

              <h2 className="text-2xl font-semibold mb-3">
                No Interviews Yet
              </h2>

              <p className="text-slate-400">
                Start your first mock interview
                to see history here.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {sessions.map((session) => (

                <div
                  key={session._id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
                >

                  {/* Role */}
                  <h2 className="text-xl font-semibold mb-4">
                    {session.role}
                  </h2>

                  {/* Status */}
                  <div className="flex justify-between items-center mb-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm
                      ${
                        session.status ===
                        "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {session.status}
                    </span>

                    <span className="text-slate-500 text-sm">
                      {new Date(
                        session.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  {/* Difficulty */}
                  <p className="text-slate-400 mb-2">
                    Difficulty:
                    <span className="ml-2 text-white">
                      {session.difficulty}
                    </span>
                  </p>

                  {/* Score */}
                  <p className="text-slate-400">
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