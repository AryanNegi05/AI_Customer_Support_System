// // import { Link, useNavigate } from 'react-router-dom'
// // import { useSelector, useDispatch } from 'react-redux'
// // import { logoutUser } from '../../store/authSlice'

// // const AgentDashboard = () => {
// //   const { user } = useSelector((state) => state.auth)
// //   const dispatch = useDispatch()
// //   const navigate = useNavigate()

// //   const handleLogout = () => {
// //     dispatch(logoutUser())
// //     navigate('/login')
// //   }

// //   const stats = [
// //     { label: 'Assigned to You', value: '7', color: 'from-violet-500 to-purple-600' },
// //     { label: 'Resolved Today', value: '4', color: 'from-emerald-500 to-teal-600' },
// //     { label: 'Critical', value: '2', color: 'from-red-500 to-rose-600' },
// //   ]

// //   const tickets = [
// //     { id: '#1042', title: 'Cannot login to account', priority: 'High', customer: 'Rahul Sharma', time: '2h ago' },
// //     { id: '#1040', title: 'API rate limit exceeded', priority: 'Critical', customer: 'Priya Mehta', time: '4h ago' },
// //     { id: '#1037', title: 'Payment not processing', priority: 'Medium', customer: 'Amit Singh', time: '6h ago' },
// //   ]

// //   const priorityStyle = {
// //     Critical: 'text-red-400 bg-red-400/10',
// //     High: 'text-orange-400 bg-orange-400/10',
// //     Medium: 'text-yellow-400 bg-yellow-400/10',
// //     Low: 'text-slate-400 bg-slate-400/10',
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full filter blur-3xl" />
// //         <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
// //       </div>

// //       {/* Navbar */}
// //       <nav className="relative z-10 border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">
// //         <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
// //               <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //               </svg>
// //             </div>
// //             <span className="text-white font-semibold">Agent Portal</span>
// //             <span className="text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full">Agent</span>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <div className="flex items-center gap-2">
// //               <div className="w-2 h-2 rounded-full bg-emerald-400" />
// //               <span className="text-slate-400 text-sm">Online</span>
// //             </div>
// //             <span className="text-slate-400 text-sm">{user?.name}</span>
// //             <button
// //               onClick={handleLogout}
// //               className="text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </nav>

// //       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
// //         <div>
// //           <h1 className="text-2xl font-bold text-white">Agent Dashboard</h1>
// //           <p className="text-slate-400 mt-1">Manage your assigned support tickets</p>
// //         </div>

// //         {/* Stats */}
// //         <div className="grid grid-cols-3 gap-4">
// //           {stats.map((s) => (
// //             <div key={s.label} className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
// //               <p className="text-slate-400 text-sm">{s.label}</p>
// //               <p className={`text-3xl font-bold mt-1 bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Quick links */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //           <Link
// //             to="/agent/tickets"
// //             className="group backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 hover:border-violet-500/50 rounded-2xl p-6 transition-all"
// //           >
// //             <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
// //               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
// //               </svg>
// //             </div>
// //             <h3 className="text-white font-semibold text-lg">Assigned Tickets</h3>
// //             <p className="text-slate-400 text-sm mt-1">View and manage all tickets assigned to you</p>
// //             <span className="inline-block mt-3 text-violet-400 text-sm group-hover:translate-x-1 transition-transform">View all →</span>
// //           </Link>

// //           <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
// //             <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mb-4">
// //               <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //               </svg>
// //             </div>
// //             <h3 className="text-white font-semibold text-lg">My Workload</h3>
// //             <div className="mt-3 space-y-2">
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-slate-400">Capacity</span>
// //                 <span className="text-white">7 / 10</span>
// //               </div>
// //               <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
// //                 <div className="h-full w-[70%] bg-gradient-to-r from-violet-500 to-purple-600 rounded-full" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Ticket list */}
// //         <div className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-white font-semibold">Recent Assigned Tickets</h2>
// //             <Link to="/agent/tickets" className="text-violet-400 text-sm hover:text-violet-300 transition-colors">View all</Link>
// //           </div>
// //           <div className="space-y-3">
// //             {tickets.map((ticket, i) => (
// //               <Link
// //                 key={ticket.id}
// //                 to={`/agent/tickets/${ticket.id.replace('#', '')}`}
// //                 className={`flex items-center justify-between py-3 group ${i < tickets.length - 1 ? 'border-b border-slate-700/50' : ''}`}
// //               >
// //                 <div className="space-y-0.5">
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-slate-500 text-xs font-mono">{ticket.id}</span>
// //                     <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyle[ticket.priority]}`}>{ticket.priority}</span>
// //                   </div>
// //                   <p className="text-slate-200 text-sm group-hover:text-white transition-colors">{ticket.title}</p>
// //                   <p className="text-slate-500 text-xs">{ticket.customer} · {ticket.time}</p>
// //                 </div>
// //                 <span className="text-slate-600 group-hover:text-violet-400 transition-colors text-lg">→</span>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default AgentDashboard
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react'

// import { logoutUser } from '../../store/authSlice'
// import { fetchAssignedTickets } from '../../store/agentSlice'

// const AgentDashboard = () => {

//   const { user } = useSelector((state) => state.auth)

//   const { tickets } = useSelector(
//     (state) => state.agent
//   )

//   const dispatch = useDispatch()

//   const navigate = useNavigate()

//   useEffect(() => {

//     dispatch(fetchAssignedTickets())

//   }, [dispatch])

//   const handleLogout = () => {

//     dispatch(logoutUser())

//     navigate('/login')

//   }

//   const resolvedTickets =
//     tickets.filter(
//       t => t.status === 'resolved'
//     )

//   const highPriority =
//     tickets.filter(
//       t => t.priority === 'high'
//     )

//   const stats = [
//     {
//       label: 'Assigned to You',
//       value: tickets.length,
//       color: 'from-violet-500 to-purple-600'
//     },
//     {
//       label: 'Resolved',
//       value: resolvedTickets.length,
//       color: 'from-emerald-500 to-teal-600'
//     },
//     {
//       label: 'High Priority',
//       value: highPriority.length,
//       color: 'from-red-500 to-rose-600'
//     },
//   ]

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

//       <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

//           <div className="flex items-center gap-3">

//             <span className="text-white font-semibold">
//               Agent Portal
//             </span>

//           </div>

//           <div className="flex items-center gap-4">

//             <span className="text-slate-400 text-sm">
//               {user?.name}
//             </span>

//             <button
//               onClick={handleLogout}
//               className="text-sm text-slate-400 hover:text-white"
//             >
//               Logout
//             </button>

//           </div>

//         </div>

//       </nav>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">

//         <div>

//           <h1 className="text-2xl font-bold text-white">
//             Agent Dashboard
//           </h1>

//         </div>

//         <div className="grid grid-cols-3 gap-4">

//           {stats.map((s) => (

//             <div
//               key={s.label}
//               className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5"
//             >

//               <p className="text-slate-400 text-sm">
//                 {s.label}
//               </p>

//               <p className={`text-3xl font-bold mt-1 bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
//                 {s.value}
//               </p>

//             </div>

//           ))}

//         </div>

//         <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">

//           <div className="flex items-center justify-between mb-4">

//             <h2 className="text-white font-semibold">
//               Recent Assigned Tickets
//             </h2>

//           </div>

//           <div className="space-y-3">

//             {tickets.slice(0, 5).map((ticket, i) => (

//               <Link
//                 key={ticket._id}
//                 to={`/agent/tickets/${ticket._id}`}
//                 className={`flex items-center justify-between py-3 group ${i < tickets.length - 1 ? 'border-b border-slate-700/50' : ''}`}
//               >

//                 <div>

//                   <p className="text-white">
//                     {ticket.title}
//                   </p>

//                   <p className="text-slate-500 text-xs">
//                     {ticket.customerId?.name}
//                   </p>

//                 </div>

//                 <span className="text-slate-400">
//                   {ticket.priority}
//                 </span>

//               </Link>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>

//   )

// }

// export default AgentDashboard
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { logoutUser } from '../../store/authSlice'
import { fetchAssignedTickets } from '../../store/agentSlice'

const AgentDashboard = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { user } = useSelector(
    state => state.auth
  )

  const { tickets } = useSelector(
    state => state.agent
  )

  useEffect(() => {

    dispatch(fetchAssignedTickets())

  }, [dispatch])

  const handleLogout = () => {

    dispatch(logoutUser())

    navigate('/login')

  }

  const openTickets =
    tickets.filter(
      t => t.status === 'open'
    )

  const pendingTickets =
    tickets.filter(
      t => t.status === 'pending'
    )

  const resolvedTickets =
    tickets.filter(
      t => t.status === 'resolved'
    )

  return (

    <div className="min-h-screen bg-slate-900">

      <nav className="border-b border-slate-800 bg-slate-950">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div>

            <h1 className="text-white font-bold text-xl">
              Agent Dashboard
            </h1>

            <p className="text-slate-400 text-sm">
              Welcome back {user?.name}
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white text-sm"
          >
            Logout
          </button>

        </div>

      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

            <p className="text-slate-400 text-sm">
              Total Assigned
            </p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {tickets.length}
            </h2>

          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

            <p className="text-slate-400 text-sm">
              Open + Pending
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-2">
              {openTickets.length + pendingTickets.length}
            </h2>

          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

            <p className="text-slate-400 text-sm">
              Resolved
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-2">
              {resolvedTickets.length}
            </h2>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

          <Link
            to="/agent/tickets"
            className="bg-slate-800 border border-slate-700 hover:border-violet-500 rounded-2xl p-6 transition-all"
          >

            <h2 className="text-white text-xl font-semibold">
              Manage Tickets
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              View and manage all assigned tickets
            </p>

          </Link>

        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-white text-xl font-semibold">
              Recent Tickets
            </h2>

            <Link
              to="/agent/tickets"
              className="text-violet-400 text-sm"
            >
              View All
            </Link>

          </div>

          <div className="space-y-4">

            {tickets.slice(0, 5).map(ticket => (

              <Link
                key={ticket._id}
                to={`/agent/tickets/${ticket._id}`}
                className="flex justify-between items-center bg-slate-900 rounded-xl p-4 hover:bg-slate-950 transition-all"
              >

                <div>

                  <h3 className="text-white font-medium">
                    {ticket.title}
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    {ticket.customerId?.name}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-violet-400 text-sm">
                    {ticket.priority}
                  </p>

                  <p className="text-slate-500 text-xs mt-1">
                    {ticket.status}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </div>

    </div>

  )

}

export default AgentDashboard