import { useEffect } from 'react'

import { Link } from 'react-router-dom'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  fetchAllTickets
} from '../../store/adminSlice'



const statusStyle = {

  open:
    'text-amber-400 bg-amber-400/10',

  assigned:
    'text-cyan-400 bg-cyan-400/10',

  in_progress:
    'text-violet-400 bg-violet-400/10',

  resolved:
    'text-emerald-400 bg-emerald-400/10',

  closed:
    'text-slate-400 bg-slate-400/10'

}



const priorityStyle = {

  low:
    'text-slate-400 bg-slate-400/10',

  medium:
    'text-yellow-400 bg-yellow-400/10',

  high:
    'text-orange-400 bg-orange-400/10',

  critical:
    'text-red-400 bg-red-400/10'

}



const AdminTickets = () => {

  const dispatch = useDispatch()

  const {
    tickets,
    loading
  } = useSelector(
    state => state.admin
  )



  useEffect(() => {

    dispatch(fetchAllTickets())

  }, [dispatch])



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Navbar */}

      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">

          <Link
            to="/admin/dashboard"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >

            ← Dashboard

          </Link>

          <div className="h-4 w-px bg-slate-700" />

          <span className="text-white font-medium">

            All Tickets

          </span>

        </div>

      </nav>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-white">

            System Tickets

          </h1>

          <p className="text-slate-400 mt-2">

            Monitor all customer support tickets

          </p>

        </div>



        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">

          {loading ? (

            <div className="p-10 text-center text-white">

              Loading tickets...

            </div>

          ) : tickets.length === 0 ? (

            <div className="p-10 text-center text-slate-400">

              No tickets found

            </div>

          ) : (

            tickets.map((ticket, i) => (

              <div
                key={ticket._id}
                className={`p-6 ${
                  i !== tickets.length - 1
                    ? 'border-b border-slate-700'
                    : ''
                }`}
              >

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                  <div className="space-y-2">

                    <div className="flex items-center gap-3 flex-wrap">

                      <span className="text-slate-500 text-xs">

                        #{ticket._id.slice(-6)}

                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${statusStyle[ticket.status]}`}
                      >

                        {ticket.status}

                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${priorityStyle[ticket.priority]}`}
                      >

                        {ticket.priority}

                      </span>

                    </div>

                    <h2 className="text-white text-lg font-semibold">

                      {ticket.title}

                    </h2>

                    <p className="text-slate-400 text-sm line-clamp-2">

                      {ticket.description}

                    </p>

                  </div>



                  <div className="text-sm space-y-2 min-w-[250px]">

                    <div>

                      <span className="text-slate-500">

                        Customer:

                      </span>

                      <span className="text-white ml-2">

                        {ticket.customerId?.name}

                      </span>

                    </div>

                    <div>

                      <span className="text-slate-500">

                        Agent:

                      </span>

                      <span className="text-white ml-2">

                        {ticket.assignedAgent?.name || 'Unassigned'}

                      </span>

                    </div>

                    <div>

                      <span className="text-slate-500">

                        Category:

                      </span>

                      <span className="text-white ml-2">

                        {ticket.category}

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  )

}

export default AdminTickets