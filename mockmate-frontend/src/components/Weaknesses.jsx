import { AlertTriangle } from "lucide-react";

function Weaknesses({ weaknesses = [] }) {

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6 text-red-700">
        Resume Weaknesses
      </h2>

      {weaknesses.length === 0 ? (
        <p className="text-gray-500">
          No weaknesses found.
        </p>
      ) : (
        <div className="space-y-4">
          {weaknesses.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-start"
            >
              <AlertTriangle
                className="text-red-600 mt-1"
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

export default Weaknesses;