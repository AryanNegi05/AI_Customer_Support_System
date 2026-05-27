import apiClient from '../config/api'

// Register a new user
export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData)
  return response.data
}

// Login user
export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials)
  return response.data
}

// Get current user
export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me')
  return response.data
}

// Logout user
export const logout = async () => {
  const response = await apiClient.post('/auth/logout')
  return response.data
}

// Verify token
export const verifyToken = async () => {
  const response = await apiClient.get('/auth/verify')
  return response.data
}

// Refresh token
export const refreshToken = async () => {
  const response = await apiClient.post('/auth/refresh')
  return response.data
}