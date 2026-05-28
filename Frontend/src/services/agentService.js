import apiClient from "../config/api.js"



// =====================================================
// GET ASSIGNED TICKETS
// =====================================================

export const getAssignedTickets = async () => {

  const response = await apiClient.get(
    "/agent/tickets"
  )

  return response.data
}



// =====================================================
// GET SINGLE TICKET
// =====================================================

export const getSingleTicket = async (ticketId) => {

  const response = await apiClient.get(
    `/agent/tickets/${ticketId}`
  )

  return response.data
}



// =====================================================
// UPDATE TICKET STATUS
// =====================================================

export const updateTicketStatus = async (
  ticketId,
  status
) => {

  const response = await apiClient.patch(
    `/agent/tickets/${ticketId}/status`,
    { status }
  )

  return response.data
}