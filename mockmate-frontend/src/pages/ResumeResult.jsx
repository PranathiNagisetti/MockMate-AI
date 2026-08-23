import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
function ResumeResult() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const result = state?.result;

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h2 className="text-2xl font-semibold text-red-600">
                    No analysis found.
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-10">

            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-6">

                <button
                    onClick={() => navigate("/main-dashboard")}
                    className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors font-medium"
                >
                    <ArrowLeft size={24} />
                    <span>Back</span>
                </button>

            </div>

                {/* Heading */}

                <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
                    AI Resume Analysis Report
                </h1>

                {/* ATS Score */}

                <div className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-blue-500 mb-8">

                    <h2 className="text-2xl font-bold text-gray-800">
                        ATS Score
                    </h2>

                    <p className="text-6xl font-extrabold text-blue-600 mt-4">
                        {result.atsScore}/100
                    </p>

                </div>

                {/* Summary */}

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 mb-8">

                    <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                        📝 Professional Summary
                    </h2>

                    <p className="text-gray-700 leading-8">
                        {result.summary}
                    </p>

                </div>

                {/* Strengths & Weaknesses */}

                <div className="grid md:grid-cols-2 gap-6 mb-8">

                    <div className="bg-green-50 rounded-xl shadow-lg p-6 border-l-4 border-green-500">

                        <h2 className="text-2xl font-bold text-green-700 mb-4">
                            💪 Strengths
                        </h2>

                        <ul className="list-disc pl-6 space-y-3 text-gray-700">

                            {result.strengths?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}

                        </ul>

                    </div>

                    <div className="bg-red-50 rounded-xl shadow-lg p-6 border-l-4 border-red-500">

                        <h2 className="text-2xl font-bold text-red-700 mb-4">
                            ⚠️ Weaknesses
                        </h2>

                        <ul className="list-disc pl-6 space-y-3 text-gray-700">

                            {result.weaknesses?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}

                        </ul>

                    </div>

                </div>

                {/* Missing Keywords & Grammar */}

                <div className="grid md:grid-cols-2 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">

                        <h2 className="text-2xl font-bold text-orange-700 mb-4">
                            🔍 Missing Keywords
                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {result.missingKeywords?.map((keyword, index) => (

                                <span
                                    key={index}
                                    className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium"
                                >
                                    {keyword}
                                </span>

                            ))}

                        </div>

                    </div>

                    <div className="bg-yellow-50 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">

                        <h2 className="text-2xl font-bold text-yellow-700 mb-4">
                            ✍️ Grammar Issues
                        </h2>

                        <ul className="list-disc pl-6 space-y-3 text-gray-700">

                            {result.grammarIssues?.map((issue, index) => (
                                <li key={index}>{issue}</li>
                            ))}

                        </ul>

                    </div>

                </div>

                {/* Section Scores */}

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 mb-8">

                    <h2 className="text-2xl font-bold text-purple-700 mb-6">
                        📊 Section Scores
                    </h2>

                    {Object.entries(result.sectionScores || {}).map(([section, score]) => (

                        <div key={section} className="mb-5">

                            <div className="flex justify-between mb-2">

                                <span className="capitalize text-gray-700 font-semibold">
                                    {section}
                                </span>

                                <span className="font-bold text-purple-700">
                                    {score}/10
                                </span>

                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-3">

                                <div
                                    className="bg-purple-600 h-3 rounded-full"
                                    style={{
                                        width: `${score * 10}%`
                                    }}
                                ></div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Suggestions */}

                <div className="bg-blue-50 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 mb-8">

                    <h2 className="text-2xl font-bold text-blue-700 mb-4">
                        💡 AI Suggestions
                    </h2>

                    <ul className="list-disc pl-6 space-y-3 text-gray-700">

                        {result.suggestions?.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}

                    </ul>

                </div>

                {/* Recruiter's View */}

                <div className="bg-indigo-50 rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 mb-8">

                    <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                        👨‍💼 Recruiter's View
                    </h2>

                    <p className="text-gray-700 leading-8">
                        {result.recruiterView}
                    </p>

                </div>

                {/* Final Verdict */}

                <div className="bg-green-100 rounded-xl shadow-xl p-8 border-l-8 border-green-600">

                    <h2 className="text-2xl font-bold text-green-700 mb-4">
                        ✅ Final Verdict
                    </h2>

                    <p className="text-gray-800 leading-8 text-lg">
                        {result.finalVerdict}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ResumeResult;