import Ticket from "../models/Ticket.js"
import Conversation from "../models/Conversation.js"
import { predictTicket } from "./mlService.js"
import ticketQueue from "../queues/ticketQueue.js"

export const createTicketService = async ({
  customerId,
  conversationId,
  title,
  description,
  category
}) => {
  try {
    const existingTicket = await Ticket.findOne({ conversationId })
    if (existingTicket) {
      return existingTicket
    }

    const prediction = await predictTicket(description)

    const ticket = await Ticket.create({
      customerId,
      conversationId,
      title,
      description,
      category: prediction.intent || category,
      priority: prediction.priority || "medium",
      status: "open",
      chatbotResolved: false,
      mlPredictions: {
        predictedCategory: prediction.intent || category,
        predictedPriority: prediction.priority || "medium",
        confidenceScore: null
      },
      routingInfo: {
        routingMethod: null,
        assignedAt: null
      }
    })

    await Conversation.findByIdAndUpdate(conversationId, {
      ticketId: ticket._id,
      status: "ticket_created"
    })

    await ticketQueue.add("ticket-routing", {
      ticketId: ticket._id
    })

    return ticket
  } catch (error) {
    console.log(error)
    throw new Error("Ticket creation failed")
  }
}