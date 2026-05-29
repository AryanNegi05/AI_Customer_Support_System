import { tool } from "@langchain/core/tools"
import { z } from "zod"

import {
  searchKnowledgeBase
} from "../../services/knowledgeService.js"



export const searchKnowledgeTool = tool(

  async ({ category, issue }) => {

    const result =
      await searchKnowledgeBase({

        category,

        issue

      })



    return result ||
      "No solution found"

  },

  {

    name: "search_knowledge_base",

    description:
      `Search troubleshooting steps
       for customer issues.`,

    schema: z.object({

      category: z.string(),

      issue: z.string()

    })

  }

)