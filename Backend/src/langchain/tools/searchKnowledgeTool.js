import { tool } from "@langchain/core/tools"
import { z } from "zod"

import {
  searchKnowledge
} from "../../services/vectorSearchService.js"

export const searchKnowledgeTool =
tool(

  async ({ issue }) => {

    const docs =
      await searchKnowledge(issue)

    if (!docs.length) {

      return "No relevant knowledge found."

    }

    return docs
      .map(doc => doc.content)
      .join("\n\n")

  },

  {

    name:
      "search_knowledge_base",

    description:
      `Search company support knowledge base
       and return relevant troubleshooting information.`,

    schema:
      z.object({

        issue:
          z.string()

      })

  }

)