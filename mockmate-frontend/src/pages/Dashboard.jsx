import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

function Dashboard() {

  const [role, setRole] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [experience, setExperience] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const startInterview = async () => {

    // Validation
    if (!role || !difficulty || !experience) {

      alert("Please fill all fields")

      return

    }

    try {

      setLoading(true)

      const res = await API.post(
        "/interview/start",
        {
          role,
          difficulty,
          experience
        }
      )

      navigate(
        `/interview/${res.data.sessionId}`
      )

    } catch (err) {

      console.log("START INTERVIEW ERROR:", err)

      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to start interview"
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <>
      <Navbar />

      <div
        style={{
          maxWidth: "500px",
          margin: "50px auto",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          Start Mock Interview
        </h1>

        <label>
          <strong>Role</strong>
        </label>

        <input
          type="text"
          placeholder="Frontend Developer"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
            marginBottom: "20px"
          }}
        />

        <label>
          <strong>Years of Experience</strong>
        </label>

        <input
          type="number"
          placeholder="2"
          value={experience}
          onChange={(e) =>
            setExperience(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
            marginBottom: "20px"
          }}
        />

        <label>
          <strong>Difficulty</strong>
        </label>

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
            marginBottom: "30px"
          }}
        >

          <option value="">
            Select Difficulty
          </option>

          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>

        </select>

        <button
          onClick={startInterview}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >

          {loading
            ? "Generating Questions..."
            : "Start Interview"}

        </button>

      </div>
    </>
  )

}

export default Dashboard