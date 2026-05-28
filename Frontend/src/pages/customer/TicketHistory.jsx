import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchCustomerTickets
} from '../../store/customerSlice'



const statusStyle = {

  open:
    'text-amber-400 bg-amber-400/10',

  assigned:
    'text-cyan-400 bg-cyan-400/10',

  resolved:
    'text-emerald-400 bg-emerald-400/10'

}



const priorityStyle = {

  critical:
    'text-red-400 bg-red-400/10',

  high:
    'text-orange-400 bg-orange-400/10',

  medium:
    'text-yellow-400 bg-yellow-400/10',

  low:
    'text-slate-400 bg-slate-400/10'

}



const TicketHistory = () => {

  const dispatch = useDispatch()

  const {
    tickets,
    loading
  } = useSelector(
    (state) => state.customer
  )

  const [filter, setFilter] =
    useState('All')

  const [expanded, setExpanded] =
    useState(null)



  useEffect(() => {

    dispatch(fetchCustomerTickets())

  }, [dispatch])



  const statuses = [
    'All',
    'open',
    'assigned',
    'resolved'
  ]



  const filtered =

    filter === 'All'

      ? tickets

      : tickets.filter(

          (t) =>
            t.status === filter
        )



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl" />

      </div>



      {/* Navbar */}

      <nav className="relative z-10 border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">

          <Link
            to="/customer/dashboard"
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >

            ← Dashboard

          </Link>

          <div className="h-4 w-px bg-slate-700" />

          <span className="text-white font-medium">
            My Tickets
          </span>

        </div>

      </nav>



      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* Filters */}

        <div className="flex gap-2 flex-wrap">

          {statuses.map((s) => (

            <button

              key={s}

              onClick={() =>
                setFilter(s)
              }

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



        {/* Tickets */}

        <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">

          {loading ? (

            <p className="text-slate-400 text-center py-12">

              Loading tickets...

            </p>

          ) : filtered.length === 0 ? (

            <p className="text-slate-400 text-center py-12">

              No tickets found.

            </p>

          ) : (

            filtered.map((ticket, i) => (

              <div
                key={ticket._id}
                className={`border-slate-700/50 ${
                  i < filtered.length - 1
                    ? 'border-b'
                    : ''
                }`}
              >

                {/* Main Row */}

                <div

                  onClick={() =>

                    setExpanded(

                      expanded === ticket._id

                        ? null

                        : ticket._id

                    )

                  }

                  className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-700/20 transition-colors"

                >

                  <div className="space-y-1">

                    <div className="flex items-center gap-2">

                      <span className="text-slate-500 text-xs font-mono">

                        #{ticket._id.slice(-6)}

                      </span>

                      <span className="text-xs text-slate-500">

                        {ticket.category}

                      </span>

                    </div>

                    <p className="text-white font-medium">

                      {ticket.title}

                    </p>

                    <p className="text-slate-500 text-xs">

                      {new Date(
                        ticket.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>



                  <div className="flex items-center gap-2 flex-shrink-0">

                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      priorityStyle[
                        ticket.priority
                      ]
                    }`}>

                      {ticket.priority}

                    </span>



                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      statusStyle[
                        ticket.status
                      ]
                    }`}>

                      {ticket.status}

                    </span>

                  </div>

                </div>



                {/* Expanded Details */}

                {expanded === ticket._id && (

                  <div className="px-6 pb-6 border-t border-slate-700/50 bg-slate-900/30">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">

                      <div>

                        <p className="text-slate-500 text-xs mb-1">

                          Description

                        </p>

                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">

                          {ticket.description}

                        </p>

                      </div>



                      <div className="space-y-4">

                        <div>

                          <p className="text-slate-500 text-xs mb-1">

                            Assigned Agent

                          </p>

                          <p className="text-white text-sm">

                            {ticket.assignedAgent?.name || "Not assigned yet"}

                          </p>

                        </div>



                        <div>

                          <p className="text-slate-500 text-xs mb-1">

                            ML Prediction

                          </p>

                          <p className="text-white text-sm">

                            {
                              ticket.mlPredictions
                                ?.predictedCategory
                            }

                          </p>

                        </div>



                        <div>

                          <p className="text-slate-500 text-xs mb-1">

                            Routing Method

                          </p>

                          <p className="text-white text-sm">

                            {
                              ticket.routingInfo
                                ?.routingMethod || "Pending"
                            }

                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                )}

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  )

}

export default TicketHistory