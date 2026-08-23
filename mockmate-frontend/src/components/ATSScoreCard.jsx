import { CheckCircle, AlertCircle } from "lucide-react";

function ATSScoreCard({ result }) {

  const score = result.atsScore || 0;

  let color = "bg-red-500";
  let textColor = "text-red-600";
  let verdict = "Needs Improvement";

  if (score >= 85) {
    color = "bg-green-500";
    textColor = "text-green-600";
    verdict = "Excellent";
  } else if (score >= 70) {
    color = "bg-blue-500";
    textColor = "text-blue-600";
    verdict = "Good";
  } else if (score >= 50) {
    color = "bg-yellow-500";
    textColor = "text-yellow-600";
    verdict = "Average";
  }

  return (
    <div className="bg-white rounded-xl shadow-lg mt-8 p-8">

      <h2 className="text-2xl font-bold text-center mb-8">
        ATS Resume Score
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Score Circle */}
        <div className="relative w-48 h-48">

          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 120 120"
          >

            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="rgb(34 197 94)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={314}
              strokeDashoffset={
                314 - (314 * score) / 100
              }
            />

          </svg>

          <div className="absolute inset-0 flex flex-col justify-center items-center">

            <h1 className="text-5xl font-bold">
              {score}
            </h1>

            <p className="text-gray-500">
              /100
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex-1">

          <h2 className={`text-3xl font-bold ${textColor}`}>
            {verdict}
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">

            <div
              className={`${color} h-4 rounded-full transition-all duration-700`}
              style={{
                width: `${score}%`
              }}
            ></div>

          </div>

          <p className="mt-6 text-gray-700 leading-7">
            {result.overallFeedback}
          </p>

          <div className="mt-8 space-y-3">

            <div className="flex items-center gap-3">

              <CheckCircle className="text-green-600" />

              <span>
                ATS Friendly Resume
              </span>

            </div>

            <div className="flex items-center gap-3">

              <AlertCircle className="text-yellow-600" />

              <span>
                Review improvements below
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ATSScoreCard;