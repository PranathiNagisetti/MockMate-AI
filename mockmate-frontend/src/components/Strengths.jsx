import { CheckCircle2 } from "lucide-react";

function Strengths({ strengths = [] }) {

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6 text-green-700">
        Resume Strengths
      </h2>

      {strengths.length === 0 ? (
        <p className="text-gray-500">
          No strengths found.
        </p>
      ) : (
        <div className="space-y-4">
          {strengths.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-start"
            >
              <CheckCircle2
                className="text-green-600 mt-1"
                size={20}
              />

              <p>{item}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Strengths;