import Conversation from "../models/Conversation.js"

import {
  askSupportBot
} from "../langchain/chatbot.js"

import {

  increaseFailedAttempts,

  shouldEscalate

}
from "../services/escalationService.js"



// =====================================================
// CHAT
// =====================================================

export const chat = async (req, res) => {

  try {

    const {

      conversationId,

      message

    } = req.body



    if (

      !conversationId ||

      !message

    ) {

      return res.status(400).json({

        success: false,

        message:
          "conversationId and message required"

      })

    }



    const conversation =
      await Conversation.findOne({

        _id:
          conversationId,

        customerId:
          req.user.id

      })



    if (!conversation) {

      return res.status(404).json({

        success: false,

        message:
          "Conversation not found"

      })

    }



    // =================================================
    // AUTO TITLE
    // =================================================

    if (

      conversation.title ===
      "New Chat"

    ) {

      conversation.title =
        message.substring(0, 40)

    }



    // =================================================
    // FAILURE DETECTION
    // =================================================

    const failureWords = [

      "still not working",

      "didn't work",

      "not resolved",

      "same issue",

      "problem persists",

      "still facing",

      "not fixed"

    ]



    const isFailureMessage =

      failureWords.some(

        word =>

          message
            .toLowerCase()
            .includes(word)

      )



    if (isFailureMessage) {

      await increaseFailedAttempts(

        conversation

      )

    }



    // =================================================
    // ESCALATION CHECK
    // =================================================

    const escalation =

      shouldEscalate(

        conversation,

        message

      )



    // =================================================
    // HISTORY
    // =================================================

    const history =

      conversation.messages.map(

        msg => ({

          sender:
            msg.sender,

          message:
            msg.message

        })

      )



    // =================================================
    // SAVE CUSTOMER MESSAGE
    // =================================================

    conversation.messages.push({

      sender:
        "customer",

      message

    })



    await conversation.save()



    // =================================================
    // LANGCHAIN
    // =================================================

    const botReply =

      await askSupportBot({

        message,

        history,

        customerId:
          req.user.id.toString(),

        conversationId:
          conversation._id.toString(),

        canEscalate:
          escalation.escalate

      })



    // =================================================
    // SAVE BOT MESSAGE
    // =================================================

    conversation.messages.push({

      sender:
        "bot",

      message:
        botReply

    })



    await conversation.save()



    return res.status(200).json({

      success: true,

      reply:
        botReply,

      conversationId:
        conversation._id,

      failedAttempts:
        conversation.failedAttempts

    })

  }

  catch (error) {

    console.log(error)



    return res.status(500).json({

      success: false,

      message:
        "Server Error"

    })

  }

}