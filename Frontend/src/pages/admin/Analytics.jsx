import { Link } from 'react-router-dom'

const bar = (value, max, color) => (
  <div className="flex items-center gap-3">
    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
      <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
    <span className="text-slate-300 text-sm w-8 text-right">{value}</span>
  </div>
)

const Analytics = () => {
  const categories = [
    { name: 'Authentication', count: 72, color: 'from-cyan-500 to-blue-600' },
    { name: 'Billing', count: 58, color: 'from-emerald-500 to-teal-600' },
    { name: 'Technical', count: 65, color: 'from-violet-500 to-purple-600' },
    { name: 'General', count: 33, color: 'from-amber-500 to-orange-600' },
    { name: 'Payments', count: 20, color: 'from-red-500 to-rose-600' },
  ]

  const priorities = [
    { name: 'Critical', count: 18, color: 'from-red-500 to-rose-600' },
    { name: 'High', count: 45, color: 'from-orange-500 to-amber-600' },
    { name: 'Medium', count: 98, color: 'from-yellow-500 to-amber-500' },
    { name: 'Low', count: 87, color: 'from-slate-500 to-slate-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link to="/admin/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm">← Dashboard</Link>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-white font-medium">Analytics</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <h1 className="text-2xl font-bold text-white">System Analytics</h1>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Tickets', value: '248', sub: 'All time', color: 'from-cyan-500 to-blue-600' },
            { label: 'AI Resolved', value: '61%', sub: 'Chatbot resolution rate', color: 'from-violet-500 to-purple-600' },
            { label: 'Avg Resolution', value: '3.2h', sub: 'Mean time to resolve', color: 'from-emerald-500 to-teal-600' },
            { label: 'Open Tickets', value: '34', sub: 'Awaiting resolution', color: 'from-amber-500 to-orange-600' },
          ].map((k) => (
            <div key={k.label} className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
              <p className="text-slate-400 text-xs">{k.label}</p>
              <p className={`text-3xl font-bold mt-1 bg-gradient-to-r ${k.color} bg-clip-text text-transparent`}>{k.value}</p>
              <p className="text-slate-500 text-xs mt-1">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By category */}
          <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-semibold">Tickets by Category</h2>
            {categories.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-300">{c.name}</span>
                </div>
                {bar(c.count, 100, c.color)}
              </div>
            ))}
          </div>

          {/* By priority */}
          <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-semibold">Tickets by Priority</h2>
            {priorities.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-300">{p.name}</span>
                </div>
                {bar(p.count, 120, p.color)}
              </div>
            ))}
          </div>
        </div>

        {/* ML Performance */}
        <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <h2 className="text-white font-semibold">ML Model Performance</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Intent Classifier Accuracy', value: '87%', color: 'from-violet-500 to-purple-600' },
              { label: 'Priority Model Accuracy', value: '82%', color: 'from-cyan-500 to-blue-600' },
              { label: 'Avg Prediction Time', value: '120ms', color: 'from-emerald-500 to-teal-600' },
            ].map((m) => (
              <div key={m.label} className="bg-slate-700/30 rounded-xl p-4">
                <p className="text-slate-400 text-xs mb-2">{m.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics