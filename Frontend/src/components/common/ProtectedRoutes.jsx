import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark-900 to-dark-800">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full animate-pulse-slow"></div>
          <div className="absolute inset-2 bg-dark-800 rounded-full"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute