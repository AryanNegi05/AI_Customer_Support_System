import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import {
  LogoutOutlined,
  Brightness4,
  Brightness7,
  Dashboard as DashboardIcon,
} from '@mui/icons-material'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 min-h-screen">
        {/* Navbar */}
        <nav className="backdrop-blur-md bg-white/80 dark:bg-dark-800/80 border-b border-gray-200 dark:border-dark-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center">
                <DashboardIcon className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                Support AI
              </h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
              >
                {isDark ? (
                  <Brightness7 className="text-yellow-500" />
                ) : (
                  <Brightness4 className="text-slate-700" />
                )}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogoutOutlined fontSize="small" />
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 font-display">
              Welcome, {user?.name}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Here's your AI-powered customer support dashboard
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Active Chats */}
            <div className="card p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Active Chats
                </h3>
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">12</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">+3 from last week</p>
            </div>

            {/* Card 2: Resolved Tickets */}
            <div className="card p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Resolved Tickets
                </h3>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">84</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">92% resolution rate</p>
            </div>

            {/* Card 3: Pending Issues */}
            <div className="card p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pending Issues
                </h3>
                <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">7</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Awaiting response</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12 card p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 font-display">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Customer Issue #{100 + item}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-full">
                    Resolved
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard