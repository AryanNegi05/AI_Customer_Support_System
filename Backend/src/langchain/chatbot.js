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

  AIMessage,

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

import {
  ticketStatusTool
}
from "./tools/ticketStatusTool.js"



// =====================================================
// LLM
// =====================================================

const llm =
new ChatGroq({

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

  summaryTool,

  ticketStatusTool

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

  history,

  customerId,

  conversationId,

  canEscalate

}) => {

  try {

    const langchainHistory = []



    for (const msg of history) {

      if (

        msg.sender ===
        "customer"

      ) {

        langchainHistory.push(

          new HumanMessage(
            msg.message
          )

        )

      }

      else if (

        msg.sender === "bot" ||

        msg.sender === "agent"

      ) {

        langchainHistory.push(

          new AIMessage(
            msg.message
          )

        )

      }

    }



    const response =

      await agent.invoke(

        {

          messages: [

            new SystemMessage(`

You are an AI Customer Support Assistant.

Responsibilities:

1. Troubleshoot customer issues.
2. Ask follow-up questions.
3. Suggest solutions.
4. Use knowledge base when useful.
5. Be concise and professional.

IMPORTANT:

customerId = ${customerId}

conversationId = ${conversationId}

canEscalate = ${canEscalate}

One conversation can have ONLY ONE ticket.

If ticket already exists:

- use ticket_status tool
- never create duplicate tickets

If canEscalate = false:

- do NOT create ticket
- continue troubleshooting

If canEscalate = true:

- you may create ticket
- first generate summary
- then create ticket

Critical examples:

- payment deducted
- account hacked
- security issue
- service outage
- server down

Always help customer first.

`),

            ...langchainHistory,

            new HumanMessage(
              message
            )

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