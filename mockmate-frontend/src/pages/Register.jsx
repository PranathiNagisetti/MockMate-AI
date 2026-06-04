import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const navigate = useNavigate();

  const register = async () => {

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      alert("Please fill all fields");
      return;

    }

    if (password !== confirmPassword) {

      alert("Passwords do not match");
      return;

    }

    try {

      await API.post("/auth/register", {
        name: fullName,
        email,
        password
      });

      alert("Registration Successful");

      navigate("/");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Register failed"
      );

    }

  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full top-10 left-20"></div>

      <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-20"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8">

          {/* Header */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-white mb-2">
              MockMate.ai
            </h1>

            <p className="text-slate-400">
              Create Your AI Interview Account
            </p>

          </div>

          {/* Full Name */}
          <div className="mb-4">

            <label className="block text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Email */}
          <div className="mb-4">

            <label className="block text-slate-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Password */}
          <div className="mb-4">

            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Confirm Password */}
          <div className="mb-6">

            <label className="block text-slate-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Register Button */}
          <button
            onClick={register}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-3 rounded-xl font-semibold text-white shadow-lg"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-slate-400 mt-6">

            Already have an account?

            <Link
              to="/"
              className="text-blue-400 ml-2 hover:text-blue-300"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;