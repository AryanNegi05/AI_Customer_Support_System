import Conversation from "../models/Conversation.js"



// =====================================================
// CREATE NEW CHAT
// =====================================================

export const createConversation =
async (req, res) => {

  try {

    const conversation =
      await Conversation.create({

        customerId:
          req.user.id,

        title:
          "New Chat",

      

      })



    res.status(201).json({

      success: true,

      conversation

    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        "Failed to create conversation"

    })

  }

}



// =====================================================
// GET ALL CHATS
// =====================================================

export const getConversations =
async (req, res) => {

  try {

    const conversations =
      await Conversation.find({

        customerId:
          req.user.id

      })

      .sort({
        updatedAt: -1
      })

      .select(
        "_id title status updatedAt ticketId"
      )



    res.status(200).json({

      success: true,

      conversations

    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        "Failed to fetch conversations"

    })

  }

}



// =====================================================
// GET SINGLE CHAT
// =====================================================

export const getConversation =
async (req, res) => {

  try {

    const conversation =
      await Conversation.findOne({

        _id:
          req.params.id,

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



    res.status(200).json({

      success: true,

      conversation

    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        "Failed to fetch conversation"

    })

  }

}