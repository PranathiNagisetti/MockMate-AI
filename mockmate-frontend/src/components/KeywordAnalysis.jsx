import { CheckCircle, XCircle } from "lucide-react";

function KeywordAnalysis({ keywords = {} }) {

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-8">
        ATS Keyword Analysis
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Matched */}

        <div>

          <h3 className="text-xl font-semibold text-green-700 mb-5">
            Matched Keywords
          </h3>

          <div className="space-y-3">

            {(keywords.matched || []).map((word, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <CheckCircle
                  className="text-green-600"
                  size={18}
                />

                <span>{word}</span>

              </div>

            ))}

          </div>

        </div>

        {/* Missing */}

        <div>

          <h3 className="text-xl font-semibold text-red-700 mb-5">
            Missing Keywords
          </h3>

          <div className="space-y-3">

            {(keywords.missing || []).map((word, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <XCircle
                  className="text-red-600"
                  size={18}
                />

                <span>{word}</span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default KeywordAnalysis;