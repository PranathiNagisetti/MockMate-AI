import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CodingAssessment() {

    const { assessmentId } = useParams();

    const navigate = useNavigate();

    const [assessment, setAssessment] = useState(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [language, setLanguage] = useState("javascript");

    const [code, setCode] = useState("");

    const [input, setInput] = useState("");

    const [output, setOutput] = useState("");

    const [running, setRunning] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [timeLeft, setTimeLeft] = useState(45 * 60);

    // ------------------------------------
    // Load Assessment
    // ------------------------------------

    useEffect(() => {

        fetchAssessment();

    }, []);

    const fetchAssessment = async () => {

        try {

            const res = await API.get(
                `/coding/${assessmentId}`
            );

            setAssessment(res.data);

        }

        catch (err) {

            console.log(err);

            alert("Unable to load assessment.");

        }

    };

    // ------------------------------------
    // Timer
    // ------------------------------------

    useEffect(() => {

        if (!assessment) return;

        const timer = setInterval(() => {

            setTimeLeft(prev => {

                if (prev <= 1) {

                    clearInterval(timer);

                    finishAssessment();

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, [assessment]);

    // ------------------------------------
    // Format Time
    // ------------------------------------

    const formatTime = (seconds) => {

        const mins = Math.floor(seconds / 60);

        const secs = seconds % 60;

        return `${mins}:${secs.toString().padStart(2, "0")}`;

    };

    // ------------------------------------
    // Default Template
    // ------------------------------------

    useEffect(() => {

        switch (language) {

            case "javascript":

                setCode(
`// Write your complete program here

`
                );

                break;

            case "python":

                setCode(
`# Write your complete program here

`
                );

                break;

            case "java":

                setCode(
`public class Main {

    public static void main(String[] args) {

    }

}
`
                );

                break;

            case "cpp":

                setCode(
`#include<bits/stdc++.h>
using namespace std;

int main(){

    return 0;

}
`
                );

                break;

            default:

                setCode("");

        }

    }, [language]);

    if (!assessment) {

        return (

            <>
                <Navbar />

                <div className="min-h-screen flex items-center justify-center">

                    Loading Assessment...

                </div>

            </>

        );

    }

    const question =
        assessment.questions[currentQuestion];


     // ==========================================
    // RUN CODE
    // ==========================================

    const runCode = async () => {

        try {

            setRunning(true);

            setOutput("Running...");

            const res = await API.post("/coding/run", {

                language,

                code,

                input

            });

            let result = "";

            if (res.data.output) {

                result += res.data.output;

            }

            if (res.data.cpuTime) {

                result += `\n\nCPU Time : ${res.data.cpuTime}`;

            }

            if (res.data.memory) {

                result += `\nMemory : ${res.data.memory}`;

            }

            setOutput(result);

        }

        catch (err) {

            console.log(err);

            setOutput("Execution Error");

        }

        finally {

            setRunning(false);

        }

    };

    // ==========================================
    // SAVE CURRENT QUESTION
    // ==========================================

    const saveQuestion = async () => {

        try {

            await API.post("/coding/submit", {

                assessmentId,

                questionId: question._id,

                language,

                code,

                output,

                passed: false

            });

        }

        catch (err) {

            console.log(err);

        }

    };

    // ==========================================
    // SUBMIT QUESTION
    // ==========================================

    const submitQuestion = async () => {

        try {

            setSubmitting(true);

            await API.post("/coding/submit", {

                assessmentId,

                questionId: question._id,

                language,

                code,

                output,

                passed: true

            });

            alert("Question Submitted Successfully");

        }

        catch (err) {

            console.log(err);

            alert("Unable to submit");

        }

        finally {

            setSubmitting(false);

        }

    };



                       
    // ==========================================
// NEXT QUESTION
// ==========================================

const nextQuestion = async () => {

    await saveQuestion();

    if (currentQuestion < assessment.questions.length - 1) {

        setCurrentQuestion(currentQuestion + 1);

        setCode("");

        setInput("");

        setOutput("");

    }

};

// ==========================================
// FINISH ASSESSMENT
// ==========================================

const finishAssessment = async () => {

    try {

        await saveQuestion();

        await API.post("/coding/complete",{

            assessmentId

            });

navigate(`/coding/result/${assessmentId}`);

        alert("Coding Assessment Completed Successfully!");

        navigate(`/coding/result/${assessmentId}`);

    }

    catch (err) {

        console.log(err);

        alert("Unable to complete assessment.");

    }

};




        // ==========================================
    // UI
    // ==========================================


    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-green-50 text-gray-800">

                {/* TOP BAR */}

                <div className="flex justify-between items-center px-8 py-5 bg-white shadow-md border-b border-green-100">

                    <div>

                        <h1 className="text-3xl font-bold text-green-700">

                            Coding Assessment

                        </h1>

                        <p className="text-gray-600">

                            Question {currentQuestion + 1} of {assessment.questions.length}

                        </p>

                    </div>

                    <div className="flex items-center gap-6">

                        <div
                            className={`text-xl font-bold ${
                                    timeLeft < 300
                                        ? "text-red-500"
                                        : "text-green-600"
                                }`}
                        >

                            ⏱ {formatTime(timeLeft)}

                        </div>

                        <select

                            value={language}

                            onChange={(e) =>
                                setLanguage(e.target.value)
                            }

                           className="bg-white border border-green-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-500"

                        >

                            <option value="javascript">

                                JavaScript

                            </option>

                            <option value="python">

                                Python

                            </option>

                            <option value="java">

                                Java

                            </option>

                            <option value="cpp">

                                C++

                            </option>

                        </select>

                    </div>

                </div>

                {/* MAIN SPLIT */}

                <Split

                    className="flex"

                    sizes={[40,60]}

                    minSize={300}

                    gutterSize={8}

                    style={{

                        height:"calc(100vh - 90px)"

                    }}

                >

                    {/* ================= LEFT PANEL ================= */}

                    <div className="overflow-y-auto bg-white p-8 shadow-lg border-r border-green-100">

                        <h2 className="text-3xl font-bold text-green-700 mb-4">

                            {question.title}

                        </h2>

                        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold">

                            {question.difficulty}

                        </span>

                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-green-700">

                                Problem Statement

                            </h3>

                            <p className="text-gray-700 whitespace-pre-wrap">

                                {question.description}

                            </p>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-xl font-semibold">

                                Input Format

                            </h3>

                            <p className="text-gray-700 whitespace-pre-wrap">

                                {question.inputFormat}

                            </p>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-xl font-semibold">

                                Output Format

                            </h3>

                            <p className="text-gray-700 whitespace-pre-wrap">

                                {question.outputFormat}

                            </p>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-xl font-semibold">

                                Constraints

                            </h3>

                            <p className="text-gray-700 whitespace-pre-wrap">

                                {question.constraints}

                            </p>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-xl font-semibold">

                                Sample Input

                            </h3>

                            <pre className="bg-green-50 border border-green-200 rounded-xl p-4 mt-2">

                                {question.sampleInput}

                            </pre>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-xl font-semibold">

                                Sample Output

                            </h3>

                            <pre className="bg-green-50 border border-green-200 rounded-xl p-4 mt-2">

                                {question.sampleOutput}

                            </pre>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-xl font-semibold">

                                Explanation

                            </h3>

                            <p className="text-gray-700 whitespace-pre-wrap">

                                {question.explanation}

                            </p>

                        </div>

                    </div>

                    {/* ================= RIGHT PANEL ================= */}

                    <div className="flex flex-col">

                        <div className="flex-1">

                            <Editor

                                height="100%"

                                language={language}

                                value={code}

                                onChange={(value)=>setCode(value)}

                                theme="light"

                                options={{

                                    fontSize:16,

                                    automaticLayout:true,

                                    minimap:{

                                        enabled:false

                                    }

                                }}

                            />

                        </div>

                        <div className="grid grid-cols-2 gap-6 p-6 bg-white border-t border-green-100 shadow-md">

                            <div>

                                <h3 className="mb-2 font-semibold">

                                    Custom Input

                                </h3>

                                <textarea

                                    rows={7}

                                    value={input}

                                    onChange={(e)=>setInput(e.target.value)}

                                    className="w-full bg-green-50 border border-green-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500"

                                />

                            </div>

                            <div>

                                <h3 className="mb-2 font-semibold">

                                    Output

                                </h3>

                                <textarea

                                    rows={7}

                                    readOnly

                                    value={output}

                                    className="w-full bg-white border-2 border-green-300 text-gray-800 rounded-xl p-3 font-mono"
                                />

  

                            </div>




                        </div>

  
<div className="flex justify-between items-center p-6 bg-white border-t border-green-100">

    <div className="flex gap-4">

        <button

            onClick={runCode}

            disabled={running}

            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"

        >

            {running ? "Running..." : "▶ Run Code"}

        </button>

        

        <button

            onClick={submitQuestion}

            disabled={submitting}

            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"

        >

            {

                submitting

                ?

                "Submitting..."

                :

                "✓ Submit"

            }

        </button>

    </div>

    <div className="flex gap-4">

        {

            currentQuestion !== assessment.questions.length - 1

            ?

            <button

                onClick={nextQuestion}

                className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg"

            >

                Next Question →

            </button>

            :

            <button

                onClick={finishAssessment}

                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow"

            >

                Finish Assessment

            </button>

        }

    </div>

</div>


                    </div> {/* End Right Panel */}

                </Split>

            </div>

        </>

    );
}

export default CodingAssessment;
