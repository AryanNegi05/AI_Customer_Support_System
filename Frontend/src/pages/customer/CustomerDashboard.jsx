import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../store/authSlice'
const CustomerDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  const stats = [
    { label: 'Open Tickets', value: '3', color: 'from-cyan-500 to-blue-600' },
    { label: 'Resolved', value: '12', color: 'from-emerald-500 to-teal-600' },
    { label: 'Pending', value: '1', color: 'from-amber-500 to-orange-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-white font-semibold">SupportAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">Hi, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name} 👋</h1>
          <p className="text-slate-400 mt-1">What can we help you with today?</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/customer/chat"
            className="group backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg">Start a Chat</h3>
            <p className="text-slate-400 text-sm mt-1">Talk to our AI assistant to get instant help</p>
            <span className="inline-block mt-3 text-cyan-400 text-sm group-hover:translate-x-1 transition-transform">Start chatting →</span>
          </Link>

          <Link
            to="/customer/tickets"
            className="group backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg">My Tickets</h3>
            <p className="text-slate-400 text-sm mt-1">Track the status of your support tickets</p>
            <span className="inline-block mt-3 text-emerald-400 text-sm group-hover:translate-x-1 transition-transform">View tickets →</span>
          </Link>
        </div>

        {/* Recent tickets preview */}
        <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Recent Tickets</h2>
          <div className="space-y-3">
            {[
              { id: '#1042', title: 'Cannot login to my account', status: 'Open', statusColor: 'text-amber-400 bg-amber-400/10' },
              { id: '#1038', title: 'Billing issue on last invoice', status: 'In Progress', statusColor: 'text-cyan-400 bg-cyan-400/10' },
              { id: '#1031', title: 'Feature request: dark mode', status: 'Resolved', statusColor: 'text-emerald-400 bg-emerald-400/10' },
            ].map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-sm font-mono">{ticket.id}</span>
                  <span className="text-slate-300 text-sm">{ticket.title}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ticket.statusColor}`}>{ticket.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard