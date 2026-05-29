import Conversation from "../models/Conversation.js"

import {
  askSupportBot
} from "../langchain/chatbot.js"



// =====================================================
// CHAT CONTROLLER
// =====================================================

export const chat = async (req, res) => {

  try {

    const {
      customerId,
      message
    } = req.body



    // ===============================================
    // VALIDATION
    // ===============================================

    if (!customerId || !message) {

      return res.status(400).json({

        success: false,

        message:
          "customerId and message required"

      })

    }



    // ===============================================
    // FIND ACTIVE CONVERSATION
    // ===============================================

    let conversation =
      await Conversation.findOne({

        customerId,

        status: "active"

      })



    // ===============================================
    // CREATE NEW CONVERSATION
    // ===============================================

    if (!conversation) {

      conversation =
        await Conversation.create({

          customerId,

          status: "active",

          messages: []

        })

    }



    // ===============================================
    // SAVE CUSTOMER MESSAGE
    // ===============================================

    conversation.messages.push({

      sender: "customer",

      message

    })



    await conversation.save()



    // ===============================================
    // CALL LANGCHAIN AGENT
    // ===============================================

    const botReply =
      await askSupportBot({

        message,

        customerId:
          conversation.customerId.toString(),

        conversationId:
          conversation._id.toString()

      })



    // ===============================================
    // SAVE BOT REPLY
    // ===============================================

    conversation.messages.push({

      sender: "bot",

      message: botReply

    })



    await conversation.save()



    // ===============================================
    // RESPONSE
    // ===============================================

    return res.status(200).json({

      success: true,

      reply: botReply,

      conversationId:
        conversation._id

    })

  }

  catch (error) {

    console.log(error)



    return res.status(500).json({

      success: false,

      message: "Server Error"

    })

  }

}