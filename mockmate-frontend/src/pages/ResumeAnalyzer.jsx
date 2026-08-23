import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import ATSScoreCard from "../components/ATSScoreCard";
import Strengths from "../components/Strengths";
import Weaknesses from "../components/Weaknesses";
import Improvements from "../components/Improvements";
import KeywordAnalysis from "../components/KeywordAnalysis";
import API from "../services/api";
import SectionAnalysis from "../components/SectionAnalysis";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function ResumeAnalyzer() {
    const navigate = useNavigate();


    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const analyzeResume = async (file) => {

        const formData = new FormData();
        formData.append("resume", file);

        try {

            setLoading(true);

            const res = await API.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

           navigate("/resume/result", {
                state: {
                    result: res.data.analysis
                }
            });

        }
        catch(err){
            console.log(err);
            alert("Resume analysis failed");
        }

        setLoading(false);

    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">

        <div className="max-w-6xl mx-auto py-12 px-6">
            {/* Back Button */}

            <div className="mb-6">

                <button
                    onClick={() => navigate("/main-dashboard")}
                    className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors font-medium"
                >
                    <ArrowLeft size={24} />
                    <span>Back</span>
                </button>

            </div>

            {/* Hero Section */}
            <div className="text-center mb-12">

                

                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                    AI Resume Analyzer
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Upload your resume and receive an instant AI-powered ATS analysis,
                    keyword optimization, recruiter feedback, and personalized
                    improvement suggestions.
                </p>

            </div>

            {/* Upload Card */}
            <div className="max-w-3xl mx-auto">

                <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-10">

                    <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
                        Upload Your Resume
                    </h2>

                    <ResumeUpload
                        loading={loading}
                        onAnalyze={analyzeResume}
                    />

                    <div className="border-t border-green-100 mt-8 pt-6">

                        <h3 className="font-semibold text-gray-800 mb-4">
                            ✔ You'll receive
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                                <span className="text-2xl">📊</span>
                                <span className="font-medium text-gray-700">
                                    ATS Score Analysis
                                </span>
                            </div>

                            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                                <span className="text-2xl">💪</span>
                                <span className="font-medium text-gray-700">
                                    Resume Strengths
                                </span>
                            </div>

                            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                                <span className="text-2xl">⚠️</span>
                                <span className="font-medium text-gray-700">
                                    Weakness Detection
                                </span>
                            </div>

                            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                                <span className="text-2xl">🔑</span>
                                <span className="font-medium text-gray-700">
                                    Missing Keywords
                                </span>
                            </div>

                            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                                <span className="text-2xl">📝</span>
                                <span className="font-medium text-gray-700">
                                    Grammar Check
                                </span>
                            </div>

                            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                                <span className="text-2xl">🤖</span>
                                <span className="font-medium text-gray-700">
                                    AI Recruiter Feedback
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
);

}

export default ResumeAnalyzer;