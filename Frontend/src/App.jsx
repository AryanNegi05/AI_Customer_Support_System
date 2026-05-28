import { useEffect } from 'react'

import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import {
  useDispatch
} from 'react-redux'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/common/ProtectedRoute'
import NotFound from './pages/NotFound'



// =====================================================
// CUSTOMER PAGES
// =====================================================

import CustomerDashboard
from './pages/customer/CustomerDashboard'

import ChatPage
from './pages/customer/ChatPage'

import TicketHistory
from './pages/customer/TicketHistory.jsx'



// =====================================================
// AGENT PAGES
// =====================================================

import AgentDashboard
from './pages/agent/AgentDashboard.jsx'

import AssignedTickets
from './pages/agent/AssignedTickets.jsx'

import ResolveTicket
from './pages/agent/ResolveTicket.jsx'



// =====================================================
// ADMIN PAGES
// =====================================================

import AdminDashboard
from './pages/admin/AdminDashboard.jsx'

import ManageAgents
from './pages/admin/ManageAgents.jsx'

import Analytics
from './pages/admin/Analytics.jsx'
import AdminTickets from './pages/admin/AdminTickets'



// =====================================================
// AUTH
// =====================================================

import {
  fetchCurrentUser
} from './store/authSlice'



function App() {

  const dispatch = useDispatch()



  // =====================================================
  // RESTORE USER AFTER REFRESH
  // =====================================================

  useEffect(() => {

    const token =
      localStorage.getItem('token')

    if (token) {

      dispatch(fetchCurrentUser())

    }

  }, [dispatch])



  return (

    <Routes>

      {/* ================================================= */}
      {/* PUBLIC ROUTES */}
      {/* ================================================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />



      {/* ================================================= */}
      {/* ROLE REDIRECT */}
      {/* ================================================= */}

      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>

        }

      />



      {/* ================================================= */}
      {/* CUSTOMER ROUTES */}
      {/* ================================================= */}

      <Route

        path="/customer/dashboard"

        element={

          <ProtectedRoute
            allowedRoles={['customer']}
          >

            <CustomerDashboard />

          </ProtectedRoute>

        }

      />



      <Route

        path="/customer/chat"

        element={

          <ProtectedRoute
            allowedRoles={['customer']}
          >

            <ChatPage />

          </ProtectedRoute>

        }

      />



      <Route

        path="/customer/tickets"

        element={

          <ProtectedRoute
            allowedRoles={['customer']}
          >

            <TicketHistory />

          </ProtectedRoute>

        }

      />



      {/* ================================================= */}
      {/* AGENT ROUTES */}
      {/* ================================================= */}

      <Route

        path="/agent/dashboard"

        element={

          <ProtectedRoute
            allowedRoles={['agent']}
          >

            <AgentDashboard />

          </ProtectedRoute>

        }

      />



      <Route

        path="/agent/tickets"

        element={

          <ProtectedRoute
            allowedRoles={['agent']}
          >

            <AssignedTickets />

          </ProtectedRoute>

        }

      />



      <Route

        path="/agent/tickets/:id"

        element={

          <ProtectedRoute
            allowedRoles={['agent']}
          >

            <ResolveTicket />

          </ProtectedRoute>

        }

      />



      {/* ================================================= */}
      {/* ADMIN ROUTES */}
      {/* ================================================= */}

      <Route

        path="/admin/dashboard"

        element={

          <ProtectedRoute
            allowedRoles={['admin']}
          >

            <AdminDashboard />

          </ProtectedRoute>

        }

      />
      <Route
  path="/admin/tickets"
  element={
    <ProtectedRoute
      allowedRoles={['admin']}
    >
      <AdminTickets />
    </ProtectedRoute>
  }
/>



      <Route

        path="/admin/agents"

        element={

          <ProtectedRoute
            allowedRoles={['admin']}
          >

            <ManageAgents />

          </ProtectedRoute>

        }

      />



      <Route

        path="/admin/analytics"

        element={

          <ProtectedRoute
            allowedRoles={['admin']}
          >

            <Analytics />

          </ProtectedRoute>

        }

      />



      {/* ================================================= */}
      {/* NOT FOUND */}
      {/* ================================================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  )

}

export default App