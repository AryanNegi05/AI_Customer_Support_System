// import  { useState } from 'react'
// import { Link, useParams } from 'react-router-dom'

// const ResolveTicket = () => {
//   const { id } = useParams()
//   const [resolution, setResolution] = useState('')
//   const [status, setStatus] = useState('Open')
//   const [saved, setSaved] = useState(false)

//   const ticket = {
//     id: `#${id}`,
//     title: 'Cannot login to my account',
//     customer: 'Rahul Sharma',
//     email: 'rahul@example.com',
//     priority: 'High',
//     category: 'Authentication',
//     createdAt: 'May 26, 2026',
//     description: 'Customer reports being unable to log in to their account. Error message: "Invalid credentials" even after password reset. Issue persists across browsers and devices.',
//     mlCategory: 'Authentication',
//     mlPriority: 'High',
//   }

//   const handleSave = () => {
//     // TODO: Call backend API to update ticket
//     setSaved(true)
//     setTimeout(() => setSaved(false), 2500)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
//           <Link to="/agent/tickets" className="text-slate-400 hover:text-white transition-colors text-sm">← Tickets</Link>
//           <div className="h-4 w-px bg-slate-700" />
//           <span className="text-white font-medium">{ticket.id}</span>
//         </div>
//       </nav>

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main content */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
//               <div className="flex items-start justify-between gap-4">
//                 <h1 className="text-white font-semibold text-xl">{ticket.title}</h1>
//                 <span className="text-xs px-2.5 py-1 rounded-full font-medium text-orange-400 bg-orange-400/10 flex-shrink-0">{ticket.priority}</span>
//               </div>
//               <p className="text-slate-300 text-sm leading-relaxed">{ticket.description}</p>
//             </div>

//             {/* ML Predictions */}
//             <div className="backdrop-blur-sm bg-slate-800/40 border border-violet-500/20 rounded-2xl p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
//                   <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
//                   </svg>
//                 </div>
//                 <span className="text-violet-300 font-medium text-sm">ML Predictions</span>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-slate-500 text-xs mb-1">Predicted Category</p>
//                   <p className="text-white font-medium">{ticket.mlCategory}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500 text-xs mb-1">Predicted Priority</p>
//                   <p className="text-white font-medium">{ticket.mlPriority}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Resolution input */}
//             <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
//               <h2 className="text-white font-semibold">Resolution Notes</h2>
//               <textarea
//                 value={resolution}
//                 onChange={(e) => setResolution(e.target.value)}
//                 placeholder="Describe the steps taken to resolve this ticket..."
//                 rows={5}
//                 className="w-full bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-violet-500/50 transition-colors"
//               />
//               <div className="flex items-center gap-3">
//                 <select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   className="bg-slate-700/50 border border-slate-600/50 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50"
//                 >
//                   <option value="Open">Open</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Resolved">Resolved</option>
//                 </select>
//                 <button
//                   onClick={handleSave}
//                   className="flex-1 bg-gradient-to-br from-violet-500 to-purple-600 text-white py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
//                 >
//                   {saved ? '✓ Saved!' : 'Update Ticket'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-4">
//             <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 space-y-4">
//               <h3 className="text-white font-semibold text-sm">Customer Info</h3>
//               <div className="space-y-3 text-sm">
//                 <div>
//                   <p className="text-slate-500 text-xs">Name</p>
//                   <p className="text-white">{ticket.customer}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500 text-xs">Email</p>
//                   <p className="text-white">{ticket.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500 text-xs">Created</p>
//                   <p className="text-white">{ticket.createdAt}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500 text-xs">Category</p>
//                   <p className="text-white">{ticket.category}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ResolveTicket
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

  const { selectedTicket } =
    useSelector(state => state.agent)

  const [status, setStatus] =
    useState('open')

  const [saved, setSaved] =
    useState(false)

  useEffect(() => {

    dispatch(fetchSingleTicket(id))

  }, [dispatch, id])

  const ticket = selectedTicket

  useEffect(() => {

    if (ticket?.status) {
      setStatus(ticket.status)
    }

  }, [ticket])

  if (!ticket) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    )

  }

  const handleSave = async () => {

    await dispatch(
      changeTicketStatus({
        ticketId: id,
        status
      })
    )

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)

  }

  return (

    <div className="min-h-screen bg-slate-900 p-10">

      <Link
        to="/agent/tickets"
        className="text-slate-400"
      >
        ← Back
      </Link>

      <div className="mt-6 bg-slate-800 rounded-2xl p-6 space-y-4">

        <h1 className="text-2xl text-white">
          {ticket.title}
        </h1>

        <p className="text-slate-300">
          {ticket.description}
        </p>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <p className="text-slate-500 text-sm">
              Customer
            </p>

            <p className="text-white">
              {ticket.customerId?.name}
            </p>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              Priority
            </p>

            <p className="text-white">
              {ticket.priority}
            </p>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              ML Category
            </p>

            <p className="text-white">
              {ticket.mlPredictions?.predictedCategory}
            </p>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              ML Priority
            </p>

            <p className="text-white">
              {ticket.mlPredictions?.predictedPriority}
            </p>

          </div>

        </div>

        <div className="flex gap-4 items-center">

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="bg-slate-700 text-white px-4 py-2 rounded"
          >

            <option value="open">
              Open
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="resolved">
              Resolved
            </option>

          </select>

          <button
            onClick={handleSave}
            className="bg-violet-600 text-white px-5 py-2 rounded"
          >

            {saved
              ? 'Saved!'
              : 'Update Ticket'}

          </button>

        </div>

      </div>

    </div>

  )

}

export default ResolveTicket