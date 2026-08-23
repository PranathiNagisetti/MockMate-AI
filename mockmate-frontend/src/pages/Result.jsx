import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

import API from "../services/api";
import Navbar from "../components/Navbar";
import generatePDF from "../utils/generatePDF";

function Result() {

  const { sessionId } = useParams();

  const [result, setResult] = useState(null);

  useEffect(() => {

    const fetchResult = async () => {

      try {

        const res = await API.get(
          `/interview/summary/${sessionId}`
        );

        setResult(res.data);

      }

      catch (err) {

        console.log(err);

      }

    };

    fetchResult();

  }, [sessionId]);

  if (!result) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

          <div className="text-center">

            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

            <h2 className="text-2xl font-semibold">

              Generating AI Report...

            </h2>

          </div>

        </div>

      </>

    );

  }

  // ----------------------
  // Analytics Chart Data
  // ----------------------

 const analytics = result.analytics || {};

const analyticsData = [
  {
    name: "Communication",
    score: Number(analytics.communication || 0)
  },
  {
    name: "Correctness",
    score: Number(analytics.correctness || 0)
  },
  {
    name: "Technical",
    score: Number(analytics.technicalDepth || 0)
  },
  {
    name: "Clarity",
    score: Number(analytics.clarity || 0)
  },
  {
    name: "Relevance",
    score: Number(analytics.relevance || 0)
  }
];

  // -----------------------
  // Question Score Chart
  // -----------------------

  const questionData =

    result.questions.map((q, index) => ({

      question: `Q${index + 1}`,

      score: q.score

    }));


  if (!result) {

    return <h2>Loading...</h2>

  }

 return (

      <>
      <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-10 px-6">

            <div className="max-w-7xl mx-auto">

            {/* Heading */}

            <div className="mb-10">

            <h1 className="text-5xl font-bold text-gray-800">

            AI Performance Dashboard

            </h1>

            <p className="text-gray-600 mt-3 text-lg">

            Detailed analysis of your mock interview performance

            </p>

            </div>

            {/* ========================= */}

            {/* TOP SCORE CARDS */}

            {/* ========================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Overall Score */}

                <div className="bg-white rounded-2xl shadow-lg p-6">

                <p className="text-gray-500">

                Overall Score

                </p>

                <h2 className="text-5xl font-bold text-green-600 mt-3">

                {result.totalScore}

                </h2>

                <p className="text-gray-500 mt-2">

                out of {result.totalQuestions * 10}

                </p>

                </div>

                {/* Average */}

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                    <p className="text-gray-500">

                    Average Score

                    </p>

                    <h2 className="text-5xl font-bold text-blue-600 mt-3">

                    {result.averageScore}

                    </h2>

                    <p className="text-gray-500 mt-2">

                    Per Question

                    </p>

                    </div>

                {/* Highest */}

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                    <p className="text-gray-500">

                    Highest Score

                    </p>

                    <h2 className="text-5xl font-bold text-purple-600 mt-3">

                    {result.highestScore}

                    </h2>

                    <p className="text-gray-500 mt-2">

                    Best Answer

                    </p>

                    </div>

                {/* Lowest */}

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                    <p className="text-gray-500">

                    Lowest Score

                    </p>

                    <h2 className="text-5xl font-bold text-red-500 mt-3">

                    {result.lowestScore}

                    </h2>

                    <p className="text-gray-500 mt-2">

                    Needs Improvement

                    </p>

                    </div>

                </div>

            {/* ========================= */}

            {/* VERDICT CARD */}

            {/* ========================= */}

                <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-xl text-white p-8">

                <div className="flex justify-between items-center flex-wrap gap-5">

                <div>

                <h2 className="text-3xl font-bold">

                Interview Verdict

                </h2>

                <p className="text-green-100 mt-2 text-lg">

                {result.verdict}

                </p>

                </div>

                <div className="text-right">

                <p className="text-green-100">

                Interview Level

                </p>

                <h2 className="text-4xl font-bold">

                {result.level}

                </h2>

                </div>

                </div>

                </div>

            {/* ========================= */}
            {/* AI PERFORMANCE CHARTS */}
            {/* ========================= */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

                  {/* Performance Bar Chart */}

                  <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-6 text-gray-800">

                      AI Performance Analysis

                    </h2>

                    <ResponsiveContainer
                      width="100%"
                      height={350}
                    >

                      <BarChart
                        data={analyticsData}
                      >

                        <CartesianGrid
                          strokeDasharray="3 3"
                        />

                        <XAxis
                          dataKey="name"
                        />

                        <YAxis
                          domain={[0,10]}
                        />

                        <Tooltip />

                        <Bar
                          dataKey="score"
                          fill="#22c55e"
                          radius={[8,8,0,0]}
                        />

                      </BarChart>

                    </ResponsiveContainer>

                  </div>

                  {/* Radar Chart */}

                      <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-2xl font-bold mb-6 text-gray-800">

                          Skill Radar

                        </h2>

                        <ResponsiveContainer
                          width="100%"
                          height={350}
                        >

                          <RadarChart
                            data={analyticsData}
                          >

                            <PolarGrid />

                            <PolarAngleAxis
                              dataKey="name"
                            />

                            <PolarRadiusAxis
                              domain={[0,10]}
                            />

                            <Radar
                              dataKey="score"
                              stroke="#16a34a"
                              fill="#22c55e"
                              fillOpacity={0.6}
                            />

                          </RadarChart>

                        </ResponsiveContainer>

                      </div>

                </div>

            {/* ========================= */}
            {/* QUESTION SCORE GRAPH */}
            {/* ========================= */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

                <h2 className="text-2xl font-bold mb-6 text-gray-800">

                Question-wise Scores

                </h2>

                <ResponsiveContainer
                width="100%"
                height={350}
                >

                <BarChart
                data={questionData}
                >

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis
                dataKey="question"
                />

                <YAxis
                domain={[0,10]}
                />

                <Tooltip/>

                <Bar
                dataKey="score"
                fill="#3b82f6"
                radius={[8,8,0,0]}
                />

                </BarChart>

                </ResponsiveContainer>

                </div>

            {/* ========================= */}
            {/* QUICK STATS */}
            {/* ========================= */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

                <div className="bg-white rounded-xl shadow p-5 text-center">

                <h3 className="text-gray-500">

                Questions

                </h3>

                <p className="text-3xl font-bold text-green-600 mt-2">

                {result.totalQuestions}

                </p>

                </div>

                <div className="bg-white rounded-xl shadow p-5 text-center">

                <h3 className="text-gray-500">

                Average

                </h3>

                <p className="text-3xl font-bold text-blue-600 mt-2">

                {result.averageScore}

                </p>

                </div>

                <div className="bg-white rounded-xl shadow p-5 text-center">

                <h3 className="text-gray-500">

                Highest

                </h3>

                <p className="text-3xl font-bold text-purple-600 mt-2">

                {result.highestScore}

                </p>

                </div>

                <div className="bg-white rounded-xl shadow p-5 text-center">

                <h3 className="text-gray-500">

                Lowest

                </h3>

                <p className="text-3xl font-bold text-red-500 mt-2">

                {result.lowestScore}

                </p>

                </div>

                </div>
            {/* ========================= */}
            {/* STRENGTHS & WEAKNESSES */}
            {/* ========================= */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

                  <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold text-green-700 mb-5">
                      💪 Strengths
                    </h2>

                    <ul className="space-y-3">

                      {result.strengths.map((item, index) => (

                        <li
                          key={index}
                          className="bg-green-50 border-l-4 border-green-500 rounded-lg p-3 text-gray-800 font-medium"
                        >
                          {item}
                        </li>

                      ))}

                    </ul>

                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold text-red-600 mb-5">
                      ⚠ Areas to Improve
                    </h2>

                    <ul className="space-y-3">

                      {result.weaknesses.map((item, index) => (

                        <li
                          key={index}
                          className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 text-gray-800 font-medium"
                        >
                          {item}
                        </li>

                      ))}

                    </ul>

                  </div>

                </div>

            {/* ========================= */}
            {/* IMPROVEMENT TIPS */}
            {/* ========================= */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

                    <h2 className="text-2xl font-bold mb-5 text-gray-800">

                    💡 AI Suggestions

                    </h2>

                <div className="grid md:grid-cols-2 gap-4">

                    {result.improvementTips.map((tip,index)=>(

                    <div
                    key={index}
                    className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 text-gray-800 font-medium"
                    >

                    {tip}

                    </div>

                    ))}

                </div>

                </div>


            {/* QUESTION ANALYSIS */}


                  <div className="mt-10">

                      <h2 className="text-3xl font-bold mb-8 text-gray-800 font-highlight">

                      📝 Question-wise Analysis

                      </h2>

                  {result.questions.map((q,index)=>(

                      <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg p-7 mb-8 text-gray-800 font-medium"
                      >

                          <div className="flex justify-between items-center mb-5">

                          <h3 className="text-xl font-bold">

                          Question {index+1}

                          </h3>

                          <span
                          className={`px-4 py-2 rounded-full text-white font-semibold

                          ${
                          q.score>=8
                          ?"bg-green-600"

                          :q.score>=5

                          ?"bg-yellow-500"

                          :"bg-red-500"

                          }`}
                          >

                          {q.score}/10

                          </span>

                          </div>

                          <div className="space-y-5">

                              <div>

                                  <h4 className="font-semibold text-gray-700">

                                  Question

                                  </h4>

                                  <p className="mt-2 text-gray-800">

                                  {q.questionText}

                                  </p>

                              </div>

                              <div>

                                <h4 className="font-semibold text-gray-700">

                                Your Answer

                                </h4>

                                  <p className="mt-2 text-gray-800 whitespace-pre-wrap">

                                  {q.answerText || "No Answer"}

                                  </p>

                              </div>

                              <div>

                                  <h4 className="font-semibold text-gray-700 mb-3">

                                  Evaluation Breakdown

                                  </h4>

                                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                                      <div className="bg-gray-100 rounded-lg p-3 text-center">

                                          <p className="text-sm text-gray-500">

                                          Correctness

                                          </p>

                                          <p className="text-2xl font-bold text-green-600">

                                          {q.feedback?.correctness}

                                          </p>

                                      </div>

                                      <div className="bg-gray-100 rounded-lg p-3 text-center">

                                          <p className="text-sm text-gray-500">

                                          Clarity

                                          </p>

                                          <p className="text-2xl font-bold text-green-600">

                                          {q.feedback?.clarity}

                                          </p>

                                      </div>

                                      <div className="bg-gray-100 rounded-lg p-3 text-center">

                                          <p className="text-sm text-gray-500">

                                          Technical

                                          </p>

                                          <p className="text-2xl font-bold text-green-600">

                                          {q.feedback?.technicalDepth}

                                          </p>

                                      </div>

                                      <div className="bg-gray-100 rounded-lg p-3 text-center">

                                        <p className="text-sm text-gray-500">

                                        Relevance

                                        </p>

                                        <p className="text-2xl font-bold text-green-600">

                                        {q.feedback?.relevance}

                                        </p>

                                      </div>

                                      <div className="bg-gray-100 rounded-lg p-3 text-center">

                                        <p className="text-sm text-gray-500">

                                        Communication

                                        </p>

                                        <p className="text-2xl font-bold text-green-600">

                                        {q.feedback?.communication}

                                        </p>

                                      </div>

                                  </div>

                              </div>

                              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-5">

                              <h4 className="font-semibold mb-2">

                              🤖 AI Feedback

                              </h4>

                              <p>

                              {q.feedback?.overall}

                              </p>

                              </div>

                          </div>

                      </div>

                  ))}

                  </div>


            {/* DOWNLOAD REPORT */}


                  <div className="mt-12 text-center">

                  <button

                  onClick={() => generatePDF(result)}

                  className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition"

                  >

                  📄 Download AI Report PDF

                  </button>

                  </div>

            </div>

            </div>

      </>

);

}

export default Result;