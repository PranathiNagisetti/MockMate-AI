import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Interview from "./pages/Interview"
import Result from "./pages/Result"
import History from "./pages/History"

import ProtectedRoute from "./components/ProtectedRoute"

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview/:sessionId"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result/:sessionId"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App