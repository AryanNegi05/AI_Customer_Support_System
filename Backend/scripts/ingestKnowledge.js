import fs from "fs"
import mongoose from "mongoose"
import dotenv from "dotenv"

import KnowledgeChunk
from "../src/models/KnowledgeChunk.js"

import {
  loadPdf
}
from "../src/services/pdfLoader.js"

import {
  splitText
}
from "../src/services/chunkService.js"

import {
  getEmbedding
}
from "../src/services/embeddingService.js"

dotenv.config()

await mongoose.connect(
  process.env.MONGO_URI
)

const files =
  fs.readdirSync(
    "./Knowledge-base"
  )

await KnowledgeChunk.deleteMany()

for (const file of files) {

  const text =
    await loadPdf(
      `./Knowledge-base/${file}`
    )

  const chunks =
    await splitText(text)

  for (
    let i = 0;
    i < chunks.length;
    i++
  ) {

    const embedding =
      await getEmbedding(
        chunks[i]
      )

    await KnowledgeChunk.create({

      source: file,

      content: chunks[i],

      chunkIndex: i,

      embedding

    })

  }

  console.log(
    `${file} processed`
  )

}

console.log(
  "Knowledge Ingested"
)

process.exit()