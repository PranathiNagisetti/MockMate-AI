import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Interview() {

  const { sessionId } = useParams();

  const navigate = useNavigate();

  const videoRef = useRef(null);

  const chunksRef = useRef([]);

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

  const detectionInterval = useRef(null);

  const [modelsLoaded, setModelsLoaded] =
    useState(false);

  const [faceWarnings, setFaceWarnings] =
    useState([]);

  const lastFaceStatus = useRef("");
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

  //Load models
  // LOAD FACE API MODELS
useEffect(() => {
  const loadModels = async () => {
    try {
      const MODEL_URL = "/models";

      console.log("Loading models from:", MODEL_URL);

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      console.log("TinyFaceDetector Loaded");

      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      console.log("FaceLandmark Loaded");

      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      console.log("FaceRecognition Loaded");

      setModelsLoaded(true);
      console.log("✅ All Models Loaded");

    } catch (err) {

      console.log("Model Loading Error:", err);

    }

  };

  loadModels();

}, []);


  // START CAMERA
  const startCamera = async () => {

  try {

    const mediaStream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user"
        },
        audio: true
      });

    setStream(mediaStream);

    if (videoRef.current) {

      videoRef.current.srcObject =
        mediaStream;
        console.log(
          "Video srcObject:",
          videoRef.current.srcObject
        );


      await new Promise((resolve) => {

        videoRef.current.onloadedmetadata =
          async () => {

            await videoRef.current.play();

            resolve();

          };

      });

    }

    console.log("✅ Camera Started");
    console.log("Stream:", mediaStream);
    console.log("Tracks:", mediaStream.getTracks());

    return mediaStream;

  } catch (error) {

    console.log(error);

    alert("Unable to access webcam");

  }

};


const startInterview = async () => {

  try {

    if (!modelsLoaded) {

      alert("Models still loading");

      return;

    }

    const mediaStream =
      await startCamera();

    // FULLSCREEN
    if (
      document.documentElement.requestFullscreen
    ) {

      await document.documentElement.requestFullscreen();

    }

    setInterviewStarted(true);

    // START RECORDING
    startRecording(mediaStream);

    // WAIT FOR VIDEO
    setTimeout(async () => {

      if (videoRef.current) {

        await videoRef.current.play();

      }

      startFaceDetection();

    }, 4000);

  } catch (err) {

    console.log(err);

    alert(
      "Please allow camera and fullscreen"
    );

  }

};

  // START RECORDING
  const startRecording = (
  mediaStream = stream
) => {

  if (!mediaStream) {

    alert("Camera not started");

    return;

  }

  chunksRef.current = [];

  const recorder =
    new MediaRecorder(mediaStream);

  recorder.ondataavailable = (e) => {

    if (e.data.size > 0) {

      chunksRef.current.push(e.data);

    }

  };

  recorder.onstop = async () => {

  const blob =
    new Blob(
      chunksRef.current,
      { type: "video/webm" }
    );

  const url =
    URL.createObjectURL(blob);

  setVideoURL(url);

  try {

    const formData =
      new FormData();

    formData.append(
      "video",
      blob,
      "interview.webm"
    );

    formData.append(
      "sessionId",
      sessionId
    );

    await API.post(
      "/interview/upload-video",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    console.log(
      "✅ Video Uploaded"
    );

  } catch (err) {

    console.log(
      "Upload Error",
      err
    );

  }

};

  recorder.start();

  setMediaRecorder(recorder);

  setRecording(true);

};


  // FACE DETECTION
  const startFaceDetection = () => {

  // STOP OLD INTERVAL
  if (detectionInterval.current) {

    clearInterval(detectionInterval.current);

  }

  if (!modelsLoaded) {

    console.log("❌ Models not loaded");

    return;

  }

  if (!videoRef.current) {

    console.log("❌ Video ref missing");

    return;

  }

  console.log("✅ Face Detection Started");

  detectionInterval.current =
    setInterval(async () => {

      try {

        const video = videoRef.current;

        // VIDEO NOT READY
        if (
          !video ||
          video.readyState !== 4 ||
          video.videoWidth === 0
        ) {

          console.log("⏳ Waiting for video");

          return;

        }

        const detections =
          await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 224,
              scoreThreshold: 0.3
            })
          );

        console.log(
          "Detected Faces:",
          detections.length
        );

        // NO FACE
        if (detections.length === 0) {

          if (
            lastFaceStatus.current !==
            "NO_FACE"
          ) {

            lastFaceStatus.current =
              "NO_FACE";

            setFaceWarnings((prev) => [
              ...prev,
              "⚠ No face detected"
            ]);

            setWarningCount(
              (prev) => prev + 1
            );

          }

        }

        // MULTIPLE FACES
        else if (detections.length > 1) {

          if (
            lastFaceStatus.current !==
            "MULTIPLE"
          ) {

            lastFaceStatus.current =
              "MULTIPLE";

            setFaceWarnings((prev) => [
              ...prev,
              "⚠ Multiple faces detected"
            ]);

            setWarningCount(
              (prev) => prev + 1
            );

          }

        }

        // NORMAL
        else {

          lastFaceStatus.current = "NORMAL";

        }

      } catch (err) {

        console.log(
          "❌ Face Detection Error:",
          err
        );

      }

    }, 2000);

};

      

  // STOP RECORDING
  const stopRecording = () => {

    if (mediaRecorder) {

      mediaRecorder.stop();

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
      if (detectionInterval.current) {
        clearInterval(
          detectionInterval.current
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

  useEffect(() => {
  if (stream && videoRef.current) {
    console.log("Attaching stream");
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  }
}, [stream, interviewStarted]);

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
          faceWarnings.map((warning, index) => (

           <p
              key={index}
              style={{
               color: "orange"
             }}
          >
               {warning}
          </p>

  ))
}

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
                border: "2px solid gray",
                backgroundColor: "black"  

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


          {
  videoURL && (

    <div
      style={{
        marginTop: "20px"
      }}
    >

      <h3 style={{ color: "black" }}>
        Recorded Video
      </h3>

      <video
        src={videoURL}
        controls
        width="400"
        style={{
          borderRadius: "10px"
        }}
      />
      <p style={{ color: "green" }}>
  Models Loaded:
  {modelsLoaded ? " YES" : " NO"}
</p>

      <br />

      <a
        href={videoURL}
        download="mockmate-interview.webm"
      >

        <button
          style={{
            marginTop: "10px",
            padding: "10px"
          }}
        >
          Download Recording
        </button>

      </a>

    </div>

  )
}
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