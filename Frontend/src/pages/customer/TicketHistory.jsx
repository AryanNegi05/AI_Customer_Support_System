import  { useState } from 'react'
import { Link } from 'react-router-dom'

const TICKETS = [
  { id: '#1042', title: 'Cannot login to my account', category: 'Authentication', priority: 'High', status: 'Open', date: 'May 26, 2026' },
  { id: '#1038', title: 'Billing issue on last invoice', category: 'Billing', priority: 'Medium', status: 'In Progress', date: 'May 22, 2026' },
  { id: '#1031', title: 'Feature request: dark mode', category: 'General', priority: 'Low', status: 'Resolved', date: 'May 15, 2026' },
  { id: '#1028', title: 'API rate limit exceeded error', category: 'Technical', priority: 'Critical', status: 'Resolved', date: 'May 10, 2026' },
]

const statusStyle = {
  'Open': 'text-amber-400 bg-amber-400/10',
  'In Progress': 'text-cyan-400 bg-cyan-400/10',
  'Resolved': 'text-emerald-400 bg-emerald-400/10',
}

const priorityStyle = {
  'Critical': 'text-red-400 bg-red-400/10',
  'High': 'text-orange-400 bg-orange-400/10',
  'Medium': 'text-yellow-400 bg-yellow-400/10',
  'Low': 'text-slate-400 bg-slate-400/10',
}

const TicketHistory = () => {
  const [filter, setFilter] = useState('All')
  const statuses = ['All', 'Open', 'In Progress', 'Resolved']

  const filtered = filter === 'All' ? TICKETS : TICKETS.filter((t) => t.status === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl" />
      </div>

      <nav className="relative z-10 border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link to="/customer/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm">← Dashboard</Link>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-white font-medium">My Tickets</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === s
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Tickets list */}
        <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <p className="text-slate-400 text-center py-12">No tickets found.</p>
          ) : (
            filtered.map((ticket, i) => (
              <div
                key={ticket.id}
                className={`px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  i < filtered.length - 1 ? 'border-b border-slate-700/50' : ''
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs font-mono">{ticket.id}</span>
                    <span className="text-xs text-slate-500">{ticket.category}</span>
                  </div>
                  <p className="text-white font-medium">{ticket.title}</p>
                  <p className="text-slate-500 text-xs">{ticket.date}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityStyle[ticket.priority]}`}>{ticket.priority}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[ticket.status]}`}>{ticket.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketHistory