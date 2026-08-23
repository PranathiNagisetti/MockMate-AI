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
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4">

    {/* Background Decorations */}
    <div className="absolute top-0 left-0 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-30"></div>

    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-25"></div>

    {/* Register Card */}
    <div className="relative z-10 w-full max-w-md">

      <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-10">

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-5xl font-extrabold text-gray-800">
            MockMate
            <span className="text-green-600">.AI</span>
          </h1>

          <p className="text-gray-600 mt-3">
            Create your AI Interview Account
          </p>

        </div>

        {/* Full Name */}
        <div className="mb-5">

          <label className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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

        {/* Email */}
        <div className="mb-5">

          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="mb-5">

          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* Confirm Password */}
        <div className="mb-8">

          <label className="block text-gray-700 font-medium mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
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

        {/* Register Button */}
        <button
          onClick={register}
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
          Create Account
        </button>

        {/* Divider */}
        <div className="flex items-center my-8">

          <div className="flex-1 border-t border-gray-200"></div>

          <span className="px-3 text-gray-400 text-sm">
            OR
          </span>

          <div className="flex-1 border-t border-gray-200"></div>

        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600">

          Already have an account?

          <Link
            to="/"
            className="ml-2 font-semibold text-green-600 hover:text-green-700"
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