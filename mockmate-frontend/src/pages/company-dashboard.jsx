import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";
function CompanyDashboard() {
  const [company, setCompany] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Apple",
    "Meta",
    "Netflix",
    "Adobe",
    "Oracle",
    "IBM",
    "Intel",
    "NVIDIA",
    "Cisco",
    "Salesforce",
    "SAP",
    "Atlassian",
    "Uber",
    "Airbnb",
    "LinkedIn",
    "Twitter (X)",
    "Snap",
    "Spotify",
    "PayPal",
    "Stripe",
    "Square (Block)",
    "Visa",
    "Mastercard",
    "Goldman Sachs",
    "JPMorgan Chase",
    "Morgan Stanley",
    "Bloomberg",
    "Tesla",
    "SpaceX",
    "Samsung",
    "Qualcomm",
    "AMD",
    "Broadcom",
    "ServiceNow",
    "Workday",
    "Zoom",
    "Dropbox",
    "Red Hat",
    "VMware",
    "Dell Technologies",
    "HP",
    "Accenture",
    "Capgemini",
    "Cognizant",
    "Infosys",
    "TCS",
    "Wipro",
    "HCLTech",
    "Tech Mahindra",
    "LTIMindtree",
    "Mphasis",
    "Persistent Systems",
    "EPAM Systems",
    "Thoughtworks",
    "Zoho",
    "Freshworks",
    "Flipkart",
    "Myntra",
    "Meesho",
    "PhonePe",
    "Paytm",
    "Razorpay",
    "CRED",
    "Groww",
    "Zerodha",
    "Swiggy",
    "Zomato",
    "Ola",
    "OYO",
    "BYJU'S",
    "Unacademy",
    "Dream11",
    "BrowserStack",
    "InMobi",
    "ShareChat",
    "CoinDCX",
    "Juspay",
    "Postman",
    "Naukri (Info Edge)",
    "Walmart Global Tech",
    "Target",
    "Bosch",
    "Siemens",
    "Philips",
    "Honeywell",
    "GE Healthcare",
    "Shell",
    "Ford",
    "Boeing",
    "Expedia",
    "Booking.com",
    "Slack",
    "GitHub",
    "OpenAI"
    ];

  const startInterview = async () => {
    if (!company || !difficulty || !experience) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/company-interview/start", {
        company,
        difficulty,
        experience,
      });

      navigate(`/company-interview/${res.data.sessionId}`);
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

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">

        <div className="mb-6">

                <button
                    onClick={() => navigate("/main-dashboard")}
                    className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors font-medium"
                >
                    <ArrowLeft size={24} />
                    <span>Back</span>
                </button>

            </div>
        {/* Background */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">

          {/* Hero */}
          <div className="text-center mb-14">

            <h1 className="text-5xl font-extrabold text-gray-800">
              Ace Your Next Interview
            </h1>

            <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Practice realistic AI-powered interviews, receive
              instant feedback, improve your communication,
              and build confidence for your dream job.
            </p>

          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2">

              <div className="bg-white rounded-3xl border border-green-100 shadow-xl p-8">

                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Interview Configuration
                </h2>

                {/* Company */}
                <div className="mb-7">

                  <label className="block text-gray-700 font-semibold mb-3">
                    Company
                  </label>

                  <select
                    value={company}
                    onChange={(e) =>
                      setCompany(e.target.value)
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        bg-white
                        text-gray-800
                        p-4
                        focus:outline-none
                        focus:ring-2
                        focus:ring-green-500
                      "
                    >
                    <option value="" className="text-gray-800">
                    Select a Company
                  </option>

                  {companies.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="text-gray-800 bg-white"
                    >
                      {item}
                    </option>
                  ))}
                  </select>

                </div>

                {/* Experience */}
                <div className="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500">

                  <label className="block text-gray-700 font-semibold mb-3 text-gray-800 font-medium">
                    Years of Experience
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="20"
                    placeholder="Eg: 2"
                    value={experience}
                    onChange={(e) =>
                      setExperience(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>

                {/* Difficulty */}
                <div className="mb-8">

                  <label className="block text-gray-700 font-semibold mb-4">
                    Difficulty Level
                  </label>

                  <div className="grid grid-cols-3 gap-4">

                    {["Easy", "Medium", "Hard"].map(
                      (level) => (
                        <button
                          key={level}
                          onClick={() =>
                            setDifficulty(level)
                          }
                          className={`py-3 rounded-xl font-semibold transition-all duration-300 border

                          ${
                            difficulty === level
                              ? "bg-green-600 text-white border-green-600 shadow-lg"
                              : "bg-white border-gray-300 text-gray-700 hover:border-green-500 hover:bg-green-50"
                          }
                          `}
                        >
                          {level}
                        </button>
                      )
                    )}

                  </div>

                </div>

                <button
                  onClick={startInterview}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white text-lg font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {loading
                    ? "Generating Questions..."
                    : "🚀 Start Interview"}
                </button>

              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Why MockMate AI?
                </h2>

                <div className="space-y-5">

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                      🤖
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        AI Questions
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Personalized questions based on your selected Company.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                      🎤
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Voice Interview
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Practice speaking naturally using voice recognition.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                      📊
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        AI Evaluation
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Instant scoring and improvement suggestions.
                      </p>
                    </div>
                  </div>
                                    <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                      🛡️
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Smart Proctoring
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Face monitoring, fullscreen tracking and anti-cheating.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                      📄
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Detailed Reports
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Download comprehensive interview reports with strengths
                        and improvement areas.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">

                <div className="bg-white rounded-2xl border border-green-100 shadow-lg p-5 text-center hover:shadow-xl transition">

                  <div className="text-4xl mb-2">🤖</div>

                  <h3 className="font-bold text-green-700 text-lg">
                    AI
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Evaluation
                  </p>

                </div>

                <div className="bg-white rounded-2xl border border-green-100 shadow-lg p-5 text-center hover:shadow-xl transition">

                  <div className="text-4xl mb-2">📄</div>

                  <h3 className="font-bold text-green-700 text-lg">
                    PDF
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Reports
                  </p>

                </div>

                <div className="bg-white rounded-2xl border border-green-100 shadow-lg p-5 text-center hover:shadow-xl transition">

                  <div className="text-4xl mb-2">🛡️</div>

                  <h3 className="font-bold text-green-700 text-lg">
                    Secure
                  </h3>

                  <p className="text-gray-500 text-sm">
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

export default CompanyDashboard;