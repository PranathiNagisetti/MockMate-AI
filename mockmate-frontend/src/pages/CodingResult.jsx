import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CodingResult(){

    const { assessmentId } = useParams();

    const [result,setResult]=useState(null);

    useEffect(()=>{

        const fetchResult=async()=>{

            const res=await API.get(

                `/coding/result/${assessmentId}`

            );

            setResult(res.data);

        }

        fetchResult();

    },[]);

    if(!result){

        return <h2>Loading...</h2>;

    }

    return(

        <>
        <Navbar/>

        <div className="min-h-screen bg-slate-950 text-white p-8">

            <h1 className="text-4xl font-bold mb-8">

                Coding Assessment Result

            </h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-slate-900 p-6 rounded-xl">

                    <p>Total Questions</p>

                    <h2 className="text-3xl">

                        {result.totalQuestions}

                    </h2>

                </div>

                <div className="bg-slate-900 p-6 rounded-xl">

                    <p>Solved</p>

                    <h2 className="text-3xl text-green-400">

                        {result.solved}

                    </h2>

                </div>

                <div className="bg-slate-900 p-6 rounded-xl">

                    <p>Total Score</p>

                    <h2 className="text-3xl text-blue-400">

                        {result.totalScore}

                    </h2>

                </div>

            </div>

            <h2 className="text-2xl font-bold mb-6">

                Question Wise Performance

            </h2>

            {result.answers.map((ans,index)=>(

                <div

                    key={index}

                    className="bg-slate-900 rounded-xl p-6 mb-5"

                >

                    <h3 className="text-xl font-semibold">

                        {ans.question.title}

                    </h3>

                    <p>

                        Verdict :

                        <span

                        className={`ml-2 font-bold ${
                            ans.verdict==="Accepted"

                            ?

                            "text-green-400"

                            :

                            "text-red-400"

                        }`}

                        >

                        {ans.verdict}

                        </span>

                    </p>

                    <p>

                        Passed :

                        {ans.passedCases}/

                        {ans.totalCases}

                    </p>

                   

                    <p>

                        Memory :

                        {ans.memory}

                    </p>

                    <p>

                        Score :

                        {ans.score}

                    </p>

                </div>

            ))}

        </div>

        </>

    );

}

export default CodingResult;