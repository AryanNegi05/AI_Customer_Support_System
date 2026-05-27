import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/common/ProtectedRoute'
import NotFound from './pages/NotFound'

// Customer pages
import CustomerDashboard from './pages/customer/CustomerDashboard'
import ChatPage from './pages/customer/ChatPage'
import TicketHistory from './pages/customer/TicketHistory.jsx'

// Agent pages
import AgentDashboard from './pages/agent/AgentDashboard.jsx'
import AssignedTickets from './pages/agent/AssignedTickets.jsx'
import ResolveTicket from './pages/agent/ResolveTicket.jsx'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ManageAgents from './pages/admin/ManageAgents.jsx'
import Analytics from './pages/admin/Analytics.jsx'

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Role redirect */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />

      {/* Customer routes */}
      <Route path="/customer/dashboard" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/customer/chat" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <ChatPage />
        </ProtectedRoute>
      } />
      <Route path="/customer/tickets" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <TicketHistory />
        </ProtectedRoute>
      } />

      {/* Agent routes */}
      <Route path="/agent/dashboard" element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AgentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/agent/tickets" element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AssignedTickets />
        </ProtectedRoute>
      } />
      <Route path="/agent/tickets/:id" element={
        <ProtectedRoute allowedRoles={['agent']}>
          <ResolveTicket />
        </ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/agents" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageAgents />
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Analytics />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App