import api from "../config/api"



// =====================================================
// CREATE AGENT
// =====================================================

export const createAgent = async (data) => {

  const response = await api.post(
    "/admin/create-agent",
    data
  )

  return response.data
}



// =====================================================
// GET AGENTS
// =====================================================

export const getAgents = async () => {

  const response = await api.get(
    "/admin/agents"
  )

  return response.data
}



// =====================================================
// GET ANALYTICS
// =====================================================

export const getAnalytics = async () => {

  const response = await api.get(
    "/admin/analytics"
  )

  return response.data
}



// =====================================================
// GET ALL TICKETS
// =====================================================

export const getAllTickets = async () => {

  const response = await api.get(
    "/admin/tickets"
  )

  return response.data
}