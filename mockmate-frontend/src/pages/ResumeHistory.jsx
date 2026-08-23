import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ResumeHistory() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/resume/history");
        setReports(res.data);
      } catch (err) {
        console.log(err);
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const averageScore =
    reports.length > 0
      ? (
          reports.reduce((sum, item) => sum + item.atsScore, 0) /
          reports.length
        ).toFixed(1)
      : 0;

  const highestScore =
    reports.length > 0
      ? Math.max(...reports.map((r) => r.atsScore))
      : 0;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

        {/* Header */}

        <div className="max-w-7xl mx-auto px-6 py-10">

          <h1 className="text-4xl font-extrabold text-green-700">
            Resume Analysis History
          </h1>

          <p className="text-gray-600 mt-2">
            View all your previous AI Resume Analyses.
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="text-center text-xl font-semibold text-green-700">
            Loading...
          </div>
        )}

        {!loading && (
          <>
            {/* Stats */}

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-10">

              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">

                <p className="text-gray-500">
                  Total Analyses
                </p>

                <h2 className="text-4xl font-bold text-green-700 mt-2">
                  {reports.length}
                </h2>

              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">

                <p className="text-gray-500">
                  Highest ATS Score
                </p>

                <h2 className="text-4xl font-bold text-emerald-600 mt-2">
                  {highestScore}
                </h2>

              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">

                <p className="text-gray-500">
                  Average ATS Score
                </p>

                <h2 className="text-4xl font-bold text-green-600 mt-2">
                  {averageScore}
                </h2>

              </div>

            </div>

            {/* Empty */}

            {reports.length === 0 ? (

              <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-10 text-center">

                  <h2 className="text-2xl font-bold text-gray-700">

                    No Resume Analysis Found

                  </h2>

                  <p className="text-gray-500 mt-3">

                    Analyze your first resume to see it here.

                  </p>

                </div>

              </div>

            ) : (

              <div className="max-w-7xl mx-auto px-6 pb-10">

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {reports.map((report) => (

                    <div
                      key={report._id}
                      onClick={() =>
                        navigate(`/resume/history/${report._id}`)
                      }
                      className="bg-white rounded-3xl border border-green-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer p-6"
                    >

                      <div className="flex justify-between items-start">

                        <h2 className="text-xl font-bold text-green-700">

                          📄 Resume

                        </h2>

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                          {report.status}

                        </span>

                      </div>

                      <p className="mt-4 text-gray-700 font-semibold truncate">

                        {report.resumeName}

                      </p>

                      <div className="mt-5">

                        <div className="flex justify-between mb-2">

                          <span className="text-gray-500">

                            ATS Score

                          </span>

                          <span className="font-bold text-green-700">

                            {report.atsScore}/100

                          </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3">

                          <div
                            className="bg-green-600 h-3 rounded-full"
                            style={{
                              width: `${report.atsScore}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                      <div className="mt-5">

                        <p className="text-gray-500 text-sm">

                          {new Date(
                            report.createdAt
                          ).toLocaleString()}

                        </p>

                      </div>

                      <button
                        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                      >

                        View Full Report →

                      </button>

                    </div>

                  ))}

                </div>

              </div>

            )}
          </>
        )}
      </div>
    </>
  );
}

export default ResumeHistory;