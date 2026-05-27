import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as adminService from "../../services/adminService"

const ManageAgents = () => {

  const [agents, setAgents] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    skills: ''
  })

const fetchAgents = async () => {

  try {

    const data = await adminService.getAgents()

    console.log(data)

    setAgents(data.agents)

  } catch (error) {

    console.log(error)

  }

}
  useEffect(() => {

    fetchAgents()

  }, [])
  const handleCreate = async () => {

    if (!form.name || !form.email || !form.password) return

    try {

      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        skills: form.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      }

      await adminService.createAgent(payload)

      await fetchAgents()

      setForm({
        name: '',
        email: '',
        password: '',
        skills: ''
      })

      setShowForm(false)

    } catch (error) {

      console.log(error)

    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">

          <Link
            to="/admin/dashboard"
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← Dashboard
          </Link>

          <div className="h-4 w-px bg-slate-700" />

          <span className="text-white font-medium">
            Manage Agents
          </span>

        </div>

      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold text-white">
              Agents
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              {agents.length} agents registered
            </p>

          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-br from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            + Create Agent
          </button>

        </div>

        {showForm && (

          <div className="backdrop-blur-sm bg-slate-800/40 border border-amber-500/30 rounded-2xl p-6 space-y-4">

            <h2 className="text-white font-semibold">
              New Agent
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {[
                { key: 'name', placeholder: 'Full Name', type: 'text' },
                { key: 'email', placeholder: 'Email Address', type: 'email' },
                { key: 'password', placeholder: 'Password', type: 'password' },
                { key: 'skills', placeholder: 'Skills (comma separated)', type: 'text' },
              ].map((f) => (

                <input
                  key={f.key}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}

                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [f.key]: e.target.value
                    }))
                  }

                  className="bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                />

              ))}

            </div>

            <div className="flex gap-3">

              <button
                onClick={handleCreate}
                className="bg-gradient-to-br from-amber-500 to-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Create Agent
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-white transition-colors text-sm px-4 py-2.5 border border-slate-700 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </div>

        )}

        <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">

          {agents.map((agent, i) => (

            <div
              key={agent._id}

              className={`px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                i < agents.length - 1
                  ? 'border-b border-slate-700/50'
                  : ''
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0">

                  <span className="text-amber-400 font-semibold text-sm">
                    {agent.name?.charAt(0)}
                  </span>

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <p className="text-white font-medium">
                      {agent.name}
                    </p>

                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                  </div>

                  <p className="text-slate-400 text-sm">
                    {agent.email}
                  </p>

                  <div className="flex gap-1 mt-1 flex-wrap">

                    {agent.skills?.map((s) => (

                      <span
                        key={s}
                        className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-full"
                      >
                        {s}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

              <div className="flex items-center gap-3 flex-shrink-0">

                <span className="text-sm text-slate-400">
                  Active Agent
                </span>

                <span className="text-xs px-2.5 py-1 rounded-full font-medium text-emerald-400 bg-emerald-400/10">
                  online
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default ManageAgents