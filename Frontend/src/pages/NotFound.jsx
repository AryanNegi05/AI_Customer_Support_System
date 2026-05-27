import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const NotFound = () => {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 w-full min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4 font-display">
            404
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 font-display">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-glow transition-all duration-200 hover:scale-105"
          >
            Go Home
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound