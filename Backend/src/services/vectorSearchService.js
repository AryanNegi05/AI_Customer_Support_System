import KnowledgeChunk
from "../models/KnowledgeChunk.js"

import {
  getEmbedding
}
from "./embeddingService.js"

export const searchKnowledge =
async (query) => {

  const queryEmbedding =
    await getEmbedding(query)

  const results =
    await KnowledgeChunk.aggregate([

      {
        $vectorSearch: {

          index:
            "vector_index",

          path:
            "embedding",

          queryVector:
            queryEmbedding,

          numCandidates:
            50,

          limit:
            3

        }
      },

      {
        $project: {

          content: 1,

          source: 1,

          score: {
            $meta:
              "vectorSearchScore"
          }

        }
      }

    ])

  return results
}