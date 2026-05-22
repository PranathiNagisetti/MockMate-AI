import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"

function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const login = async ()=>{

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      })

      localStorage.setItem("token",res.data.token)

      navigate("/dashboard")

    }catch(err){

      console.log(err)

      alert(err.response?.data?.message || "Login failed")

    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-10 rounded-2xl w-[400px] shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-2">
          MockMate.ai
        </h1>

        <p className="text-gray-400 text-center mb-8">
          AI Powered Mock Interviews
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 outline-none"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 outline-none"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-400">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-400 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login