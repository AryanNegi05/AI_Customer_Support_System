import mongoose from "mongoose";

const KnowledgeSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true,
    trim: true
  },

  problem: {
    type: String,
    required: true
  },

  keywords: [{
    type: String,
    trim: true
  }],

  solution: {
    type: String,
    required: true
  },

  tags: [{
    type: String,
    trim: true
  }],

  embeddingId: {
    type: String,
    default: null
  },

  source: {
    type: String,
    default: "manual"
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

export default mongoose.model("Knowledge", KnowledgeSchema);