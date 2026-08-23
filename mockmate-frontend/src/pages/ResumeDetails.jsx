import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ResumeDetails() {
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await API.get(`/resume/history/${id}`);
        setResult(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-green-700">
            Loading Resume Analysis...
          </h2>
        </div>
      </>
    );
  }

  if (!result) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-red-600">
            Analysis Not Found
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-10">

        <div className="max-w-6xl mx-auto space-y-6 px-4">

          {/* Header */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100">

            <h1 className="text-4xl font-bold text-green-700">
              Resume Analysis Report
            </h1>

            <p className="text-gray-600 mt-2">
              {result.resumeName}
            </p>

          </div>

          {/* ATS */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100">

            <h2 className="text-2xl font-bold text-gray-800">
              ATS Score
            </h2>

            <div className="mt-5">

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Overall Score
                </span>

                <span className="text-4xl font-bold text-green-600">
                  {result.atsScore}/100
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">

                <div
                  className="bg-green-600 h-4 rounded-full"
                  style={{
                    width: `${result.atsScore}%`,
                  }}
                ></div>

              </div>

            </div>

          </div>

          {/* Summary */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100">

            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Professional Summary
            </h2>

            <p className="text-gray-700 leading-8">
              {result.summary || "No Summary"}
            </p>

          </div>

          {/* Strengths */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100">

            <h2 className="text-2xl font-bold text-green-700 mb-5">
              Strengths
            </h2>

            <ul className="space-y-3">

              {result.strengths?.map((item, index) => (

                <li key={index} className="text-gray-700">

                  ✅ {item}

                </li>

              ))}

            </ul>

          </div>

          {/* Weaknesses */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-red-100">

            <h2 className="text-2xl font-bold text-red-600 mb-5">
              Weaknesses
            </h2>

            <ul className="space-y-3">

              {result.weaknesses?.map((item, index) => (

                <li key={index} className="text-gray-700">

                  ❌ {item}

                </li>

              ))}

            </ul>

          </div>

          {/* Missing Keywords */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-yellow-100">

            <h2 className="text-2xl font-bold text-yellow-700 mb-5">
              Missing Keywords
            </h2>

            <div className="flex flex-wrap gap-3">

              {result.missingKeywords?.map((item, index) => (

                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full"
                >
                  {item}
                </span>

              ))}

            </div>

          </div>

          {/* Grammar */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-red-100">

            <h2 className="text-2xl font-bold text-red-600 mb-5">
              Grammar Issues
            </h2>

            <ul className="space-y-3">

              {result.grammarIssues?.map((item, index) => (

                <li key={index} className="text-gray-700">

                  • {item}

                </li>

              ))}

            </ul>

          </div>

          {/* Section Scores */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100">

            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Section Scores
            </h2>

            {Object.entries(result.sectionScores || {}).map(
              ([section, score]) => (

                <div
                  key={section}
                  className="mb-5"
                >

                  <div className="flex justify-between mb-2">

                    <span className="capitalize text-gray-700 font-semibold">

                      {section}

                    </span>

                    <span className="font-bold text-green-700">

                      {score}/10

                    </span>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{
                        width: `${score * 10}%`,
                      }}
                    ></div>

                  </div>

                </div>

              )
            )}

          </div>

          {/* Suggestions */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-blue-100">

            <h2 className="text-2xl font-bold text-blue-700 mb-5">
              Suggestions
            </h2>

            <ul className="space-y-4">

              {result.suggestions?.map((item, index) => (

                <li key={index} className="text-gray-700">

                  💡 {item}

                </li>

              ))}

            </ul>

          </div>

          {/* Recruiter */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100">

            <h2 className="text-2xl font-bold text-green-700 mb-5">
              Recruiter's View
            </h2>

            <p className="text-gray-700 leading-8">
              {result.recruiterView}
            </p>

          </div>

          {/* Verdict */}

          <div className="bg-green-100 border-l-8 border-green-600 rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Final Verdict
            </h2>

            <p className="text-gray-800 leading-8">
              {result.finalVerdict}
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default ResumeDetails;