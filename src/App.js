"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"
import Toast from "./components/common/Toast"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
    showToast("Login successful!")
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("documents")
    localStorage.removeItem("conversations")
    showToast("Logged out successfully!")
  }

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp onSignUp={handleLogin} showToast={showToast} />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} showToast={showToast} />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard user={user} onLogout={handleLogout} showToast={showToast} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </Router>
  )
}

export default App
