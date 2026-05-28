import { Link } from 'react-router-dom'

import { useEffect } from 'react'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  fetchAnalytics
} from '../../store/adminSlice'



const Analytics = () => {

  const dispatch = useDispatch()

  const { analytics } =
    useSelector(
      state => state.admin
    )



  useEffect(() => {

    dispatch(fetchAnalytics())

  }, [dispatch])



  const cards = [

    {
      label: 'Total Tickets',
      value:
        analytics?.totalTickets || 0,
      color:
        'from-cyan-500 to-blue-600'
    },

    {
      label: 'Resolved Tickets',
      value:
        analytics?.resolvedTickets || 0,
      color:
        'from-emerald-500 to-teal-600'
    },

    {
      label: 'Open Tickets',
      value:
        analytics?.openTickets || 0,
      color:
        'from-amber-500 to-orange-600'
    },

    {
      label: 'Assigned Tickets',
      value:
        analytics?.assignedTickets || 0,
      color:
        'from-violet-500 to-purple-600'
    },

    {
      label: 'In Progress',
      value:
        analytics?.inProgressTickets || 0,
      color:
        'from-pink-500 to-rose-600'
    },

    {
      label: 'Total Agents',
      value:
        analytics?.totalAgents || 0,
      color:
        'from-indigo-500 to-blue-600'
    },

    {
      label: 'Customers',
      value:
        analytics?.totalCustomers || 0,
      color:
        'from-teal-500 to-cyan-600'
    }

  ]



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Navbar */}

      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">

          <Link
            to="/admin/dashboard"
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >

            ← Dashboard

          </Link>

          <div className="h-4 w-px bg-slate-700" />

          <span className="text-white font-medium">

            Analytics

          </span>

        </div>

      </nav>



      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        <div>

          <h1 className="text-3xl font-bold text-white">

            System Analytics

          </h1>

          <p className="text-slate-400 mt-2">

            Real-time support system metrics

          </p>

        </div>



        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {cards.map((card) => (

            <div
              key={card.label}
              className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm"
            >

              <p className="text-slate-400 text-sm">

                {card.label}

              </p>

              <p
                className={`text-4xl font-bold mt-3 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
              >

                {card.value}

              </p>

            </div>

          ))}

        </div>



        {/* System Status */}

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">

          <h2 className="text-white font-semibold mb-6">

            System Services

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-slate-700/30 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <span className="text-slate-300">

                  Redis Queue

                </span>

                <div className="w-3 h-3 rounded-full bg-emerald-400" />

              </div>

              <p className="text-emerald-400 text-sm mt-3">

                Connected

              </p>

            </div>



            <div className="bg-slate-700/30 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <span className="text-slate-300">

                  ML Service

                </span>

                <div className="w-3 h-3 rounded-full bg-emerald-400" />

              </div>

              <p className="text-emerald-400 text-sm mt-3">

                Online

              </p>

            </div>



            <div className="bg-slate-700/30 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <span className="text-slate-300">

                  Ticket Routing

                </span>

                <div className="w-3 h-3 rounded-full bg-emerald-400" />

              </div>

              <p className="text-emerald-400 text-sm mt-3">

                Active

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Analytics