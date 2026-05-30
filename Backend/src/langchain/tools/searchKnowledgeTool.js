import { tool } from "@langchain/core/tools"
import { z } from "zod"

import {
  searchKnowledgeBase
} from "../../services/knowledgeService.js"

export const searchKnowledgeTool =
tool(

  async ({ issue }) => {

    const result =
      await searchKnowledgeBase({

        issue

      })

    return (
      result ||
      "No matching solution found."
    )

  },

  {

    name:
      "search_knowledge_base",

    description:
      "Search support knowledge base.",

    schema:
      z.object({

        issue:
          z.string()

      })

  }

)