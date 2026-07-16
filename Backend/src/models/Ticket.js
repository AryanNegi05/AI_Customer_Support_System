
import mongoose from "mongoose"
const TicketSchema =
new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },



  // =====================================================
  // ONE TICKET PER CONVERSATION
  // =====================================================

  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
    unique: true
  },



  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },



  title: {
    type: String,
    required: true
  },



  description: {
    type: String,
    required: true
  },



  category: {
    type: String,
    default: null
  },



  priority: {
    type: String,

    enum: [

      "low",

      "medium",

      "high",

      "critical"

    ],

    default: "medium"
  },



  status: {
    type: String,

    enum: [

      "open",

      "assigned",

      "in_progress",

      "resolved",

      "closed"

    ],

    default: "open"
  },



  chatbotResolved: {
    type: Boolean,
    default: false
  },



  mlPredictions: {

    predictedCategory: {
      type: String,
      default: null
    },

    predictedPriority: {
      type: String,
      default: null
    },

    confidenceScore: {
      type: Number,
      default: null
    }

  },



  routingInfo: {

    routingMethod: {
      type: String,
      default: null
    },

    assignedAt: {
      type: Date,
      default: null
    }

  },



  resolution: {
    type: String,
    default: null
  },



  resolvedAt: {
    type: Date,
    default: null
  }

}, {

  timestamps: true

})



export default mongoose.model(
  "Ticket",
  TicketSchema
)
