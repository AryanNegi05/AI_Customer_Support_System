import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  if (!user) return <Navigate to="/login" replace />

  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />
  if (user.role === 'agent') return <Navigate to="/agent/dashboard" replace />
  return <Navigate to="/customer/dashboard" replace />
}

export default Dashboard