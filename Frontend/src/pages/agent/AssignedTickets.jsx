import  { useState } from 'react'
import { Link } from 'react-router-dom'

const ALL_TICKETS = [
  { id: '1042', title: 'Cannot login to my account', category: 'Authentication', priority: 'High', status: 'Open', customer: 'Rahul Sharma', date: 'May 26, 2026' },
  { id: '1040', title: 'API rate limit exceeded error', category: 'Technical', priority: 'Critical', status: 'Open', customer: 'Priya Mehta', date: 'May 25, 2026' },
  { id: '1037', title: 'Payment not processing', category: 'Billing', priority: 'Medium', status: 'In Progress', customer: 'Amit Singh', date: 'May 24, 2026' },
  { id: '1033', title: 'Dashboard not loading correctly', category: 'Technical', priority: 'Low', status: 'In Progress', customer: 'Neha Gupta', date: 'May 22, 2026' },
  { id: '1029', title: 'Cannot export data as CSV', category: 'General', priority: 'Low', status: 'Resolved', customer: 'Vikram Nair', date: 'May 20, 2026' },
]

const statusStyle = { Open: 'text-amber-400 bg-amber-400/10', 'In Progress': 'text-cyan-400 bg-cyan-400/10', Resolved: 'text-emerald-400 bg-emerald-400/10' }
const priorityStyle = { Critical: 'text-red-400 bg-red-400/10', High: 'text-orange-400 bg-orange-400/10', Medium: 'text-yellow-400 bg-yellow-400/10', Low: 'text-slate-400 bg-slate-400/10' }

const AssignedTickets = () => {
  const [filter, setFilter] = useState('All')
  const statuses = ['All', 'Open', 'In Progress', 'Resolved']
  const filtered = filter === 'All' ? ALL_TICKETS : ALL_TICKETS.filter((t) => t.status === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link to="/agent/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm">← Dashboard</Link>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-white font-medium">Assigned Tickets</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === s ? 'bg-violet-500 text-white' : 'bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
          {filtered.map((ticket, i) => (
            <Link key={ticket.id} to={`/agent/tickets/${ticket.id}`}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 hover:bg-slate-700/20 transition-colors group ${i < filtered.length - 1 ? 'border-b border-slate-700/50' : ''}`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs font-mono">#{ticket.id}</span>
                  <span className="text-slate-500 text-xs">{ticket.category}</span>
                </div>
                <p className="text-white font-medium group-hover:text-violet-300 transition-colors">{ticket.title}</p>
                <p className="text-slate-500 text-xs">{ticket.customer} · {ticket.date}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityStyle[ticket.priority]}`}>{ticket.priority}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[ticket.status]}`}>{ticket.status}</span>
                <span className="text-slate-600 group-hover:text-violet-400 ml-2">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AssignedTickets