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

      navigate("/main-dashboard")

    }catch(err){

      console.log(err)

      alert(err.response?.data?.message || "Login failed")

    }

  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4">

    {/* Background Decorations */}
    <div className="absolute top-0 left-0 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-30"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-25"></div>

    <div className="relative w-full max-w-md">

      {/* Logo */}
      <div className="text-center mb-8">

        <h1 className="text-5xl font-extrabold text-gray-800">
          MockMate
          <span className="text-green-600">.AI</span>
        </h1>

        <p className="text-gray-600 mt-3">
          Practice. Improve. Get Hired.
        </p>

      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-10">

        <h2 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 mt-2 mb-8">
          Sign in to continue your AI interview journey.
        </p>

        {/* Email */}
        <div className="mb-5">

          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-gray-50
              text-gray-800
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
              focus:border-green-500
              transition
            "
          />

        </div>

        {/* Password */}
        <div className="mb-8">

          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-gray-50
              text-gray-800
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
              focus:border-green-500
              transition
            "
          />

        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="
            w-full
            py-3.5
            rounded-xl
            bg-gradient-to-r
            from-green-600
            to-emerald-500
            hover:from-green-700
            hover:to-emerald-600
            text-white
            font-semibold
            shadow-lg
            hover:shadow-xl
            transition-all
            duration-300
            hover:-translate-y-0.5
          "
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-8">

          <div className="flex-1 border-t border-gray-200"></div>

          <span className="px-3 text-gray-400 text-sm">
            OR
          </span>

          <div className="flex-1 border-t border-gray-200"></div>

        </div>

        {/* Register */}
        <p className="text-center text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-green-600 hover:text-green-700"
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>

  </div>
);
}
export default Login