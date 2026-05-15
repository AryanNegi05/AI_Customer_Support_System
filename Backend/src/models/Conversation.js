import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({

  sender: {
    type: String,
    enum: ["customer", "bot", "agent"],
    required: true
  },

  message: {
    type: String,
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }

}, { _id: false });

const ConversationSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  category: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: [
      "active",
      "resolved",
      "escalated",
      "closed"
    ],
    default: "active"
  },
  stage: {
  type: String,

  enum: [
    "questions",
    "solution",
    "resolution_check",
    "resolved",
    "escalated"
  ],

  default: "questions"
},

  currentQuestionIndex: {
    type: Number,
    default: 0
  },

  extractedInfo: {
    type: Map,
    of: String,
    default: {}
  },

  messages: [MessageSchema],

  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    default: null
  },

  summary: {
    type: String,
    default: null
  }

}, {
  timestamps: true
});

export default mongoose.model("Conversation", ConversationSchema);