import Ticket from "../models/Ticket.js"

import {
  decreaseAgentTickets
} from "../services/redisAgentService.js"

import Conversation from "../models/Conversation.js"

// =====================================================
// GET ASSIGNED TICKETS
// =====================================================

export const getAssignedTickets =
  async (req, res) => {

    try {

      const tickets =
        await Ticket.find({

          assignedAgent:
            req.user.id

        })

        .populate(
          "customerId",
          "name email"
        )

        .sort({
          createdAt: -1
        })



      res.status(200).json({

        success: true,

        tickets

      })

    }

    catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch tickets"

      })

    }

}



// =====================================================
// GET SINGLE TICKET
// =====================================================

export const getSingleTicket =
  async (req, res) => {

    try {

      const ticket =
        await Ticket.findById(
          req.params.id
        )

        .populate(
          "customerId",
          "name email"
        )



      if (!ticket) {

        return res.status(404).json({

          success: false,

          message:
            "Ticket not found"

        })

      }



      res.status(200).json({

        success: true,

        ticket

      })

    }

    catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch ticket"

      })

    }

}



// =====================================================
// UPDATE TICKET STATUS
// =====================================================

export const updateTicketStatus =
  async (req, res) => {

    try {

      const {
        status,
        resolution
      } = req.body



      const ticket =
        await Ticket.findById(
          req.params.id
        )



      if (!ticket) {

        return res.status(404).json({

          success: false,

          message:
            "Ticket not found"

        })

      }



      // =================================================
      // VALIDATION
      // =================================================

      const allowedStatuses = [

        "open",

        "assigned",

        "in_progress",

        "resolved",

        "closed"

      ]



      if (
        !allowedStatuses.includes(
          status
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid status"

        })

      }



      // =================================================
      // UPDATE STATUS
      // =================================================

      ticket.status = status



      // =================================================
      // SAVE RESOLUTION
      // =================================================

      if (resolution) {

        ticket.resolution =
          resolution

      }



      // =================================================
      // RESOLVED LOGIC
      // =================================================

      if (status === "resolved") {

        ticket.resolvedAt =
          new Date()

         await Conversation.findByIdAndUpdate(

    ticket.conversationId,

    {
      status: "resolved",
      stage: "resolved"
    }

  )

        // REDIS WORKLOAD DECREASE
        await decreaseAgentTickets(

          ticket.assignedAgent

        )

      }



      await ticket.save()



      res.status(200).json({

        success: true,

        message:
          "Ticket updated successfully",

        ticket

      })

    }

    catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          "Failed to update status"

      })

    }

}