import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Interview() {

  const { sessionId } = useParams();

  const navigate = useNavigate();

  const videoRef = useRef(null);

  // CAMERA STATES
  const [stream, setStream] = useState(null);

  const [mediaRecorder, setMediaRecorder] =
    useState(null);

  const [recording, setRecording] =
    useState(false);

  const [videoURL, setVideoURL] =
    useState("");

  // INTERVIEW STATES
  const [questions, setQuestions] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [listening, setListening] =
    useState(false);

  const [interviewStarted, setInterviewStarted] =
    useState(false);

  // TIMER
  const [timeLeft, setTimeLeft] =
    useState(120);

  // PROCTORING STATES
  const [warnings, setWarnings] =
    useState([]);

  const [warningCount, setWarningCount] =
    useState(0);
  const [showFullscreenWarning, setShowFullscreenWarning] =
    useState(false);

  // LOAD QUESTIONS
  useEffect(() => {

    const loadQuestions = async () => {

      try {

        const res =
          await API.get(`/interview/${sessionId}`);

        setQuestions(res.data.questions);

      } catch (err) {

        console.log(err);

        alert("Failed to load questions");

      }

    };

    loadQuestions();

  }, [sessionId]);

  // START CAMERA
  const startCamera = async () => {

    try {

      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

      setStream(mediaStream);

      if (videoRef.current) {

        videoRef.current.srcObject =
          mediaStream;

      }

    } catch (error) {

      console.log(error);

      alert("Unable to access webcam");

    }

  };

  // START INTERVIEW
  const startInterview = async () => {

    try {

      // START CAMERA
      await startCamera();

      // ENTER FULLSCREEN
      if (document.documentElement.requestFullscreen) {

        await document.documentElement.requestFullscreen();

      }

      setInterviewStarted(true);

    } catch (err) {

      console.log(err);

      alert(
        "Please allow fullscreen and camera access"
      );

    }

  };

  // START RECORDING
  const startRecording = () => {

    if (!stream) {

      alert("Camera not started");

      return;

    }

    const recorder =
      new MediaRecorder(stream, {
        mimeType: "video/webm"
      });

    const chunks = [];

    recorder.ondataavailable = (e) => {

      if (e.data.size > 0) {

        chunks.push(e.data);

      }

    };

    recorder.onstop = () => {

      const blob =
        new Blob(chunks, {
          type: "video/webm"
        });

      const url =
        URL.createObjectURL(blob);

      setVideoURL(url);

    };

    recorder.start();

    setMediaRecorder(recorder);

    setRecording(true);

  };

  // STOP RECORDING
  const stopRecording = () => {

    if (mediaRecorder) {

      mediaRecorder.stop();

      setMediaRecorder(null);

      setRecording(false);

    }

  };

  // CLEANUP
  useEffect(() => {

    return () => {

      window.speechSynthesis.cancel();

      if (stream) {

        stream.getTracks().forEach(
          (track) => track.stop()
        );

      }

    };

  }, [stream]);

  // TIMER
  useEffect(() => {

    if (!interviewStarted) return;

    if (questions.length === 0) return;

    if (timeLeft <= 0) {

      submitAnswer(true);

      return;

    }

    const timer = setTimeout(() => {

      setTimeLeft((prev) => prev - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft, questions, interviewStarted]);

  // COMPLETE PROCTORING
  useEffect(() => {

    if (!interviewStarted) return;

    const addWarning = (message) => {

      alert(message);

      setWarnings((prev) => [
        ...prev,
        message
      ]);

      setWarningCount((prev) => prev + 1);

    };

    // TAB SWITCH
    const handleVisibilityChange = () => {

      if (document.hidden) {

        addWarning(
          "⚠ Tab switching detected"
        );

      }

    };

    // FULLSCREEN EXIT
    const handleFullscreenChange = () => {

      if (!document.fullscreenElement) {

        addWarning(
          "⚠ Fullscreen exited"
        );
        setShowFullscreenWarning(true);

        
      }
      else{
        setShowFullscreenWarning(false);
      }

    };

    // RIGHT CLICK BLOCK
    const disableRightClick = (e) => {

      e.preventDefault();

      addWarning(
        "⚠ Right click attempted"
      );

    };

    // KEYBOARD BLOCK
    const blockKeys = (e) => {

      // CTRL + C
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "c"
      ) {

        e.preventDefault();

        addWarning(
          "⚠ Copy attempt detected"
        );

      }

      // CTRL + V
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "v"
      ) {

        e.preventDefault();

        addWarning(
          "⚠ Paste attempt detected"
        );

      }

      // CTRL + X
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "x"
      ) {

        e.preventDefault();

      }

      // CTRL + U
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "u"
      ) {

        e.preventDefault();

      }

      // CTRL + SHIFT + I
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "i"
      ) {

        e.preventDefault();

      }

      // F12
      if (e.key === "F12") {

        e.preventDefault();

      }

    };

    // COPY PASTE BLOCK
    const disableCopyPaste = (e) => {

      e.preventDefault();

    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    document.addEventListener(
      "contextmenu",
      disableRightClick
    );

    document.addEventListener(
      "copy",
      disableCopyPaste
    );

    document.addEventListener(
      "paste",
      disableCopyPaste
    );

    window.addEventListener(
      "keydown",
      blockKeys
    );

    return () => {

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );

      document.removeEventListener(
        "contextmenu",
        disableRightClick
      );

      document.removeEventListener(
        "copy",
        disableCopyPaste
      );

      document.removeEventListener(
        "paste",
        disableCopyPaste
      );

      window.removeEventListener(
        "keydown",
        blockKeys
      );

    };

  }, [interviewStarted]);

  // AUTO TERMINATE
  useEffect(() => {

    if (warningCount >= 3) {

      alert(
        "Interview terminated due to malpractice!"
      );

      navigate("/dashboard");

    }

  }, [warningCount]);

  // TEXT TO SPEECH
  const speakQuestion = () => {

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        questions[current]
      );

    speech.lang = "en-US";

    window.speechSynthesis.speak(
      speech
    );

  };

  // SPEECH TO TEXT
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition not supported"
      );

      return;

    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {

      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0].transcript;

      }

      setAnswer(transcript);

    };

    recognition.onerror = () => {

      setListening(false);

    };

    recognition.onend = () => {

      setListening(false);

    };

  };

  // FORMAT TIMER
  const formatTime = (seconds) => {

    const mins =
      Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;

  };

  // SUBMIT ANSWER
  const submitAnswer = async (
    autoSubmit = false
  ) => {

    try {

      setLoading(true);

      window.speechSynthesis.cancel();

      await API.post(
        "/interview/submit-answer",
        {
          sessionId,
          questionIndex: current,
          answer:
            answer ||
            "No answer provided"
        }
      );

      setAnswer("");

      setTimeLeft(120);

      if (
        current < questions.length - 1
      ) {

        setCurrent(current + 1);

      } else {

        await API.post(
          "/interview/complete",
          { sessionId }
        );

        navigate(`/result/${sessionId}`);

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

  // START SCREEN
  if (!interviewStarted) {

    return (

      <>
        <Navbar />

        <div
          style={{
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px"
          }}
        >

          <h1 style={{ color: "black" }}>
            Mock Interview
          </h1>

          <p style={{ color: "red" }}>
            ⚠ Fullscreen mode is mandatory
          </p>

          <button
            onClick={startInterview}
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Start Interview
          </button>

        </div>
      </>

    );

  }

  // LOADING
  if (questions.length === 0) {

    return (
      <h2
        style={{
          color: "black",
          padding: "20px"
        }}
      >
        Loading Questions...
      </h2>
    );

  }

  return (

    <>
    {
  showFullscreenWarning && (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        gap: "20px"
      }}
    >

      <h1>
        ⚠ Fullscreen Mode Required
      </h1>

      <p>
        Please return to fullscreen mode
        to continue the interview.
      </p>

      <button
        onClick={async () => {

          await document.documentElement.requestFullscreen();

          setShowFullscreenWarning(false);

        }}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Return to Fullscreen
      </button>

    </div>

  )
}
      <Navbar />

      <div
        style={{
          padding: "30px",
          maxWidth: "900px",
          margin: "auto"
        }}
      >

        <h2 style={{ color: "black" }}>
          Question {current + 1} of {questions.length}
        </h2>

        <h3 style={{ color: "red" }}>
          🚨 Warnings: {warningCount}
        </h3>

        {
          warnings.map((warning, index) => (
            <p
              key={index}
              style={{
                color: "red"
              }}
            >
              {warning}
            </p>
          ))
        }

        <h2
          style={{
            color:
              timeLeft < 30
                ? "red"
                : "green"
          }}
        >
          ⏳ {formatTime(timeLeft)}
        </h2>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
            backgroundColor: "white"
          }}
        >

          <p
            style={{
              fontSize: "20px",
              color: "black",
              fontWeight: "500"
            }}
          >
            {questions[current]}
          </p>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}
          >

            <button onClick={speakQuestion}>
              🔊 Read Question
            </button>

            <button
              onClick={startListening}
              disabled={listening}
            >
              {
                listening
                  ? "🎙 Listening..."
                  : "🎤 Speak Answer"
              }
            </button>

            {
              !recording ? (
                <button onClick={startRecording}>
                  📷 Start Recording
                </button>
              ) : (
                <button onClick={stopRecording}>
                  ⏹ Stop Recording
                </button>
              )
            }

          </div>

          <div style={{ marginTop: "20px" }}>

            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              width="400"
              style={{
                borderRadius: "10px",
                border: "2px solid gray"
              }}
            />

          </div>

          <textarea
            rows="8"
            placeholder="Type or speak your answer..."
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid gray",
              color: "black"
            }}
          />

          <button
            onClick={() =>
              submitAnswer(false)
            }
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              cursor: "pointer",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px"
            }}
          >
            {
              loading
                ? "Submitting..."
                : current ===
                  questions.length - 1
                ? "Finish Interview"
                : "Next Question"
            }
          </button>

        </div>

      </div>
    </>

  );

}

export default Interview;