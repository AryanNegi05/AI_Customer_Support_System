import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, logoutUser, clearError } from '../store/authSlice'
import toast from 'react-hot-toast'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token, loading, error, isAuthenticated } = useSelector((state) => state.auth)

  const login = async (credentials) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap()
      toast.success('Login successful!')
      navigate('/dashboard')
      return result
    } catch (err) {
      toast.error(err || 'Login failed')
      throw err
    }
  }

  const register = async (userData) => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap()
      toast.success('Registration successful! Welcome aboard!')
      navigate('/dashboard')
      return result
    } catch (err) {
      toast.error(err || 'Registration failed')
      throw err
    }
  }

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (err) {
      toast.error('Logout failed')
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError: () => dispatch(clearError()),
  }
}