import { ChatGroq } from "@langchain/groq"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { MemorySaver } from "@langchain/langgraph"
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages"

import { searchKnowledgeTool } from "./tools/searchKnowledgeTool.js"
import { createTicketTool } from "./tools/createTicketTool.js"
import { summaryTool } from "./tools/summaryTool.js"
import { ticketStatusTool } from "./tools/ticketStatusTool.js"

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0.2
})

const memory = new MemorySaver()

export const askSupportBot = async ({
  message,
  history,
  customerId,
  conversationId,
  canEscalate,
  hasTicket
}) => {
  try {
    const langchainHistory = []

    for (const msg of history) {
      if (msg.sender === "customer") {
        langchainHistory.push(new HumanMessage(msg.message))
      } else if (msg.sender === "bot" || msg.sender === "agent") {
        langchainHistory.push(new AIMessage(msg.message))
      }
    }

    const tools = [searchKnowledgeTool, ticketStatusTool]

    if (!hasTicket && canEscalate) {
      tools.push(summaryTool, createTicketTool)
    }

    const dynamicAgent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory
    })

    const response = await dynamicAgent.invoke(
      {
        messages: [
          new SystemMessage(`

You are an AI Customer Support Assistant.

Responsibilities:

1. Troubleshoot customer issues.
2. Ask follow-up questions.
3. Be professional and concise.
4. Use company knowledge base.

IMPORTANT:

customerId = ${customerId}

conversationId = ${conversationId}

canEscalate = ${canEscalate}

hasTicket = ${hasTicket}

RULES:

1. For support issues ALWAYS call
   search_knowledge_base first.

2. Use retrieved knowledge as
   the primary source of truth.

3. Do not invent troubleshooting steps.

4. One conversation can have
   only ONE ticket.

5. If hasTicket = true:
   - never create another ticket
   - use ticket_status tool

6. If canEscalate = false:
   - do not create ticket
   - continue troubleshooting

7. If canEscalate = true:
   - generate summary
   - create ticket

8. Before escalation always attempt
   troubleshooting first.

`),
          ...langchainHistory,
          new HumanMessage(message)
        ]
      },
      {
        configurable: {
          thread_id: conversationId
        }
      }
    )

    return response.messages[response.messages.length - 1].content
  } catch (error) {
    console.log("LangChain Error:", error)
    return "Something went wrong."
  }
}