import { ChatGroq }
from "@langchain/groq"

import {
  ChatPromptTemplate,
  MessagesPlaceholder
}
from "@langchain/core/prompts"

import {
  HumanMessage,
  AIMessage
}
from "@langchain/core/messages"



// =====================================================
// LLM
// =====================================================

const llm =
  new ChatGroq({

    apiKey:
      process.env.GROQ_API_KEY,

    model:
      "llama-3.3-70b-versatile",

    temperature: 0.3

  })



// =====================================================
// MEMORY
// =====================================================

const chatHistory = []



// =====================================================
// PROMPT
// =====================================================

const prompt =
  ChatPromptTemplate.fromMessages([

   [
  "system",
  `
You are an AI Customer Support Assistant.

Your responsibilities:

1. Help customers troubleshoot issues.
2. Ask follow-up questions when needed.
3. Be professional and concise.
4. Never invent information.
5. If an issue cannot be resolved easily, recommend creating a support ticket.
6. Explain solutions step-by-step.
7. Focus only on customer support tasks.
8. Do not act like a general chatbot.
`
],
    new MessagesPlaceholder(
      "history"
    ),

    [
      "human",

      "{input}"
    ]

  ])



// =====================================================
// CHAT
// =====================================================

export const askBot =
  async (message) => {

    const formattedPrompt =

      await prompt.formatMessages({

        history:
          chatHistory,

        input:
          message

      })



    const response =
      await llm.invoke(
        formattedPrompt
      )



    chatHistory.push(

      new HumanMessage(
        message
      )

    )



    chatHistory.push(

      new AIMessage(
        response.content
      )

    )



    return response.content

  }