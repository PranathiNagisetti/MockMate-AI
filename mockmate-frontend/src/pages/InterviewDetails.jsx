import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function InterviewDetails() {

  const { sessionId } = useParams();

  const [session, setSession] =
    useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const fetchSession = async () => {

    try {

      console.log("Session ID:", sessionId);

      const res = await API.get(
        `/interview/session/${sessionId}`
      );

      console.log("Response:", res.data);

      setSession(res.data);

    } catch (error) {

      console.log("ERROR:", error);
      console.log("Response:", error.response?.data);

    } finally {

      setLoading(false);

    }

  };

  fetchSession();

}, [sessionId]);
if (loading) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <h2 className="text-2xl font-bold text-green-700">
            Loading Interview Details...
        </h2>
    </div>
    </>
  );
}

if (!session) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">
            Session Not Found
        </h2>
    </div>
    </>
  );
}

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 text-gray-800">

        <div className="max-w-6xl mx-auto p-8">

          <h1 className="text-4xl font-extrabold text-green-700 mb-8">

            {session.interviewType === "company"
              ? `${session.company} Interview`
              : `${session.role} Interview`
            }

          </h1>

          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-white border-l-4 border-green-500 shadow-lg rounded-xl p-6">

              {session.interviewType === "company"
                ? "Company"
                : "Role"}

              <div className="font-bold text-green-700 text-lg mt-2">

                {session.interviewType === "company"
                  ? session.company
                  : session.role}

              </div>

            </div>

            <div className="bg-white border-l-4 border-blue-500 shadow-lg rounded-xl p-6">
              Status:
              <div className="font-bold text-green-700 text-lg mt-2">
                {session.status}
              </div>
            </div>

            <div className="bg-white border-l-4 border-yellow-500 shadow-lg rounded-xl p-6">
              Final Score:
              <div className="font-bold text-green-700 text-lg mt-2">
                {session.finalScore}
              </div>
            </div>

          </div>

          <h2 className="text-3xl font-bold text-green-700 mb-8">
            Questions & Answers
          </h2>

          {session.questions.map(
            (q, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 mb-8"
              >

                <h3 className="text-xl font-bold text-green-700 mb-4">
                  Q{index + 1}. {q.questionText}
                </h3>

                <div className="mb-4">
                  <p className="text-black-600 font-semibold">
                    Your Answer
                  </p>

                  <p className="mt-2 text-gray-700 leading-7">
                    {q.answerText ||
                      "No Answer Submitted"}
                  </p>
                </div>

                <div className="mt-4">

                                <div className="mb-3">
                                  <span className="font-semibold">
                                    Score :
                                  </span>

                                  <span className="text-green-700 text-xl ml-2 font-bold">
                                    {q.score}/10
                                  </span>
                                </div>

                  <div className="grid md:grid-cols-2 gap-3">

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                      Correctness :
                      <span className="text-green-700 font-bold ml-2">
                        {q.feedback?.correctness}/10
                      </span>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                      Clarity :
                      <span className="text-green-700 font-bold ml-2">
                        {q.feedback?.clarity}/10
                      </span>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                      Technical Depth :
                      <span className="text-green-700 font-bold ml-2">
                        {q.feedback?.technicalDepth}/10
                      </span>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                      Relevance :
                      <span className="text-green-700 font-bold ml-2">
                        {q.feedback?.relevance}/10
                      </span>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                      Communication :
                      <span className="text-green-700 font-bold ml-2">
                        {q.feedback?.communication}/10
                      </span>
                    </div>

                  </div>

                  <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4">

                    <h4 className="font-semibold mb-2 text-green-800">
                      AI Feedback
                    </h4>

                    <p className=" text-black-600">
                      {q.feedback?.overall}
                    </p>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>
    </>
  );
}

export default InterviewDetails;