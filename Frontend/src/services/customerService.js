import api from "../config/api"



export const getCustomerTickets =
  async () => {

    const response =
      await api.get(
        "/customer/tickets"
      )

    return response.data

}



export const getSingleTicket =
  async (id) => {

    const response =
      await api.get(
        `/customer/tickets/${id}`
      )

    return response.data

}