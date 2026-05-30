// langchain/tools/ticketStatusTool.js

import { tool } from "@langchain/core/tools"
import { z } from "zod"

import Ticket from "../../models/Ticket.js"

export const ticketStatusTool =
tool(

  async ({ conversationId }) => {

    const ticket =
      await Ticket.findOne({

        conversationId

      })

      .populate(
        "assignedAgent",
        "name email"
      )



    if (!ticket) {

      return "No ticket exists for this conversation."
    }



    return `

Ticket ID:
${ticket._id}

Status:
${ticket.status}

Priority:
${ticket.priority}

Assigned Agent:
${ticket.assignedAgent?.name || "Not Assigned"}

`

  },

  {

    name:
      "ticket_status",

    description:
      "Get current ticket status.",

    schema:
      z.object({

        conversationId:
          z.string()

      })

  }

)