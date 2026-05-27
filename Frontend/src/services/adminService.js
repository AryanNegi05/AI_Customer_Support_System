import api from "../config/api"

export const createAgent = async (data) => {

  const response = await api.post(
    "/admin/create-agent",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  )

  return response.data
}

export const getAgents = async () => {

  const response = await api.get(
    "/admin/agents",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  )

  return response.data
}