import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchSingleTicket,
  changeTicketStatus
} from '../../store/agentSlice'

const ResolveTicket = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  const {
    selectedTicket,
    loading
  } = useSelector(
    state => state.agent
  )

  const [status, setStatus] =
    useState('open')

  const [resolution, setResolution] =
    useState('')

  const [saved, setSaved] =
    useState(false)

  useEffect(() => {

    dispatch(
      fetchSingleTicket(id)
    )

  }, [dispatch, id])

  const ticket = selectedTicket

  useEffect(() => {

    if (ticket?.status) {

      setStatus(ticket.status)

    }

    if (ticket?.resolution) {

      setResolution(ticket.resolution)

    }

  }, [ticket])

  const handleSave = async () => {

    await dispatch(

      changeTicketStatus({

        ticketId: id,

        status,

        resolution

      })

    )

    setSaved(true)

    setTimeout(() => {

      setSaved(false)

    }, 2000)

  }

  if (loading || !ticket) {

    return (

      <div className="min-h-screen bg-slate-900 flex items-center justify-center">

        <p className="text-white text-lg">
          Loading ticket...
        </p>

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Navbar */}

      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">

        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">

          <Link
            to="/agent/tickets"
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >

            ← Tickets

          </Link>

          <div className="h-4 w-px bg-slate-700" />

          <span className="text-white font-medium">

            Ticket Details

          </span>

        </div>

      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Section */}

          <div className="lg:col-span-2 space-y-6">

            {/* Ticket Info */}

            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">

              <div className="flex items-start justify-between gap-4 mb-4">

                <div>

                  <p className="text-slate-500 text-xs mb-2">

                    #{ticket._id.slice(-6)}

                  </p>

                  <h1 className="text-2xl font-bold text-white">

                    {ticket.title}

                  </h1>

                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 capitalize">

                  {ticket.priority}

                </span>

              </div>

              <p className="text-slate-300 leading-relaxed whitespace-pre-line">

                {ticket.description}

              </p>

            </div>

            {/* ML Predictions */}

            <div className="bg-slate-800/40 border border-violet-500/20 rounded-2xl p-6">

              <h2 className="text-violet-300 font-semibold mb-4">

                ML Predictions

              </h2>

              <div className="grid grid-cols-2 gap-5">

                <div>

                  <p className="text-slate-500 text-xs mb-1">

                    Predicted Category

                  </p>

                  <p className="text-white">

                    {
                      ticket.mlPredictions
                        ?.predictedCategory
                    }

                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-xs mb-1">

                    Predicted Priority

                  </p>

                  <p className="text-white">

                    {
                      ticket.mlPredictions
                        ?.predictedPriority
                    }

                  </p>

                </div>

              </div>

            </div>

            {/* Resolution */}

            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 space-y-4">

              <h2 className="text-white font-semibold">

                Resolution Notes

              </h2>

              <textarea

                value={resolution}

                onChange={(e) =>
                  setResolution(e.target.value)
                }

                rows={6}

                placeholder="Describe how you resolved the issue..."

                className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-xl p-4 resize-none focus:outline-none focus:border-violet-500"

              />

              <div className="flex flex-col sm:flex-row gap-3">

                <select

                  value={status}

                  onChange={(e) =>
                    setStatus(e.target.value)
                  }

                  className="bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"

                >

                  <option value="open">

                    Open

                  </option>

                  <option value="assigned">

                    Assigned

                  </option>

                  <option value="in_progress">

                    In Progress

                  </option>

                  <option value="resolved">

                    Resolved

                  </option>

                  <option value="closed">

                    Closed

                  </option>

                </select>

                <button

                  onClick={handleSave}

                  className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:opacity-90 text-white rounded-xl py-3 font-medium transition-all"

                >

                  {saved
                    ? '✓ Updated'
                    : 'Update Ticket'}

                </button>

              </div>

            </div>

          </div>

          {/* Sidebar */}

          <div className="space-y-5">

            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">

              <h3 className="text-white font-semibold mb-4">

                Customer Info

              </h3>

              <div className="space-y-4 text-sm">

                <div>

                  <p className="text-slate-500 text-xs mb-1">

                    Name

                  </p>

                  <p className="text-white">

                    {ticket.customerId?.name}

                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-xs mb-1">

                    Email

                  </p>

                  <p className="text-white">

                    {ticket.customerId?.email}

                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-xs mb-1">

                    Category

                  </p>

                  <p className="text-white capitalize">

                    {ticket.category}

                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-xs mb-1">

                    Current Status

                  </p>

                  <p className="text-white capitalize">

                    {ticket.status}

                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-xs mb-1">

                    Created At

                  </p>

                  <p className="text-white">

                    {new Date(
                      ticket.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default ResolveTicket