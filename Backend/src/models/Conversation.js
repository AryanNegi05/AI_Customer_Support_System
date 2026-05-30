// import mongoose from "mongoose";

// const MessageSchema = new mongoose.Schema({

//   sender: {
//     type: String,
//     enum: ["customer", "bot", "agent"],
//     required: true
//   },

//   message: {
//     type: String,
//     required: true
//   },

//   timestamp: {
//     type: Date,
//     default: Date.now
//   }

// }, { _id: false });

// const ConversationSchema = new mongoose.Schema({

//   customerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },

//   category: {
//     type: String,
//     default: null
//   },

//   status: {
//     type: String,
//     enum: [
//       "active",
//       "resolved",
//       "escalated",
//       "closed"
//     ],
//     default: "active"
//   },
//   stage: {
//   type: String,

//   enum: [
//     "questions",
//     "solution",
//     "resolution_check",
//     "resolved",
//     "escalated"
//   ],

//   default: "questions"
// },

//   currentQuestionIndex: {
//     type: Number,
//     default: 0
//   },

//   extractedInfo: {
//     type: Map,
//     of: String,
//     default: {}
//   },

//   messages: [MessageSchema],

//   ticketId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Ticket",
//     default: null
//   },

//   summary: {
//     type: String,
//     default: null
//   }

// }, {
//   timestamps: true
// });

// export default mongoose.model("Conversation", ConversationSchema);
import mongoose from "mongoose"



const MessageSchema = new mongoose.Schema({

  sender: {
    type: String,
    enum: [
      "customer",
      "bot",
      "agent"
    ],
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

}, {
  _id: false
})



const ConversationSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },



  // =====================================================
  // CHATGPT STYLE TITLE
  // =====================================================

  title: {
    type: String,
    default: "New Chat"
  },





  // =====================================================
  // OPTIONAL FOR FUTURE LANGGRAPH / THREADS
  // =====================================================

  threadId: {
    type: String,
    default: null
  },
failedAttempts: {

  type: Number,

  default: 0

},


  // =====================================================
  // AI DETECTED CATEGORY
  // =====================================================

  category: {
    type: String,
    default: null
  },


status: {
  type: String,
  enum: [
    "active",
    "ticket_created",
    "resolved",
    "escalated",
    "closed"
  ],
  default: "active"
},



  // =====================================================
  // CHATBOT FLOW STATE
  // =====================================================

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



  // =====================================================
  // ENTIRE CHAT HISTORY
  // =====================================================

  messages: [MessageSchema],



  // =====================================================
  // 1 CONVERSATION -> 0 OR 1 TICKET
  // =====================================================

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

})



export default mongoose.model(
  "Conversation",
  ConversationSchema
)