import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

function Result() {

  const { sessionId } = useParams()

  const [result, setResult] = useState(null)

  useEffect(() => {

    const fetchResult = async () => {

      try {

        const res = await API.get(
          `/interview/summary/${sessionId}`
        )

        setResult(res.data)

      } catch (err) {

        console.log(err)

      }

    }

    fetchResult()

  }, [sessionId])

  if (!result) {

    return <h2>Loading...</h2>

  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>

        <h1>Interview Result</h1>

        <h2>Total Score: {result.totalScore}</h2>

        <hr />

        {result.questions.map((q, index) => (

          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px"
            }}
          >

            <h3>Question {index + 1}</h3>

            <p>
              <strong>Question:</strong>
              <br />
              {q.questionText}
            </p>

            <p>
              <strong>Your Answer:</strong>
              <br />
              {q.answerText}
            </p>

            <p>
              <strong>Score:</strong> {q.score}/10
            </p>

            <div>

                  <h4>Evaluation Breakdown</h4>

                  <p>Correctness: {q.feedback?.correctness}/10</p>

                  <p>Clarity: {q.feedback?.clarity}/10</p>

                  <p>
                    Technical Depth:
                    {q.feedback?.technicalDepth}/10
                  </p>

                  <p>Relevance: {q.feedback?.relevance}/10</p>

                  <p>
                    Communication:
                    {q.feedback?.communication}/10
                  </p>

                  <p>
                    <strong>Overall Feedback:</strong>
                    <br />
                    {q.feedback?.overall}
                  </p>

            </div>

          </div>

        ))}

        <hr />

        <h2>Strengths</h2>

        <ul>
          {result.strengths.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </ul>

        <h2>Weaknesses</h2>

        <ul>
          {result.weaknesses.map((w, index) => (
            <li key={index}>{w}</li>
          ))}
        </ul>

        <h2>Improvement Tips</h2>

        <ul>
          {result.improvementTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>

      </div>
    </>
  )

}

export default Result