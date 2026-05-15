import Ticket from "../models/Ticket.js";



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
    // CREATE TICKET
    // ===============================================

    const ticket = await Ticket.create({

      customerId,

      conversationId,

      title,

      description,

      category,

      priority: "medium",

      status: "open",

      chatbotResolved: false

    });



    // ===============================================
    // FUTURE ML INTEGRATION
    // ===============================================

    /*
    
    Later:
    
    1. Call ML model
       -> predict category
       -> predict priority
    
    2. Store ML predictions
    
    ticket.mlPredictions = {
       predictedCategory,
       predictedPriority,
       confidenceScore
    };
    
    await ticket.save();
    
    */



    // ===============================================
    // FUTURE BULLMQ INTEGRATION
    // ===============================================

    /*
    
    Later:
    
    await ticketQueue.add(
      "ticket-routing",
      {
        ticketId: ticket._id
      }
    );
    
    */



    // ===============================================
    // FUTURE REDIS ROUTING
    // ===============================================

    /*
    
    Later worker will:
    
    1. Find suitable agents
    2. Check Redis workloads
    3. Assign best agent
    
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