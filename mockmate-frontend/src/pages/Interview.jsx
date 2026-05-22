import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate
} from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Interview() {

  const { sessionId } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const loadQuestions = async () => {

      try {

        const res =
          await API.get(
            `/interview/${sessionId}`
          );

        console.log(res.data);

        // Backend returns array of strings
        setQuestions(res.data.questions);

      } catch (err) {

        console.log(err);

        alert(
          "Failed to load questions"
        );

      }

    };

    loadQuestions();

  }, [sessionId]);

  const submitAnswer = async () => {

    if (!answer.trim()) {

      alert("Please enter answer");

      return;

    }

    try {

      setLoading(true);

      await API.post(
        "/interview/submit-answer",
        {
          sessionId,
          questionIndex: current,
          answer
        }
      );

      setAnswer("");

      if (
        current < questions.length - 1
      ) {

        setCurrent(current + 1);

      } else {

        await API.post(
          "/interview/complete",
          { sessionId }
        );

        navigate(
          `/result/${sessionId}`
        );

      }

    } catch (err) {

      console.log(err);

      alert(
        "Failed to submit answer"
      );

    } finally {

      setLoading(false);

    }

  };

  if (questions.length === 0) {

    return (
      <>
        <Navbar />
        <div style={{ padding: "30px" }}>
          <h2>Loading Questions...</h2>
        </div>
      </>
    );

  }

  return (

    <>
      <Navbar />

      <div
        style={{
          padding: "30px",
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >

        <h2>
          Question {current + 1} of{" "}
          {questions.length}
        </h2>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "25px",
            borderRadius: "10px",
            marginTop: "20px",
            backgroundColor: "#c8bebe",
            color:"#111827"

          }}
        >

          {/* FIX IS HERE */}
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              fontWeight: "500",
              color:"#111827"
            }}
          >
            {questions[current]}
          </p>

          <textarea
            rows="8"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px"
            }}
          />

          <br />

          <button
            onClick={submitAnswer}
            disabled={loading}
            style={{
              marginTop: "20px",
              padding:
                "12px 24px",
              cursor: "pointer",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "16px"
            }}
          >

            {loading
              ? "Submitting..."
              : current ===
                questions.length - 1
              ? "Finish Interview"
              : "Next Question"}

          </button>

        </div>

      </div>
    </>
  );

}

export default Interview;