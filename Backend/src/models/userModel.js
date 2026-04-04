
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['customer', 'agent', 'admin'],
      default: 'customer',
    },

    skills: {
      type: [String],
      enum: ['network_issue', 'billing_issue', 'login_problem', 'payment_issue', 'technical_bug'],
      default: [],
    },

  },
  
  {
    timestamps: true,   // auto adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);