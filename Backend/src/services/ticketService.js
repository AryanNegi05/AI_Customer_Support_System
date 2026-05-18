import Ticket from "../models/Ticket.js";

import {

  predictTicket

} from "./mlService.js";
import ticketQueue
from "../queues/ticketQueue.js";



// =====================================================
// CREATE TICKET SERVICE
// =====================================================

export const createTicketService = async ({

  customerId,

  conversationId,

  title,

  description,

  category

}) => {

  try {

    // ===============================================
    // CALL ML API
    // ===============================================

    const prediction =
      await predictTicket(description);



    // ===============================================
    // EXTRACT PREDICTIONS
    // ===============================================

    const predictedCategory =
      prediction.intent;

    const predictedPriority =
      prediction.priority;



    // ===============================================
    // CREATE TICKET
    // ===============================================

    const ticket = await Ticket.create({

  customerId,

  conversationId,

  title,

  description,



  // ===========================================
  // ML OUTPUTS
  // ===========================================

  category:
    predictedCategory || category,

  priority:
    predictedPriority || "medium",



  status: "open",

  chatbotResolved: false,



  // ===========================================
  // ML PREDICTIONS
  // ===========================================

  mlPredictions: {

    predictedCategory,

    predictedPriority,

    confidenceScore: null

  },



  // ===========================================
  // FUTURE REDIS/BULLMQ
  // ===========================================
  

  routingInfo: {

    routingMethod: null,

    assignedAt: null

  }

});
await ticketQueue.add(

  "ticket-routing",

  {

    ticketId: ticket._id

  }

);



    // ===============================================
    // FUTURE:
    // BULLMQ
    // ===============================================

    /*
    
    await ticketQueue.add(
      "ticket-routing",
      {
        ticketId: ticket._id
      }
    );
    
    */



    return ticket;

  }

  catch (error) {

    console.log(error);



    throw new Error(
      "Ticket creation failed"
    );

  }

};