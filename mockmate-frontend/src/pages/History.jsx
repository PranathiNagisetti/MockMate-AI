import { useEffect, useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"
function History(){

  const [sessions,setSessions] = useState([])

  useEffect(()=>{

    const fetchHistory = async ()=>{

      try{

        const res = await API.get("/interview/history")

        setSessions(res.data)

      }catch(err){

        console.log(err)

      }

    }

    fetchHistory()

  },[])

  return(
    <>
    
     <Navbar />

    <div>

      <h2>Interview History</h2>

      {sessions.map((session)=>(
        <div key={session._id}>

          <h3>{session.role}</h3>

          <p>Difficulty: {session.difficulty}</p>

          <p>Status: {session.status}</p>

          <p>Final Score: {session.finalScore}</p>

          <hr/>

        </div>
      ))}

    </div>
    </>

  )

}

export default History