import Conversation from "../models/Conversation.js";

// services
import {
  detectCategory,
  getNextQuestion
} from "../services/chatbotService.js";

import {
  searchKnowledgeBase
} from "../services/knowledgeService.js";

import {
  generateSummary
} from "../services/summarizerService.js";

import {
  createTicketService
} from "../services/ticketService.js";



// =====================================================
// MAIN CHAT CONTROLLER
// =====================================================

export const chat = async (req, res) => {

  try {

    const { customerId, message } = req.body;

    if (!customerId || !message) {

      return res.status(400).json({
        success: false,
        message: "customerId and message required"
      });

    }



    // =================================================
    // FIND ACTIVE CONVERSATION
    // =================================================

    let conversation = await Conversation.findOne({

      customerId,

      status: "active"

    });



    // =================================================
    // CREATE NEW CONVERSATION
    // =================================================

    if (!conversation) {

      const category =
        await detectCategory(message);

      conversation =
        await Conversation.create({

          customerId,

          category,

          messages: [
            {
              sender: "customer",
              message
            }
          ]

        });

      const firstQuestion =
        await getNextQuestion(
          category,
          0
        );

      conversation.messages.push({

        sender: "bot",

        message: firstQuestion

      });

      await conversation.save();

      return res.json({

        success: true,

        reply: firstQuestion,

        conversationId: conversation._id

      });

    }



    // =================================================
    // STORE CUSTOMER MESSAGE
    // =================================================

    conversation.messages.push({

      sender: "customer",

      message

    });



    // =================================================
    // RESOLUTION CHECK STAGE
    // =================================================

    if (
      conversation.stage ===
      "resolution_check"
    ) {

      // ===============================================
      // ISSUE RESOLVED
      // ===============================================

      if (
        message.toLowerCase() === "yes"
      ) {

        conversation.status = "resolved";

        conversation.stage = "resolved";

        await conversation.save();

        return res.json({

          success: true,

          reply:
            "Glad your issue was resolved."

        });

      }



      // ===============================================
      // ISSUE NOT RESOLVED
      // CREATE TICKET
      // ===============================================

      if (
        message.toLowerCase() === "no"
      ) {

        // generate ticket summary
        const summary =
          await generateSummary(
            conversation
          );



        // create ticket
        const ticket =
          await createTicketService({

            customerId:
              conversation.customerId,

            conversationId:
              conversation._id,

            title:
              `${conversation.category} issue`,

            description: summary,

            category:
              conversation.category

          });



        // update conversation
        conversation.status =
          "escalated";

        conversation.stage =
          "escalated";

        conversation.ticketId =
          ticket._id;

        conversation.summary =
          summary;

        await conversation.save();

        return res.json({

          success: true,

          reply:
            "Your issue has been escalated to a support agent.",

          ticketId: ticket._id

        });

      }



      return res.json({

        success: false,

        reply:
          "Please reply with yes or no."

      });

    }



    // =================================================
    // QUESTIONS STAGE
    // =================================================

    if (
      conversation.stage === "questions"
    ) {

      // save extracted answer
      conversation.extractedInfo.set(

        `answer_${conversation.currentQuestionIndex}`,

        message

      );



      const nextIndex =
        conversation.currentQuestionIndex + 1;



      const nextQuestion =
        await getNextQuestion(

          conversation.category,

          nextIndex

        );



      // ===============================================
      // MORE QUESTIONS REMAIN
      // ===============================================

      if (nextQuestion) {

        conversation.currentQuestionIndex =
          nextIndex;

        conversation.messages.push({

          sender: "bot",

          message: nextQuestion

        });

        await conversation.save();

        return res.json({

          success: true,

          reply: nextQuestion

        });

      }



      // ===============================================
      // ALL QUESTIONS COMPLETED
      // ===============================================

      const solution =
        await searchKnowledgeBase({

          category:
            conversation.category,

          conversation

        });



      const finalSolution =
        solution ||
        "I could not find a proper solution for your issue.";



      conversation.messages.push({

        sender: "bot",

        message: finalSolution

      });



      conversation.messages.push({

        sender: "bot",

        message:
          "Did this solve your issue? (yes/no)"

      });



      // move to resolution check
      conversation.stage =
        "resolution_check";

      await conversation.save();

      return res.json({

        success: true,

        reply:
          `${finalSolution}\n\nDid this solve your issue? (yes/no)`

      });

    }



    // =================================================
    // FALLBACK
    // =================================================

    return res.json({

      success: false,

      reply:
        "Unable to process request."

    });

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Server Error"

    });

  }

};