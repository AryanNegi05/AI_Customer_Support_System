import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AuthLayout from './AuthLayout'
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,

} from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const { login, loading } = useAuth()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      })
    } catch (error) {
      // Error is handled by the hook toast
      console.error('Login error:', error)
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your AI support account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <div className="relative">
            <EmailIcon className="absolute left-4 top-3.5 text-primary-500" fontSize="small" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`input-field pl-12 ${
                errors.email ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900' : ''
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              ⚠️ {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <LockIcon className="absolute left-4 top-3.5 text-primary-500" fontSize="small" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`input-field pl-12 pr-12 ${
                errors.password ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              ⚠️ {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed animate-slide-in-right"
          style={{ animationDelay: '0.3s' }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} style={{ color: 'white' }} />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <span className="ml-1">→</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-dark-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
          <button
            type="button"
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <span>🔵</span> Google
          </button>
          <button
            type="button"
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <span>🔷</span> GitHub
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary-600 dark:text-primary-400 hover:underline transition-colors"
          >
            Create one now
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Login