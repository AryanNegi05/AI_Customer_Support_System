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
3. Suggest solutions.
4. Use knowledge base when useful.
5. Be concise and professional.

IMPORTANT:
customerId = ${customerId}
conversationId = ${conversationId}
canEscalate = ${canEscalate}
hasTicket = ${hasTicket}

Rules:
- One conversation can have only ONE ticket.
- If a ticket already exists, do not create another one.
- If canEscalate = false, do not create a ticket.
- If canEscalate = true and no ticket exists, you may create one.
- Before creating a ticket, generate a summary.
- First try knowledge base / troubleshooting.
- If user asks for ticket status, use ticket_status tool.
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