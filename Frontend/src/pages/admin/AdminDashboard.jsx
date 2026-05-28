import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../store/authSlice'
import { useEffect } from 'react'
import {fetchAnalytics, fetchAgents} from '../../store/adminSlice'
const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  const { analytics, agents } =
  useSelector(
    state => state.admin
  )

useEffect(() => {

  dispatch(fetchAnalytics())

  dispatch(fetchAgents())

}, [dispatch])

const stats = [

  {
    label: 'Total Tickets',
    value:
      analytics?.totalTickets || 0,
    color:
      'from-cyan-500 to-blue-600'
  },

  {
    label: 'Active Agents',
    value:
      analytics?.totalAgents || 0,
    color:
      'from-emerald-500 to-teal-600'
  },

  {
    label: 'Resolved',
    value:
      analytics?.resolvedTickets || 0,
    color:
      'from-violet-500 to-purple-600'
  },

  {
    label: 'Open Tickets',
    value:
      analytics?.openTickets || 0,
    color:
      'from-amber-500 to-orange-600'
  }

]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-white font-semibold">Admin Panel</span>
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/analytics" className="text-slate-400 hover:text-white transition-colors text-sm">Analytics</Link>
            <Link to="/admin/agents" className="text-slate-400 hover:text-white transition-colors text-sm">Manage Agents</Link>
            <span className="text-slate-400 text-sm">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
          <p className="text-slate-400 mt-1">System-wide stats and agent management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/admin/agents"
            className="group backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 hover:border-amber-500/50 rounded-2xl p-6 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold">Manage Agents</h3>
            <p className="text-slate-400 text-sm mt-1">Create, edit, and manage agent accounts</p>
            <span className="inline-block mt-3 text-amber-400 text-sm group-hover:translate-x-1 transition-transform">Manage →</span>
          </Link>

          <Link to="/admin/analytics"
            className="group backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl p-6 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold">Analytics</h3>
            <p className="text-slate-400 text-sm mt-1">View ticket trends, resolution rates, and ML performance</p>
            <span className="inline-block mt-3 text-cyan-400 text-sm group-hover:translate-x-1 transition-transform">View →</span>
          </Link>

          <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold">Queue Status</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">BullMQ Jobs</span>
                <span className="text-emerald-400">Running</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Redis</span>
                <span className="text-emerald-400">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ML Service</span>
                <span className="text-emerald-400">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent workload */}
        <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-semibold">Agent Workload Monitor</h2>
            <Link to="/admin/agents" className="text-amber-400 text-sm hover:text-amber-300 transition-colors">Manage agents</Link>
          </div>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.name} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-36 flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${agent.online ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <span className="text-slate-300 text-sm truncate">{agent.name}</span>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all"
                      style={{ width: `${(agent.tickets / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-4 text-sm flex-shrink-0 w-32 justify-end">
                  <span className="text-slate-400">{agent.tickets} open</span>
                  <span className="text-emerald-400">{agent.resolved} done</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard