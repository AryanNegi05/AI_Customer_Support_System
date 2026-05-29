import { tool }
from "@langchain/core/tools"

import { z }
from "zod"

import {
  createTicketService
}
from "../../services/ticketService.js"



export const createTicketTool =
tool(

  async ({
    customerId,
    conversationId,
    title,
    description,
    category
  }) => {

    try {

      const ticket =
        await createTicketService({

          customerId,

          conversationId,

          title,

          description,

          category

        })



      return `
Ticket created successfully.

Ticket ID:
${ticket._id}
`

    }

    catch (error) {

      console.log(error)

      return "Failed to create ticket."

    }

  },

  {

    name: "create_ticket",

    description:
      `Create support ticket.`,

    schema: z.object({

      customerId:
        z.string(),

      conversationId:
        z.string(),

      title:
        z.string(),

      description:
        z.string(),

      category:
        z.string()

    })

  }

)