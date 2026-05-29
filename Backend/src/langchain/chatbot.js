import { ChatGroq }
from "@langchain/groq"

import {
  createReactAgent
}
from "@langchain/langgraph/prebuilt"

import {
  MemorySaver
}
from "@langchain/langgraph"

import {
  HumanMessage,
  SystemMessage
}
from "@langchain/core/messages"

import {
  searchKnowledgeTool
}
from "./tools/searchKnowledgeTool.js"

import {
  createTicketTool
}
from "./tools/createTicketTool.js"

import {
  summaryTool
}
from "./tools/summaryTool.js"



// =====================================================
// LLM
// =====================================================

const llm = new ChatGroq({

  apiKey:
    process.env.GROQ_API_KEY,

  model:
    "llama-3.3-70b-versatile",

  temperature: 0.2

})



// =====================================================
// MEMORY
// =====================================================

const memory =
  new MemorySaver()



// =====================================================
// TOOLS
// =====================================================

const tools = [

  searchKnowledgeTool,

  createTicketTool,

  summaryTool

]



// =====================================================
// AGENT
// =====================================================

export const agent =
createReactAgent({

  llm,

  tools,

  checkpointSaver:
    memory

})



// =====================================================
// ASK SUPPORT BOT
// =====================================================

export const askSupportBot =
async ({

  message,

  customerId,

  conversationId

}) => {

  try {

    const response =
      await agent.invoke(

        {

          messages: [

            new SystemMessage(`

You are an AI customer support assistant.

IMPORTANT RULES:

1. Always help the customer first.

2. Use knowledge base tool before escalation.

3. If issue is unresolved,
create a support ticket.

4. ALWAYS use THESE EXACT IDs:

customerId = ${customerId}

conversationId = ${conversationId}

5. NEVER generate fake IDs.

6. Before ticket creation:
   - generate summary
   - then create ticket

7. Use concise responses.

`),

            new HumanMessage(message)

          ]

        },

        {

          configurable: {

            thread_id:
              conversationId

          }

        }

      )



    return response.messages[
      response.messages.length - 1
    ].content

  }

  catch (error) {

    console.log(
      "LangChain Error:",
      error
    )



    return "Something went wrong."

  }

}