import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AuthLayout from './AuthLayout'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,

  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress'
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const { register, loading } = useAuth()

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers'
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms agreement
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    } catch (error) {
      // Error is handled by the hook
      console.error('Registration error:', error)
    }
  }

  return (
    <AuthLayout
      title="Join Us"
      subtitle="Create your AI support account"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <div className="relative">
            <PersonIcon className="absolute left-4 top-3.5 text-primary-500" fontSize="small" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`input-field pl-12 ${
                errors.name ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900' : ''
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              ⚠️ {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.15s' }}>
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
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>
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
          <p className="text-xs text-gray-500 dark:text-gray-400">
            At least 8 characters with uppercase, lowercase & numbers
          </p>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.25s' }}>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <div className="relative">
            <LockIcon className="absolute left-4 top-3.5 text-primary-500" fontSize="small" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`input-field pl-12 pr-12 ${
                errors.confirmPassword ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              ⚠️ {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-3 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e.target.checked)
              if (errors.terms) {
                setErrors((prev) => ({ ...prev, terms: '' }))
              }
            }}
            className="w-5 h-5 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
          />
          <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            I agree to the{' '}
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            ⚠️ {errors.terms}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed animate-slide-in-right"
          style={{ animationDelay: '0.35s' }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} style={{ color: 'white' }} />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <span className="ml-1">→</span>
            </>
          )}
        </button>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary-600 dark:text-primary-400 hover:underline transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Register