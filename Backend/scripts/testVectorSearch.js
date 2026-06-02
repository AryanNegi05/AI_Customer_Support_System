import mongoose from "mongoose"
import dotenv from "dotenv"

import {
  searchKnowledge
}
from "../src/services/vectorSearchService.js"

dotenv.config()

await mongoose.connect(
  process.env.MONGO_URI
)

const results =
await searchKnowledge(

  "My wifi not working pls help"

)

console.log(results)

process.exit()