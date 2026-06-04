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

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4">

    {/* Background Blur Effects */}
    <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full top-10 left-10"></div>
    <div className="absolute w-72 h-72 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10"></div>

    <div className="relative w-full max-w-md">

      {/* Logo Section */}
      <div className="text-center mb-8">

        <h1 className="text-5xl font-extrabold text-white mb-3">
          MockMate<span className="text-blue-500">.AI</span>
        </h1>

        <p className="text-slate-400 text-lg">
          Practice. Improve. Get Hired.
        </p>

      </div>

      {/* Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-slate-400 mb-6">
          Login to continue your AI interview journey
        </p>

        {/* Email */}
        <div className="mb-4">

          <label className="block text-slate-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800/70
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
            "
          />

        </div>

        {/* Password */}
        <div className="mb-6">

          <label className="block text-slate-300 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800/70
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
            "
          />

        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="
            w-full
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            hover:from-blue-700
            hover:to-indigo-700
            text-white
            font-semibold
            py-4
            rounded-xl
            transition-all
            duration-300
            shadow-lg
            hover:scale-[1.02]
          "
        >
          Login
        </button>

        {/* Register */}
        <p className="text-center text-slate-400 mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="
              text-blue-400
              ml-2
              font-semibold
              hover:text-blue-300
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  </div>
);
}
export default Login