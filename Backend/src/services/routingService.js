import User from "../models/userModel.js";

import Ticket from "../models/Ticket.js";

import {

  getAgentTicketCount,

  increaseAgentTickets

} from "./redisAgentService.js";



// =====================================================
// ROUTE TICKET TO BEST AGENT
// =====================================================

export const routeTicket = async (

  ticketId

) => {

  try {

    // ===============================================
    // FETCH TICKET
    // ===============================================

    const ticket =
      await Ticket.findById(ticketId);



    if (!ticket) {

      console.log(
        "Ticket not found"
      );

      return;

    }



    // ===============================================
    // FIND AGENTS WITH MATCHING SKILL
    // ===============================================

    const agents =
      await User.find({

        role: "agent",

        skills: ticket.category

      });



    if (!agents.length) {

      console.log(
        "No matching agents found"
      );

      return;

    }



    // ===============================================
    // FIND LEAST BUSY AGENT
    // ===============================================

    let selectedAgent = null;

    let minimumTickets =
      Infinity;



    for (const agent of agents) {

      const activeTickets =
        await getAgentTicketCount(

          agent._id

        );



      if (
        activeTickets <
        minimumTickets
      ) {

        minimumTickets =
          activeTickets;

        selectedAgent =
          agent;

      }

    }



    // ===============================================
    // UPDATE TICKET
    // ===============================================

    ticket.assignedAgent =
      selectedAgent._id;

    ticket.status =
      "assigned";



    ticket.routingInfo = {

      routingMethod:
        "least_workload",

      assignedAt:
        new Date()

    };



    await ticket.save();



    // ===============================================
    // UPDATE REDIS WORKLOAD
    // ===============================================

    await increaseAgentTickets(

      selectedAgent._id

    );



    console.log(

      `Ticket assigned to ${selectedAgent.name}`

    );



  }

  catch (error) {

    console.log(error);

  }

};