import { Lightbulb } from "lucide-react";

function Improvements({ improvements = [] }) {

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        AI Suggestions
      </h2>

      <div className="space-y-4">

        {improvements.map((item, index) => (

          <div
            key={index}
            className="flex gap-3"
          >

            <Lightbulb
              className="text-yellow-500 mt-1"
              size={20}
            />

            <p>{item}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Improvements;