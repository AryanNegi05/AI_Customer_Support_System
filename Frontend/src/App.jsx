import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/common/ProtectedRoutes.jsx'
import { setUser } from './store/authSlice'
import * as authService from './services/authService'
import toast from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  // Verify token on app mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await authService.verifyToken()
          dispatch(setUser(response.user))
        } catch (error) {
          localStorage.removeItem('token')
        }
      }
    }

    verifyToken()
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-dark-900 to-dark-800">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-linear-to-r from-primary-500 to-primary-600 rounded-full animate-pulse-slow"></div>
          <div className="absolute inset-2 bg-dark-800 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to dashboard if authenticated, otherwise to login */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App