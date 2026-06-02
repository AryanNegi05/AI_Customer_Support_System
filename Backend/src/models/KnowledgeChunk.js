import mongoose from "mongoose"

const KnowledgeChunkSchema =
new mongoose.Schema({

  source: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  chunkIndex: {
    type: Number,
    required: true
  },

  embedding: {
    type: [Number],
    default: []
  }

}, {
  timestamps: true
})

export default mongoose.model(
  "KnowledgeChunk",
  KnowledgeChunkSchema
)