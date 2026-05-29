import { tool }
from "@langchain/core/tools"

import { z }
from "zod"

import {
  generateSummary
}
from "../../services/summarizerService.js"

import Conversation
from "../../models/Conversation.js"



export const summaryTool = tool(

  async ({ conversationId }) => {

    const conversation =
      await Conversation.findById(
        conversationId
      )



    if (!conversation) {

      return "Conversation not found"

    }



    const summary =
      await generateSummary(
        conversation
      )



    return summary

  },

  {

    name: "generate_summary",

    description:
      "Generate issue summary.",

    schema: z.object({

      conversationId:
        z.string()

    })

  }

)